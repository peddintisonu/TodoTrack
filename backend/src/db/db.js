import mongoose from "mongoose";
import { ENV } from "../config/env.config.js";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(ENV.MONGO_URI, {
            dbName: ENV.MONGO_DB_NAME,
        });
        console.log("✅ MongoDB CONNECTED SUCCESSFULLY", con.connection.host);
    } catch (err) {
        console.error("❌ MongoDB CONNECTION FAILED:", err.message);
        process.exit(1);
    }
};
