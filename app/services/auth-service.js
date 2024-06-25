import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authModel from "../models/auth-model.js";
import { ResponseError } from "../error/response-error.js";
import { loginValidation } from "../validations/auth-validations.js";
import { validate } from "../validations/validation.js";

// Constants
const env = process.env.NODE_ENV;
const JWT_SECRET = config[env].secretKey;
const TOKEN_EXPIRATION_SECONDS = 86400; // 24 hours

// Helper function to validate user credentials
async function validateUserCredentials(validateUser) {
  const user = await loginByRole(validateUser);
  if (!user) {
    throw new ResponseError(401, "User tidak ditemukan.");
  }
  return user;
}

// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: TOKEN_EXPIRATION_SECONDS,
  });
}

const fetchAndFormatUserData = async (fetchFunction, email, id, rolePrefix) => {
  const entity = await fetchFunction(email || id);
  if (!entity) {
    throw new Error(`${rolePrefix} not found`);
  }

  return !id
    ? {
        id: entity[`${rolePrefix}_id`],
        name: entity[`${rolePrefix}_nama`],
        email: entity[`${rolePrefix}_email`],
        password: entity[`${rolePrefix}_password`],
        role: entity.role,
      }
    : entity;
};

const loginByRole = async (data) => {
  const { role, email, id } = data;
  const roleToFunction = {
    "admin-partai": () => authModel.getUserAdmin(email, id),
    administrator: () => authModel.getUserAdmin(email, id),
    kandidat: () => authModel.getKandidat(email, id),
    relawan: () => authModel.getRelawan(email, id),
  };

  const fetchFunction = roleToFunction[role];
  if (!fetchFunction) {
    throw new Error("Invalid role provided");
  }

  try {
    const loginData = await fetchAndFormatUserData(
      fetchFunction,
      email,
      id,
      role
    ); // Correctly pass the entity.
    return loginData;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

const getCurrent = async (authData) => {
  const user = await loginByRole(authData);

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

const login = async (request) => {
  const validateUser = validate(loginValidation, request);
  const user = await validateUserCredentials(validateUser);

  if (!user) {
    throw new ResponseError(401, "User tidak ditemukan.");
  }

  const isPasswordValid = await bcrypt.compare(
    validateUser.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Password salah.");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
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

export default { login, logout, getCurrent };
