const config = require("./index");

const connection = {
  username: config.database.username,
  password: config.database.password,
  database: config.database.db_name,
  dialect: "mysql",
  timezone: "+03:00",
  dialectOptions: {
    charset: "utf8mb4",
  },
  logging: false,
  // host: "188.225.87.106",
  // port: 3306
};

module.exports = {
  development: connection,
  test: connection,
  production: connection,
};
