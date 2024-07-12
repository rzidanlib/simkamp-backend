import Joi from "joi";

const createUserValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).min(8).required(),
  role_id: Joi.number().required(),
});

const updateUserValidation = Joi.object({
  email: Joi.string().max(100),
  password: Joi.string().max(100).min(8).allow(""),
});

export { createUserValidation, updateUserValidation };
