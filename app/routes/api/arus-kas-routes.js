import express from "express";
import arusKasController from "../../controllers/arus-kas-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { upload } from "../../middleware/multer-middleware.js";

const arusKasRoutes = new express.Router();
arusKasRoutes.use(authMiddleware);

arusKasRoutes.post(
  "/aruskas/create",
  upload("aruskas").single("aruskas_foto_kuitansi"),
  arusKasController.create
);
arusKasRoutes.get(
  "/aruskas/get-by-relawan/:id?",
  arusKasController.getByRelawanId
);
arusKasRoutes.get(
  "/aruskas/get-by-kandidat/:id?",
  arusKasController.getArusKasByKandidatId
);
arusKasRoutes.get("/aruskas/get/:id", arusKasController.get);
arusKasRoutes.get("/aruskas/get-all", arusKasController.getAll);
arusKasRoutes.put(
  "/aruskas/update/:id",
  upload("aruskas").single("aruskas_foto_kuitansi"),
  arusKasController.update
);
arusKasRoutes.delete("/aruskas/delete/:id", arusKasController.remove);

export { arusKasRoutes };
