const Joi = require('joi');

const PostPaymentPayloadSchema = Joi.object({
  order_id: Joi.string().required(),
  amount: Joi.number().integer().required(),
});

const PutPaymentPayloadSchema = Joi.object({
  payment_id: Joi.string().required(),
  amount: Joi.number().integer().required(),
});

module.exports = { PostPaymentPayloadSchema, PutPaymentPayloadSchema };