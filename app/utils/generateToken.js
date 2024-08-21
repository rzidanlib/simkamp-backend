import jwt from "jsonwebtoken";
import config from "../config/config.js";
import rolesModel from "../models/admin/roles-model.js";

// Constants
const JWT_SECRET = config.secretKey;
const TOKEN_EXPIRATION = 86400; // 24 hours

export const generateToken = (user) => {
  const userSigned = {
    user_id: user.id,
    user_email: user.email,
    role_id: user.role_id,
  };

  return jwt.sign(userSigned, JWT_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: TOKEN_EXPIRATION,
  });
};
