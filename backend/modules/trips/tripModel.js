const db = require("../../db/db");
const { NotFoundError } = require("../../helpers/expressError");
const asyncHandler = require("express-async-handler");

/** Related functions for trips. */

class TripApi {
  /**
   * Retrieves all users from the database.
   * Returns an array of users.
   */
  static async getAllTrips() {
    const result = await db.query(`SELECT * FROM trips`);
    const trips = result.rows;
    // No error, because i want to pass empty trip_list if no trips
    return trips;
  }

  /**
   * Retrieves a trip by trip_id from the database.
   * Throws NotFoundError if the trip doesn't exist.
   * @param {integer} id - id of the trip to retrieve.
   * @returns {object} - Trip object.
   */
  static async getTrip(id) {
    let result = await db.query(`SELECT * FROM trips WHERE id=$1`, [id]);
    const trip = result.rows[0];
    if (!trip) throw new NotFoundError(`No trip found with ID: ${id}`);
    return trip;
  }

  /**
   * Creates a new trip in the database.
   *
   * @param {object} data - Trip data to create a new trip.
   * @returns {object} - Success message and the newly created trip object.
   */
  static async createTrip(data) {
    const {
      date,
      start_location,
      destination,
      stops,
      travel_info,
      seats,
      costs,
    } = data;

    const query = `
      INSERT INTO trips (date,
        start_location,
        destination,
        stops,
        travel_info,
        seats,
        costs)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;

    const values = [
      date,
      start_location,
      destination,
      stops,
      travel_info,
      seats,
      costs,
    ];

    const result = await db.query(query, values);
    const newTrip = result.rows[0];

    if (!newTrip) {
      throw new ExpressError("Failed to create trip", 500);
    }

    return newTrip;
  }

  /**
   * Updates a trip in the database.
   *
   * @param {object} data - Trip data to update.
   * @returns {object} - Success message and the newly updated trip object.
   */
  static async updateTrip(id, data) {
    const keys = Object.keys(data);
    const updateValues = [...Object.values(data), id];

    const updateQuery = `
      UPDATE trips
      SET ${keys.map((key, index) => `${key} = $${index + 1}`).join(",")}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    const result = await db.query(updateQuery, updateValues);
    const updatedTrip = result.rows[0];

    if (!updatedTrip) {
      throw new ExpressError("Failed to update trip", 500);
    }

    return updatedTrip;
  }
}

module.exports = TripApi;
