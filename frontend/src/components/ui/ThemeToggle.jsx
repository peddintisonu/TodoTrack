import { Sun, Moon } from "lucide-react";
import { clsx } from "clsx";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle({ className, ...props }) {
    const { theme, toggleTheme } = useTheme();

    const combinedClasses = clsx(
        "inline-flex items-center justify-center",
        className
    );

    return (
        <button
            onClick={toggleTheme}
            className={combinedClasses}
            aria-label="Toggle theme"
            {...props}
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </button>
    );
}
