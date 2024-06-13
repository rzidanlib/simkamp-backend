import Joi from "joi";

const createUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  nama_user: Joi.string().max(100),
  no_hp: Joi.string().max(15),
  partai: Joi.string().max(100).allow(""),
  role: Joi.string().valid("administrator", "admin partai"),
});

const updateUserValidation = Joi.object({
  username: Joi.string().max(100),
  email: Joi.string().max(100),
  password: Joi.string().max(100).allow(""),
  nama_user: Joi.string().max(100),
  no_hp: Joi.string().max(15),
  partai: Joi.string().max(100).allow(""),
});

export { createUserValidation, updateUserValidation };
