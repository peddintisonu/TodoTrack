import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ id, label, error, type = "text", ...props }) {
    const [isVisible, setIsVisible] = useState(false);
    const isPassword = type === "password";

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={isPassword ? (isVisible ? "text" : "password") : type}
                    className="input pr-10"
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-fg"
                        aria-label={
                            isVisible ? "Hide password" : "Show password"
                        }
                    >
                        {isVisible ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
            {/* THE FIX: 'error' is now expected to be a simple string. */}
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
