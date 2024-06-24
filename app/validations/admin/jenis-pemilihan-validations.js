import Joi from "joi";

const createJenisPemilihanValidations = Joi.object({
  jenis_pemilihan: Joi.string().max(100).required(),
});

const updateJenisPemilihanValidations = Joi.object({
  jenis_pemilihan: Joi.string().max(100).required(),
});

export { createJenisPemilihanValidations, updateJenisPemilihanValidations };
