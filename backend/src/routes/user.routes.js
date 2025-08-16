import { Router } from "express";
import {
    changeMyPassword,
    deleteUserById,
    getAllUsers,
    getMyProfile,
    getUserById,
    updateMyProfile,
    updateUserRole,
    getMyStats,
    deleteMyAccount,
} from "../controllers/user.controllers.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

// Base: /api/v1/users
// ---------- Current user routes ----------
router.get("/me", getMyProfile); // Get my profile
router.get("/me/stats", getMyStats); // Get my stats
router.put("/me", updateMyProfile); // Update my profile
router.patch("/me/password", changeMyPassword); // Change my password
router.delete("/me", deleteMyAccount); // Delete my account

// ---------- Admin routes ----------
router.get("/", restrictTo("admin"), getAllUsers); // Get all users
router.get("/:id", restrictTo("admin"), getUserById); // Get user by id
router.patch("/:id/role", restrictTo("admin"), updateUserRole); // Update user role
router.delete("/:id", restrictTo("admin"), deleteUserById); // Delete user by id

export default router;
