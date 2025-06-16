const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dob: Joi.string().required(),
  phone: Joi.string().required(),
  coordinates: Joi.array().items(Joi.number()).optional(),
  checked: Joi.boolean().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
