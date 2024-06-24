import Joi from "joi";

const createDapilValidations = Joi.object({
  dapil_nama: Joi.string().max(100).required(),
  dapil_provinsi: Joi.number().required(),
});

const updateDapilValidations = Joi.object({
  dapil_nama: Joi.string().max(100).required(),
  dapil_provinsi: Joi.number().required(),
});

export { createDapilValidations, updateDapilValidations };
