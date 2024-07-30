import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import checkDatabaseConnection from "./middleware/checkDB-middleware.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

import { authRouter } from "./routes/api/auth-routes.js";
import { miscRouter } from "./routes/api/misc-routes.js";
import { publicAPI } from "./routes/publicApi/index.js";
import { adminRoutes } from "./routes/admin/admin-routes.js";
import { relawanRoutes } from "./routes/api/relawan-routes.js";
import { calonPemilihRoutes } from "./routes/api/calon-pemilih-routes.js";
import { arusKasRoutes } from "./routes/api/arus-kas-routes.js";
import { logistikRoutes } from "./routes/api/logistik-routes.js";
import { pemakaianLogistikRoutes } from "./routes/api/pemakaian-logistik-routes.js";
import { quickCountRoutes } from "./routes/api/quick-count-routes.js";
import { dashboardRoutes } from "./routes/api/dashboard-routes.js";

dotenv.config();

export const app = express();
export const __dirname = path.resolve();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(checkDatabaseConnection);

// Routes
app.use("/api/v1/", publicAPI);
app.use("/api/v1/", miscRouter);
app.use("/api/v1/", adminRoutes);
app.use("/api/v1/", relawanRoutes);
app.use("/api/v1/", calonPemilihRoutes);
app.use("/api/v1/", arusKasRoutes);
app.use("/api/v1/", logistikRoutes);
app.use("/api/v1/", pemakaianLogistikRoutes);
app.use("/api/v1/", quickCountRoutes);
app.use("/api/v1/", dashboardRoutes);
app.use("/api/v1/", authRouter);

app.use(errorMiddleware);

const PORT = process.env.APP_PORT || 8081;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
