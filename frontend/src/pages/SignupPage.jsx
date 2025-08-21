import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

import PageLayout from "../components/layout/PageLayout";
import AuthForm from "../components/auth/AuthForm";

export default function SignupPage() {
    useDocumentTitle("Sign Up");

    const navigate = useNavigate();
    const { user, signup } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
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
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signup(formData);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
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
                />
            </div>
        </PageLayout>
    );
}
