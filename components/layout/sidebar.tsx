
"use client";

import Link from "next/link";
import {
    Bot,
    PanelLeftClose,
    PanelLeftOpen,
    MessageSquarePlus,
    MessageSquare
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewChatButton } from "@/features/conversation/components/new-chat-button";
import { ConversationList } from "@/features/conversation/components/conversation-list";
import type { Conversation } from "@/features/conversation/types/conversation.types";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { SidebarProfile } from "@/components/layout/profile-section"

interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    onRenameConversation: (id: string, newTitle: string) => void;
    onClose?: () => void;
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    onDeleteConversation,
    onRenameConversation,
    onClose,
    collapsed,
    onToggle,
}: SidebarProps) {
    return (
        <aside
            className={`flex h-full shrink-0 flex-col overflow-hidden border-r bg-muted/40 p-3 transition-[width] duration-200 ease-in-out ${collapsed ? "w-[68px]" : "w-72"
                }`}
        >
            {/* Sidebar header */}
            <div
                className={`flex h-11 shrink-0 items-center ${collapsed ? "justify-center" : "justify-between px-1"
                    }`}
            >
                {collapsed ? (
                    <div className="group relative flex size-10 items-center justify-center">
                        <Bot className="size-5 transition-opacity group-hover:opacity-0" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggle}
                            aria-label="Expand sidebar"
                            title="Expand sidebar"
                            className="absolute inset-0 size-10 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <PanelLeftOpen className="size-5" />
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/chat"
                            className="flex min-w-0 items-center gap-2 font-semibold"
                        >
                            <Bot className="size-5 shrink-0" />
                            <span className="truncate">AI Chat</span>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggle}
                            aria-label="Collapse sidebar"
                            title="Collapse sidebar"
                            className="size-8 shrink-0"
                        >
                            <PanelLeftClose className="size-4" />
                        </Button>
                    </>
                )}
            </div>

            {/* New chat */}
            <div
                className={`mt-4 shrink-0 ${collapsed ? "flex justify-center" : ""
                    }`}
            >
                {collapsed ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNewChat}
                        aria-label="New chat"
                        title="New chat"
                    >
                        <MessageSquarePlus className="size-5" />
                    </Button>
                ) : (
                    <NewChatButton onClick={onNewChat} />
                )}
            </div>

            {/* Conversation list */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {collapsed ? (
                    <div className="flex flex-col items-center gap-2">
                        {conversations.map((conversation) => {
                            const isActive =
                                conversation.id === activeConversationId;

                            return (
                                <Button
                                    key={conversation.id}
                                    variant={isActive ? "secondary" : "ghost"}
                                    size="icon"
                                    title={conversation.title}
                                    aria-label={conversation.title}
                                    onClick={() =>
                                        onSelectConversation(conversation.id)
                                    }
                                >
                                    <MessageSquare className="size-4" />
                                </Button>
                            );
                        })}
                    </div>
                ) : (
                    <ConversationList
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onSelect={onSelectConversation}
                        onDelete={onDeleteConversation}
                        onRename={onRenameConversation}
                    />
                )}
            </div>

            {/* Profile area */}
            <div className="mt-auto">
                <SidebarProfile />
            </div>


            {/* Mobile close button */}
            {onClose && (
                <div className="mt-2 shrink-0 md:hidden">
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={onClose}
                    >
                        <PanelLeftClose className="mr-2 size-4" />
                        Close sidebar
                    </Button>
                </div>
            )}
        </aside>
    );
}
