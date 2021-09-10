const InvariantError = require('../../exceptions/InvariantError');
const { PostPaymentPayloadSchema, PutPaymentPayloadSchema } = require('./schema');

const PaymentsValidator = {
  validatePostPaymentPayload: (payload) => {
    const validationResult = PostPaymentPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutPaymentPayload: (payload) => {
    const validationResult = PutPaymentPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PaymentsValidator;