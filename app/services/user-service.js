import bcyrpt from "bcrypt";
import {
  getCurrentUser,
  getTotalUser,
  insertUser,
} from "../models/user-model.js";
import { getUserByUsernameOrEmail } from "../models/auth-model.js";
import { createUserValidation } from "../validations/user-validation.js";
import { validate } from "../validations/validation.js";
import { generateCodeUser } from "../utils/generateCodeUser.js";
import { ResponseError } from "../error/response-error.js";

const checkUserIsExist = async (username, email) => {
  // Check if username exists
  const existingUsername = await getUserByUsernameOrEmail(username);
  if (existingUsername) {
    throw new ResponseError("Username sudah ada");
  }

  // Check if email exists
  const existingEmail = await getUserByUsernameOrEmail(email);
  if (existingEmail) {
    throw new ResponseError("Email sudah ada");
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

export default {
  create,
  get,
};
