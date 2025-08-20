// src/api/auth.js
import api from "./axios";
// Signup
export const signup = async (data) => {
    const res = await api.post("/auth/sign-up", data);
    if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
    }
    return res.data;
};

// Login
export const login = async (data) => {
    const res = await api.post("/auth/sign-in", data);
    if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
    }
    return res.data;
};

// Logout
export const logout = async () => {
    localStorage.removeItem("accessToken");
    return api.post("/auth/sign-out");
};

// Get logged-in user
export const getMe = () => api.get("/auth/me");
