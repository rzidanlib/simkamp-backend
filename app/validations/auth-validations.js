import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  role: Joi.string().max(100).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

export { loginValidation, registerValidation };
