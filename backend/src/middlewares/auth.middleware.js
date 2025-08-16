import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const protectRoute = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json(new ApiResponse(401, "No token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json(new ApiResponse(401, "Invalid token"));
    }

    const user = User.findById(decoded.userId);

    if (!user) {
        return res.status(401).json(new ApiResponse(401, "User not found"));
    }
    req.user = user;
    next();
};
