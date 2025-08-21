import { useState, useEffect } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const priorityOptions = ["low", "medium", "high"];
const statusOptions = ["not started", "in progress", "completed"];

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

    // Populate the form with existing data when in "edit" mode.
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                priority: initialData.priority || "medium",
                status: initialData.status || "not started",
            });
        } else {
            setFormData(initialFormState);
        }
    }, [mode, initialData]);

    // Update form state on user input.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission and validation.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }
        setError("");
        onSubmit(formData);
    };

    return (
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
                    placeholder="e.g., Include Q4 sales data"
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
