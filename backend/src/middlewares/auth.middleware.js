import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";
import ApiResponse from "../utils/ApiResponse.js";

export const protectRoute = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json(new ApiResponse(401, "No token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json(new ApiResponse(401, "Invalid token"));
    }

    const user = { id: decoded.id, role: decoded.role };

    if (!user) {
        return res.status(401).json(new ApiResponse(401, "User not found"));
    }
    req.user = user;
    next();
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
        next();
    };
};
