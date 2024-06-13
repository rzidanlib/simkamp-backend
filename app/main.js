import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import checkDatabaseConnection from "./middleware/checkDB-middleware.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

import { authRouter } from "./routes/api/auth-routes.js";
import { userRouter } from "./routes/api/user-routes.js";
import { miscRouter } from "./routes/api/misc-routes.js";
import { publicAPI } from "./routes/publicApi/index.js";

dotenv.config({ path: `${process.cwd()}/.env.development` });

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(checkDatabaseConnection);

app.use("/api/v1/", publicAPI);
app.use("/api/v1/", miscRouter);

// Protected Route
app.use("/api/v1/", authRouter);
app.use("/api/v1/", userRouter);

app.use(errorMiddleware);

const PORT = process.env.APP_PORT || 8081;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
