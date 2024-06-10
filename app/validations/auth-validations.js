import Joi from "joi";

const loginValidation = Joi.object({
  username: Joi.string().max(100).required().messages({
    "string.empty": "Nama pengguna tidak boleh kosong",
  }),
  password: Joi.string().max(100).required(),
  // role: Joi.string().valid("administrator", "adminpartai"),
});

export { loginValidation };
