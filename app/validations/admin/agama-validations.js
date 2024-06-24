import Joi from "joi";

const createAgamaValidation = Joi.object({
  agama: Joi.string().max(20).required(),
});

const updateAgamaValidation = Joi.object({
  agama: Joi.string().max(20).required(),
});

export { createAgamaValidation, updateAgamaValidation };
