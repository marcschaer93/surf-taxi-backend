const db = require("../../db/db");
const { NotFoundError } = require("../../expressError");
const asyncHandler = require("express-async-handler");

/** Related functions for trips. */

class TripApi {
  /**
   * Retrieves all users from the database.
   * Returns an array of users.
   */
  static async getAllTrips() {
    let result = await db.query(`SELECT * FROM trips`);
    const trips = result.rows;
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
  static createTrip = asyncHandler(async (data) => {
    const {
      date,
      start_location,
      destination,
      stops,
      trip_info,
      seats,
      costs,
      user_id,
    } = data;

    const query = `
      INSERT INTO trips (date,
        start_location,
        destination,
        stops,
        trip_info,
        seats,
        costs,
        user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `;

    const values = [
      date,
      start_location,
      destination,
      stops,
      trip_info,
      seats,
      costs,
      user_id,
    ];

    const newTrip = await db.query(query, values);

    return {
      success: true,
      message: "Trip created successfully",
      newTrip: newTrip.rows[0],
    };
  });

  /**
   * Updates a trip in the database.
   *
   * @param {object} data - Trip data to update.
   * @returns {object} - Success message and the newly updated trip object.
   */
  static updateTrip = asyncHandler(async (id, data) => {
    const keys = Object.keys(data);
    const updateValues = [...Object.values(data), id];

    const updateQuery = `
      UPDATE trips
      SET ${keys.map((key, index) => `${key} = $${index + 1}`).join(",")}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    const updatedTrip = await db.query(updateQuery, updateValues);

    return {
      success: true,
      message: "Trip updated successfully",
      updatedTrip: updatedTrip.rows[0],
    };
  });
}

module.exports = TripApi;
