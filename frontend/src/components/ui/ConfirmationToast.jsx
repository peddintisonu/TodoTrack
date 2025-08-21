import { toast } from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

import Button from "./Button";

export default function ConfirmationToast({ t, onConfirm, message }) {
    // Closes the toast and triggers the confirmation action.
    const handleConfirm = () => {
        onConfirm();
        toast.dismiss(t.id);
    };

    // Simply closes the toast.
    const handleCancel = () => {
        toast.dismiss(t.id);
    };

    return (
        <div className="flex items-start gap-4 rounded-lg bg-bg p-4 shadow-lg border border-primary/50 max-w-sm">
            <AlertTriangle className="h-6 w-6 text-primary mt-0.5" />

            <div className="flex-1">
                <p className="font-semibold text-fg">{message}</p>
                <div className="mt-4 flex gap-2">
                    <Button
                        onClick={handleConfirm}
                        variant="primary"
                        className="!px-3 !py-1.5 !text-sm !bg-red-600 hover:!bg-red-700 active:!bg-red-800"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="secondary"
                        className="!px-3 !py-1.5 !text-sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
