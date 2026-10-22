export type MessageRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string;
    updatedAt: string;
}