require("dotenv").config();
module.exports = {
 development: {
   use_env_variable: "SQL_CONNECTION_URL",
   username: "postgres",
   password: "postgres",
 },
 production: {
   use_env_variable: "DATABASE_URL",
   dialect: "postgres",
   protocol: "postgres",
 },
};