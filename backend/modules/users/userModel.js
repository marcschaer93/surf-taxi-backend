const bcrypt = require("bcrypt");

const db = require("../../db");
const sqlReady = require("../../helpers/sqlReady");
const jsReady = require("../../helpers/jsReady");

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
    const result = await db.query(
      `
        SELECT 
          username, 
          first_name,
          last_name, 
          email, 
          gender, 
          birth_year, 
          phone, 
          languages, 
          profile_img_url, 
          bio 
        FROM users
      `
    );

    const allUsers = result.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );
    return allUsers;
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
        SELECT 
          username, 
          first_name, 
          last_name,
          email,
          gender, 
          birth_year, 
          phone, 
          languages, 
          profile_img_url, 
          bio
        FROM users 
        WHERE username = $1
      `,
      [username]
    );

    const user = jsReady.convertKeysToCamelCase(result.rows[0]);
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
  static async updateUserProfile(loggedInUser, updateData) {
    const insertData = sqlReady.convertKeysToSnakeCase(updateData);
    console.log("insertData", insertData);

    const keys = Object.keys(insertData);
    const updateValues = [...Object.values(insertData), loggedInUser];
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // const returnClause = keys.map((key, index) => `${key}`).join(", ");
    // RETURNING ${returnClause}

    const updateQuery = `
    UPDATE users 
    SET ${setClause}
    WHERE username = $${keys.length + 1}
    RETURNING
      username, 
      first_name, 
      last_name,
      email,
      gender, 
      birth_year, 
      phone, 
      languages, 
      profile_img_url, 
      bio
    `;

    const updateResult = await db.query(updateQuery, updateValues);
    const updatedUserProfile = jsReady.convertKeysToCamelCase(
      updateResult.rows[0]
    );
    if (!updatedUserProfile) {
      throw new ExpressError("Failed to update user profile", 500);
    }

    return updatedUserProfile;
  }

  static async getAllUserTrips(loggedInUser) {
    const allUserTripsResult = await db.query(
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
        json_agg(jsonb_build_object('username', P.username, 'reservationStatus', P.reservation_status, 'reservationTimestamp', P.reservation_timestamp ) ORDER BY P.username) AS passengers
      FROM
        trips AS T
      LEFT JOIN
        passengers AS P ON T.id = P.trip_id
      WHERE
        T.owner = $1 OR P.username = $1
      GROUP BY
        T.id, T.date, T.owner, T.start_location, T.destination, T.stops, T.travel_info, T.seats, T.costs;
    
  
    `,

      [loggedInUser]
    );

    const allUserTrips = allUserTripsResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return allUserTrips;
  }
  // static async getAllUserTrips(loggedInUser) {
  //   const allUserTripsResult = await db.query(
  //     `
  //     SELECT
  //       trips.id,
  //       trips.owner AS owner,
  //       trips.date,
  //       trips.start_location,
  //       trips.destination,
  //       trips.stops,
  //       trips.travel_info,
  //       trips.seats,
  //       trips.costs,
  //       passengers.username AS passenger_username,
  //       passengers.reservation_status
  //     FROM trips
  //     LEFT JOIN passengers ON trips.id = passengers.trip_id
  //     WHERE trips.owner = $1 OR passengers.username = $1
  //     `,

  //     [loggedInUser]
  //   );

  //   const allUserTrips = allUserTripsResult.rows.map((row) =>
  //     jsReady.convertKeysToCamelCase(row)
  //   );

  //   return allUserTrips;
  // }

  static async getOneUserReservation(username, tripId) {
    const oneUserReservationResult = await db.query(
      `
      SELECT *
      FROM passengers
      WHERE passengers.username = $1 
      AND passengers.trip_id = $2
      `,
      [username, tripId]
    );

    const userReservation = jsReady.convertKeysToCamelCase(
      oneUserReservationResult.rows[0]
    );

    if (!userReservation) {
      throw new NotFoundError(
        `No reservation found with username: ${username} and trip id: ${tripId}`
      );
    }

    return userReservation;
  }

  static async deleteMyTrip(tripId, username) {
    const result = await db.query(
      `DELETE
             FROM trips
             WHERE id = $1
             AND owner = $2
             RETURNING id`,
      [tripId, username]
    );
    const removedTrip = jsReady.convertKeysToCamelCase(result.rows[0]);

    if (!removedTrip)
      throw new NotFoundError(
        `Could not remove trip. No trip with id: ${tripId} found.`
      );

    return;
  }

  static async updateUserFavoriteIds(username, favoriteIds) {
    const updateUserFavoritesResult = await db.query(
      `
      UPDATE users 
      SET favorite_ids = $1
      WHERE username = $2
      RETURNING *
      `,
      [favoriteIds, username]
    );

    const updatedUser = jsReady.convertKeysToCamelCase(
      updateUserFavoritesResult.rows[0]
    );

    if (!updatedUser) {
      throw new Error(
        `User with username ${username} not found or favorites not updated.`
      );
    }
    return updatedUser;
  }

  static async checkNotifications(username) {
    const notificationCheckResult = await db.query(
      `
      SELECT *
      FROM notifications
      WHERE recipient_username = $1 AND is_read = FALSE
      `,
      [username]
    );

    const notifications = notificationCheckResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return notifications;
  }

  static async markNotificationAsRead(username, notificationId) {
    const notificationMarkResult = await db.query(
      `
      UPDATE notifications
      SET is_read  = $1
      WHERE recipient_username = $2
      AND id = $3
      RETURNING *
      `,
      [true, username, notificationId]
    );

    const isReadNotification = notificationMarkResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return isReadNotification;
  }
}

module.exports = UserApi;
