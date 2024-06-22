import Joi from "joi";

const createUserValidation = Joi.object({
  user_nama: Joi.string().max(100).required(),
  user_email: Joi.string().max(100).required(),
  user_password: Joi.string().max(100).min(8).required(),
  user_no_telp: Joi.string().max(15),
  user_partai_id: Joi.number().allow(null),
  user_role_id: Joi.number().required(),
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
