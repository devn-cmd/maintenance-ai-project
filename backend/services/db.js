

// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   database: "maintenance_DB",
//   password: "password",
//   port: 5432
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST || "localhost",       // ✅ "db" in Docker, "localhost" locally
  database: "maintenance_DB",
  password: "password",
  port: 5432
});

module.exports = pool;