const Joi = require('joi');

const PostProductPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
  qty: Joi.number().integer().required(),
});

const PutProductPayloadSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().integer(),
  qty: Joi.number().integer(),
});

module.exports = { PostProductPayloadSchema, PutProductPayloadSchema };
