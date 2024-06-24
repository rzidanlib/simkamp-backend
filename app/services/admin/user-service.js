import bcyrpt from "bcrypt";
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

    if (user.user_email) {
      await checkUserIsExist(user.user_email);
    }

    user.user_password = await bcyrpt.hash(user.user_password, 10);
    const createUser = await userModel.create(user);

    return createUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const get = async (userId) => {
  try {
    const user = await userModel.getById(userId);
    if (!user) {
      throw new ResponseError(404, "User not found");
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
      throw new ResponseError(404, "User not found");
    }
    return users;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const updateCurrent = async (userId, data) => {
  try {
    const user = await userModel.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const validateUser = validate(updateUserValidation, data);

    if (validateUser.user_email !== user.user_email) {
      await checkUserIsExist(validateUser.user_email);
    }

    if (validateUser.user_password) {
      validateUser.user_password = await bcyrpt.hash(
        validateUser.user_password,
        10
      );
    } else {
      validateUser.user_password = user.user_password;
    }

    const updatedUser = await userModel.updateCurrent(userId, validateUser);
    return updatedUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const remove = async (userId) => {
  try {
    const user = await userModel.getById(userId);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const deletedUser = await userModel.remove(userId);
    return deletedUser;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default {
  create,
  get,
  getAll,
  updateCurrent,
  remove,
};
