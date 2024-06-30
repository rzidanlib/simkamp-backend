import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import dashboardController from "../../controllers/dashboard-controller.js";

const dashboarRoutes = new express.Router();
dashboarRoutes.use(authMiddleware);

// Arus Kas
dashboarRoutes.get(
  "/dashboard/aruskas-relawan",
  dashboardController.getArusKasRelawan
);
dashboarRoutes.get(
  "/dashboard/aruskas-kandidat",
  dashboardController.getArusKasKandidat
);
dashboarRoutes.get(
  "/dashboard/aruskas-admin",
  dashboardController.getArusKasAdmin
);

// Relawn
dashboarRoutes.get(
  "/dashboard/total-relawan-kandidat",
  dashboardController.getTotalRelawanKandidat
);
dashboarRoutes.get(
  "/dashboard/total-relawan-admin",
  dashboardController.getTotalRelawanAdmin
);
dashboarRoutes.get(
  "/dashboard/relawan-kandidat",
  dashboardController.getRelawanKandidat
);
dashboarRoutes.get(
  "/dashboard/relawan-admin",
  dashboardController.getRelawanAdmin
);

export { dashboarRoutes };
