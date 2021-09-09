const errorHandler = require('../../exceptions/ErrorHandler');

class PaymentsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postPaymentHandler = this.postPaymentHandler.bind(this);
  }

  async postPaymentHandler(request, h) {
    try {
      this.validator.validatePaymentPayload(request.payload);

      const { id: credentialId } = request.auth.credentials;
      const { order_id: orderId, amount } = request.payload;

      const paymentId = await this.service.addPayment({
        credentialId,
        orderId,
        amount,
      });

      const response = h.response({
        status: 'success',
        message: 'Pembayaran berhasil',
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
}

module.exports = PaymentsHandler;