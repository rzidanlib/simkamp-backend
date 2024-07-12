import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

import authModel from "../models/auth-model.js";
import rolesModel from "../models/admin/roles-model.js";

import { ResponseError } from "../error/response-error.js";
import { loginValidation } from "../validations/auth-validations.js";
import { validate } from "../validations/validation.js";

// Constants
const env = process.env.NODE_ENV;
const JWT_SECRET = config[env].secretKey;
const TOKEN_EXPIRATION_SECONDS = 86400; // 24 hours

function generateToken(user, role) {
  return jwt.sign({ id: user.id, role: role.role_name }, JWT_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: TOKEN_EXPIRATION_SECONDS,
  });
}

const validateLoginRequest = async (request) => {
  const validatedUser = validate(loginValidation, request);
  const isRoleExist = await rolesModel.get(validatedUser.role);

  if (!isRoleExist) {
    throw new ResponseError(401, "Role tidak ada.");
  }

  const user = await authModel.getUser(validatedUser.email);
  if (!user) {
    throw new ResponseError(
      401,
      `User dengan email ${validatedUser.email} tidak ditemukan.`
    );
  }

  return { user, validatedUser, isRoleExist };
};

const login = async (request) => {
  const {
    user,
    validatedUser,
    isRoleExist: role,
  } = await validateLoginRequest(request);

  const isPasswordValid = await bcrypt.compare(
    validatedUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Password yang dimasukan salah.");
  }

  const token = generateToken(user, role);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: role.role_name,
    },
    accessToken: token,
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

const getCurrent = async (authData) => {
  const user = await authModel.getUser(authData.id);
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return {
    id: user.id,
    email: user.email,
    role: authData.role,
  };
};

export default { login, logout, getCurrent };
