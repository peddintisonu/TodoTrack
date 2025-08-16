import { createUser, findByUsername, findById } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
	const { name, username, password } = req.body;

	// Validate inputs
	if (!name || !username || !password) {
		return res.status(400).json({
			message: "All fields are required",
		});
	}

	// Validate password
	if (password.length < 6) {
		return res.status(400).json({
			message: "Password must have at least 6 characters",
		});
	}

	let user = findByUsername(username);

	if (user) {
		return res.status(400).json({
			message: "User with this username already exists",
		});
	}

	let salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	user = {
		name,
		username,
		password: hashedPassword,
	};

	const newUser = await createUser(user);

	let token = generateToken(newUser.id);
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return res.status(201).json({
		message: "User created successfully",
	});
};

export const signIn = async (req, res) => {
	const { username, password } = req.body;

	// Validate inputs
	if (!username || !password) {
		return res.status(400).json({
			message: "All fields are required",
		});
	}

	let user = findByUsername(username);

	if (!user) {
		return res.status(400).json({
			message: "Invalid username or password",
		});
	}

	let isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(400).json({
			message: "Invalid username or password",
		});
	}

	let token = generateToken(user.id);

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return res.status(200).json({
		message: "User signed in successfully",
	});
};

export const signOut = async (req, res) => {
	res.clearCookie("token");
	return res.status(200).json({
		message: "User signed out successfully",
	});
};
