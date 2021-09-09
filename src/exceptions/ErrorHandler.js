const ClientError = require('./ClientError');

// bundle error handler

const errorHandler = (error, h) => {
  if (error instanceof ClientError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });

    response.code(error.statusCode);
    return response;
  }

  // server error
  const response = h.response({
    status: 'error',
    message: 'Maaf, terjadi error pada server kami',
  });
  response.code(500);
  return response;
};

module.exports = errorHandler;
