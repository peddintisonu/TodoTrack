import { Link } from "react-router-dom";

export default function Button({
    to,
    variant = "primary",
    className = "",
    children,
    ...props
}) {
    // Determine the correct CSS class based on the variant prop.
    const variantClass =
        variant === "primary" ? "btn-primary" : "btn-secondary";

    // Combine the variant class with any additional classes passed via props.
    const combinedClasses = `${variantClass} ${className}`;

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
