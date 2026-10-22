
"use client";

import { useEffect, useState } from "react";
import type { Conversation } from "@/features/conversation/types/conversation.types";

const STORAGE_KEY = "chatgpt-clone-conversations-v1";

const DEFAULT_CONVERSATIONS: Conversation[] = [
    {
        id: "demo-1",
        title: "Welcome to your chat",
        updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
        id: "demo-2",
        title: "Explore AI",
        updatedAt: "2026-01-02T00:00:00.000Z",
    },
];

export function useConversations(initialId?: string) {
    const [conversations, setConversations] =
        useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] =
        useState<string | null>(initialId ?? null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved conversations in the browser.
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    setConversations(parsed as Conversation[]);
                } else {
                    setConversations(DEFAULT_CONVERSATIONS);
                }
            } else {
                setConversations(DEFAULT_CONVERSATIONS);
            }
        } catch (error) {
            console.error("Could not load conversations:", error);
            setConversations(DEFAULT_CONVERSATIONS);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Ensure a directly opened conversation URL exists in the sidebar.
    useEffect(() => {
        if (!isLoaded) return;

        if (!initialId) {
            setActiveConversationId(null);
            return;
        }

        setActiveConversationId(initialId);

        setConversations((previous) => {
            if (previous.some((item) => item.id === initialId)) {
                return previous;
            }

            return [
                {
                    id: initialId,
                    title: "New chat",
                    updatedAt: new Date().toISOString(),
                },
                ...previous,
            ];
        });
    }, [initialId, isLoaded]);

    // Save after the initial browser load.
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(conversations)
            );
        } catch (error) {
            console.error("Could not save conversations:", error);
        }
    }, [conversations, isLoaded]);

    function createConversation(): Conversation {
        const conversation: Conversation = {
            id: crypto.randomUUID(),
            title: "New chat",
            updatedAt: new Date().toISOString(),
        };

        setConversations((previous) => [
            conversation,
            ...previous,
        ]);
        setActiveConversationId(conversation.id);

        return conversation;
    }

    function selectConversation(id: string) {
        setActiveConversationId(id);
    }

    function deleteConversation(id: string) {
        setConversations((previous) =>
            previous.filter((item) => item.id !== id)
        );

        setActiveConversationId((current) =>
            current === id ? null : current
        );
    }

    function updateConversationTitle(
        id: string,
        message: string
    ) {
        const title =
            message.trim().replace(/\s+/g, " ").slice(0, 40) ||
            "New chat";

        setConversations((previous) =>
            previous.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        title,
                        updatedAt: new Date().toISOString(),
                    }
                    : item
            )
        );
    }

    function touchConversation(id: string) {
        setConversations((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, updatedAt: new Date().toISOString() }
                    : item
            )
        );
    }

    return {
        conversations,
        activeConversationId,
        isLoaded,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversationTitle,
        touchConversation,
    };
}
