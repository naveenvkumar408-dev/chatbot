import { Bot, User, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ChatMessage } from "../types/chat.types";

interface MessageItemProps {
    message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
    const isUser = message.role === "user";

    return (
        <article
            className={`flex gap-3 py-5 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            {!isUser && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <Bot className="size-4" />
                </div>
            )}

            <div
                className={`max-w-[85%] space-y-2 ${isUser
                        ? "rounded-2xl bg-muted px-4 py-3 sm:max-w-[75%]"
                        : "min-w-0 flex-1"
                    }`}
            >
                <p className="whitespace-pre-wrap break-words text-sm leading-7">
                    {message.content}
                </p>

                {!isUser && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Copy response"
                        onClick={() =>
                            void navigator.clipboard.writeText(message.content)
                        }
                    >
                        <Copy className="size-4" />
                    </Button>
                )}
            </div>

            {isUser && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <User className="size-4" />
                </div>
            )}
        </article>
    );
}