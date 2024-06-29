import Joi from "joi";

const createKandidatValidations = Joi.object({
  kandidat_nama: Joi.string().max(100).required(),
  kandidat_email: Joi.string().email().required(),
  kandidat_password: Joi.string().min(8).required(),
  kandidat_no_telp: Joi.string().max(15).required(),
  kandidat_agama_id: Joi.number().required(),
  kandidat_foto: Joi.string().required(),
  kandidat_usia: Joi.number().required(),
  kandidat_alamat: Joi.string().required(),
  kandidat_dapil_id: Joi.number().required(),
  kandidat_jenis_pemilihan_id: Joi.number().required(),
  kandidat_posisi_calon_tetap_id: Joi.number().required(),
  kandidat_jenis_kelamin: Joi.string().required(),
  kandidat_role_id: Joi.number().required(),
  kandidat_nomor_urut: Joi.number().required(),
});

const updateKandidatValidations = Joi.object({
  kandidat_nama: Joi.string().max(100),
  kandidat_email: Joi.string().email(),
  kandidat_password: Joi.string().min(8).allow(""),
  kandidat_no_telp: Joi.string().max(15),
  kandidat_agama_id: Joi.number(),
  kandidat_foto: Joi.string(),
  kandidat_usia: Joi.number(),
  kandidat_alamat: Joi.string(),
  kandidat_dapil_id: Joi.number(),
  kandidat_jenis_pemilihan_id: Joi.number(),
  kandidat_posisi_calon_tetap_id: Joi.number(),
  kandidat_jenis_kelamin: Joi.string(),
  kandidat_role_id: Joi.number(),
  kandidat_nomor_urut: Joi.number(),
});

export { createKandidatValidations, updateKandidatValidations };
