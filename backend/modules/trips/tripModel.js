const db = require("../../db/db");
//
class TripApi {
  static async getAllTrips() {
    let result = await db.query(`SELECT * FROM trips`);
    return result.rows;
  }

  static async getTrip(id) {
    let result = await db.query(`SELECT * FROM trips WHERE id=$1`, [id]);
    console.log("rsult", result.rows[0]);
    return result.rows[0];
  }

  // static async createTrip(data) {
  //   const { start_point, end_point, trip_info, seats } = data;
  //   let result = await db.query(
  //     `
  //     INSERT INTO trips (start_point, end_point, trip_info, seats)
  //     VALUES ($1, $2, $3, $4)
  //     `,
  //     [start_point, end_point, trip_info, seats]
  //   );
  //   return;
  // }

  static async createTrip(data) {
    const { start_point, end_point, trip_info, seats } = data;
    try {
      // Perform the database operation that might throw an error
      await db.query(
        `
        INSERT INTO trips (start_point, end_point, trip_info, seats)
        VALUES ($1, $2, $3, $4)
        `,
        [start_point, end_point, trip_info, seats]
      );

      // Return success or appropriate data
      return { success: true, message: "Trip created successfully" };
    } catch (error) {
      // Handle the error
      console.error("Error creating trip:", error);
      // Return failure status or appropriate error message
      return { success: false, message: "Failed to create trip" };
    }
  }
}

module.exports = TripApi;
