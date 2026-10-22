"use client";

import { MessageSquareText } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { Conversation } from "../types/conversation.types";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onRename: (id: string, newTitle: string) => void;
}

export function ConversationList({
    conversations,
    activeConversationId,
    onSelect,
    onDelete,
    onRename
}: ConversationListProps) {
    return (
        <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-1 p-2">
                <p className="px-2 py-2 text-xs font-medium text-muted-foreground">
                    Recent conversations
                </p>

                {conversations.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversationId === conversation.id}
                        onSelect={() => onSelect(conversation.id)}
                        onDelete={() => onDelete(conversation.id)}
                        onRename={(newTitle) => onRename(conversation.id, newTitle)}
                    />
                ))}

                {conversations.length === 0 && (
                    <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                        <MessageSquareText className="size-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            No conversations yet.
                        </p>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}