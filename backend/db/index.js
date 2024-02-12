// index.js as entry file (same as db.js)

const { Pool } = require("pg");
const { getDatabaseUri } = require("../config");

const pool = new Pool({
  // only one needed:
  connectionString: getDatabaseUri(),
  ssl: {
    rejectUnauthorized: false, // This bypasses strict SSL validation - be cautious in production environments
  },

  //more config options below:
  user: "marcschaer",
  password: process.env.PSQL_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "surf_taxi",
});

module.exports = {
  query: (text, params) => pool.query(text, params),

  connect: () => pool.connect(), // Function to acquire a client from the pool
  end: () => pool.end(), // Function to close the pool
};
