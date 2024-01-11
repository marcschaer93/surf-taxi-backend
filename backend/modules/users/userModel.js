const db = require("../../db/db");
const bcrypt = require("bcrypt");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ExpressError,
} = require("../../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../../config");

/** Related functions for users. */

class UserApi {
  /**
   * Retrieves all users from the database.
   * Returns an array of users.
   */
  static async getAllUsers() {
    let result = await db.query(`SELECT * FROM users`);
    const users = result.rows;
    return users;
  }

  /**
   * Retrieves a user by username from the database.
   * Throws NotFoundError if the user doesn't exist.
   * @param {string} username - Username of the user to retrieve.
   * @returns {object} - User object.
   */
  static async getUser(username) {
    let result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const user = result.rows[0];

    if (!user)
      throw new NotFoundError(`No user found with username: ${username}`);

    return user;
  }

  static async requestTrip(username, trip_id, request_status = "requested") {
    const tripIdCheck = await db.query(`SELECT FROM trips WHERE id = $1`, [
      trip_id,
    ]);

    if (!tripIdCheck.rows[0])
      throw new NotFoundError(`No trip found with id: ${trip_id}`);

    const result = await db.query(
      `
      INSERT INTO trip_members
      (username, trip_id, is_trip_creator, request_status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [username, trip_id, false, request_status]
    );

    const newTripMemberLink = result.rows[0];

    if (!newTripMemberLink)
      throw new ExpressError(
        `Failed to insert request status for trip with ID ${id}`
      );

    return newTripMemberLink;
  }

  static async requestTripUpdate(id, request_status) {
    const result = await db.query(
      `SELECT * 
       FROM trip_members 
       WHERE trip_id = $1
       AND is_trip_creator = $2
       RETURNING *`,
      [id, false]
    );

    const requestedTrip = result.rows[0];
    if (!requestedTrip) throw new NotFoundError(`No trip found with id: ${id}`);

    const result2 = await db.query(
      `
      UPDATE trip_members
      SET request_status = $1
      WHERE id = $2
      RETURNING *
      `,
      [request_status, requestedTrip.id]
    );

    const updatedTripRequest = result2.rows[0];

    if (updatedTripRequest)
      throw new ExpressError(
        `Failed to update request status for trip with ID ${id}`
      );

    return updatedTripRequest;
  }
}

module.exports = UserApi;
