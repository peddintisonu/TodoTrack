// 1) IMPORTS + CONFIG
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { protectRoute } from "./middlewares/auth.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 2) MIDDLEWARE
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3) ROUTES (ADD YOUR API ROUTES HERE — BEFORE ANY CATCH-ALL)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", protectRoute, todoRoutes);
app.use("/api/v1/users", protectRoute, userRoutes);

// 4) SERVE FRONTEND STATIC FILES
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// 5) CATCH-ALL  (should be LAST)
app.use(/(.*)/, (_, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export { app };
