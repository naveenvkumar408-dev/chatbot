"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        const result = await login({
            email,
            password,
        });

        if (!result.success) {
            setError(result.error ?? "Something went wrong.");
            return;
        }

        router.push("/chat");
    };

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

            <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter Your passsword"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-white text-black hover:cursor-pointer hover:bg-white/80"
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