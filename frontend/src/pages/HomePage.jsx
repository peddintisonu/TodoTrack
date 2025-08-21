import useAuth from "../hooks/useAuth";

import LandingPage from "./LandingPage";
import DashboardPage from "./DashboardPage";
import Spinner from "../components/ui/Spinner";

export default function HomePage() {
    const { user, loading } = useAuth();

    // While checking for a user session, display a loading spinner.
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-bg">
                <Spinner size={48} />
            </div>
        );
    }

    // After loading, render the appropriate page based on authentication status.
    return user ? <DashboardPage /> : <LandingPage />;
}
