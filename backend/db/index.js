// index.js as entry file (same as db.js)

const { Pool } = require("pg");
const { getDatabaseUri } = require("../config");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: getDatabaseUri(),

  ssl: isProduction
    ? {
        rejectUnauthorized: true,
      }
    : false,

  //more config options below (optional):
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
