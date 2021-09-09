const routes = require('./routes');
const PaymentsHandler = require('./handler');

module.exports = {
  name: 'payments',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const paymentsHandler = new PaymentsHandler(service, validator);
    server.route(routes(paymentsHandler));
  },
};