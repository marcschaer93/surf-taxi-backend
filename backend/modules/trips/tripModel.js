const db = require("../../db/db");
const { NotFoundError, ExpressError } = require("../../helpers/expressError");
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
   * @param {string} username - The username of the trip creator.
   * @returns {object} - The newly created trip object.
   */
  // prettier-ignore
  static async createTrip(data, username) {
    //** Part 1: Adding a new trip to the trips table */
    const tripInsertQuery = `
      INSERT INTO trips 
        (
          date,
          start_location,
          destination,
          stops,
          travel_info,
          seats,
          costs
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;

    const tripInsertValues = [
      data.date, data.start_location, data.destination, data.stops, data.travel_info, 
      data.seats, data.costs
    ];
    const tripInsertResult = await db.query(tripInsertQuery, tripInsertValues);
    const newTrip = tripInsertResult.rows[0];

    if (!newTrip) {
      throw new ExpressError("Failed to create new trip", 500);
    }

    //** Part 2: Adding a new link to the trip_members table */ 
    const linkInsertQuery = `
    INSERT INTO trip_members 
      (
        username,
        trip_id,
        is_trip_creator,
        request_status
      )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;

  const linkInsertValues = [
    username, newTrip.id, true, 'approved'
  ];

  const linkInsertResult = await db.query(linkInsertQuery, linkInsertValues);
  const newTripMemberLink = linkInsertResult.rows[0];

  if (!newTripMemberLink) {
    throw new ExpressError("Failed to create a new trip_members link", 500);
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

  /** Delete given trip from database; returns undefined.
   *
   * Throws NotFoundError if trip not found.
   **/
  static async removeTrip(id) {
    const result = await db.query(
      `DELETE
             FROM trips
             WHERE id = $1
             RETURNING id`,
      [id]
    );
    const removedTrip = result.rows[0];

    if (!removedTrip)
      throw new NotFoundError(
        `Could not remove trip. No trip with id: ${id} found.`
      );

    return;
  }
}

module.exports = TripApi;
