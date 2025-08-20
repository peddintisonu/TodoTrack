import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { Sun, Moon, User, LogOut } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth(); 
    const { theme, toggleTheme } = useTheme();

    const iconButtonClasses =
        "btn-secondary !p-2 rounded-full h-10 w-10 inline-flex items-center justify-center transition-colors hover:bg-primary-100 hover:text-primary dark:hover:bg-primary-900/30";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left side: Logo and App Name */}
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    aria-label="Go to homepage"
                >
                    <img
                        src="/logo.svg"
                        alt="TodoTrack Logo"
                        className="h-8 w-8"
                    />
                    <span className="text-xl font-bold tracking-tight text-fg hidden sm:inline">
                        TodoTrack
                    </span>
                </Link>

                {/* Right side: Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle Button (Always visible) */}
                    <button
                        onClick={toggleTheme}
                        className={iconButtonClasses}
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </button>

                    {/* Conditional rendering for authenticated users */}
                    {user && (
                        <>
                            {/* Profile Button */}
                            <Link
                                to="/profile"
                                className={iconButtonClasses}
                                aria-label="View your profile"
                            >
                                <User className="h-5 w-5" />
                            </Link>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className={iconButtonClasses}
                                aria-label="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
