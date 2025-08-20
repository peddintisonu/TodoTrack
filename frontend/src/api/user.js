import api from "./axios"; // Your configured Axios instance

/**
 * Fetches the profile of the currently authenticated user.
 * Corresponds to: GET /me
 * @returns {Promise<object>} The user's profile data.
 */
export const getMyProfile = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

/**
 * Fetches statistics for the currently authenticated user.
 * Corresponds to: GET /me/stats
 * @returns {Promise<object>} The user's stats data.
 */
export const getMyStats = async () => {
    const response = await api.get("/users/me/stats");
    return response.data;
};

/**
 * Updates the profile of the currently authenticated user.
 * Corresponds to: PUT /me
 * @param {object} profileData - The updated user data (e.g., { name, email }).
 * @returns {Promise<object>} The updated user profile data.
 */
export const updateMyProfile = async (profileData) => {
    const response = await api.put("/users/me", profileData);
    return response.data;
};

/**
 * Changes the password for the currently authenticated user.
 * Corresponds to: PATCH /me/password
 * @param {object} passwordData - The password data (e.g., { oldPassword, newPassword }).
 * @returns {Promise<object>} A success message.
 */
export const changeMyPassword = async (passwordData) => {
    const response = await api.patch("/users/me/password", passwordData);
    return response.data;
};

/**
 * Deletes the account of the currently authenticated user.
 * Corresponds to: DELETE /me
 * @returns {Promise<object>} A success message.
 */
export const deleteMyAccount = async () => {
    const response = await api.delete("/users/me");
    return response.data;
};
