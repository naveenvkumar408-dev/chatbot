import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ChatContainer } from "@/features/chat/components/chat-container";
import { getServerUser } from "@/lib/auth/get-server-user";

async function AuthenticatedChat() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return <ChatContainer />;
}

function ChatLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <AuthenticatedChat />
    </Suspense>
  );
}