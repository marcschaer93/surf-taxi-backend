// const sqlite3 = require("sqlite3").verbose();

// const { runQuery } = require("./index");

// // Create tables
// const createTables = () => {
//   const createUserTable = `
//     CREATE TABLE IF NOT EXISTS users (
//         username VARCHAR(25) PRIMARY KEY,
//         password TEXT NOT NULL,
//         first_name TEXT NOT NULL,
//         last_name TEXT NOT NULL,
//         email TEXT NOT NULL,
//         gender VARCHAR(10),
//         birth_year INTEGER,
//         phone VARCHAR(15),
//         instagram TEXT,
//         facebook TEXT,
//         country VARCHAR(20),
//         languages TEXT,
//         profile_img_url TEXT,
//         bio TEXT,
//         role TEXT NOT NULL DEFAULT 'user'
//     );
//   `;

//   const createTripTable = `
//     CREATE TABLE IF NOT EXISTS trips (
//         id SERIAL PRIMARY KEY,
//         owner TEXT REFERENCES users(username),  -- Reference to the user organizing the trip
//         date TIMESTAMP,
//         start_location TEXT,
//         destination TEXT,
//         stops TEXT,
//         travel_info TEXT,
//         seats INTEGER,
//         costs TEXT
//     );
//   `;

//   const createPassengerTable = `
//     CREATE TABLE IF NOT EXISTS passengers (
//         username VARCHAR(25)
//             REFERENCES users(username) ON DELETE CASCADE,
//         trip_id INTEGER
//             REFERENCES trips(id) ON DELETE CASCADE,
//         reservation_status VARCHAR(20),
//         reservation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         PRIMARY KEY (username, trip_id)
//     );
//   `;

//   runQuery(createUserTable);
//   runQuery(createTripTable);
//   runQuery(createPassengerTable);
// };

// // Perform any additional setup if needed
// const setupSqliteTests = () => {
//   createTables();
//   // Add more setup steps if necessary
// };

// module.exports = { setupSqliteTests, db };
