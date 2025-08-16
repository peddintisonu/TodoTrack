import { PRIORITY_LEVELS } from "../constants.js";
import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { compareHash, hashValue } from "../utils/hasher.js";
import { passwordValidator } from "../utils/passwordValidator.js";
import { safeDocument } from "../utils/safeDocument.js";

// ------ ADMIN ROUTES ------
export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;

        let filter = {};
        if (role) filter.role = role;

        const users = await User.find(filter);
        res.status(200).json(
            new ApiResponse(200, "All users fetched successfully", users)
        );
    } catch (error) {
        console.error("GetUsers Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const getUserById = async (req, res) => {
    try {
        // Find user
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }
        res.status(200).json(
            new ApiResponse(200, "User fetched successfully", user)
        );
    } catch (error) {
        console.error("GetUserById Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteUserById = async (req, res) => {
    try {
        // Find user by id
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        await Todo.deleteMany({ userId: user._id });

        await user.remove();

        res.status(200).json(new ApiResponse(200, "User deleted successfully"));
    } catch (error) {
        console.error("DeleteUser Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const updateUserRole = async (req, res) => {
    try {
        // Find user by id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Update user role
        user.role = req.body.role || user.role;
        await user.save();

        const safeUser = safeDocument(user);
        res.status(200).json(
            new ApiResponse(200, "User role updated successfully", safeUser)
        );
    } catch (error) {
        console.error("UpdateRole Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const filterUsers = async (req, res) => {
    try {
        const { name, email, role, username } = req.query;

        const filters = {};
        if (name) filters.name = { $regex: name, $options: "i" };
        if (email) filters.email = { $regex: email, $options: "i" };
        if (role) filters.role = role;
        if (username) filters.username = { $regex: username, $options: "i" };

        const users = await User.find(filters);
        res.status(200).json(
            new ApiResponse(200, "Users filtered successfully", users)
        );
    } catch (error) {
        console.error("FilterUsers Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

// ------------ USER ROUTES ---------
export const getMyProfile = async (req, res) => {
    try {
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        const safeUser = safeDocument(user);
        res.status(200).json(
            new ApiResponse(200, "Current user fetched successfully", safeUser)
        );
    } catch (error) {
        console.error("GetCurrentUser Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const updateMyProfile = async (req, res) => {
    try {
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Update user fields
        const { name, username } = req.body;
        user.name = name || user.name;
        user.username = username || user.username;
        await user.save();
        const safeUser = safeDocument(user);
        res.status(200).json(
            new ApiResponse(200, "Current user updated successfully", safeUser)
        );
    } catch (error) {
        console.error("UpdateCurrentUser Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const changeMyPassword = async (req, res) => {
    try {
        // Find user
        const user = await User.findById(req.user.id).select("+password");
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Validate passwords
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res
                .status(400)
                .json(new ApiResponse(400, "All fields are required"));
        }

        if (currentPassword === newPassword) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        "New password must be different from current password"
                    )
                );
        }

        // Check current password
        const isMatch = await compareHash(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json(new ApiResponse(401, "Current password is incorrect"));
        }

        // Validate password strength
        const { valid, message } = passwordValidator(newPassword);
        if (!valid) {
            return res.status(400).json(new ApiResponse(400, message));
        }

        // Hash new password
        const hashedPassword = await hashValue(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json(
            new ApiResponse(200, "Password changed successfully")
        );
    } catch (error) {
        console.error("ChangePassword Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteMyAccount = async (req, res) => {
    try {
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "User not found"));
        }

        // Delete user
        await user.deleteOne();
        res.status(200).json(
            new ApiResponse(200, "User account deleted successfully")
        );
    } catch (error) {
        console.error("DeleteMyAccount Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const getMyStats = async (req, res) => {
    try {
        const userId = req.user.id;

        let { priority } = req.query;
        if (!PRIORITY_LEVELS.includes(priority)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        `Invalid priority level. Please choose one of the following: ${PRIORITY_LEVELS.join(", ")}.`
                    )
                );
        }

        // Get total todos count
        const totalTodos = await Todo.countDocuments({ userId, priority });

        // Get completed todos count
        const completedTodos = await Todo.countDocuments({
            userId,
            status: "completed",
            priority,
        });

        // Get pending todos count
        const pendingTodos = await Todo.countDocuments({
            userId,
            status: "not started",
            priority,
        });

        // Get in-progress todos count
        const inProgressTodos = await Todo.countDocuments({
            userId,
            status: "in progress",
            priority,
        });

        res.status(200).json(
            new ApiResponse(200, "User stats fetched successfully", {
                priority,
                totalTodos,
                completedTodos,
                inProgressTodos,
                pendingTodos,
            })
        );
    } catch (error) {
        console.error("GetMyStats Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};
