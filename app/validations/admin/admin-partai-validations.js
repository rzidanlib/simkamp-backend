import Joi from "joi";

const createAdminPartaiValidations = Joi.object({
  nama_lengkap: Joi.string().max(100).required(),
  nomor_telepon: Joi.string().required().max(15),
  alamat: Joi.string().required(),
  partai_id: Joi.number().required(),
  posisi: Joi.string().required(),
  dapil_id: Joi.number().required(),
  foto_profil: Joi.string().required(),
});

const updateAdminPartaiValidations = Joi.object({
  nama_lengkap: Joi.string().max(100),
  nomor_telepon: Joi.string().max(15),
  alamat: Joi.string(),
  partai_id: Joi.number(),
  posisi: Joi.string(),
  dapil_id: Joi.number(),
  foto_profil: Joi.string(),
});

export { createAdminPartaiValidations, updateAdminPartaiValidations };
