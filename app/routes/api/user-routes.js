import express from "express";
import userController from "../../controllers/user-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

userRouter.post("/users/create", userController.create);
userRouter.get("/users/get-user/:userId", userController.getUserById);
userRouter.get("/users/get-all-users", userController.getAllUsers);

userRouter.get("/users/get-user", userController.getUser);
userRouter.post("/users/update-user", userController.updateUser);

export { userRouter };
