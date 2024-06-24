import Joi from "joi";

const createPosisiCalonValidations = Joi.object({
  posisi_calon_tetap: Joi.string().max(100).required(),
});

const updateJPosisiCalonValidations = Joi.object({
  posisi_calon_tetap: Joi.string().max(100).required(),
});

export { createPosisiCalonValidations, updateJPosisiCalonValidations };
