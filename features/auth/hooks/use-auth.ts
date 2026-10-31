"use client";

import { authClient } from "@/lib/auth/client";
import type { AuthUser, LoginData, SignupData } from "../types/auth.types";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  const user: AuthUser | null = session?.user
    ? {
      id: session.user.id,
      name: session.user.name ?? "",
      email: session.user.email,
    }
    : null;


  async function login(input: LoginData) {
    const { error } = await authClient.signIn.email({
      email: input.email.trim(),
      password: input.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };
  }

  async function signup(input: SignupData) {
    const { error } = await authClient.signUp.email({
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };
  }


  async function logout() {
    const { error } = await authClient.signOut();

    if (error) {
      throw new Error(error.message);
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
