import { Flag, FilePenLine, Trash2 } from "lucide-react";
import { clsx } from "clsx";

// Configuration for badge styles and labels based on todo properties.
const priorityConfig = {
    high: { label: "High", badgeClass: "badge-red" },
    medium: { label: "Medium", badgeClass: "badge-yellow" },
    low: { label: "Low", badgeClass: "badge-green" },
};
const statusConfig = {
    "not started": { label: "Not Started", badgeClass: "badge-gray" },
    "in progress": { label: "In Progress", badgeClass: "badge-blue" },
    completed: { label: "Completed", badgeClass: "badge-purple" },
};

export default function TodoCard({ todo, onEdit, onDelete, onToggleStatus }) {
    const priority = priorityConfig[todo.priority] || priorityConfig.medium;
    const status = statusConfig[todo.status] || statusConfig["not started"];
    const isCompleted = todo.status === "completed";

    return (
        // Main card container with conditional styling for completed tasks.
        <div
            className={clsx(
                "flex flex-col rounded-xl border border-border bg-input-bg p-4 shadow-sm transition-all hover:shadow-lg min-h-[180px]",
                isCompleted && "bg-gray-50 dark:bg-gray-800/20 opacity-70"
            )}
        >
            {/* Top section with checkbox, title, and description. */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleStatus(todo._id, todo.status)}
                    className="h-5 w-5 mt-1 accent-primary cursor-pointer"
                    aria-label="Toggle task completion"
                />
                <div className="flex-1">
                    <h3
                        className={clsx(
                            "!mt-0 text-lg font-bold text-fg break-words",
                            isCompleted && "line-through text-muted"
                        )}
                    >
                        {todo.title}
                    </h3>
                    {todo.description && (
                        <p
                            className={clsx(
                                "mt-1 text-sm text-muted break-words line-clamp-2",
                                isCompleted && "line-through"
                            )}
                        >
                            {todo.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom section with badges and action buttons. */}
            <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <div className={clsx("badge", priority.badgeClass)}>
                        <Flag className="h-3 w-3" />
                        <span>{priority.label}</span>
                    </div>
                    <div className={clsx("badge", status.badgeClass)}>
                        <span>{status.label}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(todo)}
                        className="btn-secondary !p-2 h-9 w-9"
                        aria-label="Edit todo"
                    >
                        <FilePenLine className="h-4 w-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="btn-secondary !p-2 h-9 w-9 hover:bg-red-500/10 hover:text-red-500"
                        aria-label="Delete todo"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
