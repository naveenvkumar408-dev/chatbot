"use client";

import { useEffect, useRef } from "react";

import type { ChatMessage } from "../types/chat.types";
import { MessageItem } from "./message-item";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export function MessageList({
    messages,
    isLoading,
}: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    return (
        <div className="mx-auto w-full max-w-3xl px-4">
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>
    );
}