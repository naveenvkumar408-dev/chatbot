"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "@/features/chat/types/chat.types";
import { DEFAULT_GEMINI_MODEL, type GeminiModelId } from "@/lib/models";

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

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError("");

      if (!/^[1-9]\d*$/.test(conversationId)) {
        setMessages([]);
        setIsLoaded(true);
        return;
      }

      setIsLoaded(false);

      try {
        const response = await fetch(
          `/api/conversations/${encodeURIComponent(conversationId)}/messages`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
          },
        );

        const data = await readResponse<{
          messages: ChatMessage[];
        }>(response);

        if (!cancelled) {
          setMessages(data.messages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load messages.",
          );
          setMessages([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [conversationId]);

  const sendMessage = useCallback(
    async (
      content: string,
      targetId: string = conversationId,
      model: GeminiModelId = DEFAULT_GEMINI_MODEL,
    ) => {
      const text = content.trim();

      if (!text || !/^[1-9]\d*$/.test(targetId) || isLoading) {
        return;
      }

      const tempId = `temp-${Date.now()}`;
      const optimisticMessage: ChatMessage = {
        id: tempId,
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };

      // Immediately show the user's message so MessageList + TypingIndicator render right away
      setMessages((previous) => [...previous, optimisticMessage]);
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/conversations/${encodeURIComponent(targetId)}/messages`,
          {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: text,
              model,
            }),
          },
        );

        const data = await readResponse<{
          messages: ChatMessage[];
        }>(response);

        setMessages(data.messages);
      } catch (err) {
        // Remove the optimistic message if the request failed
        setMessages((previous) => previous.filter((msg) => msg.id !== tempId));
        setError(
          err instanceof Error ? err.message : "Could not send your message.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading],
  );

  return {
    messages,
    isLoading,
    isLoaded,
    error,
    sendMessage,
  };
}
