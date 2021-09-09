const errorHandler = require('../../exceptions/ErrorHandler');

class OrdersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postOrderHandler = this.postOrderHandler.bind(this);
    this.getOrdersHandler = this.getOrdersHandler.bind(this);
    // this.putOrderHandler = this.putOrderHandler.bind(this);
    this.deleteOrdersHandler = this.deleteOrdersHandler.bind(this);
  }

  async postOrderHandler(request, h) {
    try {
      this.validator.validateOrderPayload(request.payload);

      const { id: credentialId } = request.auth.credentials;
      const { product_id: productId, amount } = request.payload;

      const orderId = await this.service.addOrder({
        credentialId,
        productId,
        amount,
      });

      const response = h.response({
        status: 'success',
        message: 'Order berhasil',
        data: {
          orderId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getOrdersHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const orders = await this.service.getOrders(credentialId);

      return {
        status: 'success',
        data: {
          orders,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteOrdersHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { id } = request.params;

      await this.service.deleteOrderById(credentialId, id);

      return {
        status: 'success',
        message: 'Order dihapus',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = OrdersHandler;
