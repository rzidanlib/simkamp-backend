import Joi from "joi";

const createRoleValidation = Joi.object({
  role_name: Joi.string().max(100).required(),
  description: Joi.string().max(100).required(),
});

const updateRoleValidation = Joi.object({
  role_name: Joi.string().max(100),
  description: Joi.string().max(100),
});

export { createRoleValidation, updateRoleValidation };
