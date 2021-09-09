const errorHandler = require('../../exceptions/ErrorHandler');

class UsersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this.validator.validateUserPayload(request.payload);

      const { name, email, password } = request.payload;
      const userId = await this.service.addUser({ name, email, password });

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = UsersHandler;
