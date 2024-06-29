import express from "express";
import calonPemilihController from "../../controllers/calon-pemilih-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { upload } from "../../middleware/multer-middleware.js";

const calonPemilihRoutes = new express.Router();
calonPemilihRoutes.use(authMiddleware);

calonPemilihRoutes.post(
  "/calon-pemilih/create",
  upload.fields([
    { name: "calon_pemilih_foto", maxCount: 1 },
    { name: "calon_pemilih_foto_ktp", maxCount: 1 },
  ]),
  calonPemilihController.create
);
calonPemilihRoutes.get(
  "/calon-pemilih/get-by-relawan/:id?",
  calonPemilihController.getByRelawanId
);
calonPemilihRoutes.get(
  "/calon-pemilih/get-by-kandidat/:id?",
  calonPemilihController.getByKandidatId
);
calonPemilihRoutes.get("/calon-pemilih/get/:id", calonPemilihController.get);
calonPemilihRoutes.get("/calon-pemilih/get-all", calonPemilihController.getAll);
calonPemilihRoutes.put(
  "/calon-pemilih/update/:id",
  upload.fields([
    { name: "calon_pemilih_foto", maxCount: 1 },
    { name: "calon_pemilih_foto_ktp", maxCount: 1 },
  ]),
  calonPemilihController.update
);
calonPemilihRoutes.delete(
  "/calon-pemilih/delete/:id",
  calonPemilihController.remove
);

export { calonPemilihRoutes };
