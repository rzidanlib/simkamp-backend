import express from "express";
// Middleware
import { upload } from "../../middleware/multer-middleware.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

// Controllers
import rolesController from "../../controllers/roles-controller.js";
import partaiController from "../../controllers/admin/partai-controller.js";
import userController from "../../controllers/admin/user-controller.js";

const adminRoutes = new express.Router();
adminRoutes.use(authMiddleware);

// Roles Routes
adminRoutes.get("/roles/get-all", rolesController.getAll);
adminRoutes.get("/roles/get/:roleId", rolesController.get);
adminRoutes.post("/roles/create", rolesController.create);
adminRoutes.put("/roles/update/:roleId", rolesController.update);
adminRoutes.delete("/roles/delete/:roleId", rolesController.remove);

// Partai Routes
adminRoutes.post(
  "/partai/create",
  upload.single("partai_logo"),
  partaiController.create
);
adminRoutes.get("/partai/get-all", partaiController.getAll);
adminRoutes.get("/partai/get/:partaiId", partaiController.get);
adminRoutes.put(
  "/partai/update/:partaiId",
  upload.single("partai_logo"),
  partaiController.update
);
adminRoutes.delete("/partai/delete/:partaiId", partaiController.remove);

// Users Routes
adminRoutes.post("/users/create", userController.create);
adminRoutes.get("/users/get/:userId", userController.get);
adminRoutes.get("/users/get-all", userController.getAll);
adminRoutes.put("/users/update", userController.updateCurrent);

export { adminRoutes };
