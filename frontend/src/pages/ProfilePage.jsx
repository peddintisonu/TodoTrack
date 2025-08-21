import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

// API Services
import { changeMyPassword, deleteMyAccount } from "../api/user";

// Reusable Components
import PageLayout from "../components/layout/PageLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ConfirmationToast from "../components/ui/ConfirmationToast";

// A small, local component for displaying profile details
const DetailRow = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="text-lg text-fg ">{value}</p>
    </div>
);

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // State for the change password form is now simpler
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation is removed, as it's handled by the backend.
        // We only check if fields are not empty before sending.
        if (!passwordData.currentPassword || !passwordData.newPassword) {
            toast.error("Please fill in both password fields.");
            return;
        }

        setIsSubmittingPassword(true);
        try {
            // The API function now expects `currentPassword`, not `oldPassword`.
            await changeMyPassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success("Password changed successfully!");
            setPasswordData({ currentPassword: "", newPassword: "" }); // Reset form
        } catch (error) {
            // Display the specific error message from the backend API
            toast.error(
                error.response?.data?.message || "Failed to change password."
            );
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    const handleDeleteAccount = () => {
        const confirmDelete = async () => {
            try {
                await deleteMyAccount();
                toast.success(
                    "Account deleted successfully. Logging you out..."
                );
                setTimeout(() => logout(), 2000);
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to delete account."
                );
            }
        };

        toast(
            (t) => (
                <ConfirmationToast
                    t={t}
                    onConfirm={confirmDelete}
                    message="This action is irreversible. Are you sure you want to delete your account?"
                />
            ),
            { duration: Infinity, position: "top-center" }
        );
    };

    if (!user) {
        return (
            <PageLayout>
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner size={48} />
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="container mx-auto max-w-4xl p-4 sm:p-8 space-y-8">
                <h1 className="text-3xl font-bold">Account Settings</h1>

                {/* Profile Details Section */}
                <section className="rounded-xl border border-border bg-input-bg p-6">
                    <h2 className="!mt-0 text-xl font-semibold">
                        Profile Details
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailRow label="Full Name" value={user.name} />
                        <DetailRow label="Username" value={user.username} />
                        <DetailRow label="Email Address" value={user.email} />
                        <DetailRow label="Role" value={user.role} />
                    </div>
                </section>

                {/* Change Password Section */}
                <section className="rounded-xl border border-border bg-input-bg p-6">
                    <h2 className="!mt-0 text-xl font-semibold">
                        Change Password
                    </h2>
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="mt-4 space-y-4"
                    >
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                        />
                        <Input
                            id="newPassword"
                            name="newPassword"
                            label="New Password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmittingPassword}
                            >
                                {isSubmittingPassword ? (
                                    <Spinner size={20} />
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </div>
                    </form>
                </section>

                {/* Danger Zone Section */}
                <section className="rounded-xl border border-red-500/50 bg-red-500/5 p-6">
                    <h2 className="!mt-0 text-xl font-semibold text-red-500">
                        Danger Zone
                    </h2>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-medium text-fg">
                                Delete your account
                            </p>
                            <p className="text-sm text-muted">
                                Permanently delete your account and all of your
                                data.
                            </p>
                        </div>
                        <Button
                            onClick={handleDeleteAccount}
                            variant="primary"
                            className="!bg-red-600 hover:!bg-red-700 active:!bg-red-800 mt-4 sm:mt-0"
                        >
                            Delete Account
                        </Button>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
