"use client";

import { useEffect, useState } from "react";

import type {
    AuthUser,
    LoginData,
    SignupData,
} from "../types/auth.types";

const STORAGE_KEY = "chatgpt-clone-user";

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (data: LoginData) => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const storedUsers = localStorage.getItem("chatgpt-clone-users");

        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const foundUser = users.find(
            (item: AuthUser & { password: string }) =>
                item.email === data.email &&
                item.password === data.password,
        );

        if (!foundUser) {
            setIsLoading(false);

            return {
                success: false,
                error: "Invalid email or password.",
            };
        }

        const authUser: AuthUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));

        setUser(authUser);
        setIsLoading(false);

        return {
            success: true,
            error: null,
        };
    };

    const signup = async (data: SignupData) => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const storedUsers = localStorage.getItem("chatgpt-clone-users");

        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const existingUser = users.find(
            (item: AuthUser & { password: string }) =>
                item.email === data.email,
        );

        if (existingUser) {
            setIsLoading(false);

            return {
                success: false,
                error: "An account with this email already exists.",
            };
        }

        const newUser = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
        };

        users.push(newUser);

        localStorage.setItem(
            "chatgpt-clone-users",
            JSON.stringify(users),
        );

        const authUser: AuthUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(authUser),
        );

        setUser(authUser);
        setIsLoading(false);

        return {
            success: true,
            error: null,
        };
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    };

    return {
        user,
        isLoading,
        login,
        signup,
        logout,
    };
}