import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import PageLayout from "../components/layout/PageLayout";
import AuthForm from "../components/AuthForm";

export default function Signup() {
    const navigate = useNavigate();
    const { user, signup } = useAuth();

    if(user) {
        navigate("/");
    }

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await signup(formData);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Signup failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className="h-full flex items-center justify-center p-4">
                <AuthForm
                    mode="signup"
                    onSubmit={handleSignup}
                    isLoading={isLoading}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />
            </div>
        </PageLayout>
    );
}
