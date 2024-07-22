require('dotenv').config()
const { Pool } = require('pg')

const user = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const pool = new Pool({
  user: user,
  password: password,
  host: 'localhost',
  port: 5432,
  database: database
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}