import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
