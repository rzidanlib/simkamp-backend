import express from "express";
import cors from "cors";
import path from "path";
import config from "./config/config.js";
import cookieParser from "cookie-parser";

import checkDatabaseConnection from "./middleware/checkDB-middleware.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

import { authRouter } from "./routes/api/auth-routes.js";
import { miscRouter } from "./routes/api/misc-routes.js";
import { publicAPI } from "./routes/publicApi/index.js";
import { adminRoutes } from "./routes/api/admin-routes.js";
import { adminPartaiRoutes } from "./routes/api/admin-partai-routes.js";

import { relawanRoutes } from "./routes/api/relawan-routes.js";
import { calonPemilihRoutes } from "./routes/api/calon-pemilih-routes.js";
import { arusKasRoutes } from "./routes/api/arus-kas-routes.js";
import { logistikRoutes } from "./routes/api/logistik-routes.js";
import { pemakaianLogistikRoutes } from "./routes/api/pemakaian-logistik-routes.js";
import { quickCountRoutes } from "./routes/api/quick-count-routes.js";
import { dashboarRoutes } from "./routes/api/dashboard-routes.js";

export const app = express();
export const __dirname = path.resolve();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(checkDatabaseConnection);

const baseAPI = "/api/v1";

// Public Route
app.use(baseAPI, publicAPI);
app.use(baseAPI, miscRouter);

// Protected Route
app.use(baseAPI, adminRoutes);
app.use(baseAPI, adminPartaiRoutes);

app.use(baseAPI, relawanRoutes);
app.use(baseAPI, calonPemilihRoutes);
app.use(baseAPI, arusKasRoutes);
app.use(baseAPI, logistikRoutes);
app.use(baseAPI, pemakaianLogistikRoutes);
app.use(baseAPI, quickCountRoutes);
app.use(baseAPI, dashboarRoutes);
app.use(baseAPI, authRouter);

app.use(errorMiddleware);

const PORT = config.port || 8081;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
