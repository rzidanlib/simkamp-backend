import bcrypt from "bcrypt";
import userModel from "../../models/admin/user-model.js";

import {
  createUserValidation,
  updateUserValidation,
} from "../../validations/admin/user-validation.js";
import { validate } from "../../validations/validation.js";
import { ResponseError } from "../../error/response-error.js";

const checkUserIsExist = async (email) => {
  const existingUser = await userModel.getByEmail(email);
  if (existingUser) {
    throw new ResponseError(403, "Email sudah ada");
  }
};

const create = async (request) => {
  try {
    const user = validate(createUserValidation, request);

    if (user.email) {
      await checkUserIsExist(user.email);
    }

    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = await userModel.create(user);

    return createdUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (id) => {
  try {
    const user = await userModel.get(id);
    if (!user) {
      throw new ResponseError(404, "User tidak ditemukan");
    }
    return user;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const getAll = async () => {
  try {
    const users = await userModel.getAll();
    if (!users) {
      throw new ResponseError(404, "User tidak ada");
    }
    return users;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const update = async (id, data) => {
  try {
    const user = await userModel.get(id);

    if (!user) {
      throw new ResponseError(404, "User tidak ditemukan");
    }

    const validateUser = validate(updateUserValidation, data);

    if (validateUser.email && validateUser.email !== user.email) {
      await checkUserIsExist(validateUser.email);
    }

    if (validateUser.password) {
      validateUser.password = await bcrypt.hash(validateUser.password, 10);
    } else {
      validateUser.password = user.password;
    }

    const updatedUser = await userModel.update(id, validateUser);
    return updatedUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (id) => {
  try {
    const user = await userModel.get(id);

    if (!user) {
      throw new ResponseError(404, "User tidak ditemukan");
    }

    const deletedUser = await userModel.remove(id);
    return deletedUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
