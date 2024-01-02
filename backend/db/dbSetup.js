const db = require("./db");

async function recreateDatabase() {
  try {
    // Drop tables
    await db.query("DROP TABLE IF EXISTS users, trips");

    // Recreate users table
    await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username character varying(25) NOT NULL UNIQUE,
        password text NOT NULL,
        first_name text NOT NULL,
        last_name text NOT NULL,
        email text NOT NULL CHECK (POSITION(('@'::text) IN (email)) > 1),
        gender character varying(10),
        birth_year integer,
        phone character varying(15),
        instagram text,
        facebook text,
        country character varying(20),
        languages text,
        profile_img_url text,
        bio text,
        is_admin boolean NOT NULL DEFAULT false
    );
    `);
    // Recreate trips table
    await db.query(`
    CREATE TABLE trips (
        id SERIAL PRIMARY KEY,
        date date,
        start_location text,
        destination text,
        stops text,
        trip_info text,
        seats integer,
        costs text,
        user_id integer REFERENCES users(id)
    );
    `);

    console.log("Database and tables recreated successfully.");
  } catch (error) {
    console.error("Error recreating database:", error);
    //   } finally {
    //     db.end(); // Close the pool after completion
  }
}

// Run the function
recreateDatabase();
