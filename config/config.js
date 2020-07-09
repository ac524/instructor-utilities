console.log( process.env.DEV_DB_PASS );

module.exports = {
  development: {
    username: "root",
    password: process.env.DEV_DB_PASS,
    database: "instructor_utilities",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}