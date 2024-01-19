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
  static async updateUserProfile(currentUser, updateData) {
    const keys = Object.keys(updateData);
    const updateValues = [...Object.values(updateData), currentUser];

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
    const updatedUser = { username: currentUser, updatedFields: updatedFields };

    return updatedUser;
  }

  // /** REQUEST A TRIP
  //  *
  //  * Requests to join a trip.
  //  * @param {string} username - Username of the user making the request.
  //  * @param {string} trip_id - ID of the trip to join.
  //  * @param {string} request_status - Status of the request (default: "requested").
  //  * @returns {object} - New trip member link.
  //  **/
  // static async requestToJoin(tripId, currentUser) {
  //   const tripCheckResult = await db.query(
  //     `SELECT * FROM trips WHERE id = $1`,
  //     [tripId]
  //   );

  //   const trip = tripCheckResult.rows[0];
  //   if (!trip) throw new NotFoundError(`No trip found with id: ${tripId}`);
  //   if (trip.owner === currentUser)
  //     throw new BadRequestError(
  //       `Can't Request. You are the owner of the trip with ID: ${tripId}.`
  //     );

  //   const passengerCheckResult = await db.query(
  //     `
  //     SELECT * FROM passengers
  //     WHERE username = $1
  //     AND trip_id = $2
  //     `,
  //     [currentUser, tripId]
  //   );

  //   const passenger = passengerCheckResult.rows[0];

  //   if (passenger) {
  //     if (passenger.reservation_status === "rejected") {
  //       throw new BadRequestError(
  //         `You got already rejected to join the trip with ID: ${tripId}.`
  //       );
  //     }

  //     throw new BadRequestError(
  //       `You have already requested to join trip with ID: ${tripId}`
  //     );
  //   }

  //   const insertPassengerResult = await db.query(
  //     `
  //     INSERT INTO passengers
  //     (username, trip_id, reservation_status, reservation_timestamp)
  //     VALUES ($1, $2, $3, CURRENT_TIMESTAMP )
  //     RETURNING *
  //     `,
  //     [currentUser, tripId, "requested"]
  //   );

  //   const newJoinRequest = insertPassengerResult.rows[0];

  //   if (!newJoinRequest)
  //     throw new ExpressError(
  //       `Failed to insert request status for trip with ID ${tripId}`
  //     );

  //   return newJoinRequest;
  // }

  /** DELETE A TRIP REQUEST
   *
   **/
  // static async removeMyJoinRequest(tripId, currentUser) {
  //   const validPassengerResult = await db.query(
  //     `
  //     SELECT *
  //     FROM passengers
  //     WHERE trip_id = $1
  //     AND username = $2
  //     `,
  //     [tripId, currentUser]
  //   );

  //   const passenger = validPassengerResult.rows[0];
  //   if (!passenger)
  //     throw new NotFoundError(
  //       `No passenger found with id: ${tripId} and username ${currentUser}`
  //     );

  //   if (passenger.reservation_status === "confirmed") {
  //     throw new BadRequestError(
  //       `The trip membership status for trip with id ${tripId} and username ${currentUser} is already 'approved', make a 'Cancel-Approved-Trip-Request'`
  //     );
  //   }

  //   const deletedResult = await db.query(
  //     `
  //     DELETE
  //     FROM passengers
  //     WHERE trip_id = $1
  //     AND username = $2
  //     RETURNING *
  //     `,
  //     [tripId, currentUser]
  //   );
  //   const removedJoinRequest = deletedResult.rows[0];
  //   if (!removedJoinRequest)
  //     throw new NotFoundError(`Could not remove join request!`);

  //   return removedJoinRequest;
  // }

  // /** RESPOND A TRIP MEMBERSHIP REQUEST
  //  *
  //  * Updates the status of a trip request.
  //  * @param {string} id - ID of the trip request.
  //  * @param {string} request_status - New request status.
  //  * @returns {object} - Updated trip request object.
  //  **/
  // static async respondToJoinRequest(
  //   tripId,
  //   currentUser,
  //   passenger,
  //   reservationStatusResponse
  // ) {
  //   const validPassengerResult = await db.query(
  //     `
  //     SELECT *
  //     FROM passengers
  //     WHERE trip_id = $1
  //     AND username = $2
  //     `,
  //     [tripId, passenger]
  //   );

  //   const joinRequest = validPassengerResult.rows[0];
  //   if (!joinRequest)
  //     throw new NotFoundError(
  //       `No passenger/ join request found with id: ${tripId} and username${passenger}`
  //     );

  // const isTripOwner = requestedTrip.member_status === "tripOwner";
  // if (!isTripOwner)
  //   throw new ExpressError(
  //     `You are not the Owner of the trip and not allowed to respond`
  //   );

  // Update member_status and get the updated row
  //   const updateResult = await db.query(
  //     `
  //     UPDATE passengers
  //     SET reservation_status = $1, reservation_timestamp = CURRENT_TIMESTAMP
  //     WHERE trip_id = $2 AND username = $3
  //     RETURNING *
  //     `,
  //     [reservationStatusResponse, tripId, passenger]
  //   );

  //   const respondToJoinRequest = updateResult.rows[0];

  //   if (!respondToJoinRequest)
  //     throw new ExpressError(
  //       `Failed to update request status for trip with ID ${tripId}`
  //     );

  //   return respondToJoinRequest;
  // }
}

module.exports = UserApi;
