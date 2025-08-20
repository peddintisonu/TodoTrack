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

    // Check stored user
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await apiLogin(credentials);
        setUser(res.data.user);
        return res;
    };

    const signup = async (data) => {
        const res = await apiSignup(data);
        setUser(res.data.user);
        return res;
    };

    const logout = async () => {
        await apiSignout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
