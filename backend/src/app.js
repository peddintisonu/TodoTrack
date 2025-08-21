import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { protectRoute } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ENV } from "./config/env.config.js";

const app = express();

// Core middleware setup.
app.use(
    cors({
        origin: ENV.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", protectRoute, todoRoutes);
app.use("/api/v1/users", protectRoute, userRoutes);

export { app };
