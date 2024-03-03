const asyncHandler = require("express-async-handler");

const sqlReady = require("../../helpers/sqlReady");
const jsReady = require("../../helpers/jsReady");
const db = require("../../db");
const {
  NotFoundError,
  ExpressError,
  BadRequestError,
} = require("../../helpers/expressError");

class TripApi {
  /**
   * Retrieves all trips from the database.
   *
   * This method fetches and returns an array of all trip records. Each trip record
   * is transformed to use camelCase keys for consistency with JavaScript naming conventions.
   *
   * @returns {Array} An array of trip objects. Returns an empty array if no trips exist.
   */
  static async getAllTrips() {
    const result = await db.query(`SELECT * FROM trips`);
    const allTrips = result.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    // No error if allTrips is empty!
    return allTrips;
  }

  /**
   * Retrieves a single trip by its ID.
   *
   * This method searches for a trip by its unique identifier. If found, it returns the trip details;
   * otherwise, it throws a NotFoundError.
   *
   * @param {number} tripId - The unique ID of the trip to retrieve.
   * @returns {Object} An object containing the trip details.
   * @throws {NotFoundError} If no trip is found with the provided ID.
   */
  static async getOneTrip(tripId) {
    const result = await db.query(
      `
        SELECT
          T.id,
          T.date,
          T.owner,
          T.origin_city,
          T.origin_country_code,
          T.destination_city,
          T.destination_country_code,
          T.stops,
          T.travel_info,
          T.seats,
          T.costs,
          json_agg(jsonb_build_object('username', R.username, 'status', R.status, 'reservationTimestamp', R.reservation_timestamp) ORDER BY R.username) AS reservations
        FROM
          trips AS T
        LEFT JOIN
          reservations AS R ON T.id = R.trip_id
        WHERE
          T.id = $1
        GROUP BY
          T.id, T.date, T.owner, T.origin_city, T.origin_country_code, T.destination_city, T.destination_country_code, T.stops, T.travel_info, T.seats, T.costs
    `,
      [tripId]
    );

    const tripDetails = jsReady.convertKeysToCamelCase(result.rows[0]);
    if (!tripDetails) {
      throw new NotFoundError(`No tripDetails found with ID: ${tripId}`);
    }

    return tripDetails;
  }

  /**
   * Creates a new trip in the database.
   *
   * Accepts trip data and the username of the trip creator as parameters. After inserting the trip
   * into the database, it returns the newly created trip object.
   *
   * @param {Object} tripData - The data for the new trip.
   * @param {string} username - The username of the user creating the trip.
   * @returns {Object} The newly created trip object.
   * @throws {ExpressError} If the trip cannot be created.
   */
  static async createNewTrip(tripData, loggedInUser) {
    // const insertData = sqlReady.convertKeysToSnakeCase(tripData);
    const {
      owner,
      date,
      originCity,
      originCountryCode,
      destinationCity,
      destinationCountryCode,
      stops,
      travelInfo,
      seats,
      costs,
    } = tripData;
    // Part 1: Insert a new trip to 'trips' table
    const createNewTripResult = await db.query(
      `
        INSERT INTO trips 
          (
            owner,
            date,
            origin_city,
            origin_country_code,
            destination_city,
            destination_country_code,
            stops,
            travel_info,
            seats,
            costs
          )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        `,
      [
        loggedInUser,
        date,
        originCity,
        originCountryCode,
        destinationCity,
        destinationCountryCode,
        stops,
        travelInfo,
        seats,
        costs,
      ]
    );

    const newTrip = jsReady.convertKeysToCamelCase(createNewTripResult.rows[0]);
    if (!newTrip) {
      throw new ExpressError(
        "Failed to create a new trip in the trips table",
        500
      );
    }

    return newTrip;
  }

  /**
   * Updates an existing trip in the database.
   *
   * This method allows for the update of trip details. It checks if the current user is the trip owner
   * before proceeding with the update. If the update is successful, it returns the updated trip object.
   *
   * @param {number} tripId - The ID of the trip to update.
   * @param {Object} updateData - The data to update the trip with.
   * @param {string} currentUser - The username of the current user attempting the update.
   * @returns {Object} The updated trip object.
   * @throws {BadRequestError} If the current user is not the trip owner.
   * @throws {ExpressError} If the update fails.
   */
  static async updateOneTrip(tripId, updateData, currentUser) {
    const insertData = sqlReady.convertKeysToSnakeCase(updateData);

    const keys = Object.keys(insertData);
    const updateValues = [...Object.values(insertData), tripId];

    const updateQuery = `
      UPDATE trips
      SET ${keys.map((key, index) => `${key} = $${index + 1}`).join(",")}
      WHERE id = $${keys.length + 1}
      RETURNING * 
  `;

    const result = await db.query(updateQuery, updateValues);

    const updatedTrip = jsReady.convertKeysToCamelCase(result.rows[0]);
    if (!updatedTrip) throw new ExpressError("Failed to update trip", 500);
    if (updatedTrip.owner !== currentUser)
      throw new BadRequestError("Not trip owner. Can't update trip.");

    return updatedTrip;
  }

  /**
   * Deletes a trip from the database.
   *
   * This method attempts to delete a trip based on its ID. If the trip is successfully deleted,
   * it returns nothing. If no trip with the given ID exists, it throws a NotFoundError.
   *
   * @param {number} tripId - The ID of the trip to delete.
   * @throws {NotFoundError} If no trip is found with the provided ID.
   */
  static async deleteOneTrip(tripId) {
    const result = await db.query(
      `DELETE
             FROM trips
             WHERE id = $1
             RETURNING id`,
      [tripId]
    );
    const removedTrip = jsReady.convertKeysToCamelCase(result.rows[0]);

    if (!removedTrip)
      throw new NotFoundError(
        `Could not remove trip. No trip with id: ${id} found.`
      );

    return;
  }
}

module.exports = TripApi;
