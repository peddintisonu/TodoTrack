import api from "./axios";

// Handles user login request.
export const login = async (credentials) => {
    const response = await api.post("/auth/sign-in", credentials);
    return response.data.data; // Returns { user, accessToken }
};

// Handles new user signup request.
export const signup = async (data) => {
    const response = await api.post("/auth/sign-up", data);
    return response.data.data; // Returns { user, accessToken }
};

// Handles user logout request.
export const logout = async () => {
    const response = await api.post("/auth/signout");
    return response.data.data;
};
