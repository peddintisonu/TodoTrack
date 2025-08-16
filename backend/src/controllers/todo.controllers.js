import ApiResponse from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import { safeDocument } from "../utils/safeDocument.js";
import { PRIORITY_LEVELS, STATUS_LEVELS } from "../constants.js";

// ADMIN ROUTES
export const getAllTodos = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filters = {};
        if (status) filters.status = status;
        if (priority) filters.priority = priority;

        const todos = await Todo.find(filters);

        if (!todos || todos.length === 0) {
            return res.status(404).json(new ApiResponse(404, "No todos found"));
        }

        const safeTodos = todos.map((todo) => safeDocument(todo));
        res.status(200).json(
            new ApiResponse(200, "All todos fetched successfully", safeTodos)
        );
    } catch (error) {
        console.error("GetAllTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteAllTodos = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }

        // Remove all todos
        await Todo.deleteMany({});
        res.status(200).json(
            new ApiResponse(200, "All todos deleted successfully")
        );
    } catch (error) {
        console.error("RemoveAllTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const getUserTodos = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filters = {};
        if (status) filters.status = status;
        if (priority) filters.priority = priority;

        // Fetch all todos for the current user
        const todos = await Todo.find({ userId: req.params.id, ...filters });

        if (!todos || todos.length === 0) {
            return res.status(404).json(new ApiResponse(404, "No todos found"));
        }

        res.status(200).json(
            new ApiResponse(200, "User todos fetched successfully", todos)
        );
    } catch (error) {
        console.error("GetUserTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteUserTodos = async (req, res) => {
    try {
        // Remove all todos for a specific user
        await Todo.deleteMany({ userId: req.params.id });
        res.status(200).json(
            new ApiResponse(200, "All todos for user deleted successfully")
        );
    } catch (error) {
        console.error("RemoveUserTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

// USER ROUTES
export const getMyTodos = async (req, res) => {
    try {
        const { status, priority } = req.query;

        let filters = {};
        if (status) filters.status = status;
        if (priority) filters.priority = priority;

        const todos = await Todo.find({ userId: req.user.id, ...filters });
        if (!todos || todos.length === 0) {
            return res.status(404).json(new ApiResponse(404, "No todos found"));
        }

        const safeTodos = todos.map((todo) => safeDocument(todo));
        res.status(200).json(
            new ApiResponse(200, "User todos fetched successfully", safeTodos)
        );
    } catch (error) {
        console.error("GetUserTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteMyTodos = async (req, res) => {
    try {
        // Remove all todos for a specific user
        await Todo.deleteMany({ userId: req.user.id });
        res.status(200).json(
            new ApiResponse(
                200,
                "All your todos have been successfully deleted"
            )
        );
    } catch (error) {
        console.error("RemoveUserTodos Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

// COMMON ROUTES
export const getTodoById = async (req, res) => {
    try {
        // Validate request parameters
        if (!req.params.id) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Todo ID is required"));
        }

        // Fetch todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json(new ApiResponse(404, "Todo not found"));
        }

        // Check user permissions if the todo is found
        if (req.user.role === "admin" || req.user.id === todo?.userId) {
            res.status(200).json(
                new ApiResponse(200, "Todo fetched successfully", todo)
            );
        } else {
            // User is not authorized to access this todo if he is not the owner
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
    } catch (error) {
        console.error("GetOneTodo Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const createTodo = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        // Validate request body
        if (!title) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Title is required"));
        }

        // Create new todo
        const newTodo = await Todo.create({
            userId: req.user.id,
            title,
            description,
            status,
            priority,
        });

        res.status(201).json(
            new ApiResponse(201, "Todo created successfully", newTodo)
        );
    } catch (error) {
        console.error("CreateTodo Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const updateTodoStatus = async (req, res) => {
    try {
        // Validate request parameters
        if (!req.params.id) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Todo ID is required"));
        }

        if (!req.body.status || !STATUS_LEVELS.includes(req.body.status)) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        `Invalid status level. Please choose one of the following: ${STATUS_LEVELS.join(", ")}.`
                    )
                );
        }

        // Fetch todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json(new ApiResponse(404, "Todo not found"));
        }

        // Check user permissions if the todo is found
        if (
            req.user.role === "admin" ||
            req.user.id === todo.userId.toString()
        ) {
            todo.status = req.body.status;
            await todo.save();
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Todo status updated successfully",
                        todo
                    )
                );
        } else {
            // User is not authorized to modify this todo if he is not the owner
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
    } catch (error) {
        console.error("ModifyStatus Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const updateTodoPriority = async (req, res) => {
    try {
        // Validate request parameters
        if (!req.params.id) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Todo ID is required"));
        }
        if (
            !req.body.priority ||
            !PRIORITY_LEVELS.includes(req.body.priority)
        ) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        `Invalid priority level. Please choose one of the following: ${PRIORITY_LEVELS.join(", ")}.`
                    )
                );
        }

        // Fetch todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json(new ApiResponse(404, "Todo not found"));
        }

        // Check user permissions if the todo is found
        if (
            req.user.role === "admin" ||
            req.user.id === todo.userId.toString()
        ) {
            todo.priority = req.body.priority || todo.priority;
            await todo.save();
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Todo priority updated successfully",
                        todo
                    )
                );
        } else {
            // User is not authorized to modify this todo if he is not the owner
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
    } catch (error) {
        console.error("ModifyPriority Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const updateTodo = async (req, res) => {
    try {
        // Validate request parameters
        if (!req.params.id) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Todo ID is required"));
        }

        // Fetch todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json(new ApiResponse(404, "Todo not found"));
        }

        // Check user permissions if the todo is found
        if (
            req.user.role === "admin" ||
            req.user.id === todo.userId.toString()
        ) {
            todo.title = req.body.title || todo.title;
            todo.description = req.body.description || todo.description;
            todo.status = req.body.status || todo.status;
            todo.priority = req.body.priority || todo.priority;

            await todo.save();

            return res
                .status(200)
                .json(new ApiResponse(200, "Todo updated successfully", todo));
        } else {
            // User is not authorized to modify this todo
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
    } catch (error) {
        console.error("ModifyTodo Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};

export const deleteTodo = async (req, res) => {
    try {
        // Validate request parameters
        if (!req.params.id) {
            return res
                .status(400)
                .json(new ApiResponse(400, "Todo ID is required"));
        }

        // Fetch todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json(new ApiResponse(404, "Todo not found"));
        }

        // Check user permissions if the todo is found
        if (
            req.user.role === "admin" ||
            req.user.id === todo.userId.toString()
        ) {
            await todo.deleteOne();
            return res
                .status(200)
                .json(new ApiResponse(200, "Todo removed successfully"));
        } else {
            // User is not authorized to modify this todo if he is not the owner
            return res.status(403).json(new ApiResponse(403, "Forbidden"));
        }
    } catch (error) {
        console.error("RemoveTodo Error:", error);
        res.status(500).json(new ApiResponse(500, "Internal server error"));
    }
};
