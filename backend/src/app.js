import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { protectRoute } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ENV } from "./config/env.config.js";
import ApiResponse from "./utils/ApiResponse.js";

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

// Root route to provide a welcome message.
app.get("/", (req, res) => {
    res.status(200).send(
        `<body style="font-family: sans-serif; background-color: #111827; color: #f9fafb; padding: 2rem;">
            <h1 style="color: #f97316;">TodoTrack Backend API</h1>
            <p>This is the backend service for the TodoTrack application.</p>
            <p>To use the app, please visit the frontend at: 
                <a href="${ENV.CLIENT_URL}" style="color: #fdba74;">${ENV.CLIENT_URL}</a>
            </p>
        </body>`
    );
});

// Public health check endpoint for monitoring.
app.get("/api/v1/health", (req, res) => {
    res.status(200).json(new ApiResponse(200, "API is healthy and running."));
});

// --- Core API Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", protectRoute, todoRoutes);
app.use("/api/v1/users", protectRoute, userRoutes);

export { app };
