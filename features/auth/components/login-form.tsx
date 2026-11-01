"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";
import { PasswordInput } from "@/components/shared/password-input";
import { getLoginErrorMessage } from "@/lib/auth/auth-errors";

export function LoginForm() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const result = await login({ email, password });

            if (!result.success) {
                setErrorMessage(getLoginErrorMessage(result.error));
                return;
            }

            router.replace("/chat");
            router.refresh();
        } catch (error: unknown) {
            setErrorMessage(getLoginErrorMessage(error));
        }
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Welcome back
                </h1>

                <p className="text-muted-foreground">
                    Log in to continue to your AI assistant.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium"
                    >
                        Email
                    </label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium"
                    >
                        Password
                    </label>

                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Enter Your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {errorMessage && (
                    <p role="alert" className="text-sm text-destructive">
                        {errorMessage}
                    </p>
                )}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-black text-white hover:cursor-pointer hover:bg-black/80"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-foreground underline underline-offset-4"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}