import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { getBlacklistToken } from "../models/auth-model.js";

const env = process.env.NODE_ENV || "development";
const JWT_SECRET = config[env].secretKey;

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res
        .status(403)
        .json({
          errors: "No token provided",
        })
        .end();
    }

    const token = authHeader.split(" ")[1]; // Mengambil token dari skema Bearer

    if (!token) {
      return res
        .status(403)
        .json({
          errors: "No token provided",
        })
        .end();
    }

    const isTokenBlacklisted = await getBlacklistToken(token);
    if (isTokenBlacklisted) {
      return res.status(401).json({ errors: "Token is blacklisted" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: "Unauthorized",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        errors: "Internal server error",
      })
      .end();
  }
};
