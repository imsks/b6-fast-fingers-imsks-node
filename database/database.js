const mysql = require("mysql");
var fs = require("fs");
const config = require("../config");
const mysqlInitializer = require("./initializer");

const options = {
  env: config.ENV,
  host: config.MYSQL_DB_HOST,
  port: config.MYSQL_DB_PORT,
  user: config.MYSQL_DB_USER,
  password: config.MYSQL_DB_PASSWORD,
  database: config.MYSQL_DB_NAME,
};

// create connection with DB
let DB = mysql.createConnection({
  host: options.host,
  user: options.user,
  password: options.password,
  database: options.database,
  port: options.port,
  ssl: true,
});

DB.connect(async (err) => {
  if (err) throw err;
  console.log("MySQL connected with the app!");

  await mysqlInitializer.createDatabaseIfNotExists(DB, options.database);
  await mysqlInitializer.createTablesIfNotExists(DB);
});

module.exports = DB;
