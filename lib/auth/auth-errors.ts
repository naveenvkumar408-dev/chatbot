
type AuthErrorLike = {
    message?: string;
    code?: string;
    status?: number;
};


function getErrorDetails(error: unknown) {
    if (typeof error === "string") {
        return { code: "", message: error.toLowerCase() };
    }

    if (typeof error !== "object" || error === null) {
        return { code: "", message: "" };
    }

    const value = error as Record<string, unknown>;

    return {
        code: typeof value.code === "string"
            ? value.code.toUpperCase()
            : "",
        message: typeof value.message === "string"
            ? value.message.toLowerCase()
            : "",
    };
}

export function getLoginErrorMessage(error: unknown): string {
    const { code, message } = getErrorDetails(error);

    if (
        code === "USER_NOT_FOUND" ||
        code === "EMAIL_NOT_FOUND" ||
        message.includes("user not found") ||
        message.includes("email not found")
    ) {
        return "User not found. Create a new account.";
    }

    if (
        code === "INVALID_PASSWORD" ||
        code === "WRONG_PASSWORD" ||
        message.includes("incorrect password") ||
        message.includes("wrong password")
    ) {
        return "Please enter the correct password.";
    }

    if (
        code === "INVALID_EMAIL_OR_PASSWORD" ||
        message.includes("invalid credentials") ||
        message.includes("invalid email or password")
    ) {
        return "Incorrect email or password. Please try again or create another account";
    }

    return "Unable to log in. Please try again.";
}

export function getSignupErrorMessage(error: unknown): string {
    const { code, message } = getErrorDetails(error);

    if (
        code === "USER_ALREADY_EXISTS" ||
        code === "EMAIL_ALREADY_EXISTS" ||
        message.includes("already exists") ||
        message.includes("already registered") ||
        message.includes("already in use")
    ) {
        return "User Already Exist. Try Another Account.";
    }

    if (
        code === "PASSWORD_TOO_SHORT" ||
        message.includes("Password too short")
    ) {
        return "Password must be at least 8 characters long.";
    }

    return "Unable to create your account. Please try again.";
}
