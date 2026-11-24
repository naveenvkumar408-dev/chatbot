"use client";

import { useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import type { ChatMessage } from "../types/chat.types";

interface MessageItemProps {
    message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
    const isUser = message.role === "user";
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <article
            className={`group flex items-start gap-3 py-5 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            {!isUser && (
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <Bot className="size-4" />
                </div>
            )}

            <div
                className={`max-w-[85%] space-y-2 ${
                    isUser
                        ? "rounded-2xl bg-muted px-4 py-3 sm:max-w-[75%]"
                        : "min-w-0 flex-1"
                }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap break-words text-sm leading-7">
                        {message.content}
                    </p>
                ) : (
                    <div className="space-y-3 break-words text-sm leading-7">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => (
                                    <p className="leading-7 [&:not(:first-child)]:mt-3">
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="my-2 list-disc space-y-1 pl-6">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="my-2 list-decimal space-y-1 pl-6">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="leading-7">{children}</li>
                                ),
                                h1: ({ children }) => (
                                    <h1 className="mt-4 text-lg font-semibold">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="mt-4 text-base font-semibold">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="mt-3 text-sm font-semibold">
                                        {children}
                                    </h3>
                                ),
                                pre: ({ children }) => (
                                    <pre className="my-3 overflow-x-auto rounded-xl border bg-muted/60 p-4 text-xs leading-6">
                                        {children}
                                    </pre>
                                ),
                                code: ({ className, children, ...props }) => {
                                    const isBlock = Boolean(className);
                                    return isBlock ? (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code
                                            className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                table: ({ children }) => (
                                    <div className="my-3 overflow-x-auto rounded-lg border">
                                        <table className="w-full border-collapse text-left text-xs">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                th: ({ children }) => (
                                    <th className="border-b bg-muted/50 px-3 py-2 font-medium">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="border-b px-3 py-2">
                                        {children}
                                    </td>
                                ),
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}

                {!isUser && (
                    <div className="flex items-center gap-1 pt-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-foreground"
                            aria-label={copied ? "Copied" : "Copy response"}
                            onClick={() => void handleCopy()}
                        >
                            {copied ? (
                                <Check className="size-4 text-green-500" />
                            ) : (
                                <Copy className="size-4" />
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {isUser && (
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <User className="size-4" />
                </div>
            )}
        </article>
    );
}