import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

// Define options based on your Mongoose schema for consistency
const priorityOptions = ["low", "medium", "high"];
const statusOptions = ["not started", "in progress", "completed"];

// A clean initial state for the form
const initialFormState = {
    title: "",
    description: "",
    priority: "medium",
    status: "not started",
};

export default function TodoForm({
    mode = "create",
    initialData,
    onSubmit,
    onCancel,
    isLoading,
}) {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState("");

    // This effect runs when the component loads or when the `initialData` prop changes.
    // If we are in 'edit' mode, it populates the form fields with the data of the todo being edited.
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                priority: initialData.priority || "medium",
                status: initialData.status || "not started",
            });
        } else {
            // If creating a new todo, ensure the form is reset
            setFormData(initialFormState);
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation: only the title is required.
        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }
        setError(""); // Clear previous errors
        onSubmit(formData); // Pass the form data up to the parent (DashboardPage)
    };

    return (
        // The form is now the root element, without extra wrappers or titles.
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
                id="title"
                name="title"
                label="Title"
                placeholder="e.g., Finish the project report"
                value={formData.title}
                onChange={handleChange}
                error={error}
            />

            <div className="form-group">
                <label htmlFor="description" className="form-label">
                    Description (Optional)
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="e.g., Include Q4 sales data and future projections"
                    className="input"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="form-group flex-1">
                    <label htmlFor="priority" className="form-label">
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        className="input capitalize"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        {priorityOptions.map((option) => (
                            <option
                                key={option}
                                value={option}
                                className="bg-input-bg"
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="input capitalize"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        {statusOptions.map((option) => (
                            <option
                                key={option}
                                value={option}
                                className="bg-input-bg"
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="!px-4 !py-2"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="!px-4 !py-2"
                >
                    {isLoading ? (
                        <Spinner size={20} />
                    ) : mode === "create" ? (
                        "Create Todo"
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>
        </form>
    );
}
