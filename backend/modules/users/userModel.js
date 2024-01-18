const db = require("../../db");
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
  static async getOneUser(username) {
    const result = await db.query(
      `
      SELECT * 
      FROM users 
      WHERE username = $1
      `,
      [username]
    );
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
  static async createNewTripMemberRequest(tripId, loggedInPassenger) {
    const tripCheckResult = await db.query(
      `SELECT * FROM trips WHERE id = $1`,
      [tripId]
    );

    const trip = tripCheckResult.rows[0];
    if (!trip) throw new NotFoundError(`No trip found with id: ${tripId}`);

    const tripMemberCheckResult = await db.query(
      `
      SELECT * FROM trip_members 
      WHERE username = $1
      AND trip_id = $2
      `,
      [loggedInPassenger, tripId]
    );

    const tripMember = tripMemberCheckResult.rows[0];

    if (tripMember) {
      if (tripMember.member_status === "owner") {
        throw new BadRequestError(
          `Can't Request. You are the owner of the trip with ID: ${tripId}.`
        );
      } else if (tripMember.member_status === "rejected") {
        throw new BadRequestError(
          `You got already rejected to join the trip with ID: ${tripId}.`
        );
      }

      throw new BadRequestError(
        `You have already requested to join trip with ID: ${tripId}`
      );
    }

    const insertTripMemberRequestResult = await db.query(
      `
      INSERT INTO trip_members
      (username, trip_id, member_status, status_timestamp)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP )
      RETURNING *
      `,
      [loggedInPassenger, tripId, "requested"]
    );

    const newTripMemberRequest = insertTripMemberRequestResult.rows[0];

    if (!newTripMemberRequest)
      throw new ExpressError(
        `Failed to insert request status for trip with ID ${tripId}`
      );

    return newTripMemberRequest;
  }

  /** DELETE A TRIP REQUEST
   *
   **/
  static async deleteMyTripMemberRequest(tripId, loggedInPassenger) {
    const validTripResult = await db.query(
      `
      SELECT *
      FROM trip_members 
      WHERE trip_id = $1
      AND username = $2
      `,
      [tripId, loggedInPassenger]
    );

    const requestedTrip = validTripResult.rows[0];
    if (!requestedTrip)
      throw new NotFoundError(
        `No trip member found with id: ${tripId} and username ${loggedInPassenger}`
      );

    if (requestedTrip.member_status === "approved") {
      throw new NotFoundError(
        `The trip membership status for trip with id ${tripId} and username ${loggedInPassenger} is already 'approved', make a 'Cancel-Approved-Trip-Request'`
      );
    } else if (requestedTrip.member_status === "owner") {
      throw new NotFoundError(
        `You are the owner for trip with id ${tripId} and username ${loggedInPassenger}. Make a 'Remove-Trip-As-Owner-Request'`
      );
    }

    const deletedResult = await db.query(
      `
      DELETE
      FROM trip_members
      WHERE trip_id = $1
      AND username = $2
      RETURNING *
      `,
      [tripId, loggedInPassenger]
    );
    const deletedTripMember = deletedResult.rows[0];
    if (!deletedTripMember)
      throw new NotFoundError(`Could not delete trip_member!`);

    return deletedTripMember;
  }

  /** RESPOND A TRIP MEMBERSHIP REQUEST
   *
   * Updates the status of a trip request.
   * @param {string} id - ID of the trip request.
   * @param {string} request_status - New request status.
   * @returns {object} - Updated trip request object.
   **/
  static async respondToTripMemberRequest(
    tripId,
    loggedInTripOwner,
    passenger,
    memberStatusResponse
  ) {
    const validTripResult = await db.query(
      `
      SELECT *
      FROM trip_members 
      WHERE trip_id = $1
      AND username = $2
      `,
      [tripId, loggedInTripOwner]
    );

    const requestedTrip = validTripResult.rows[0];
    if (!requestedTrip)
      throw new NotFoundError(`No trip found with id: ${tripId}`);

    const isTripOwner = requestedTrip.member_status === "tripOwner";
    if (!isTripOwner)
      throw new ExpressError(
        `You are not the Owner of the trip and not allowed to respond`
      );

    // Update member_status and get the updated row
    const updateResult = await db.query(
      `
      UPDATE trip_members
      SET member_status = $1, status_timestamp = CURRENT_TIMESTAMP
      WHERE trip_id = $2 AND username = $3
      RETURNING *
      `,
      [memberStatusResponse, tripId, passenger]
    );

    const respondToTripMemberRequest = updateResult.rows[0];

    if (!respondToTripMemberRequest)
      throw new ExpressError(
        `Failed to update request status for trip with ID ${tripId}`
      );

    return respondToTripMemberRequest;
  }
}

module.exports = UserApi;
