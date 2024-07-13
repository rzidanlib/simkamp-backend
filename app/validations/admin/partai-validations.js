import Joi from "joi";

const createPartaiValidation = Joi.object({
  akronim: Joi.string().max(100).required(),
  nama_partai: Joi.string().max(100).required(),
  nomor: Joi.number().required(),
  logo: Joi.string().max(100).required(),
});

const updatePartaiValidation = Joi.object({
  akronim: Joi.string().max(100),
  nama_partai: Joi.string().max(100),
  nomor: Joi.number(),
  logo: Joi.string().max(100),
});

export { createPartaiValidation, updatePartaiValidation };
