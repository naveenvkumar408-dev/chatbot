import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ChatContainer } from "@/features/chat/components/chat-container";
import { auth } from "@/lib/auth/server";

interface ChatPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

async function ProtectedConversation({
  params,
}: ChatPageProps) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const { conversationId } = await params;

  return <ChatContainer conversationId={conversationId} />;
}

export default function ConversationPage({ params }: ChatPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading conversation...
        </div>
      }
    >
      <ProtectedConversation params={params} />
    </Suspense>
  );
}