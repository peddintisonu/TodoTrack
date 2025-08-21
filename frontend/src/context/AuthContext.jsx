import { createContext, useState, useEffect } from "react";

import {
    login as apiLogin,
    signup as apiSignup,
    logout as apiLogout,
} from "../api/auth";

// The context is now a local constant, not exported.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Handles setting user state and storing session data.
    const handleAuthSuccess = (authData) => {
        const userToStore = authData?.user;
        const tokenToStore = authData?.accessToken;

        if (userToStore && tokenToStore) {
            localStorage.setItem("user", JSON.stringify(userToStore));
            localStorage.setItem("accessToken", tokenToStore);
            setUser(userToStore);
        }
    };

    // On initial load, check for an existing session in localStorage.
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            localStorage.removeItem("user");
        }
        setLoading(false);
    }, []);

    // Handles user login.
    const login = async (credentials) => {
        const authData = await apiLogin(credentials);
        handleAuthSuccess(authData);
        return authData;
    };

    // Handles new user signup.
    const signup = async (data) => {
        const authData = await apiSignup(data);
        handleAuthSuccess(authData);
        return authData;
    };

    // Handles user logout.
    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error(
                "Logout API call failed, logging out client-side anyway:",
                error
            );
        } finally {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the context itself for the hook to use.
export default AuthContext;
