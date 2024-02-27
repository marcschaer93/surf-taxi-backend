const bcrypt = require("bcrypt");

const db = require("../../db");
const sqlReady = require("../../helpers/sqlReady");
const jsReady = require("../../helpers/jsReady");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ExpressError,
} = require("../../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../../config");

class ReservationApi {
  /**
   * Retrieves all reservations for a specific trip.
   * @param {number} tripId - The ID of the trip.
   * @returns {Array} List of reservations.
   */
  static async getAllTripReservations(tripId) {
    const allTripReservationsResult = await db.query(
      `
      SELECT * 
      FROM reservations
      WHERE trip_id =$1
  
      `,
      [tripId]
    );

    const tripReservations = allTripReservationsResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return tripReservations;
  }

  /**
   * Creates a new reservation for a trip by a user.
   * Validates trip existence and user's ability to make a reservation.
   * @param {number} tripId - ID of the trip to reserve.
   * @param {string} currentUser - Username of the user making the reservation.
   * @returns {Object} The newly created reservation.
   */
  static async createNewReservation(tripId, currentUser) {
    const tripCheckResult = await db.query(
      `SELECT * FROM trips WHERE id = $1`,
      [tripId]
    );

    const trip = tripCheckResult.rows[0];
    const tripOwner = trip.owner;
    if (!trip) throw new NotFoundError(`No trip found with id: ${tripId}`);
    if (tripOwner === currentUser)
      throw new BadRequestError(
        `Can't Request. You are the owner of the trip with ID: ${tripId}.`
      );

    const reservationCheckResult = await db.query(
      `
      SELECT * FROM reservations
      WHERE username = $1
      AND trip_id = $2
      `,
      [currentUser, tripId]
    );

    const reservation = reservationCheckResult.rows[0];

    if (reservation) {
      if (reservation.status === "rejected") {
        throw new BadRequestError(
          `You got already rejected to join the trip with ID: ${tripId}.`
        );
      }

      throw new BadRequestError(
        `You have already requested to join trip with ID: ${tripId}`
      );
    }

    const insertReservationResult = await db.query(
      `
      INSERT INTO reservations
      (username, trip_id, status, reservation_timestamp)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP )
      RETURNING *
      `,
      [currentUser, tripId, "requested"]
    );

    const newReservation = jsReady.convertKeysToCamelCase(
      insertReservationResult.rows[0]
    );

    if (!newReservation)
      throw new ExpressError(
        `Failed to insert request status for trip with ID ${tripId}`
      );

    return newReservation;
  }

  /**
   * Deletes a reservation for a trip by a user.
   * Validates reservation existence and status before deletion.
   * @param {number} tripId - ID of the trip for which reservation is to be deleted.
   * @param {string} currentUser - Username of the user deleting the reservation.
   * @returns {Object} The deleted reservation.
   */
  static async deleteOneReservation(tripId, currentUser) {
    const validReservationResult = await db.query(
      `
      SELECT *
      FROM reservations
      WHERE trip_id = $1
      AND username = $2
      `,
      [tripId, currentUser]
    );

    const reservation = validReservationResult.rows[0];
    if (!reservation)
      throw new NotFoundError(
        `No reservation found with id: ${tripId} and username ${currentUser}`
      );

    if (reservation.status === "confirmed") {
      throw new BadRequestError(
        `The trip membership status for trip with id ${tripId} and username ${currentUser} is already 'approved', make a 'Cancel-Approved-Trip-Request'`
      );
    }

    const deletedResult = await db.query(
      `
      DELETE
      FROM reservations
      WHERE trip_id = $1
      AND username = $2
      RETURNING *
      `,
      [tripId, currentUser]
    );
    const removedReservation = jsReady.convertKeysToCamelCase(
      deletedResult.rows[0]
    );
    if (!removedReservation)
      throw new NotFoundError(`Could not remove reservation!`);

    return removedReservation;
  }

  /**
   * Updates the status of an existing reservation.
   * @param {number} tripId - ID of the trip.
   * @param {string} reservationUsername - Username of the user whose reservation is to be updated.
   * @param {string} newStatus - New status to set for the reservation.
   * @returns {Object} The updated reservation.
   */

  static async updateOneReservation(tripId, reservationUsername, newStatus) {
    const updateReservationResult = await db.query(
      `
        UPDATE 
          reservations
        SET 
          status = $1, 
          reservation_timestamp = CURRENT_TIMESTAMP
        WHERE 
          trip_id = $2
        AND 
          username = $3
        RETURNING 
          *
      `,
      [newStatus, tripId, reservationUsername]
    );

    if (updateReservationResult.rows.length === 0) {
      throw new Error("Reservation not found or no rows updated");
    }

    const updatedReservation = jsReady.convertKeysToCamelCase(
      updateReservationResult.rows[0]
    );

    return updatedReservation;
  }
}

module.exports = ReservationApi;
