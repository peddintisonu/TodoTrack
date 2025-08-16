// utils/passwordValidator.js
export function passwordValidator(password) {
    if (!password) return { valid: false, message: "Password is required" };

    if (password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long",
        };
    }

    // Regex for at least 1 uppercase, 1 lowercase, 1 number, 1 special char
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!regex.test(password)) {
        return {
            valid: false,
            message:
                "Password must contain uppercase, lowercase, number, and special character",
        };
    }

    return { valid: true };
}
