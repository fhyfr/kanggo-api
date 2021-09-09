const InvariantError = require('../../exceptions/InvariantError');
const { PaymentPayloadSchema } = require('./schema');

const PaymentsValidator = {
  validatePaymentPayload: (payload) => {
    const validationResult = PaymentPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PaymentsValidator;