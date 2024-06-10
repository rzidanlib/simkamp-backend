import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserByUsernameOrEmail,
  insertBlacklistToken,
} from "../models/auth-model.js";
import { loginValidation } from "../validations/auth-validations.js";
import { validate } from "../validations/validation.js";
import { getCurrentUser } from "../models/user-model.js";

const env = process.env.NODE_ENV || "development";
const JWT_SECRET = config[env].secretKey;

const login = async (request) => {
  const validateUser = validate(loginValidation, request);
  const user = await getUserByUsernameOrEmail(
    validateUser.username || validateUser.email
  );

  if (!user) {
    throw new ResponseError(401, "Username atau Email tidak ditemukan.");
  }

  const isPasswordValid = await bcrypt.compare(
    validateUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Password salah.");
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  return {
    id: user.id,
    kode_user: user.kode_user,
    username: user.username,
    email: user.email,
    no_hp: user.no_hp,
    nama_user: user.nama_user,
    role: user.role,
    accessToken: token,
  };
};

const logout = async (token, expiry) => {
  try {
    await insertBlacklistToken(token, expiry);
    return { token, expiry };
  } catch (error) {
    throw new ResponseError(400, "Failed to blacklist token");
  }
};

export default { login, logout };
