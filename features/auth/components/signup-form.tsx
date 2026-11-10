"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

import { useAuth } from "../hooks/use-auth";
import { getSignupErrorMessage } from "@/lib/auth/auth-errors";

export function SignupForm() {
    const router = useRouter();
    const { signup } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const result = await signup({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            if (!result.success) {
                setErrorMessage(getSignupErrorMessage(result.error));
                return;
            }

            router.replace("/chat");
            router.refresh();
        } catch (error: unknown) {
            console.error("Signup error:", error);
            setErrorMessage(getSignupErrorMessage(error));
        } finally {
            setIsSubmitting(false);
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
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>

                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your user name"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email id"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
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
                        disabled={isSubmitting}
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <LoadingSpinner text="Creating account..." compact />
                    ) : (
                        "Create account"
                    )}
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