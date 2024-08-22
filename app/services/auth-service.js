import bcrypt from "bcrypt";

import rolesModel from "../models/admin/roles-model.js";
import userModel from "../models/admin/user-model.js";

import { ResponseError } from "../error/response-error.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth-validations.js";
import { validate } from "../validations/validation.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (request) => {
  const user = validate(registerValidation, request);
  const role = await rolesModel.getRole({ roleName: user.role });

  const isUsernameExist = await userModel.getByUsername(user.username);
  if (isUsernameExist) {
    throw new ResponseError(400, "User already exists");
  }

  const isEmailExist = await userModel.getByEmail(user.email);
  if (isEmailExist) {
    throw new ResponseError(400, "Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);
  user.role = role.id;

  const newUser = await userModel.create(user);

  return { user: newUser };
};

const login = async (request) => {
  const validateUser = validate(loginValidation, request);

  const user = await userModel.getByEmail(validateUser.email);
  if (!user) {
    throw new ResponseError(
      401,
      `User dengan email ${validateUser.email} tidak ditemukan.`
    );
  }

  const isPasswordValid = await bcrypt.compare(
    validateUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Password yang dimasukan salah");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const logout = async (token, expiry) => {
  try {
    await authModel.insertBlacklistToken(token, expiry);
    return { token, expiry };
  } catch (error) {
    throw new ResponseError(400, "Failed to blacklist token");
  }
};

const getCurrentUser = async (userId) => {
  const user = await userModel.getById(userId);
  const role = await rolesModel.getRole({ roleId: user.role_id });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: role.role_name,
  };
};

export default { login, logout, register, getCurrentUser };
