import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-bg">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-6">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.svg"
                        alt="TodoTrack Logo"
                        className="h-6 w-6"
                    />
                    <span className="font-semibold text-fg">TodoTrack</span>
                </Link>
                <p className="text-sm text-muted">
                    © {new Date().getFullYear()} TodoTrack. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
