const {DATABASE_URL} = require('./src/config')
console.log(DATABASE_URL)

require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": DATABASE_URL,
}