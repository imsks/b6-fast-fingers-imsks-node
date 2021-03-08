const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Change envStatus from `0 to 1` for Production
const envStatus = 0;

if (envStatus === 0) dotenv.config({ path: "./dev.env" });
if (envStatus === 1) dotenv.config({ path: "./prod.env" });

// For Development
const config = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  DB_CLIENT: process.env.DB_CLIENT,
  DB_VERSION: process.env.DB_VERSION,
  MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
  MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
  MYSQL_DB_USER: process.env.MYSQL_DB_USER,
  MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
};

module.exports = config;