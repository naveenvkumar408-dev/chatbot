"use client";

import type { Conversation } from "../types/conversation.types";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading?: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
}

const SKELETON_WIDTHS = [
  "w-4/5",
  "w-3/5",
  "w-11/12",
  "w-2/3",
  "w-3/4",
  "w-1/2",
];

export function ConversationList({
  conversations,
  activeConversationId,
  isLoading = false,
  onSelect,
  onDelete,
  onRename,
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading conversations"
        className="space-y-1.5 py-1"
      >
        {SKELETON_WIDTHS.map((widthClass, index) => (
          <div
            key={index}
            className="flex h-9 items-center rounded-lg px-2.5"
          >
            <div
              className={`h-3.5 ${widthClass} animate-pulse rounded-md bg-muted`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <p className="px-3 py-6 text-center text-xs text-muted-foreground">
        No conversations yet
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onSelect={() => onSelect(conversation.id)}
          onDelete={() => onDelete(conversation.id)}
          onRename={(newTitle) => onRename(conversation.id, newTitle)}
        />
      ))}
    </div>
  );
}