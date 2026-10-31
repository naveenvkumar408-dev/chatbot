"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";
import { PasswordInput } from "@/components/shared/password-input";
import { getSignupErrorMessage } from "@/lib/auth/auth-errors";

export function SignupForm() {
    const router = useRouter();
    const { signup, isLoading } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        try {
            const result = await signup({ name, email, password });

            if (!result.success) {
                setErrorMessage(getSignupErrorMessage(result.error));
                return;
            }

            router.replace("/chat");
            router.refresh();
        } catch (error: unknown) {
            setErrorMessage(getSignupErrorMessage(error));
        }
    }


    return (
        <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Create an account
                </h1>

                <p className="text-muted-foreground">
                    Start chatting with your AI assistant.
                </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium"
                    >
                        Name
                    </label>

                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your user name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

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
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {errorMessage && (
                    <p className="text-sm text-destructive">
                        {errorMessage}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-full bg-white text-black hover:cursor-pointer hover:bg-white/80"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-foreground underline underline-offset-4"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}