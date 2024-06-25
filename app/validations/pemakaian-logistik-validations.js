import Joi from "joi";

const createPemakaianLogistikValidations = Joi.object({
  pemakaian_tanggal: Joi.string().required(),
  pemakaian_jumlah: Joi.number().required(),
  pemakaian_logistik_id: Joi.number().required(),
});

const updatePemakaianLogistikValidations = Joi.object({
  pemakaian_tanggal: Joi.string(),
  pemakaian_jumlah: Joi.number(),
  pemakaian_logistik_id: Joi.number(),
});

export {
  createPemakaianLogistikValidations,
  updatePemakaianLogistikValidations,
};
