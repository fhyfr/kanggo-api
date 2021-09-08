// Dote Env
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const mysql = require('mysql2');

// create database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// init server
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },

  ]);

  // define authentications with jwt token

  // server.auth.strategy('kanggo_jwt', 'jwt', {
  //   keys: process.env.ACCESS_TOKEN_KEY,
  //   verify: {
  //     aud: false,
  //     iss: false,
  //     sub: false,
  //     maxAgeSec: process.env.ACCESS_TOKEN_AGE,
  //   },
  //   validate: (artifacts) => ({
  //     isValid: true,
  //     credentials: {
  //       id: artifacts.decoded.payload.id,
  //     },
  //   }),
  // });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();