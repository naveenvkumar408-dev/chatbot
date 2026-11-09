
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Menu, Sparkles, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";
import { useChat } from "../hooks/use-chat";
import { useConversations } from "@/features/conversation/hooks/use-conversations";
import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";


interface ChatContainerProps {
    conversationId?: string;
}

export function ChatContainer({
    conversationId,
}: ChatContainerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSettingsView = searchParams.get("view") === "settings";
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);


    const settingsSection: SettingsSection =
        searchParams.get("section") === "appearance"
            ? "appearance"
            : "profile";

    function selectSettingsSection(section: SettingsSection) {
        router.push(`/chat?view=settings&section=${section}`);
    }


    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        conversations,
        activeConversationId,
        isLoaded: conversationsLoaded,
        error: conversationError,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversationTitle,
    } = useConversations(conversationId);

    useEffect(() => {
        if (conversationError) {
            console.error(
                "[ChatContainer] Conversation loading error:",
                conversationError
            );
        }
    }, [conversationError]);

    // A dedicated route always uses its own UUID.
    const chatId =
        conversationId ?? activeConversationId ?? "new-chat";

    const {
        messages,
        isLoading,
        isLoaded: messagesLoaded,
        sendMessage,
    } = useChat(chatId);

    useEffect(() => {
        console.log("[ChatContainer] Conversation state:", {
            conversationId: chatId,
            conversations,
            activeConversationId,
            conversationsLoaded,
            conversationError,
        });
    }, [
        chatId,
        conversations,
        activeConversationId,
        conversationsLoaded,
        conversationError,
    ]);

    const activeConversation = conversations.find(
        (conversation) => conversation.id === chatId
    );

    const conversationTitle = activeConversation?.title ?? "New chat";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [sidebarWidth, setSidebarWidth] = useState(288);
    const [dropdownCloseKey, setDropdownCloseKey] = useState(0);

    const resizeStartRef = useRef<{
        pointerId: number;
        startX: number;
        startWidth: number;
    } | null>(null);

    function handleResizeStart(event: ReactPointerEvent<HTMLDivElement>) {
        event.preventDefault();

        resizeStartRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startWidth: sidebarWidth,
        };

        event.currentTarget.setPointerCapture(event.pointerId);

        // Close the account dropdown before resizing.
        setDropdownCloseKey((previous) => previous + 1);
    }

    function handleResizeMove(event: ReactPointerEvent<HTMLDivElement>) {
        const start = resizeStartRef.current;

        if (!start || start.pointerId !== event.pointerId) return;

        const isMobile = window.innerWidth < 768;
        const maxWidth = isMobile
            ? Math.min(480, window.innerWidth * 0.85)
            : 480;

        const nextWidth = start.startWidth + (event.clientX - start.startX);

        setSidebarWidth(
            Math.min(maxWidth, Math.max(240, nextWidth)),
        );
    }

    function handleResizeEnd(event: ReactPointerEvent<HTMLDivElement>) {
        if (resizeStartRef.current?.pointerId !== event.pointerId) return;

        resizeStartRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    async function handleNewChat() {
        if (!conversationsLoaded) return;

        try {
            const conversation = await createConversation();

            router.push(`/chat/${conversation.id}`);
            setSidebarOpen(false);
        } catch (error) {
            console.error("Could not create conversation:", error);
        }
    }

    function handleSelectConversation(id: string) {
        selectConversation(id);
        router.push(`/chat/${id}`);
        setSidebarOpen(false);
    }

    async function handleDeleteConversation(id: string) {
        try {
            const success = await deleteConversation(id);

            if (!success) {
                console.error(
                    "[ChatContainer] Conversation deletion failed:",
                    id
                );
                return;
            }

            if (id === (conversationId ?? activeConversationId)) {
                router.push("/chat");
            }
        } catch (error) {
            console.error(
                "[ChatContainer] Could not delete conversation:",
                error
            );
        }
    }

    async function handleSendMessage(content: string) {
        if (!conversationsLoaded || !messagesLoaded || isLoading) return;

        try {
            let targetId = conversationId ?? activeConversationId;

            // Create a database conversation if this is the first message.
            if (!targetId) {
                const conversation = await createConversation();

                targetId = conversation.id;

                router.push(`/chat/${targetId}`);
            }

            // Automatically title the conversation using its first message.
            if (messages.length === 0) {
                const title = content.trim().replace(/\s+/g, " ").slice(0, 40);

                if (title) {
                    void updateConversationTitle(targetId, title);
                }
            }

            sendMessage(content, targetId);
        } catch (error) {
            console.error("Could not send message:", error);
        }
    }

    type SettingsSection = "profile" | "appearance";


    const sidebarProps = {
        conversations,
        activeConversationId: conversationId ?? activeConversationId,
        onNewChat: handleNewChat,
        onSelectConversation: handleSelectConversation,
        onDeleteConversation: handleDeleteConversation,
        onRenameConversation: updateConversationTitle,
        settingsMode: isSettingsView,
        activeSettingsSection: settingsSection,
        onSelectSettingsSection: selectSettingsSection,
        width: sidebarWidth,
        dropdownCloseKey,
    };


    return (
        <main className="flex h-dvh overflow-hidden bg-background">
            {/* Desktop resizable sidebar */}
            <div
                className="relative hidden h-full shrink-0 md:block"
                style={{
                    width: sidebarCollapsed ? 68 : sidebarWidth,
                }}
            >
                <Sidebar
                    {...sidebarProps}
                    collapsed={sidebarCollapsed}
                    onToggle={() => {
                        setDropdownCloseKey((previous) => previous + 1);
                        setSidebarCollapsed((previous) => !previous);
                    }}
                />

                {!sidebarCollapsed && (
                    <div
                        role="separator"
                        aria-label="Resize sidebar"
                        aria-orientation="vertical"
                        aria-valuemin={240}
                        aria-valuemax={480}
                        aria-valuenow={sidebarWidth}
                        tabIndex={0}
                        onPointerDown={handleResizeStart}
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        onDoubleClick={() => setSidebarWidth(288)}
                        className="group absolute -right-1 top-0 z-30 flex h-full w-2 cursor-col-resize touch-none items-center justify-center"
                    >
                        <div className="h-full w-0.5 bg-transparent transition-colors group-hover:bg-primary/50 group-active:bg-primary" />
                    </div>
                )}
            </div>


            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-100 md:hidden">
                    {/* Blurred background */}
                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={() => setSidebarOpen(false)}
                        className="absolute inset-0 size-full cursor-default bg-black/30 backdrop-blur-md"
                    />

                    {/* Sidebar panel */}
                    <div
                        className="absolute inset-y-0 left-0 z-10 h-dvh max-w-[85vw] shadow-2xl"
                        style={{
                            width: `min(${sidebarWidth}px, 85vw)`,
                        }}
                    >
                        <Sidebar
                            {...sidebarProps}
                            collapsed={false}
                            onToggle={() => setSidebarOpen(false)}
                            onClose={() => setSidebarOpen(false)}
                        />

                        {/* Resize handle */}
                        <div
                            role="separator"
                            aria-label="Resize sidebar"
                            aria-orientation="vertical"
                            onPointerDown={handleResizeStart}
                            onPointerMove={handleResizeMove}
                            onPointerUp={handleResizeEnd}
                            onPointerCancel={handleResizeEnd}
                            className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none"
                        />
                    </div>
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

                        {isSettingsView ? (
                            <Button
                                type="button"
                                variant="ghost"
                                className="-ml-2 gap-2"
                                onClick={() => router.push("/chat")}
                            >
                                <ArrowLeft className="size-4" />
                                Back to chat
                            </Button>
                        ) : (
                            <span className="truncate font-medium">
                                {conversationTitle}
                            </span>
                        )}
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



                {isSettingsView ? (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {settingsSection === "profile" ? (
                            <ProfileCompletionForm />
                        ) : (
                            <div className="mx-auto w-full max-w-3xl space-y-6 p-6 sm:p-10">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        PERSONALIZATION
                                    </p>
                                    <h1 className="mt-2 text-2xl font-semibold">
                                        Appearance
                                    </h1>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Customize how AI Chat looks on your device.
                                    </p>
                                </div>

                                <div className="rounded-xl border p-5">
                                    <h2 className="font-medium">Theme</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Choose your preferred appearance.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <Button
                                            type="button"
                                            variant={theme === "light" ? "secondary" : "outline"}
                                            onClick={() => setTheme("light")}
                                        >
                                            <Sun className="mr-2 size-4" />
                                            Light
                                        </Button>

                                        <Button
                                            type="button"
                                            variant={theme === "dark" ? "secondary" : "outline"}
                                            onClick={() => setTheme("dark")}
                                        >
                                            <Moon className="mr-2 size-4" />
                                            Dark
                                        </Button>

                                        <Button
                                            type="button"
                                            variant={theme === "system" ? "secondary" : "outline"}
                                            onClick={() => setTheme("system")}
                                        >
                                            System
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                <MessageList messages={messages} isLoading={isLoading} />
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
