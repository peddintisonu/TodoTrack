import { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

// API Services
import { getMyStats } from "../api/user";
import {
    getMyTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoStatus,
} from "../api/todos";

// Components
import PageLayout from "../components/layout/PageLayout";
import Spinner from "../components/ui/Spinner";
import Modal from "../components/ui/Modal";
import ConfirmationToast from "../components/ui/ConfirmationToast";
import TodoCard from "../components/todos/TodoCard";
import TodoForm from "../components/todos/TodoForm";

// Constants for filter options
const statusFilterOptions = ["all", "not started", "in progress", "completed"];
const priorityFilterOptions = ["all", "high", "medium", "low"];

// A small, local component for displaying a single stat
const StatCard = ({ title, value, className = "" }) => (
    <div
        className={`p-4 rounded-lg border border-border bg-input-bg ${className}`}
    >
        <p className="text-sm text-muted">{title}</p>
        <p className="text-2xl font-bold text-fg">{value}</p>
    </div>
);

export default function DashboardPage() {
    // Data states
    const [stats, setStats] = useState(null);
    const [todos, setTodos] = useState([]);
    const [currentStatusFilter, setCurrentStatusFilter] = useState("all");
    const [currentPriorityFilter, setCurrentPriorityFilter] = useState("all");

    // Loading and error states
    const [isStatsLoading, setIsStatsLoading] = useState(true);
    const [isTodosLoading, setIsTodosLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // UI state for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    // Single source of truth for refreshing the dashboard
    const fetchAllData = async () => {
        try {
            const [statsData, todosData] = await Promise.all([
                getMyStats(),
                getMyTodos(),
            ]);
            setStats(statsData);
            setTodos(todosData);
        } catch (error) {
            toast.error("Failed to fetch dashboard data. Please refresh.");
        } finally {
            setIsStatsLoading(false);
            setIsTodosLoading(false);
        }
    };

    // Fetch initial data on component mount
    useEffect(() => {
        fetchAllData();
    }, []);

    // Memoized filter for performance, now handles both filters
    const filteredTodos = useMemo(() => {
        let filtered = todos;
        if (currentStatusFilter !== "all") {
            filtered = filtered.filter(
                (todo) => todo.status === currentStatusFilter
            );
        }
        if (currentPriorityFilter !== "all") {
            filtered = filtered.filter(
                (todo) => todo.priority === currentPriorityFilter
            );
        }
        return filtered;
    }, [todos, currentStatusFilter, currentPriorityFilter]);

    // --- Modal and Form Handlers ---
    const handleOpenModal = (todo = null) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingTodo(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        const action = editingTodo
            ? updateTodo(editingTodo._id, formData)
            : createTodo(formData);
        const successMessage = editingTodo
            ? "Todo updated successfully!"
            : "Todo created successfully!";

        try {
            await action;
            toast.success(successMessage);
            await fetchAllData();
            handleCloseModal();
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (todoId) => {
        const confirmDelete = async () => {
            try {
                await deleteTodo(todoId);
                toast.success("Todo deleted successfully!");
                await fetchAllData();
            } catch (error) {
                toast.error("Failed to delete todo.");
            }
        };

        toast(
            (t) => (
                <ConfirmationToast
                    t={t}
                    onConfirm={confirmDelete}
                    message="Are you sure you want to delete this todo?"
                />
            ),
            { duration: Infinity, position: "top-center" }
        );
    };

    const handleToggleStatus = async (todoId, currentStatus) => {
        const newStatus =
            currentStatus === "completed" ? "in progress" : "completed";
        const successMessage =
            newStatus === "completed"
                ? "Task marked as complete!"
                : "Task moved back to In Progress!";

        try {
            await updateTodoStatus(todoId, newStatus);
            toast.success(successMessage);
            await fetchAllData();
        } catch (error) {
            toast.error("Failed to update task status.");
        }
    };

    return (
        <PageLayout>
            <div className="container mx-auto p-4 sm:p-6 w-full h-full pb-24">
                {/* Stats Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
                    {isStatsLoading ? (
                        <Spinner />
                    ) : (
                        stats && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard
                                    title="Total Todos"
                                    value={stats.totalTodos}
                                />
                                <StatCard
                                    title="Pending"
                                    value={stats.pendingTodos}
                                />
                                <StatCard
                                    title="In Progress"
                                    value={stats.inProgressTodos}
                                />
                                <StatCard
                                    title="Completed"
                                    value={stats.completedTodos}
                                    className="bg-primary/10 border-primary/30"
                                />
                            </div>
                        )
                    )}
                </section>

                {/* Todos Section */}
                <section className="mt-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h2 className="text-2xl font-bold">Your Todos</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 sm:mt-0">
                            {/* Status Filter */}
                            <div className="flex items-center gap-2 p-1 bg-input-bg border border-border rounded-lg">
                                {statusFilterOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() =>
                                            setCurrentStatusFilter(opt)
                                        }
                                        className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                                            currentStatusFilter === opt
                                                ? "bg-primary text-white"
                                                : "hover:bg-primary/10"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {/* Priority Filter */}
                            <div className="flex items-center gap-2 p-1 bg-input-bg border border-border rounded-lg">
                                {priorityFilterOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() =>
                                            setCurrentPriorityFilter(opt)
                                        }
                                        className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                                            currentPriorityFilter === opt
                                                ? "bg-primary text-white"
                                                : "hover:bg-primary/10"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isTodosLoading ? (
                        <div className="flex justify-center p-8">
                            <Spinner size={36} />
                        </div>
                    ) : filteredTodos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTodos.map((todo) => (
                                <TodoCard
                                    key={todo._id}
                                    todo={todo}
                                    onEdit={handleOpenModal}
                                    onDelete={() => handleDelete(todo._id)}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 border-2 border-dashed border-border rounded-xl">
                            <h3 className="text-lg font-semibold">
                                No todos found!
                            </h3>
                            <p className="text-muted mt-1">
                                Try adjusting your filters or add a new todo.
                            </p>
                        </div>
                    )}
                </section>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => handleOpenModal()}
                className="absolute bottom-8 right-8 btn-primary !rounded-full h-14 w-14 shadow-lg z-10"
                aria-label="Add new todo"
            >
                <Plus className="h-7 w-7" />
            </button>

            {/* Modal for Creating/Editing Todos */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTodo ? "Edit Todo" : "Create a New Todo"}
            >
                <TodoForm
                    mode={editingTodo ? "edit" : "create"}
                    initialData={editingTodo}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                    isLoading={isSubmitting}
                />
            </Modal>
        </PageLayout>
    );
}
