import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border hover:bg-border/30 transition cursor-pointer"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-fg" />
            ) : (
                <Sun className="w-5 h-5 text-fg" />
            )}
        </button>
    );
}
