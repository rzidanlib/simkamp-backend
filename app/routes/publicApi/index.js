import express from "express";
import authController from "../../controllers/auth-controller.js";

const publicAPI = new express.Router();

publicAPI.post("/auth/login", authController.login);
publicAPI.post("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Public API",
  });
});

export { publicAPI };
