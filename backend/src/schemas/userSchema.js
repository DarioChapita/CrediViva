const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
  email: Joi.string().email().required(),
});

module.exports = userSchema;