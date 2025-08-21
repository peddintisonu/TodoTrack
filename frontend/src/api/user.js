import api from "./axios";

// Fetches the current user's profile information.
export const getMyProfile = async () => {
    const response = await api.get("/users/me");
    return response.data.data;
};

// Fetches the current user's todo statistics.
export const getMyStats = async () => {
    const response = await api.get("/users/me/stats");
    return response.data.data;
};

// Updates the current user's profile information.
export const updateMyProfile = async (profileData) => {
    const response = await api.put("/users/me", profileData);
    return response.data.data;
};

// Changes the current user's password.
export const changeMyPassword = async (passwordData) => {
    const response = await api.patch("/users/me/password", passwordData);
    return response.data.data;
};

// Deletes the current user's account.
export const deleteMyAccount = async () => {
    const response = await api.delete("/users/me");
    return response.data.data;
};
