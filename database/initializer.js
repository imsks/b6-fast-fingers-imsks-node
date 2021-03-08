const userQueries = require("../models/user");
const gameQueries = require("../models/game");

exports.createDatabaseIfNotExists = async (DB, database) => {
  await DB.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  console.log("Database created");
  return;
};

exports.createTablesIfNotExists = async (DB) => {
  await DB.query(userQueries.createUserTabelQuery);

  await DB.query(gameQueries.createGameTabelQuery);

  console.log("All tables created");
  return;
};
