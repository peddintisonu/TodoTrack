import { FilePenLine, Flag, TrendingUp, Shield } from "lucide-react";

/**
 * An array of feature objects for the landing page.
 * Each object contains the icon, title, and description.
 */
export const features = [
    {
        icon: <FilePenLine className="h-6 w-6 text-primary" />,
        title: "Effortless Task Management",
        description:
            "Quickly add, edit, and organize your tasks. No clutter, just the essentials to get things done.",
    },
    {
        icon: <TrendingUp className="h-6 w-6 text-primary" />,
        title: "Simple Workflow Statuses",
        description:
            "Track your progress with clear statuses: Not Started, In Progress, and Completed.",
    },
    {
        icon: <Flag className="h-6 w-6 text-primary" />,
        title: "Prioritize What Matters",
        description:
            "Assign Low, Medium, or High priority to your tasks to focus your energy on the most important items.",
    },
    {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: "Designed for Focus",
        description:
            "No unnecessary features. We believe a simpler tool leads to greater productivity and less distraction.",
    },
];
