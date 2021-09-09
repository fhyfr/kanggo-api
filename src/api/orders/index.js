const routes = require('./routes');
const OrdersHandler = require('./handler');

module.exports = {
  name: 'orders',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const ordersHandler = new OrdersHandler(service, validator);
    server.route(routes(ordersHandler));
  },
};
