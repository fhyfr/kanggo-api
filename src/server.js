// Dote Env
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// users
const users = require('./api/users');
const UsersService = require('./services/mysql/UsersService');
const UsersValidator = require('./validator/users');

// init server
const init = async () => {
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // register external plugin
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

  // register internal plugin
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();