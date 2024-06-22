import Joi from "joi";

const createPartaiValidation = Joi.object({
  partai_label: Joi.string().max(100).required(),
  partai_nama: Joi.string().max(100).required(),
  partai_nomor: Joi.number().required(),
  partai_logo: Joi.string().max(100).required(),
});

const updatePartaiValidation = Joi.object({
  partai_label: Joi.string().max(100),
  partai_nama: Joi.string().max(100),
  partai_nomor: Joi.number(),
  partai_logo: Joi.string().max(100),
});

export { createPartaiValidation, updatePartaiValidation };
