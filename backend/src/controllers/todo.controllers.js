import {
    addTodo,
    getTodosByUserId,
    updateTodo,
    updateStatus,
    deleteTodo,
    getTodoById,
} from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
    const userId = req.user.id;
    try {
        const todos = await getTodosByUserId(userId);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
};

export const getOneTodo = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const todo = await getTodoById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todo" });
    }
};

export const createTodo = async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const newTodo = await addTodo({ userId, title, description });
        res.status(201).json({ message: "Todo created successfully", newTodo });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo" });
    }
};

export const modifyTodo = async (req, res) => {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    console.log(id);

    console.log(req.body);

    if (!title && !description) {
        return res
            .status(400)
            .json({ message: "Title or description is required" });
    }

    const todo = await getTodoById(id);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const updatedTodo = await updateTodo(id, { title, description });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
};

export const modifyStatus = async (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }

    const todo = await getTodoById(id);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const updatedTodo = await updateStatus(id, status);
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo status updated successfully",
            updatedTodo,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating todo status" });
    }
};

export const removeTodo = async (req, res) => {
    const id = Number(req.params.id);

    const todo = await getTodoById(id);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const deletedTodo = await deleteTodo(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            deletedTodo,
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
};
