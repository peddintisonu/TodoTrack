import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen bg-bg text-fg">
            <Navbar />
            <main className="flex-1 container mx-auto p-8">
                <h1 className="text-4xl font-bold">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-muted mt-2">
                    Here are your tasks for today.
                </p>
                {/* Your actual Todo list, create button, etc. will go here */}
            </main>
            <Footer />
        </div>
    );
}
