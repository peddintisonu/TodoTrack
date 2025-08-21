import api from "./axios";

// Fetches all todos for the current user.
export const getMyTodos = async () => {
    const response = await api.get("/todos/me");
    return response.data.data;
};

// Deletes all todos for the current user.
export const deleteMyTodos = async () => {
    const response = await api.delete("/todos/me");
    return response.data.data;
};

// Creates a new todo.
export const createTodo = async (todoData) => {
    const response = await api.post("/todos", todoData);
    return response.data.data;
};

// Fetches a single todo by its ID.
export const getTodoById = async (todoId) => {
    const response = await api.get(`/todos/${todoId}`);
    return response.data.data;
};

// Updates an entire todo.
export const updateTodo = async (todoId, updateData) => {
    const response = await api.put(`/todos/${todoId}`, updateData);
    return response.data.data;
};

// Updates only the status of a todo.
export const updateTodoStatus = async (todoId, status) => {
    const response = await api.patch(`/todos/${todoId}/status`, { status });
    return response.data.data;
};

// Updates only the priority of a todo.
export const updateTodoPriority = async (todoId, priority) => {
    const response = await api.patch(`/todos/${todoId}/priority`, { priority });
    return response.data.data;
};

// Deletes a single todo by its ID.
export const deleteTodo = async (todoId) => {
    const response = await api.delete(`/todos/${todoId}`);
    return response.data.data;
};
