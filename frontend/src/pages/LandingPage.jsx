import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import Separator from "../components/ui/Separator"; // Import the new component
import { features } from "../constants.jsx";

export default function LandingPage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="container mx-auto flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                    Clarity Through{" "}
                    <span className="text-primary">Simplicity</span>.
                    <br />
                    Master Your Tasks.
                </h1>
                <p className="mt-6 text-lg text-muted max-w-2xl">
                    TodoTrack strips away the complexity. A clean, fast, and
                    focused to-do list for people who want to get things done.
                </p>
                <div className="mt-8">
                    <Button
                        to="/signup"
                        variant="primary"
                        className="text-lg px-8 py-3"
                    >
                        Get Started for Free
                    </Button>
                </div>
            </section>

            {/* Visual Separator */}
            <Separator />

            {/* Features Section */}
            <section
                id="features"
                className="container mx-auto px-4 py-20 sm:py-28"
            >
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Everything you need. Nothing you don't.
                    </h2>
                    <p className="mt-4 text-muted">
                        Our core features are designed for maximum focus and
                        efficiency.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center p-4">
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/20 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-muted">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
