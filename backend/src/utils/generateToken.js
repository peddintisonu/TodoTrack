import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config.js";

export const generateToken = ({ id, role }) => {
    return jwt.sign({ id, role }, ENV.JWT_SECRET, {
        expiresIn: "1d",
    });
};
