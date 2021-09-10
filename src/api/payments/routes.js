const routes = (handler) => [
  {
    method: 'POST',
    path: '/payments',
    handler: handler.postPaymentHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
  {
    method: 'GET',
    path: '/payments/{id}',
    handler: handler.getPaymentByIdHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/payments',
    handler: handler.putPaymentByIdHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
];

module.exports = routes;