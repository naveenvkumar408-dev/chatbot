import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

async function ConversationContent({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;

  return <ChatContainer conversationId={conversationId} />;
}

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <ConversationContent params={params} />
    </Suspense>
  );
}