import { useEffect } from "react";

const BASE_TITLE = import.meta.env.VITE_APP_NAME || "TodoTrack";

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
        return () => {
            document.title = BASE_TITLE;
        };
    }, [title]);
}
