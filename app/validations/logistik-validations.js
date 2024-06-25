import Joi from "joi";

const createLogistikValidations = Joi.object({
  logistik_nama_atribut: Joi.string().required(),
  logistik_satuan_unit: Joi.string().required(),
  logistik_stok: Joi.number().required(),
  logistik_total_harga: Joi.number().required(),
});

const updateLogistikValidations = Joi.object({
  logistik_nama_atribut: Joi.string(),
  logistik_satuan_unit: Joi.string(),
  logistik_stok: Joi.number(),
  logistik_total_harga: Joi.number(),
});

export { createLogistikValidations, updateLogistikValidations };
