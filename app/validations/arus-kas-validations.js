import Joi from "joi";

const createArusKasValidations = Joi.object({
  aruskas_kategori: Joi.string().required(),
  aruskas_foto_kuitansi: Joi.string().required(),
  aruskas_detail: Joi.string().required(),
  aruskas_catatan: Joi.string().allow(""),
  aruskas_jumlah: Joi.number().required(),
  aruskas_tanggal: Joi.string().required(),
});

const updateArusKasValidations = Joi.object({
  aruskas_kategori: Joi.string(),
  aruskas_foto_kuitansi: Joi.string(),
  aruskas_detail: Joi.string(),
  aruskas_catatan: Joi.string().allow(""),
  aruskas_jumlah: Joi.number(),
  aruskas_tanggal: Joi.string(),
});

export { createArusKasValidations, updateArusKasValidations };
