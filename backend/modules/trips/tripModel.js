const db = require("../../db/db");
const { NotFoundError } = require("../../expressError");

/** Related functions for trips. */

class TripApi {
  /** Given a id, return data about trip.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if trip not found.
   **/

  static async getAllTrips() {
    let result = await db.query(`SELECT * FROM trips`);
    const trips = result.rows;
    return trips;
  }

  /** Given a id, return data about trip.
   *
   * Returns { username, first_name, last_name, is_admin, jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if trip not found.
   **/

  static async getTrip(id) {
    let result = await db.query(`SELECT * FROM trips WHERE id=$1`, [id]);
    const trip = result.rows[0];
    if (!trip) throw new NotFoundError(`No trip found with ID: ${id}`);
    return trip;
  }

  static async createTrip({
    date,
    start_location,
    destination,
    stops,
    trip_info,
    seats,
    costs,
    user_id,
  }) {
    // Perform the database operation that might throw an error
    await db.query(
      `
        INSERT INTO trips (date,
          start_location,
          destination,
          stops,
          trip_info,
          seats,
          costs,
          user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
      [
        date,
        start_location,
        destination,
        stops,
        trip_info,
        seats,
        costs,
        user_id,
      ]
    );

    // Return success or appropriate data
    return {
      success: true,
      message: "Trip created successfully",
    };
  }
}

module.exports = TripApi;
