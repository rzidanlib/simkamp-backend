import bcyrpt from "bcrypt";
import userModel from "../../models/admin/user-model.js";

import { createUserValidation } from "../../validations/user-validation.js";
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

// const getUser = async (currentUserId) => {
//   const user = await getUserById(currentUserId);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   return user;
// };

// const update = async (currentUserId, data) => {
//   const user = await getUserById(currentUserId);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const validateUser = validate(updateUserValidation, data);

//   if (validateUser.username !== user.username) {
//     await checkUserIsExist(validateUser.username);
//   }
//   if (validateUser.email !== user.email) {
//     await checkUserIsExist(validateUser.email);
//   }

//   if (validateUser.password) {
//     validateUser.password = await bcyrpt.hash(validateUser.password, 10);
//   } else {
//     validateUser.password = user.password;
//   }

//   const updatedUser = await updateUser(currentUserId, validateUser);

//   return updatedUser;
// };

// const remove = async (userId) => {
//   const user = await getUserById(userId);

//   if (!user) {
//     throw new ResponseError(404, "User not found");
//   }

//   const userDelete = await deleteUser(userId);

//   return userDelete;
// };

export default {
  create,
  get,
  getAll,
  // getUser,
  // update,
  // remove,
};
