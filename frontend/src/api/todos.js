import api from "./axios";

// ... (JSDoc comments omitted for brevity, they remain the same)

export const getMyTodos = async () => {
    const response = await api.get("/todos/me");
    return response.data.data; // The key change is here
};

export const deleteMyTodos = async () => {
    const response = await api.delete("/todos/me");
    return response.data.data; // And here
};

export const createTodo = async (todoData) => {
    const response = await api.post("/todos", todoData);
    return response.data.data; // And here
};

export const getTodoById = async (todoId) => {
    const response = await api.get(`/todos/${todoId}`);
    return response.data.data; // And here
};

export const updateTodo = async (todoId, updateData) => {
    const response = await api.put(`/todos/${todoId}`, updateData);
    return response.data.data; // And here
};

export const updateTodoStatus = async (todoId, status) => {
    const response = await api.patch(`/todos/${todoId}/status`, { status });
    return response.data.data; // And here
};

export const updateTodoPriority = async (todoId, priority) => {
    const response = await api.patch(`/todos/${todoId}/priority`, { priority });
    return response.data.data; // And here
};

export const deleteTodo = async (todoId) => {
    const response = await api.delete(`/todos/${todoId}`);
    return response.data.data; // And here
};
