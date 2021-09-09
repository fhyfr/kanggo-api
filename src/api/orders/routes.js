const routes = (handler) => [
  {
    method: 'POST',
    path: '/orders',
    handler: handler.postOrderHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
  {
    method: 'GET',
    path: '/orders',
    handler: handler.getOrdersHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
  // {
  //   method: 'PUT',
  //   path: '/orders',
  //   handler: handler.putOrderHandler,
  //   options: {
  //     auth: 'kanggo_jwt',
  //   },
  // },
  {
    method: 'DELETE',
    path: '/orders/{id}',
    handler: handler.deleteOrdersHandler,
    options: {
      auth: 'kanggo_jwt',
    },
  },
];

module.exports = routes;
