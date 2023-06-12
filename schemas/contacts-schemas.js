const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});

module.exports = { contactAddSchema };
