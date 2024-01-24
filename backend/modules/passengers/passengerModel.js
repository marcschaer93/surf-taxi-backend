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

/** PASSENGER API
 *
 * Related functions for users.
 **/
class PassengerApi {
  /** REQUEST A TRIP
   *
   * Requests to join a trip.
   * @param {string} username - Username of the user making the request.
   * @param {string} trip_id - ID of the trip to join.
   * @param {string} request_status - Status of the request (default: "requested").
   * @returns {object} - New trip member link.
   **/
  static async requestToJoin(tripId, currentUser) {
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

    const passengerCheckResult = await db.query(
      `
      SELECT * FROM passengers
      WHERE username = $1
      AND trip_id = $2
      `,
      [currentUser, tripId]
    );

    const passenger = passengerCheckResult.rows[0];

    if (passenger) {
      if (passenger.reservation_status === "rejected") {
        throw new BadRequestError(
          `You got already rejected to join the trip with ID: ${tripId}.`
        );
      }

      throw new BadRequestError(
        `You have already requested to join trip with ID: ${tripId}`
      );
    }

    const insertPassengerResult = await db.query(
      `
      INSERT INTO passengers
      (username, trip_id, reservation_status, reservation_timestamp)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP )
      RETURNING *
      `,
      [currentUser, tripId, "requested"]
    );

    const newJoinRequest = jsReady.convertKeysToCamelCase(
      insertPassengerResult.rows[0]
    );

    if (!newJoinRequest)
      throw new ExpressError(
        `Failed to insert request status for trip with ID ${tripId}`
      );

    return newJoinRequest;
  }

  /** CANCEL A TRIP REQUEST
   *
   **/
  static async cancelJoinRequest(tripId, currentUser) {
    const validPassengerResult = await db.query(
      `
      SELECT *
      FROM passengers
      WHERE trip_id = $1
      AND username = $2
      `,
      [tripId, currentUser]
    );

    const passenger = validPassengerResult.rows[0];
    if (!passenger)
      throw new NotFoundError(
        `No passenger found with id: ${tripId} and username ${currentUser}`
      );

    if (passenger.reservation_status === "confirmed") {
      throw new BadRequestError(
        `The trip membership status for trip with id ${tripId} and username ${currentUser} is already 'approved', make a 'Cancel-Approved-Trip-Request'`
      );
    }

    const deletedResult = await db.query(
      `
      DELETE
      FROM passengers
      WHERE trip_id = $1
      AND username = $2
      RETURNING *
      `,
      [tripId, currentUser]
    );
    const removedJoinRequest = jsReady.convertKeysToCamelCase(
      deletedResult.rows[0]
    );
    if (!removedJoinRequest)
      throw new NotFoundError(`Could not remove join request!`);

    return removedJoinRequest;
  }

  /** RESPOND TO A JOIN REQUEST
   *
   * Updates the status of a trip request.
   * @param {string} id - ID of the trip request.
   * @param {string} request_status - New request status.
   * @returns {object} - Updated trip request object.
   **/
  static async respondToJoinRequest(tripId, currentUser, passenger, response) {
    const validPassengerResult = await db.query(
      `
          SELECT *
          FROM passengers
          WHERE trip_id = $1
          AND username = $2
          `,
      [tripId, passenger]
    );

    const joinRequest = validPassengerResult.rows[0];
    if (!joinRequest)
      throw new NotFoundError(
        `No passenger/ join request found with id: ${tripId} and username${passenger}`
      );

    // Update reservation_status and get the updated row
    const updateResult = await db.query(
      `
          UPDATE passengers
          SET reservation_status = $1, reservation_timestamp = CURRENT_TIMESTAMP
          WHERE trip_id = $2 AND username = $3
          RETURNING reservation_status AS 'reservationStatus'
          `,
      [response, tripId, passenger]
    );

    const tripJoinResponse = jsReady.convertKeysToCamelCase(
      updateResult.rows[0]
    );

    if (!tripJoinResponse)
      throw new ExpressError(
        `Failed to update reservation status for trip with ID ${tripId}`
      );

    return tripJoinResponse;
  }
}

module.exports = PassengerApi;
