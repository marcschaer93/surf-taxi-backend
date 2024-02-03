const bcrypt = require("bcrypt");

const db = require("../../db");
const sqlReady = require("../../helpers/sqlReady");
const jsReady = require("../../helpers/jsReady");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../helpers/expressError");
const { BCRYPT_WORK_FACTOR } = require("../../config");

/** AUTHENTICATION API
 *
 * Related functions for authentication.
 **/
class AuthApi {
  /** REGISTER USER
   *
   * Registers a new user in the database.
   * Throws BadRequestError if the username already exists.
   * @param {object} data - User data to create a new user.
   * @returns {object} - Success message and the newly registered user object.
   **/
  static async registerUser(data) {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      gender,
      birthYear,
      phone,
      country,
      languages,
      profileImgUrl,
      bio,
    } = data;

    const duplicateCheckResult = await db.query(
      `SELECT FROM users WHERE username = $1`,
      [username]
    );

    const duplicatedUser = duplicateCheckResult.rows[0];
    if (duplicatedUser)
      throw new BadRequestError(`Duplicate username: ${username}`);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const registerResult = await db.query(
      `
        INSERT INTO users 
          (
            username, 
            password, 
            first_name, 
            last_name, 
            email, 
            gender, 
            birth_year, 
            phone, 
            country, 
            languages, 
            profile_img_url, 
            bio
          )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
          bio,
          favoriteIds
      `,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        gender,
        birthYear,
        phone,
        country,
        languages,
        profileImgUrl,
        bio,
      ]
    );

    const newRegisteredUser = jsReady.convertKeysToCamelCase(
      registerResult.rows[0]
    );
    if (!newRegisteredUser) throw new Error("User registration failed");

    return newRegisteredUser;
  }

  /** LOGIN USER
   *
   * authenticate user with username, password.
   *
   * Returns user
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async loginUser({ username, password }) {
    const authenticationResult = await db.query(
      `
        SELECT *
        FROM users
        WHERE username = $1
      `,
      [username]
    );

    const loggedInUser = jsReady.convertKeysToCamelCase(
      authenticationResult.rows[0]
    );

    if (loggedInUser) {
      const isValid = await bcrypt.compare(password, loggedInUser.password);

      if (isValid) {
        delete loggedInUser.password;
        return loggedInUser;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }
}

module.exports = AuthApi;
