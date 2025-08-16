import validator from "validator";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { passwordValidator } from "../utils/passwordValidator.js";
import { hashValue, compareHash } from "../utils/hasher.js";
import { COOKIE_OPTIONS } from "../constants.js";
import ApiResponse from "../utils/ApiResponse.js";

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
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        // Validate password strength
        const { valid, message } = passwordValidator(password);
        if (!valid) {
            return res.status(400).json({ message });
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
        const accessToken = generateToken(newUser._id);

        // Send response
        res.status(201)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(201, "User created successfully", {
                    _id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
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
        let { email, username, password } = req.body;

        // Normalize inputs
        email = email?.trim().toLowerCase();
        password = password?.trim();
        username = username?.trim().toLowerCase();

        // Validate inputs
        if (!(email || username) && !password) {
            return res
                .status(400)
                .json(new ApiResponse(400, "All fields are required"));
        }

        // Check for existing user
        const user = await User.findOne({
            $or: [{ email }, { username }],
        });
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
        const accessToken = generateToken(user._id);

        // Send response
        res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(200, "User signed in successfully", {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    accessToken: accessToken,
                })
            );
    } catch (error) {
        console.log("SignIn Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const signOut = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "User signed out successfully",
    });
};
