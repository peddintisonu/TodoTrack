import { Link } from "react-router-dom";

export default function Button({
    to,
    variant = "primary",
    className = "",
    children,
    ...props
}) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-colors";
    const variantClasses =
        variant === "primary" ? "btn-primary" : "btn-secondary";

    // Combine classes using template literals
    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
