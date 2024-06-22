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

const loginByRole = async (data) => {
  const { role, email, id } = data;
  let loginData = {};

  if (role === "admin-partai" || role === "administrator") {
    try {
      const user = await authModel.getUserAdmin(email || id);
      if (!user) {
        throw new Error("User not found");
      }

      if (!id) {
        loginData = {
          id: user.user_id,
          name: user.user_nama,
          email: user.user_email,
          password: user.user_password,
          role: user.role,
        };
      } else {
        loginData = user;
      }
    } catch (error) {
      console.error("Login error:", error.message);
      return null;
    }
  }

  if (data.role === "kandidat") {
    const user = await getKandidatByUsernameOrEmail(
      data.username || data.email
    );

    loginData = {
      id: user.user_id,
      email: user.email,
    };
  }

  return loginData;
};

const getCurrent = async (authData) => {
  const user = await loginByRole(authData);

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
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
