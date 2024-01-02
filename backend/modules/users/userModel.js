const db = require("../../db/db");
const { NotFoundError, BadRequestError } = require("../../expressError");

/** Related functions for users. */

class UserApi {
  static async getAllUsers() {
    let result = await db.query(`SELECT * FROM users`);
    const users = result.rows;
    return users;
  }

  static async getUser(username) {
    let result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const user = result.rows[0];
    if (!user)
      throw new NotFoundError(`No user found with username: ${username}`);
    return user;
  }

  static async createUser({
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
  }) {
    const duplicateCheck = await db.query(
      `SELECT FROM users WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate username: ${username}`);

    await db.query(
      `
        INSERT INTO users 
        (username, password, first_name, last_name, email, gender, birth_year, phone, country, languages, profile_img_url, bio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
      [
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
      ]
    );

    return {
      success: true,
      message: "User created successfully",
    };
  }
}

module.exports = UserApi;

// static async createTrip(data) {
//     try {
//       const {
//         date,
//         start_location,
//         destination,
//         stops,
//         trip_info,
//         seats,
//         costs,
//         user_id,
//       } = data;
//       // Perform the database operation that might throw an error

//       await db.query(
//         `
//         INSERT INTO trips (date,
//           start_location,
//           destination,
//           stops,
//           trip_info,
//           seats,
//           costs,
//           user_id)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         `,
//         [
//           date,
//           start_location,
//           destination,
//           stops,
//           trip_info,
//           seats,
//           costs,
//           user_id,
//         ]
//       );

//       // Return success or appropriate data
//       return {
//         success: true,
//         message: "Trip created successfully",
//       };
//     } catch (error) {
//       // Handle the error
//       console.error("Error creating trip:", error);
//       // Return failure status or appropriate error message
//       return {
//         success: false,
//         message: "Failed to create trip",
//       };
//     }
//   }
