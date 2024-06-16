import bcyrpt from "bcrypt";
import {
  getAllUsers,
  getCurrentUser,
  getTotalUser,
  getUserById,
  insertUser,
  updateUser,
} from "../models/user-model.js";
import { getUserByUsernameOrEmail } from "../models/auth-model.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../validations/user-validation.js";
import { validate } from "../validations/validation.js";
import { generateCodeUser } from "../utils/generateCodeUser.js";
import { ResponseError } from "../error/response-error.js";

const checkUserIsExist = async (userData) => {
  const existingUser = await getUserByUsernameOrEmail(userData);
  if (existingUser) {
    throw new ResponseError(403, "Username atau Email sudah ada");
  }
};

const create = async (request) => {
  const user = validate(createUserValidation, request);

  if (user) {
    await checkUserIsExist(user.username, user.email);
  }

  const total_users = await getTotalUser();

  user.kode_user = generateCodeUser("USER", total_users);
  user.password = await bcyrpt.hash(user.password, 10);
  const createUser = await insertUser(user);

  return createUser;
};

const get = async (currentUserId) => {
  const user = await getCurrentUser(currentUserId);

  if (!user) {
    throw new Error("Username not found");
  }

  return user;
};

const getAllUser = async () => {
  const users = await getAllUsers();
  return users;
};

const getUser = async (currentUserId) => {
  const user = await getUserById(currentUserId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const update = async (currentUserId, data) => {
  const user = await getUserById(currentUserId);

  if (!user) {
    throw new Error("User not found");
  }

  const validateUser = validate(updateUserValidation, data);

  if (validateUser.username !== user.username) {
    await checkUserIsExist(validateUser.username);
  }
  if (validateUser.email !== user.email) {
    await checkUserIsExist(validateUser.email);
  }

  if (validateUser.password) {
    validateUser.password = await bcyrpt.hash(validateUser.password, 10);
  } else {
    validateUser.password = user.password;
  }

  const updatedUser = await updateUser(currentUserId, validateUser);

  return updatedUser;
};

export default {
  create,
  get,
  getUser,
  getAllUser,
  update,
};
