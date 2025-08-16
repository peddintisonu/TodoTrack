import { Router } from "express";
import {
	createTodo,
	getAllTodos,
	getOneTodo,
	modifyStatus,
	modifyTodo,
	removeTodo,
} from "../controllers/todo.controllers.js";
const router = Router();

// api/v1/todos
router.get("/", getAllTodos);
router.get("/:id", getOneTodo);
router.post("/", createTodo);
router.put("/:id", modifyTodo);
router.patch("/:id/status", modifyStatus);
router.delete("/:id", removeTodo);

export default router;
