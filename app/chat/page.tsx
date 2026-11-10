import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ChatContainer } from "@/features/chat/components/chat-container";
import { auth } from "@/lib/auth/server";

async function ProtectedChat() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <ChatContainer />;
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading chat...
        </div>
      }
    >
      <ProtectedChat />
    </Suspense>
  );
}