import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

import useAuth from "../hooks/useAuth";

import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
    const { user, logout } = useAuth();

    // A single source of truth for all icon button styles.
    const iconButtonClasses =
        "inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors hover:bg-primary-100 hover:text-primary dark:hover:bg-primary-900/30";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* App Logo and Name */}
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

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <ThemeToggle className={iconButtonClasses} />

                    {user && (
                        <>
                            <Link
                                to="/profile"
                                className={iconButtonClasses}
                                aria-label="View profile"
                            >
                                <User className="h-5 w-5" />
                            </Link>

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
