const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { UserPayloadSchema };
