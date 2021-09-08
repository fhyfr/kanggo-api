// Dote Env
require('dotenv').config();

var mysql = require('mysql2');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

migration.init(connection, __dirname, () => {
  console.log('finished running migration');
});