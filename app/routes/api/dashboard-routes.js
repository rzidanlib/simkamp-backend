import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import dashboardController from "../../controllers/dashboard-controller.js";

const dashboardRoutes = new express.Router();
dashboardRoutes.use(authMiddleware);

// Arus Kas
dashboardRoutes.get(
  "/dashboard/aruskas-relawan",
  dashboardController.getArusKasRelawan
);
dashboardRoutes.get(
  "/dashboard/aruskas-kandidat",
  dashboardController.getArusKasKandidat
);
dashboardRoutes.get(
  "/dashboard/aruskas-admin",
  dashboardController.getArusKasAdmin
);

// Relawn
dashboardRoutes.get(
  "/dashboard/total-relawan-kandidat",
  dashboardController.getTotalRelawanKandidat
);
dashboardRoutes.get(
  "/dashboard/total-relawan-admin",
  dashboardController.getTotalRelawanAdmin
);
dashboardRoutes.get(
  "/dashboard/relawan-kandidat",
  dashboardController.getRelawanKandidat
);
dashboardRoutes.get(
  "/dashboard/relawan-admin",
  dashboardController.getRelawanAdmin
);

// Calon Pemilih
dashboardRoutes.get(
  "/dashboard/total-pemilih-relawan",
  dashboardController.getTotalPemilihRelawan
);
dashboardRoutes.get(
  "/dashboard/total-pemilih-kandidat",
  dashboardController.getTotalPemilihKandidat
);
dashboardRoutes.get(
  "/dashboard/total-pemilih-admin",
  dashboardController.getTotalPemilihAdmin
);
dashboardRoutes.get(
  "/dashboard/pemilih-relawan",
  dashboardController.getPemilihRelawan
);
dashboardRoutes.get(
  "/dashboard/pemilih-kandidat",
  dashboardController.getPemilihKandidat
);
dashboardRoutes.get(
  "/dashboard/pemilih-admin",
  dashboardController.getPemilihAdmin
);

// Logistik
dashboardRoutes.get(
  "/dashboard/total-logistik-relawan",
  dashboardController.getTotalLogistikRelawan
);
dashboardRoutes.get(
  "/dashboard/total-logistik-kandidat",
  dashboardController.getTotalLogistikKandidat
);
dashboardRoutes.get(
  "/dashboard/total-logistik-admin",
  dashboardController.getTotalLogistikAdmin
);

export { dashboardRoutes };
