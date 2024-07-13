import express from "express";
// Middleware
import { upload } from "../../middleware/multer-middleware.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

// Controllers
import rolesController from "../../controllers/admin/roles-controller.js";
import partaiController from "../../controllers/admin/partai-controller.js";
import userController from "../../controllers/admin/user-controller.js";
import agamaController from "../../controllers/admin/agama-controller.js";
import dapilController from "../../controllers/admin/dapil-controller.js";
import jenisPemilihanController from "../../controllers/admin/jenis-pemilihan-controller.js";
import posisiCalonTetapController from "../../controllers/admin/posisi-calon-tetap-controller.js";
import kandidatController from "../../controllers/admin/kandidat-controller.js";
import relawanController from "../../controllers/relawan-controller.js";
import calonPemilihController from "../../controllers/calon-pemilih-controller.js";
import arusKasController from "../../controllers/arus-kas-controller.js";
import logistikController from "../../controllers/logistik-controller.js";
import pemakaianLogistikController from "../../controllers/pemakaian-logistik-controller.js";
import quickCountController from "../../controllers/quick-count-controller.js";

const adminRoutes = new express.Router();
adminRoutes.use(authMiddleware);

// Users Routes
adminRoutes.post("/users/create", userController.create);
adminRoutes.get("/users/get/:userId", userController.get);
adminRoutes.get("/users/get-all", userController.getAll);
adminRoutes.put("/users/update/:userId", userController.update);
adminRoutes.delete("/users/delete/:userId", userController.remove);

// Roles Routes
adminRoutes.get("/roles/get-all", rolesController.getAll);
adminRoutes.get("/roles/get/:roleId", rolesController.get);
adminRoutes.post("/roles/create", rolesController.create);
adminRoutes.put("/roles/update/:roleId", rolesController.update);
adminRoutes.delete("/roles/delete/:roleId", rolesController.remove);

// Partai Routes
adminRoutes.post(
  "/partai/create",
  upload("partai").single("logo"),
  partaiController.create
);
adminRoutes.get("/partai/get-all", partaiController.getAll);
adminRoutes.get("/partai/get/:partaiId", partaiController.get);
adminRoutes.put(
  "/partai/update/:partaiId",
  upload("partai").single("logo"),
  partaiController.update
);
adminRoutes.delete("/partai/delete/:partaiId", partaiController.remove);

// Agama Routes
adminRoutes.post("/agama/create", agamaController.create);
adminRoutes.get("/agama/get/:agamaId", agamaController.get);
adminRoutes.get("/agama/get-all", agamaController.getAll);
adminRoutes.put("/agama/update/:agamaId", agamaController.update);
adminRoutes.delete("/agama/delete/:agamaId", agamaController.remove);

// Dapil Routes
adminRoutes.post("/dapil/create", dapilController.create);
adminRoutes.get("/dapil/get/:dapilId", dapilController.get);
adminRoutes.get("/dapil/get-all", dapilController.getAll);
adminRoutes.put("/dapil/update/:dapilId", dapilController.update);
adminRoutes.delete("/dapil/delete/:dapilId", dapilController.remove);

// Jenis Pemilihan
adminRoutes.post("/jenis-pemilihan/create", jenisPemilihanController.create);
adminRoutes.get(
  "/jenis-pemilihan/get/:jenisPemilihanId",
  jenisPemilihanController.get
);
adminRoutes.get("/jenis-pemilihan/get-all", jenisPemilihanController.getAll);
adminRoutes.put(
  "/jenis-pemilihan/update/:jenisPemilihanId",
  jenisPemilihanController.update
);
adminRoutes.delete(
  "/jenis-pemilihan/delete/:jenisPemilihanId",
  jenisPemilihanController.remove
);

// Posisi Calon Tetap Routes
adminRoutes.post(
  "/posisi-calon-tetap/create",
  posisiCalonTetapController.create
);
adminRoutes.get("/posisi-calon-tetap/get/:id", posisiCalonTetapController.get);
adminRoutes.get(
  "/posisi-calon-tetap/get-all",
  posisiCalonTetapController.getAll
);
adminRoutes.put(
  "/posisi-calon-tetap/update/:id",
  posisiCalonTetapController.update
);
adminRoutes.delete(
  "/posisi-calon-tetap/delete/:id",
  posisiCalonTetapController.remove
);

// Kandidat Routes
adminRoutes.get("/kandidat/get-by-admin", kandidatController.getByAdminId);

adminRoutes.post(
  "/kandidat/create",
  upload("foto_profil").single("kandidat_foto"),
  kandidatController.create
);
adminRoutes.get("/kandidat/get/:id", kandidatController.get);
adminRoutes.get("/kandidat/get-all", kandidatController.getAll);
adminRoutes.put(
  "/kandidat/update/:id",
  upload("foto_profil").single("kandidat_foto"),
  kandidatController.update
);
adminRoutes.delete("/kandidat/delete/:id", kandidatController.remove);

// Relawan Routes
adminRoutes.get("/relawan/get-by-admin/:id?", relawanController.getByAdminId);
// Calon Pemilih Routes
adminRoutes.get(
  "/calon-pemilih/get-by-admin/:id?",
  calonPemilihController.getByAdminId
);
// Arus Kas Routes
adminRoutes.get(
  "/aruskas/get-by-admin/:id?",
  arusKasController.getArusKasByAdminId
);
// Logistik Routes
adminRoutes.get("/logistik/get-by-admin/:id?", logistikController.getByAdminId);
// Pemakaian Logistik Routes
adminRoutes.get(
  "/pemakaian-logistik/get-by-admin/:id?",
  pemakaianLogistikController.getByAdminId
);
// Quick Count Routes
adminRoutes.get(
  "/quick-count/get-by-admin/:id?",
  quickCountController.getByAdminId
);

export { adminRoutes };
