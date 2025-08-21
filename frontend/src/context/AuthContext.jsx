import { createContext, useState, useEffect } from "react";
import {
    login as apiLogin,
    signup as apiSignup,
    logout as apiSignout,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This part runs on initial page load or refresh
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            // Note: We don't need to load the token into React state.
            // The Axios interceptor will read it directly from localStorage when needed.
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem("user"); // Clear corrupted data
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        // `authData` will be the object: { user: {...}, accessToken: "..." }
        const authData = await apiLogin(credentials);

        const userToStore = authData.user;
        const tokenToStore = authData.accessToken;

        if (userToStore && tokenToStore) {
            // THE FIX: Save both the user object and the access token
            localStorage.setItem("user", JSON.stringify(userToStore));
            localStorage.setItem("accessToken", tokenToStore);
            setUser(userToStore);
        }

        return authData;
    };

    const signup = async (data) => {
        // `authData` will be the object: { user: {...}, accessToken: "..." }
        const authData = await apiSignup(data);

        const userToStore = authData.user;
        const tokenToStore = authData.accessToken;

        if (userToStore && tokenToStore) {
            // THE FIX: Save both the user object and the access token
            localStorage.setItem("user", JSON.stringify(userToStore));
            localStorage.setItem("accessToken", tokenToStore);
            setUser(userToStore);
        }

        return authData;
    };

    const logout = async () => {
        try {
            await apiSignout();
        } catch (error) {
            console.error(
                "Logout API call failed, logging out client-side anyway.",
                error
            );
        } finally {
            // THE FIX: Remove both items for a complete logout
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            window.location.href = "/login"; // Force a full redirect to clear all state
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
