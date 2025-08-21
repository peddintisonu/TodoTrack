import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PageLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-bg text-fg font-sans">
            <Navbar />
            <main className="flex-1 relative">{children}</main>
            <Footer />
        </div>
    );
}
