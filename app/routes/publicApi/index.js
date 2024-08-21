import express from "express";
import authController from "../../controllers/auth-controller.js";

const publicAPI = new express.Router();

publicAPI.post("/login", authController.login);
publicAPI.post("/register", authController.register);

export { publicAPI };
