import express from "express";
import quickCountController from "../../controllers/quick-count-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { upload } from "../../middleware/multer-middleware.js";

const quickCountRoutes = new express.Router();
quickCountRoutes.use(authMiddleware);

quickCountRoutes.post(
  "/quick-count/create",
  upload.single("quick_count_foto"),
  quickCountController.create
);
quickCountRoutes.get(
  "/quick-count/get-by-relawan/:id?",
  quickCountController.getByRelawanId
);
quickCountRoutes.get(
  "/quick-count/get-by-kandidat/:id?",
  quickCountController.getByKandidatId
);
quickCountRoutes.get("/quick-count/get/:id", quickCountController.get);
quickCountRoutes.get("/quick-count/get-all", quickCountController.getAll);
quickCountRoutes.put(
  "/quick-count/update/:id",
  upload.single("quick_count_foto"),
  quickCountController.update
);
quickCountRoutes.delete("/quick-count/delete/:id", quickCountController.remove);

export { quickCountRoutes };
