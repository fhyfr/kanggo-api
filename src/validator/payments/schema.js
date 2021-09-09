const Joi = require('joi');

const PaymentPayloadSchema = Joi.object({
  order_id: Joi.string().required(),
  amount: Joi.number().integer().required(),
});

module.exports = { PaymentPayloadSchema };