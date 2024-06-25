import Joi from "joi";

const createQuickCountValidations = Joi.object({
  quick_count_provinsi: Joi.number().required(),
  quick_count_kab_kota: Joi.number().required(),
  quick_count_kecamatan: Joi.number().required(),
  quick_count_kelurahan: Joi.number().required(),
  quick_count_jumlah_suara: Joi.number().required(),
  quick_count_foto: Joi.string().required(),
  quick_count_tps: Joi.string().required(),
});

const updateQuickCountValidations = Joi.object({
  quick_count_provinsi: Joi.number(),
  quick_count_kab_kota: Joi.number(),
  quick_count_kecamatan: Joi.number(),
  quick_count_kelurahan: Joi.number(),
  quick_count_jumlah_suara: Joi.number(),
  quick_count_foto: Joi.string(),
  quick_count_tps: Joi.string(),
});

export { createQuickCountValidations, updateQuickCountValidations };
