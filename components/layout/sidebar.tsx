
"use client";

import Link from "next/link";
import {
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquarePlus,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewChatButton } from "@/features/conversation/components/new-chat-button";
import { ConversationList } from "@/features/conversation/components/conversation-list";
import type { Conversation } from "@/features/conversation/types/conversation.types";
import { SidebarProfile } from "@/components/layout/profile-section";

export type SettingsSection = "profile" | "appearance";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
  settingsMode?: boolean;
  activeSettingsSection?: SettingsSection;
  onSelectSettingsSection?: (section: SettingsSection) => void;
  width?: number;
  dropdownCloseKey?: number;
}


export function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  collapsed,
  onToggle,
  onClose,
  settingsMode = false,
  activeSettingsSection = "profile",
  onSelectSettingsSection,
  width = 288,
  dropdownCloseKey = 0,
}: SidebarProps) {
  const isCollapsed = collapsed && !settingsMode;


  return (
    <aside
      style={{
        width: isCollapsed ? 68 : width,
        backgroundColor: "var(--background)",
      }}
      className="relative flex h-full min-w-0 shrink-0 flex-col overflow-hidden border-r border-border p-3 shadow-none"
    >
      {/* Sidebar header */}
      <div
        className={`flex h-11 shrink-0 items-center ${isCollapsed ? "justify-center" : "justify-between px-1"
          }`}
      >
        {isCollapsed ? (
          <div className="group relative flex size-10 items-center justify-center">
            <Bot className="size-5 transition-opacity group-hover:opacity-0" />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onToggle}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="absolute inset-0 size-10 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
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

            {!settingsMode && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onToggle}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className="size-8 shrink-0"
              >
                <PanelLeftClose className="size-4" />
              </Button>
            )}
          </>
        )}
      </div>

      {settingsMode ? (
        <div className="mt-6 flex-1">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Settings
          </p>

          <SidebarProfile
            settingsMode
            activeSettingsSection={activeSettingsSection}
            onSelectSettingsSection={onSelectSettingsSection}
            dropdownCloseKey={dropdownCloseKey}
          />
        </div>
      ) : (
        <>
          {/* New chat */}
          <div
            className={`mt-4 shrink-0 ${isCollapsed ? "flex justify-center" : ""
              }`}
          >
            {isCollapsed ? (
              <Button
                type="button"
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

          {/* Conversations */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    type="button"
                    variant={
                      conversation.id === activeConversationId
                        ? "secondary"
                        : "ghost"
                    }
                    size="icon"
                    title={conversation.title}
                    aria-label={conversation.title}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <MessageSquare className="size-4" />
                  </Button>
                ))}
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

          {/* Account dropdown */}
          <div className="mt-auto shrink-0">
            <SidebarProfile dropdownCloseKey={dropdownCloseKey} />
          </div>
        </>
      )}

      {/* Mobile close */}
      {onClose && (
        <div className="mt-2 shrink-0 md:hidden">
          <Button
            type="button"
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
