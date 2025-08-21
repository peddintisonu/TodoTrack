import api from "./axios";

export const getMyProfile = async () => {
    const response = await api.get("/users/me");
    return response.data.data; // The key change is here
};

export const getMyStats = async () => {
    const response = await api.get("/users/me/stats");
    return response.data.data; // And here
};

export const updateMyProfile = async (profileData) => {
    const response = await api.put("/users/me", profileData);
    return response.data.data; // And here
};

export const changeMyPassword = async (passwordData) => {
    const response = await api.patch("/users/me/password", passwordData);
    return response.data.data; // And here
};

export const deleteMyAccount = async () => {
    const response = await api.delete("/users/me");
    return response.data.data; // And here
};
