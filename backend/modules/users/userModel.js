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
    const result = await db.query(
      `SELECT username, first_name AS "firstName", last_name AS "lastName", email, gender, birth_year AS "birthYear", phone, languages, profile_img_url AS "profileImgUrl", bio FROM users`
    );

    const allUsers = result.rows;
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
      SELECT username, first_name AS "firstName", last_name AS "lastName", email, gender, birth_year AS "birthYear", phone, languages, profile_img_url AS "profileImgUrl", bio
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

    // const returnClause = keys.map((key, index) => `${key}`).join(", ");
    // RETURNING ${returnClause}

    const updateQuery = `
    UPDATE users 
    SET ${setClause}
    WHERE username = $${keys.length + 1}
    RETURNING username, "first_name" AS "firstName", "last_name" AS "lastName", email, gender, "birth_year" AS "birthYear", phone, languages, "profile_img_url" AS "profileImgUrl", bio
    `;

    const updateResult = await db.query(updateQuery, updateValues);

    const updatedUserProfile = updateResult.rows[0];
    if (!updatedUserProfile) {
      throw new ExpressError("Failed to update user profile", 500);
    }

    return updatedUserProfile;
  }
}

module.exports = UserApi;
