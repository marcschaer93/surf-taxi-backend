const asyncHandler = require("express-async-handler");

const sqlReady = require("../../helpers/sqlReady");
const jsReady = require("../../helpers/jsReady");
const db = require("../../db");
const {
  NotFoundError,
  ExpressError,
  BadRequestError,
} = require("../../helpers/expressError");

/** TRIP API
 *
 * Related functions for trips.
 **/
class TripApi {
  /** ALL TRIPS
   *
   * Retrieves all users from the database.
   * Returns an array of users.
   **/
  static async getAllTrips() {
    const result = await db.query(`SELECT * FROM trips`);
    const allTrips = result.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    // No error if allTrips is empty!
    return allTrips;
  }

  /** SINGLE TRIP
   *
   * Retrieves a trip by trip_id from the database.
   * Throws NotFoundError if the trip doesn't exist.
   * @param {integer} id - id of the trip to retrieve.
   * @returns {object} - Trip object.
   **/
  static async getOneTrip(id) {
    const result = await db.query(
      `
        SELECT
          T.id,
          T.date,
          T.owner,
          T.start_location,
          T.destination,
          T.stops,
          T.travel_info,
          T.seats,
          T.costs,
          json_agg(jsonb_build_object('username', P.username, 'status', P.reservation_status) ORDER BY P.username) AS passengers
        FROM
          trips AS T
        LEFT JOIN
          passengers AS P ON T.id = P.trip_id
        WHERE
          T.id = $1
        GROUP BY
          T.id, T.date, T.owner, T.start_location, T.destination, T.stops, T.travel_info, T.seats, T.costs
    `,
      [id]
    );

    const tripDetails = jsReady.convertKeysToCamelCase(result.rows[0]);
    if (!tripDetails) {
      throw new NotFoundError(`No tripDetails found with ID: ${id}`);
    }

    return tripDetails;
  }

  /** NEW TRIP
   *
   * Creates a new trip in the database.
   *
   * @param {object} data - Trip data to create a new trip.
   * @param {string} username - The username of the trip creator.
   * @returns {object} - The newly created trip object.
   **/

  static async createNewTrip(tripData, loggedInUser) {
    const insertData = sqlReady.convertKeysToSnakeCase(tripData);
    // Part 1: Insert a new trip to 'trips' table
    const createNewTripResult = await db.query(
      `
        INSERT INTO trips 
          (
            owner,
            date,
            start_location,
            destination,
            stops,
            travel_info,
            seats,
            costs
          )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
      [
        loggedInUser,
        insertData.date,
        insertData.start_location,
        insertData.destination,
        insertData.stops,
        insertData.travel_info,
        insertData.seats,
        insertData.costs,
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

  /** UPDATE TRIP
   *
   * Updates a trip in the database.
   *
   * @param {object} data - Trip data to update.
   * @returns {object} - Success message and the newly updated trip object.
   **/
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

  /** DELETE TRIP
   *
   *  Delete given trip from database; returns undefined.
   *
   * Throws NotFoundError if trip not found.
   **/
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
