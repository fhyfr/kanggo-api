const routes = (handler) => [
  {
    method: 'POST',
    path: '/payments',
    handler: handler.postPaymentHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
];

module.exports = routes;