import { clsx } from "clsx";

/**
 * A reusable, full-width separator line within the page container.
 * You can pass a className to adjust margin, e.g., <Separator className="my-16" />
 */
export default function Separator({ className }) {
    return (
        <div className={clsx("container mx-auto px-4", className)}>
            <div className="h-px w-full bg-border" />
        </div>
    );
}
