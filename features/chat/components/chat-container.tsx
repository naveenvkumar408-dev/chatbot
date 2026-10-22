
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";
import { useChat } from "../hooks/use-chat";
import { useConversations } from "@/features/conversation/hooks/use-conversations";
import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ChatContainerProps {
    conversationId?: string;
}

export function ChatContainer({
    conversationId,
}: ChatContainerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isProfileView = searchParams.get("view") === "profile";
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        conversations,
        activeConversationId,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversationTitle,
        touchConversation,
    } = useConversations(conversationId);

    // A dedicated route always uses its own UUID.
    const chatId =
        conversationId ?? activeConversationId ?? "new-chat";

    const {
        messages,
        isLoading,
        isLoaded: messagesLoaded,
        sendMessage,
    } = useChat(chatId);

    const activeConversation = conversations.find(
        (conversation) => conversation.id === chatId
    );

    const conversationTitle = activeConversation?.title ?? "New chat";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    function handleNewChat() {
        const conversation = createConversation();

        router.push(`/chat/${conversation.id}`);
        setSidebarOpen(false);
    }

    function handleSelectConversation(id: string) {
        selectConversation(id);
        router.push(`/chat/${id}`);
        setSidebarOpen(false);
    }

    function handleDeleteConversation(id: string) {
        deleteConversation(id);

        if (id === (conversationId ?? activeConversationId)) {
            router.push("/chat");
        }
    }

    function handleSendMessage(content: string) {
        if (!messagesLoaded || isLoading) return;

        let targetId = conversationId ?? activeConversationId;

        if (!targetId) {
            const conversation = createConversation();
            targetId = conversation.id;

            router.push(`/chat/${targetId}`);
        }

        if (messages.length === 0) {
            updateConversationTitle(targetId, content);
        }

        touchConversation(targetId);
        sendMessage(content, targetId);
    }

    const sidebarProps = {
        conversations,
        activeConversationId: conversationId ?? activeConversationId,
        onNewChat: handleNewChat,
        onSelectConversation: handleSelectConversation,
        onDeleteConversation: handleDeleteConversation,
        onRenameConversation: updateConversationTitle,
    };

    return (
        <main className="flex h-dvh overflow-hidden bg-background">
            {/* Desktop sidebar */}
            <div className="hidden h-full shrink-0 md:block">
                <Sidebar
                    {...sidebarProps}
                    collapsed={sidebarCollapsed}
                    onToggle={() =>
                        setSidebarCollapsed((previous) => !previous)
                    }
                />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="h-full w-72 max-w-[85vw]">
                        <Sidebar
                            {...sidebarProps}
                            collapsed={false}
                            onToggle={() => setSidebarOpen(false)}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Close sidebar"
                        className="flex-1 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Main panel: shared header and switchable content */}
            <section className="flex min-w-0 flex-1 flex-col">

                <header className="flex h-14 w-full shrink-0 items-center border-b px-4">
                    {/* Left side */}
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Open sidebar"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="size-5" />
                        </Button>

                        <span className="truncate font-medium">
                            {isProfileView ? "Your Profile" : conversationTitle}
                        </span>
                    </div>

                    {/* Far right side */}
                    <div className="ml-auto flex shrink-0 items-center justify-end">

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle theme"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {mounted ? (
                                theme === "dark" ? (
                                    <Sun className="size-5" />
                                ) : (
                                    <Moon className="size-5" />
                                )
                            ) : (
                                <span className="size-5" />
                            )}
                        </Button>
                    </div>
                </header>


                {isProfileView ? (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <ProfileCompletionForm />
                    </div>
                ) : (
                    <div className="flex min-h-0 flex-1 flex-col">
                        {!messagesLoaded ? (
                            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                                Loading conversation...
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                                <Sparkles className="mb-5 size-8 text-muted-foreground" />

                                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    What can I help with?
                                </h1>

                                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                                    Ask questions, explore ideas, or get help with your next project.
                                </p>
                            </div>
                        ) : (
                            <div className="min-h-0 flex-1 overflow-y-auto">
                                <MessageList
                                    messages={messages}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}

                        <ChatInput
                            onSend={handleSendMessage}
                            disabled={!messagesLoaded || isLoading}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}
