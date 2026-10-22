
import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

type Props = {
    params: Promise<{ conversationId: string }>;
};

async function ConversationContent({ params }: Props) {
    const { conversationId } = await params;

    return <ChatContainer conversationId={conversationId} />;
}

export default function ConversationPage({ params }: Props) {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading conversation...
                </div>
            }
        >
            <ConversationContent params={params} />
        </Suspense>
    );
}
