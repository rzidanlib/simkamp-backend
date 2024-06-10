import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { authRouter } from "./routes/api/auth-routes.js";
import { userRouter } from "./routes/api/user-route.js";
import { publicAPI } from "./routes/publicApi/index.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

dotenv.config({ path: `${process.cwd()}/.env.development` });

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", publicAPI);

// Protected Route
app.use("/api/v1/", authRouter);
app.use("/api/v1/", userRouter);

app.use(errorMiddleware);

const PORT = process.env.APP_PORT || 8081;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
