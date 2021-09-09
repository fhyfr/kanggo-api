const Joi = require('joi');

const OrderPayloadSchema = Joi.object({
  product_id: Joi.string().required(),
  amount: Joi.number().integer().required(),
});

module.exports = { OrderPayloadSchema };
