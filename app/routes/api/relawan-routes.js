import express from "express";
import relawanController from "../../controllers/relawan-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { upload } from "../../middleware/multer-middleware.js";

const relawanRoutes = new express.Router();
relawanRoutes.use(authMiddleware);

relawanRoutes.post(
  "/relawan/create",
  upload("relawan").single("relawan_foto"),
  relawanController.create
);
relawanRoutes.get(
  "/relawan/get-by-kandidat/:id?",
  relawanController.getByKandidatId
);
relawanRoutes.get("/relawan/get/:id", relawanController.get);
relawanRoutes.get("/relawan/get-all", relawanController.getAll);
relawanRoutes.put(
  "/relawan/update/:id",
  upload("relawan").single("relawan_foto"),
  relawanController.update
);
relawanRoutes.delete("/relawan/delete/:id", relawanController.remove);

export { relawanRoutes };
