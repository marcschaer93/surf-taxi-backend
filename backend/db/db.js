const { Pool } = require("pg");
const { getDatabaseUri } = require("../config");

const pool = new Pool({
  connectionString: getDatabaseUri(),
  //more config options below:

  //   user: "marcschaer", //"your_username",
  //   password: "Marc_skiing93", // "your_password",
  //   host: "localhost",
  //   port: 5432, // default Postgres port
  //   database: "surf-taxi", //"your_database_name",
  //   connectionString:
  //     "postgresql://marcschaer:Marc_skiing93@localhost:5432/surf-taxi",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
