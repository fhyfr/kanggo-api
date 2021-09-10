const errorHandler = require('../../exceptions/ErrorHandler');

class PaymentsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postPaymentHandler = this.postPaymentHandler.bind(this);
    this.getPaymentByIdHandler = this.getPaymentByIdHandler.bind(this);
    this.putPaymentByIdHandler = this.putPaymentByIdHandler.bind(this);
  }

  async postPaymentHandler(request, h) {
    try {
      this.validator.validatePostPaymentPayload(request.payload);

      const { order_id: orderId, amount } = request.payload;
      const paymentId = await this.service.addPayment({
        orderId,
        amount,
      });

      const response = h.response({
        status: 'success',
        message: 'Payment berhasil ditambahkan',
        data: {
          paymentId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getPaymentByIdHandler(request, h) {
    try {
      const { id: paymentId } = request.params;
      const payment = await this.service.getPaymentById(paymentId);

      return {
        status: 'success',
        data: {
          payment,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async putPaymentByIdHandler(request, h) {
    try {
      this.validator.validatePutPaymentPayload(request.payload);

      const { payment_id: paymentId, amount } = request.payload;

      await this.service.processPayment(paymentId, amount);

      return {
        status: 'success',
        message: 'Pembayaran berhasil diproses',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = PaymentsHandler;
