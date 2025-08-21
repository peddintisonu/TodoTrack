import { clsx } from "clsx";

export default function Separator({ className }) {
    return (
        <div className={clsx("container mx-auto px-4", className)}>
            <div className="h-px w-full bg-border" />
        </div>
    );
}
