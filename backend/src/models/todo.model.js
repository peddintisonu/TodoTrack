import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const todosFilePath = path.join(__dirname, "../../database/todos.json");

function readTodos() {
	const data = fs.readFileSync(todosFilePath, "utf-8");
	return JSON.parse(data);
}

function writeTodos(data) {
	fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2));
}

// ─────────────────────────────────────────────────────────────

export function getTodosByUserId(userId) {
	return readTodos().filter((todo) => todo.userId === userId);
}

export function getTodoById(id) {
	return readTodos().find((todo) => todo.id === id);
}

export function addTodo({ userId, title, description }) {
	const todos = readTodos();
	const newTodo = {
		id: Date.now(),
		userId,
		title,
		description,
		status: "not started",
	};
	todos.push(newTodo);
	writeTodos(todos);
	return newTodo;
}

export function updateStatus(id, status) {
	const todos = readTodos();
	const todo = todos.find((t) => t.id === id);
	if (todo) {
		todo.status = status;
		writeTodos(todos);
	}
	return todo;
}

export function updateTodo(id, { title, description }) {
	const todos = readTodos();
	const todo = todos.find((t) => t.id === id);
	if (todo) {
		if (title) todo.title = title;
		if (description) todo.description = description;
		writeTodos(todos);
	}
	return todo;
}

export function deleteTodo(id) {
	const todos = readTodos();
	const index = todos.findIndex((t) => t.id === id);
	if (index !== -1) {
		const removed = todos.splice(index, 1)[0];
		writeTodos(todos);
		return removed;
	}
	return null;
}
