import { Loader2 } from "lucide-react";

export default function Spinner({ size = 24, className = "" }) {
    return (
        <Loader2
            style={{ width: size, height: size }}
            className={`animate-spin text-primary ${className}`}
        />
    );
}