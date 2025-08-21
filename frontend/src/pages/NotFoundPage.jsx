import { Frown } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
    return (
        <PageLayout>
            {/* Main container to center the content on the page. */}
            <div className="flex h-full flex-col items-center justify-center text-center p-4">
                <Frown className="h-16 w-16 text-primary" />
                <h1 className="mt-4 text-6xl font-extrabold text-fg">404</h1>
                <h2 className="mt-2 text-2xl font-semibold">Page Not Found</h2>
                <p className="mt-2 max-w-sm text-muted">
                    Sorry, we couldn’t find the page you’re looking for. It
                    might have been moved or deleted.
                </p>
                <Button to="/" variant="primary" className="mt-6 !px-6 !py-3">
                    Go Back Home
                </Button>
            </div>
        </PageLayout>
    );
}
