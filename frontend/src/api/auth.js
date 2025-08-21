import api from "./axios";

export const login = async (credentials) => {
    const response = await api.post("/auth/sign-in", credentials);
    // Return the object containing both user and accessToken
    // So we are returning response.data.data -> { user: {...}, accessToken: "..." }
    return response.data.data;
};

export const signup = async (data) => {
    const response = await api.post("/auth/sign-up", data);
    // Same here, return the object with user and accessToken
    return response.data.data;
};

export const logout = async () => {
    const response = await api.post("/auth/signout");
    // For logout, we might just care about success, but unwrapping is consistent
    return response.data.data;
};
