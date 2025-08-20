import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";
import ApiResponse from "../utils/ApiResponse.js";
export const protectRoute = (req, res, next) => {
    try {
        let token = null;

        // 1. Prioritize the Authorization header (standard for APIs)
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        // 2. Fallback to the cookie (useful for web browsers)
        else if (req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        // 3. If no token is found after checking both places, deny access.
        if (!token) {
            return res
                .status(401)
                .json(new ApiResponse(401, "Unauthorized: No token provided"));
        }

        // 4. Verify the token within a try...catch block.
        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        // 5. Attach a minimal user object to the request for downstream routes.
        // It's good practice not to query the DB again in middleware unless necessary.
        req.user = { id: decoded.id, role: decoded.role };

        next();
    } catch (error) {
        // This block will catch errors from jwt.verify (e.g., expired or invalid token)
        return res
            .status(401)
            .json(
                new ApiResponse(401, "Unauthorized: Invalid or expired token")
            );
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
        next();
    };
};
