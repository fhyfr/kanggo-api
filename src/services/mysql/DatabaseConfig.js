// Dote Env
require('dotenv').config();

// get the client
const mysql = require('mysql2');

// create the pool
const newPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});
// now get a Promise wrapped instance of that pool
const pool = newPool.promise();

module.exports = pool;
