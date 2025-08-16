import { Router } from "express";
import {
    getAllTodos,
    createTodo,
    getMyTodos,
    getTodoById,
    updateTodoStatus,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
    deleteMyTodos,
    getUserTodos,
    deleteUserTodos,
    updateTodoPriority,
} from "../controllers/todo.controllers.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

// Base: /api/v1/todos

// ---------- Admin routes ----------
router.get("/all", restrictTo("admin"), getAllTodos); // Get all todos
router.delete("/all", restrictTo("admin"), deleteAllTodos); // Delete all todos
router.get("/user/:id", restrictTo("admin"), getUserTodos); // Get todos of a user
router.delete("/user/:id", restrictTo("admin"), deleteUserTodos); // Delete todos of a user

// ---------- Current user routes ----------
router.get("/me", getMyTodos); // Get my todos
router.delete("/me", deleteMyTodos); // Delete all my todos

// ---------- Todo routes ----------
router.post("/", createTodo); // Create todo
router.get("/:id", getTodoById); // Get todo by id
router.put("/:id", updateTodo); // Update todo
router.patch("/:id/status", updateTodoStatus); // Update status
router.patch("/:id/priority", updateTodoPriority); // Update priority
router.delete("/:id", deleteTodo); // Delete todo

export default router;
