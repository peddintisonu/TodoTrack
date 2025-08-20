import validator from "validator";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { passwordValidator } from "../utils/passwordValidator.js";
import { hashValue, compareHash } from "../utils/hasher.js";
import { COOKIE_OPTIONS } from "../constants.js";
import ApiResponse from "../utils/ApiResponse.js";
import { safeDocument } from "../utils/safeDocument.js";

export const signUp = async (req, res) => {
    try {
        let { email, password, name, username } = req.body;

        // Normalize inputs
        email = email?.trim().toLowerCase();
        password = password?.trim();
        name = name?.trim();
        username = username?.trim().toLowerCase();

        // Validate inputs
        if (!name || !email || !password || !username) {
            return res
                .status(400)
                .json(new ApiResponse(400, "All fields are required"));
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Invalid email address"));
        }

        // Validate password strength
        const { valid, message } = passwordValidator(password);
        if (!valid) {
            return res.status(400).json(new ApiResponse(400, message));
        }

        // Check for existing user
        const isOldUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (isOldUser) {
            return res.status(409).json({
                message: "User with this email or username already exists",
            });
        }

        // Create new user
        const hashedPassword = await hashValue(password);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            name,
        });

        // Generate token
        const accessToken = generateToken({
            id: newUser._id,
            role: newUser.role,
        });

        const safeUser = safeDocument(newUser, ["password"]);
        // Send response
        res.status(201)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(201, "User created successfully", {
                    user: safeUser,
                    accessToken: accessToken,
                })
            );
    } catch (error) {
        console.error("SignUp Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const signIn = async (req, res) => {
    try {
        let { credential, password } = req.body;

        // Normalize inputs
        credential = credential?.trim().toLowerCase();
        password = password?.trim();

        // Validate inputs
        if (!credential && !password) {
            return res
                .status(400)
                .json(new ApiResponse(400, "All fields are required"));
        }

        // Check for existing user
        const user = await User.findOne({
            $or: [{ email: credential }, { username: credential }],
        }).select("+password");

        if (!user) {
            return res
                .status(401)
                .json(new ApiResponse(401, "Invalid credentials"));
        }

        // Check password
        const isMatch = await compareHash(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const accessToken = generateToken({
            id: user._id,
            role: user.role,
        });

        const safeUser = safeDocument(user, ["password"]);

        // Send response
        res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(200, "User signed in successfully", {
                    user: safeUser,
                    accessToken: accessToken,
                })
            );
    } catch (error) {
        console.log("SignIn Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const signOut = async (req, res) => {
    res.clearCookie("accessToken");
    return res
        .status(200)
        .json(new ApiResponse(200, "User signed out successfully"));
};
