import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

import PageLayout from "../components/layout/PageLayout";
import AuthForm from "../components/auth/AuthForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [formData, setFormData] = useState({ credential: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if the user is already logged in.
    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    // Update form state on user input.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission and API call.
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(formData);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid credentials."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className="h-full flex items-center justify-center p-4">
                <AuthForm
                    mode="login"
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            </div>
        </PageLayout>
    );
}
