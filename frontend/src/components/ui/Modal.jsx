import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                className="relative w-full max-w-lg rounded-2xl bg-bg border border-border shadow-xl m-4"
            >
                {/* Optional Header */}
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="text-xl font-semibold !m-0">{title}</h2>
                        <button
                            onClick={onClose}
                            className="btn-secondary !p-2 h-9 w-9"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* Main Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
