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

class UserApi {
  /**
   * Retrieves all users from the database.
   *
   * This method queries the database for all users and returns an array of user objects.
   * Each user object includes the user's username, first name, last name, email, gender, birth year,
   * phone number, languages spoken, profile image URL, and biography.
   *
   * @returns {Array} An array of objects, each representing a user.
   */
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

  /**
   * Fetches a single user by their username.
   *
   * This method looks up a user by their username and returns a user object if found.
   * The user object includes the user's username, first name, last name, email, gender, birth year,
   * phone number, languages spoken, profile image URL, and biography.
   * If no user is found with the provided username, it throws a NotFoundError.
   *
   * @param {string} username - The username of the user to retrieve.
   * @throws {NotFoundError} If no user is found with the provided username.
   * @returns {Object} An object representing the user.
   */
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

  /**
   * Updates a user's profile information.
   *
   * This method allows for the updating of a user's profile. It can handle partial updates;
   * only the fields provided in the `updateData` parameter will be updated. Upon successful update,
   * it returns the updated user profile information.
   * If the update process fails, it throws an ExpressError.
   *
   * @param {string} loggedInUser - The username of the user whose profile is being updated.
   * @param {Object} updateData - An object containing the fields to be updated.
   * @throws {ExpressError} If the update fails.
   * @returns {Object} An object representing the updated user profile.
   */
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

  /**
   * Retrieves all trips associated with a user.
   *
   * This method fetches all trips that a user either organizes or participates in. It distinguishes
   * between trips based on the user's role (organizer or participant) and reservation status.
   * The method returns an array of trip objects.
   *
   * @param {string} loggedInUser - The username of the user whose trips are being retrieved.
   * @returns {Array} An array of trip objects associated with the user.
   */
  static async getAllUserTrips(loggedInUser) {
    const allUserTripsResult = await db.query(
      `
      SELECT
        T.id,
        T.date,
        T.owner,
        T.origin_city,
        T.origin_country_code,
        T.destination_city,
        T.destination_country_code,
        T.stops,
        T.travel_info,
        T.seats,
        T.costs,
        CASE
      WHEN T.owner = $1 THEN 'organizer'
      ELSE R.status
      END AS user_reservation_status
      FROM
        trips T
      LEFT JOIN
        reservations R ON T.id = R.trip_id AND R.username = $1
      WHERE
        T.owner = $1 OR R.username = $1;
    `,

      [loggedInUser]
    );

    const allUserTrips = allUserTripsResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return allUserTrips;
  }

  /**
   * Retrieves a specific reservation for a user.
   *
   * This method fetches a reservation for a given user based on the username and trip ID. It returns
   * an object containing the reservation details if found. If no reservation matches the criteria,
   * it throws a NotFoundError.
   *
   * @param {string} username - The username of the user whose reservation is being retrieved.
   * @param {number} tripId - The ID of the trip associated with the reservation.
   * @throws {NotFoundError} If no reservation is found with the provided username and trip ID.
   * @returns {Object} An object representing the user's reservation.
   */
  static async getOneUserReservation(username, tripId) {
    const oneUserReservationResult = await db.query(
      `
      SELECT *
      FROM reservations
      WHERE username = $1 
      AND trip_id = $2
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

  /**
   * Retrieves all reservations for a user.
   *
   * This method queries the database for all reservations associated with a given username. It returns
   * an array of reservation objects, each containing details of a reservation. If no reservations are
   * found for the user, it returns an empty array.
   *
   * @param {string} username - The username of the user whose reservations are being retrieved.
   * @returns {Array} An array of objects, each representing a reservation.
   */
  static async getAllUserReservations(username) {
    const allUserReservationsResult = await db.query(
      `
      SELECT * 
      FROM reservations 
      WHERE username =$1
  
      `,
      [username]
    );

    const userReservations = allUserReservationsResult.rows.map((row) =>
      jsReady.convertKeysToCamelCase(row)
    );

    return userReservations;
  }

  /**
   * Deletes a specific trip for a user.
   *
   * This method attempts to delete a trip based on its ID and the owner's username. If the trip is
   * successfully deleted, it returns nothing. If no trip matches the given ID and username, it throws
   * a NotFoundError.
   *
   * @param {number} tripId - The ID of the trip to delete.
   * @param {string} username - The username of the trip's owner.
   * @throws {NotFoundError} If no trip is found with the provided ID and owner username.
   */
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

  /**
   * Updates a user's favorite IDs.
   *
   * This method updates the list of favorite IDs for a user. It overwrites the existing list with
   * the new list provided in the `favoriteIds` parameter. If the update is successful, it returns
   * the updated user object. If the user cannot be found or the update fails, it throws an error.
   *
   * @param {string} username - The username of the user whose favorite IDs are being updated.
   * @param {Array} favoriteIds - An array of new favorite IDs to update for the user.
   * @throws {Error} If the user is not found or the favorites are not updated.
   * @returns {Object} An object representing the updated user.
   */
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

  /**
   * Checks for unread notifications for a user.
   *
   * This method queries the database for any unread notifications for a given user. It returns an
   * array of notification objects that are marked as unread. If there are no unread notifications,
   * it returns an empty array.
   *
   * @param {string} username - The username of the user to check notifications for.
   * @returns {Array} An array of unread notification objects.
   */
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

  /**
   * Marks a specific notification as read for a user.
   *
   * This method updates the status of a specific notification to 'read' for a given user and
   * notification ID. If the update is successful, it returns the updated notification object. It
   * might throw an error if the update process fails.
   *
   * @param {string} username - The username of the recipient of the notification.
   * @param {number} notificationId - The ID of the notification to be marked as read.
   * @returns {Object} The updated notification object marked as read.
   */
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
