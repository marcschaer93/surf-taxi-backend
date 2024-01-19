const db = require("../backend/db");

// run ─ node db/dbSetup.js to recreate DB

async function recreateDatabase() {
  try {
    // Drop tables
    await db.query("DROP TABLE IF EXISTS users, trips");

    // Recreate Users table
    await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        username character varying(25) PRIMARY KEY,
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

    // fill Users table
    await db.query(`
        INSERT INTO users (username, password, first_name, last_name, email, is_admin)
        VALUES ('testuser',
                '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
                'Test',
                'User',
                'joel@joelburton.com',
                FALSE),
              ('testadmin',
                '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
                'Test',
                'Admin!',
                'joel@joelburton.com',
                TRUE);
    `);

    // Recreate Trips table
    await db.query(`
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY,
            date date,
            start_location text,
            destination text,
            stops text,
            travel_info text,
            seats integer,
            costs text,
        );
    `);

    // Recreate TripMembers table
    await db.query(`
        CREATE TABLE trip_members (
            id SERIAL PRIMARY KEY,
            username FK
            trip_id
            is_trip_creator bool
            request_status ENUM('pending', 'approved', 'rejected') DEFAULT NULL
        );
    `);

    console.log("Database and tables recreated successfully.");
  } catch (error) {
    console.error("Error recreating database:", error);
  }
}

recreateDatabase();
