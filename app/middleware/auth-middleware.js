import jwt from "jsonwebtoken";
import config from "../config/config.js";
import authModel from "../models/auth-model.js";

const JWT_SECRET = config.secretKey;

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ errors: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    req.userId = decoded.user_id;
    next();
  });
};
