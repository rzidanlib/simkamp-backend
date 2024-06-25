import express from "express";
import pemakaianLogistikController from "../../controllers/pemakaian-logistik-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

const pemakaianLogistikRoutes = new express.Router();
pemakaianLogistikRoutes.use(authMiddleware);

pemakaianLogistikRoutes.post(
  "/pemakaian-logistik/create",
  pemakaianLogistikController.create
);
pemakaianLogistikRoutes.get(
  "/pemakaian-logistik/get/:id",
  pemakaianLogistikController.get
);
pemakaianLogistikRoutes.get(
  "/pemakaian-logistik/get-all",
  pemakaianLogistikController.getAll
);
pemakaianLogistikRoutes.get(
  "/pemakaian-logistik/get-by-relawan/:id?",
  pemakaianLogistikController.getByRelawanId
);
pemakaianLogistikRoutes.put(
  "/pemakaian-logistik/update/:id",
  pemakaianLogistikController.update
);
pemakaianLogistikRoutes.delete(
  "/pemakaian-logistik/delete/:id",
  pemakaianLogistikController.remove
);

export { pemakaianLogistikRoutes };
