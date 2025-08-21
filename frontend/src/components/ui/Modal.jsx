import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    // Render nothing if the modal is not open.
    if (!isOpen) {
        return null;
    }

    return (
        // Backdrop overlay that covers the entire screen.
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            {/* Modal panel that contains the content. */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the panel.
                className="relative w-full max-w-lg rounded-2xl bg-bg border border-border shadow-xl m-4"
            >
                {/* Optional header with title and close button. */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="text-xl font-semibold !m-0">{title}</h2>
                        <button
                            onClick={onClose}
                            className="btn-secondary !p-2 h-9 w-9"
                            aria-label="Close modal" // Added for accessibility.
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* Main content area for the form or other components. */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
