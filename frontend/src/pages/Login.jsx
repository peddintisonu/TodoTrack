import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import PageLayout from "../components/layout/PageLayout";
import AuthForm from "../components/AuthForm";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ credential: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.credential)
            newErrors.credential = "Email or Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await login(formData);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Invalid credentials. Please try again."
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
                    errors={errors}
                />
            </div>
        </PageLayout>
    );
}
