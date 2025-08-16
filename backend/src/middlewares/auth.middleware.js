import jwt from "jsonwebtoken";
import { findById } from "../models/user.model.js";
import { ENV } from "../config/env.config.js";

export const protectRoute = (req, res, next) => {

	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({
			message: "No token provided",
		});
	}

	const decoded = jwt.verify(token, ENV.JWT_SECRET);
	if (!decoded) {
		return res.status(401).json({
			message: "Invalid token",
		});
	}

	const user = findById(decoded.userId);

	if (!user) {
		return res.status(401).json({
			message: "User not found",
		});
	}

	req.user = user;
	next();
};
