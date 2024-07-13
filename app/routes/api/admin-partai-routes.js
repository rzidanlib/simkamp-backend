import express from "express";
// Middleware
import { upload } from "../../middleware/multer-middleware.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

import adminPartaiController from "../../controllers/admin/admin-partai-controller.js";

const adminPartaiRoutes = new express.Router();
adminPartaiRoutes.use(authMiddleware);

// Manage Admin Partai Routes
adminPartaiRoutes.post(
  "/admin-partai/create",
  upload("foto_profil").single("foto_profil"),
  adminPartaiController.create
);
adminPartaiRoutes.get("/admin-partai/get/:id", adminPartaiController.get);
adminPartaiRoutes.get("/admin-partai/get-all", adminPartaiController.getAll);
adminPartaiRoutes.put(
  "/admin-partai/update/:id",
  upload("foto_profil").single("foto_profil"),
  adminPartaiController.update
);
adminPartaiRoutes.delete(
  "/admin-partai/delete/:id",
  adminPartaiController.remove
);

export { adminPartaiRoutes };
