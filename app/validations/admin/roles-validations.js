import Joi from "joi";

const createRoleValidation = Joi.object({
  role: Joi.string().max(100).required(),
  role_deskripsi: Joi.string().max(100),
});

const updateRoleValidation = Joi.object({
  role: Joi.string().max(100),
  role_deskripsi: Joi.string().max(100),
});

export { createRoleValidation, updateRoleValidation };
