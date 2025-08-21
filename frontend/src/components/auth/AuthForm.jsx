import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Spinner from "../ui/Spinner";

const formConfig = {
    login: {
        title: "Welcome Back!",
        buttonText: "Login",
        switchMessage: "Don't have an account?",
        switchLinkText: "Sign Up",
        switchLinkTo: "/signup",
        inputs: [
            {
                id: "credential",
                label: "Email or Username",
                type: "text",
                placeholder: "johndoe or john@example.com",
            },
            {
                id: "password",
                label: "Password",
                type: "password",
                placeholder: "••••••••",
            },
        ],
    },
    signup: {
        title: "Create an Account",
        buttonText: "Create Account",
        switchMessage: "Already have an account?",
        switchLinkText: "Login",
        switchLinkTo: "/login",
        inputs: [
            {
                id: "name",
                label: "Full Name",
                type: "text",
                placeholder: "John Doe",
            },
            {
                id: "username",
                label: "Username",
                type: "text",
                placeholder: "johndoe",
            },
            {
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "john@example.com",
            },
            {
                id: "password",
                label: "Password",
                type: "password",
                placeholder: "••••••••",
            },
        ],
    },
};

export default function AuthForm({
    mode,
    onSubmit,
    isLoading,
    formData,
    handleInputChange,
}) {
    const config = formConfig[mode];

    return (
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-bg p-6 sm:p-8 shadow-lg">
            <div className="text-center">
                <h1 className="text-3xl font-bold">{config.title}</h1>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {config.inputs.map((input) => (
                    <Input
                        key={input.id}
                        id={input.id}
                        name={input.id}
                        label={input.label}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={formData[input.id] || ""}
                        onChange={handleInputChange}
                        // The error prop is no longer passed to the Input component.
                    />
                ))}

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full !py-3 !text-base"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner size={20} /> : config.buttonText}
                </Button>
            </form>

            <p className="text-center text-sm text-muted">
                {config.switchMessage}{" "}
                <Link
                    to={config.switchLinkTo}
                    className="font-medium text-primary hover:underline"
                >
                    {config.switchLinkText}
                </Link>
            </p>
        </div>
    );
}
