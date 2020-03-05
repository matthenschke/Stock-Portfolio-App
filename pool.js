"user strict";

var mysql = require("mysql");

//local mysql db connection
var pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.on("connection", function(connection) {
  console.log("DB Connection established");

  connection.on("error", function(err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function(err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = pool;
