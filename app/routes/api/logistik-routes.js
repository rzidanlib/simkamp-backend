import express from "express";
import logistikController from "../../controllers/logistik-controller.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";

const logistikRoutes = new express.Router();
logistikRoutes.use(authMiddleware);

logistikRoutes.post("/logistik/create", logistikController.create);
logistikRoutes.get("/logistik/get/:id", logistikController.get);
logistikRoutes.get("/logistik/get-all", logistikController.getAll);
logistikRoutes.get(
  "/logistik/get-by-relawan/:id?",
  logistikController.getByRelawanId
);
logistikRoutes.put("/logistik/update/:id", logistikController.update);
logistikRoutes.delete("/logistik/delete/:id", logistikController.remove);

export { logistikRoutes };
