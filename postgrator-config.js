// const {DATABASE_URL} = require('./src/config')
// console.log(DATABASE_URL)

require('dotenv').config();
console.log(process.env.DATABASE_URL)

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
}