"use client";

import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingPage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Header */}
            <header className="flex h-16 items-center justify-between px-6 md:px-10">
                <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Bot className="size-5" />
                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                        AI Chat
                    </span>
                </div>

                <Link href="/login">
                    <Button variant="outline" className="hover:cursor-pointer">
                        Log in
                    </Button>
                </Link>
            </header>

            {/* Hero */}
            <section className="flex flex-1 items-center justify-center px-6 py-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                        <Sparkles className="size-4" />
                        <span>Your intelligent AI assistant</span>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                        Ask anything.
                        <br />
                        <span className="text-muted-foreground">
                            Create anything.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        A simple and powerful AI workspace for thinking,
                        learning, writing, coding, and exploring ideas.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/signup">
                            <Button size="lg" className="gap-2 px-6 hover:cursor-pointer hover:underline">
                                Get Started
                                <ArrowRight className="size-4" />
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-6 hover:cursor-pointer"
                            >
                                I already have an account
                            </Button>
                        </Link>
                    </div>

                    {/* Small note */}
                    <p className="mt-6 text-xs text-muted-foreground">
                        Start chatting with your AI assistant in seconds.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t px-6 py-5 text-center text-xs text-muted-foreground">
                Built with Next.js, React, TypeScript & shadcn/ui
            </footer>
        </main>
    );
}
