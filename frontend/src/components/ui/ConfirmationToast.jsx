import { toast } from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

/**
 * A custom toast component for confirming actions.
 * @param {object} props
 * @param {object} props.t - The toast object provided by react-hot-toast.
 * @param {function} props.onConfirm - The function to call when the user confirms.
 * @param {string} props.message - The confirmation message to display.
 */
export default function ConfirmationToast({ t, onConfirm, message }) {
    const handleConfirm = () => {
        onConfirm();
        toast.dismiss(t.id);
    };

    const handleCancel = () => {
        toast.dismiss(t.id);
    };

    return (
        <div className="flex items-center gap-4 rounded-lg bg-bg p-4 shadow-lg border border-border max-w-sm">
            <div className="text-primary">
                <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="flex-1">
                <p className="font-semibold text-fg">{message}</p>
                <div className="mt-3 flex gap-2">
                    <Button
                        onClick={handleConfirm}
                        variant="primary"
                        className="!px-3 !py-1.5 !text-sm !bg-red-600 hover:!bg-red-700"
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
