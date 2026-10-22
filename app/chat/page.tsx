
import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

export default function ChatPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading chat...
                </div>
            }
        >
            <ChatContainer />
        </Suspense>
    );
}
