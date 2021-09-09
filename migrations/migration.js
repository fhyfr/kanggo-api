// Dote Env
require('dotenv').config();

const mysql = require('mysql2');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

migration.init(connection, __dirname, () => {
  // eslint-disable-next-line no-console
  console.log('finished running migration');
});
