const db = require("../../db/db");
const bcrypt = require("bcrypt");

const { NotFoundError, BadRequestError } = require("../../expressError");
const { BCRYPT_WORK_FACTOR } = require("../../config");

/** Related functions for users. */

class UserApi {
  /** authenticate user with username, password.
   *
   * Returns user
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async authenticate(username, password) {
    const result = await db.query(
      `
    SELECT *
    FROM users
    WHERE username = $1
    `,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

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

  /**
   * Registers a new user in the database.
   * Throws BadRequestError if the username already exists.
   * @param {object} data - User data to create a new user.
   * @returns {object} - Success message and the newly registered user object.
   */
  static async register(data) {
    const {
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
      bio,
    } = data;

    const duplicateCheck = await db.query(
      `SELECT FROM users WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate username: ${username}`);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const query = `
          INSERT INTO users 
          (username, password, first_name, last_name, email, gender, birth_year, phone, country, languages, profile_img_url, bio)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING username
          `;

    const values = [
      username,
      hashedPassword,
      first_name,
      last_name,
      email,
      gender,
      birth_year,
      phone,
      country,
      languages,
      profile_img_url,
      bio,
    ];

    const result = await db.query(query, values);
    if (!result.rows[0]) throw new Error("User registration failed");

    return {
      success: true,
      message: "User registered successfully",
      newUser: result.rows[0],
    };
  }
}

module.exports = UserApi;
