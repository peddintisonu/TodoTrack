import { toast } from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ConfirmationToast({ t, onConfirm, message }) {
    const handleConfirm = () => {
        onConfirm();
        toast.dismiss(t.id);
    };

    const handleCancel = () => {
        toast.dismiss(t.id);
    };

    return (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-bg p-6 shadow-2xl border border-border max-w-sm text-center">
            <AlertTriangle className="h-10 w-10 text-primary" />

            <p className="text-lg font-semibold text-fg">{message}</p>

            <div className="mt-2 flex w-full gap-4">
                <Button
                    onClick={handleConfirm}
                    variant="primary"
                    className="w-full !px-6 !py-2 !text-base !bg-red-600 hover:!bg-red-700 active:!bg-red-800"
                >
                    Confirm
                </Button>
                <Button
                    onClick={handleCancel}
                    variant="secondary"
                    className="w-full !px-6 !py-2 !text-base"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
