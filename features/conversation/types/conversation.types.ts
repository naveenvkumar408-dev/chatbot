export interface Conversation {
    id: string;
    title: string;
    updatedAt: string;
}

export interface ConversationWithMessages extends Conversation {
    messages: import("@/features/chat/types/chat.types").ChatMessage[];
}