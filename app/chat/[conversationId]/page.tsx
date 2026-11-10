import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ChatContainer } from "@/features/chat/components/chat-container";
import { getServerUser } from "@/lib/auth/get-server-user";

type Props = {
    params: Promise<{
        conversationId: string;
    }>;
};

async function AuthenticatedConversation({ params }: Props) {
    const user = await getServerUser();

    if (!user) {
        redirect("/login");
    }

    const { conversationId } = await params;

    return <ChatContainer conversationId={conversationId} />;
}

function ConversationLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
    );
}

export default function ConversationPage({ params }: Props) {
    return (
        <Suspense fallback={<ConversationLoading />}>
            <AuthenticatedConversation params={params} />
        </Suspense>
    );
}