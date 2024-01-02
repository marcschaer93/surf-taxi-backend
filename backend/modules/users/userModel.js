const db = require("../../db/db");
const { NotFoundError, BadRequestError } = require("../../expressError");

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

  /**
   * Creates a new user in the database.
   * Throws BadRequestError if the username already exists.
   * @param {object} data - User data to create a new user.
   * @returns {object} - Success message and the newly created user object.
   */
  static async createUser(data) {
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

    const query = `
      INSERT INTO users 
      (username, password, first_name, last_name, email, gender, birth_year, phone, country, languages, profile_img_url, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING username
      `;

    const values = [
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
    ];

    const newUser = await db.query(query, values);

    return {
      success: true,
      message: "User created successfully",
      newUser: newUser.rows[0],
    };
  }
}

module.exports = UserApi;
