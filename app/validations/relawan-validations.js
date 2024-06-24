import Joi from "joi";

const createRelawanValidations = Joi.object({
  relawan_nama: Joi.string().max(100).required(),
  relawan_email: Joi.string().email().required(),
  relawan_password: Joi.string().min(8).required(),
  relawan_no_telp: Joi.string().max(15).required(),
  relawan_usia: Joi.number().required(),
  relawan_jenis_kelamin: Joi.string().required(),
  relawan_foto: Joi.string().required(),
  relawan_provinsi_kode: Joi.number().required(),
  relawan_kab_kota_kode: Joi.number().required(),
  relawan_status: Joi.string().required(),
  relawan_role_id: Joi.number().required(),
});

const updateRelawanValidations = Joi.object({
  relawan_nama: Joi.string().max(100),
  relawan_email: Joi.string().email(),
  relawan_password: Joi.string().min(8),
  relawan_no_telp: Joi.string().max(15),
  relawan_usia: Joi.number(),
  relawan_jenis_kelamin: Joi.string(),
  relawan_foto: Joi.string(),
  relawan_provinsi_kode: Joi.number(),
  relawan_kab_kota_kode: Joi.number(),
  relawan_status: Joi.string(),
  relawan_role_id: Joi.number(),
});

export { createRelawanValidations, updateRelawanValidations };
