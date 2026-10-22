
"use client";

import { useEffect, useState } from "react";
import type { ChatMessage } from "@/features/chat/types/chat.types";

const STORAGE_KEY = "chatgpt-clone-messages-v1";

type MessagesByConversation = Record<string, ChatMessage[]>;

export function useChat(conversationId: string) {
    const [messagesByConversation, setMessagesByConversation] =
        useState<MessagesByConversation>({});
    const [loadingIds, setLoadingIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    parsed !== null &&
                    typeof parsed === "object" &&
                    !Array.isArray(parsed)
                ) {
                    setMessagesByConversation(
                        parsed as MessagesByConversation
                    );
                }
            }
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(messagesByConversation)
            );
        } catch (error) {
            console.error("Failed to save messages:", error);
        }
    }, [messagesByConversation, isLoaded]);

    const messages = messagesByConversation[conversationId] ?? [];
    const isLoading = loadingIds.includes(conversationId);

    function sendMessage(
        content: string,
        targetId: string = conversationId
    ) {
        const text = content.trim();

        if (
            !text ||
            !targetId ||
            !isLoaded ||
            loadingIds.includes(targetId)
        ) {
            return;
        }

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            createdAt: new Date().toISOString(),
        };

        setMessagesByConversation((previous) => ({
            ...previous,
            [targetId]: [
                ...(previous[targetId] ?? []),
                userMessage,
            ],
        }));

        setLoadingIds((previous) =>
            previous.includes(targetId)
                ? previous
                : [...previous, targetId]
        );

        window.setTimeout(() => {
            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `You said: ${text}`,
                createdAt: new Date().toISOString(),
            };

            setMessagesByConversation((previous) => ({
                ...previous,
                [targetId]: [
                    ...(previous[targetId] ?? []),
                    assistantMessage,
                ],
            }));

            setLoadingIds((previous) =>
                previous.filter((id) => id !== targetId)
            );
        }, 800);
    }

    function clearMessages() {
        setMessagesByConversation((previous) => ({
            ...previous,
            [conversationId]: [],
        }));
    }

    return {
        messages,
        isLoading,
        isLoaded,
        sendMessage,
        clearMessages,
    };
}
