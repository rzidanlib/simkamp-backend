import Joi from "joi";

const createCalonPemilihValidations = Joi.object({
  calon_pemilih_nama: Joi.string().max(100).required(),
  calon_pemilih_no_telp: Joi.string().max(15).required(),
  calon_pemilih_foto: Joi.string().required(),
  calon_pemilih_foto_ktp: Joi.string().required(),
  calon_pemilih_provinsi: Joi.number().required(),
  calon_pemilih_kab_kota: Joi.string().required(),
  calon_pemilih_kecamatan: Joi.string().required(),
  calon_pemilih_kelurahan: Joi.string().required(),
  calon_pemilih_status: Joi.string().required(),
});

const updateCalonPemilihValidations = Joi.object({
  calon_pemilih_nama: Joi.string().max(100),
  calon_pemilih_no_telp: Joi.string().max(15),
  calon_pemilih_foto: Joi.string(),
  calon_pemilih_foto_ktp: Joi.string(),
  calon_pemilih_provinsi: Joi.number(),
  calon_pemilih_kab_kota: Joi.string(),
  calon_pemilih_kecamatan: Joi.string(),
  calon_pemilih_kelurahan: Joi.string(),
  calon_pemilih_status: Joi.string(),
});

export { createCalonPemilihValidations, updateCalonPemilihValidations };
