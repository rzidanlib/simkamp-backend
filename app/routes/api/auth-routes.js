import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

const authRouter = new express.Router();
authRouter.use(authMiddleware);

authRouter.post("/auth/logout", authController.logout);
authRouter.get("/auth/get-current", authController.getCurrent);

export { authRouter };
