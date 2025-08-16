// OTP settings
export const OTP = {
    length: 6,
    expiry: 5 * 60 * 1000, // 5 minutes
    resendRateLimit: {
        maxAttempts: 5,
        windowMs: 1 * 60 * 1000, // 1 minute
    },
    passwordResetTimeout: 10 * 60 * 1000, // 10 minutes
};

// Cookie options
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// PRIORITY LEVELS
export const PRIORITY_LEVELS = ["low", "medium", "high"];

// STATUS LEVELS
export const STATUS_LEVELS = ["not started", "in progress", "completed"];
