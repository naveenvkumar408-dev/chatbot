
"use client";

import { authClient } from "@/lib/auth/client";
import type {
  AuthUser,
  LoginData,
  SignupData,
} from "../types/auth.types";

type AuthResult = {
  success: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function getNetworkErrorMessage(error: unknown): string {
  const message = getErrorMessage(error);
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("network") ||
    normalizedMessage.includes("dns") ||
    normalizedMessage.includes("fetch") ||
    normalizedMessage.includes("hostname") ||
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("timeout")
  ) {
    return "Unable to connect to the authentication server. Check your internet connection and try again.";
  }

  return message;
}

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? "",
        email: session.user.email,
      }
    : null;

  async function login(input: LoginData): Promise<AuthResult> {
    try {
      const { error } = await authClient.signIn.email({
        email: input.email.trim(),
        password: input.password,
      });

      if (error) {
        return {
          success: false,
          error: getNetworkErrorMessage(error),
        };
      }

      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      console.error("[Auth] Login failed:", error);

      return {
        success: false,
        error: getNetworkErrorMessage(error),
      };
    }
  }

  async function signup(input: SignupData): Promise<AuthResult> {
    try {
      const { error } = await authClient.signUp.email({
        name: input.name.trim(),
        email: input.email.trim(),
        password: input.password,
      });

      if (error) {
        return {
          success: false,
          error: getNetworkErrorMessage(error),
        };
      }

      return {
        success: true,
        error: null,
      };
    } catch (error: unknown) {
      console.error("[Auth] Signup failed:", error);

      return {
        success: false,
        error: getNetworkErrorMessage(error),
      };
    }
  }

  async function logout(): Promise<void> {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(getErrorMessage(error));
      }
    } catch (error: unknown) {
      console.error("[Auth] Logout failed:", error);
      throw new Error(getNetworkErrorMessage(error));
    }
  }

  return {
    user,
    isLoading: isPending,
    login,
    signup,
    logout,
  };
}
