const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance for connecting to the database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sypay_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Export the pool for use in other parts of the application
module.exports = {
  query: (text, params) => pool.query(text, params),
};