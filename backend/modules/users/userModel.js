const db = require("../../db/db");
const bcrypt = require("bcrypt");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ExpressError,
} = require("../../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../../config");

/** USER API
 *
 * Related functions for users.
 **/
class UserApi {
  /** ALL USERS
   *
   * Retrieves all users from the database.
   * Returns an array of users.
   **/
  static async getAllUsers() {
    let result = await db.query(`SELECT * FROM users`);
    const users = result.rows;
    return users;
  }

  /**  SINGLE USER
   *
   * Retrieves a user by username from the database.
   * Throws NotFoundError if the user doesn't exist.
   * @param {string} username - Username of the user to retrieve.
   * @returns {object} - User object.
   **/
  static async getUserDetails(username) {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const user = result.rows[0];

    if (!user)
      throw new NotFoundError(`No user found with username: ${username}`);

    return user;
  }

  /** UPDATE USER PROFILE
   *
   * Updates user profile information.
   * @param {string} username - Username of the user to update.
   * @param {object} userData - Updated user data.
   * @returns {object} - Updated user object.
   **/
  static async updateUserProfile(username, userData) {
    const keys = Object.keys(userData);
    const updateValues = [...Object.values(userData), username];

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const returnClause = keys.map((key, index) => `${key}`).join(", ");

    const updateQuery = `
    UPDATE users 
    SET ${setClause}
    WHERE username = $${keys.length + 1}
    RETURNING ${returnClause}
    `;

    const result = await db.query(updateQuery, updateValues);
    const updatedFields = result.rows[0];

    if (!updatedFields) {
      throw new ExpressError("Failed to update user", 500);
    }
    const updatedUser = { username: username, updatedFields: updatedFields };

    return updatedUser;
  }

  /** REQUEST A TRIP
   *
   * Requests to join a trip.
   * @param {string} username - Username of the user making the request.
   * @param {string} trip_id - ID of the trip to join.
   * @param {string} request_status - Status of the request (default: "requested").
   * @returns {object} - New trip member link.
   **/
  static async requestTripMembership(
    username,
    trip_id,
    request_status = "requested"
  ) {
    const tripIdCheck = await db.query(`SELECT FROM trips WHERE id = $1`, [
      trip_id,
    ]);

    if (!tripIdCheck.rows[0])
      throw new NotFoundError(`No trip found with id: ${trip_id}`);

    const duplicateCheck = await db.query(
      `
      SELECT FROM trip_members 
      WHERE username = $1
      AND trip_id = $2
      `,
      [username, trip_id]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(
        `You have already requested to join trip with ID: ${trip_id}`
      );

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

  /** CANCEL A TRIP REQUEST
   *
   **/
  static async cancelTripMembership(username, id) {
    const result = await db.query(
      `
      DELETE
      FROM trip_members
      WHERE trip_id = $1
      AND username = $2
      RETURNING *
      `,
      [id, username]
    );

    const removedTripMembership = result.rows[0];

    if (!removedTripMembership) {
      throw new NotFoundError(
        `No trip membership found with id: ${id} and username ${username}`
      );
    }

    if (removedTripMembership.request_status === "approved") {
      throw new NotFoundError(
        `The trip membership status for trip with id ${id} and username ${username} is already 'approved', make a 'Cancel-Approved-Trip-Request'`
      );
    } else if (removedTripMembership.request_status === "owner") {
      throw new NotFoundError(
        `You are the owner for trip with id ${id} and username ${username}. Make a 'Remove-Trip-As-Owner-Request'`
      );
    }

    return removedTripMembership;
  }

  /** RESPOND A TRIP MEMBERSHIP REQUEST
   *
   * Updates the status of a trip request.
   * @param {string} id - ID of the trip request.
   * @param {string} request_status - New request status.
   * @returns {object} - Updated trip request object.
   **/
  static async respondTripMembership(
    tripId,
    tripOwnerUsername,
    tripPassengerUsername,
    membershipStatus
  ) {
    // Check if the person making the request is the trip owner
    const ownerCheck = await db.query(
      `SELECT * 
       FROM trip_members 
       WHERE trip_id = $1
       AND is_trip_creator = $2
       RETURNING *`,
      [tripId, true]
    );

    const requestedTrip = ownerCheck.rows[0];
    if (!requestedTrip)
      throw new NotFoundError(`No trip found with id: ${tripId}`);

    if (requestedTrip.username !== tripOwnerUsername)
      throw new ExpressError(
        `You are not the Owner of the trip and not allowed to respond`
      );

    const result2 = await db.query(
      `
      UPDATE trip_members
      SET request_status = $1
      WHERE id = $2
      AND username = $3
      RETURNING *
      `,
      [membershipStatus, tripId, tripPassengerUsername]
    );

    const updatedTripRequest = result2.rows[0];

    if (updatedTripRequest)
      throw new ExpressError(
        `Failed to update request status for trip with ID ${tripId}`
      );

    return updatedTripRequest;
  }
}

module.exports = UserApi;
