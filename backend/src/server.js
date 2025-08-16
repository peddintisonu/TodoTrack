import { app } from "./app.js";
import { ENV } from "./config/env.config.js";
import { connectDB } from "./db/db.js";

connectDB()
    .then(() => {
        console.log("✅ Database connected successfully");
        app.listen(ENV.PORT, () => {
            console.log("Server listening on port", ENV.PORT);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    });
