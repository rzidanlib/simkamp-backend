import express from "express";
import authController from "../../controllers/auth-controller.js";

const publicAPI = new express.Router();

publicAPI.post("/auth/login", authController.login);

export { publicAPI };
