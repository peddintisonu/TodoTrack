// src/pages/Home.jsx
import useAuth from "../hooks/useAuth";
import LandingPage from "./LandingPage";
import DashboardPage from "./Dashboard";
import Spinner from "../components/ui/Spinner"; // Import the spinner

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-bg">
                <Spinner size={48} />
            </div>
        );
    }

    return user ? <DashboardPage /> : <LandingPage />;
}
