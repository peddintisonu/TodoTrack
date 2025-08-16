import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

export const generateToken = (userId) => {
    return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "1d" });
};
