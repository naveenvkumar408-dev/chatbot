"use client";

import { useCallback, useEffect, useState } from "react";

import type { Conversation } from "@/features/conversation/types/conversation.types";

async function readResponse<T>(response: Response): Promise<T> {
  const data: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Something went wrong. Please try again.";

    throw new Error(message);
  }

  return data as T;
}

export function useConversations(initialId?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(initialId ?? null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  // Load conversations from Neon through the API.
  const loadConversations = useCallback(async () => {
    setError("");

    try {
      const response = await fetch("/api/conversations", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await readResponse<{
        conversations: Conversation[];
      }>(response);

      setConversations(data.conversations);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load conversations.",
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  // Keep the selected conversation synchronized with the URL.
  useEffect(() => {
    if (!isLoaded) return;

    setActiveConversationId(initialId ?? null);
  }, [initialId, isLoaded]);

  // Create a conversation in the database.
  const createConversation = useCallback(async (): Promise<Conversation> => {
    setError("");

    const response = await fetch("/api/conversations", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New chat",
      }),
    });

    const data = await readResponse<{
      conversation: Conversation;
    }>(response);

    const conversation = data.conversation;

    setConversations((previous) => [
      conversation,
      ...previous.filter((item) => item.id !== conversation.id),
    ]);

    setActiveConversationId(conversation.id);

    return conversation;
  }, []);

  // Select an existing conversation.
  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // Rename a conversation in the database.
  const updateConversationTitle = useCallback(
    async (id: string, newTitle: string): Promise<boolean> => {
      const title = newTitle.trim();

      if (!title || title.length > 255) {
        setError("Title must be between 1 and 255 characters.");
        return false;
      }

      setError("");

      try {
        const response = await fetch(
          `/api/conversations/${encodeURIComponent(id)}`,
          {
            method: "PATCH",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          },
        );

        const data = await readResponse<{
          conversation: Conversation;
        }>(response);

        const updatedConversation = data.conversation;

        setConversations((previous) =>
          previous
            .map((item) =>
              item.id === id ? updatedConversation : item,
            )
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            ),
        );

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not rename conversation.",
        );

        return false;
      }
    },
    [],
  );

  // Delete a conversation from the database.
  const deleteConversation = useCallback(
    async (id: string): Promise<boolean> => {
      setError("");

      try {
        const response = await fetch(
          `/api/conversations/${encodeURIComponent(id)}`,
          {
            method: "DELETE",
            credentials: "same-origin",
          },
        );

        await readResponse<{ message: string }>(response);

        setConversations((previous) =>
          previous.filter((item) => item.id !== id),
        );

        setActiveConversationId((current) =>
          current === id ? null : current,
        );

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not delete conversation.",
        );

        return false;
      }
    },
    [],
  );

  return {
    conversations,
    activeConversationId,
    isLoaded,
    error,
    loadConversations,
    createConversation,
    selectConversation,
    deleteConversation,
    updateConversationTitle,
  };
}