// Dote Env
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// users
const users = require('./api/users');
const UsersService = require('./services/mysql/UsersService');
const UsersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');
const AuthenticationsService = require('./services/mysql/AuthenticationsService');

// products
const products = require('./api/products');
const ProductsService = require('./services/mysql/ProductsService');
const ProductsValidator = require('./validator/products');

// orders
const orders = require('./api/orders');
const OrdersService = require('./services/mysql/OrdersService');
const OrdersValidator = require('./validator/orders');

// init server
const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const productsService = new ProductsService();
  const ordersService = new OrdersService();

  const server = Hapi.server({
    port: process.env.PORT || 3000,
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
  server.auth.strategy('kanggo_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // register internal plugin
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: products,
      options: {
        service: productsService,
        validator: ProductsValidator,
      },
    },
    {
      plugin: orders,
      options: {
        service: ordersService,
        validator: OrdersValidator,
      },
    },
  ]);

  // main page
  await server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return {
          status: 'OK',
          message: 'Server Up',
        };
    }
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
