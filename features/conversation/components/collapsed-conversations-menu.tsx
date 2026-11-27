"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle,MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Conversation } from "../types/conversation.types";

interface CollapsedConversationsMenuProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading?: boolean;
  onSelectConversation: (id: string) => void;
  dropdownCloseKey?: number;
}

const SKELETON_WIDTHS = ["w-4/5", "w-3/5", "w-11/12", "w-2/3", "w-3/4"];

export function CollapsedConversationsMenu({
  conversations,
  activeConversationId,
  isLoading = false,
  onSelectConversation,
  dropdownCloseKey = 0,
}: CollapsedConversationsMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 88,
    left: 78,
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const prevCloseKeyRef = useRef(dropdownCloseKey);

  function updateMenuPosition() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const maxMenuHeight = 400;
    const clampedTop = Math.max(
      12,
      Math.min(rect.top, window.innerHeight - maxMenuHeight - 12),
    );

    setPosition({
      top: clampedTop,
      left: rect.right + 10,
    });
  }

  function handleToggle() {
    if (!open) {
      updateMenuPosition();
    }
    setOpen((prev) => !prev);
  }

  // Close when parent signals dropdownCloseKey change
  useEffect(() => {
    if (prevCloseKeyRef.current !== dropdownCloseKey) {
      prevCloseKeyRef.current = dropdownCloseKey;
      setOpen(false);
    }
  }, [dropdownCloseKey]);

  // Close on outside click, Escape key, or reposition on resize
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handleResize() {
      updateMenuPosition();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <div className="flex justify-center">
      <Button
        ref={triggerRef}
        type="button"
        variant={open ? "secondary" : "ghost"}
        size="icon"
        onClick={handleToggle}
        aria-label="Recent conversations"
        aria-expanded={open}
        aria-haspopup="menu"
        title="Conversations"
        className="rounded-xl"
      >
        <MessageSquare className="size-5" />
      </Button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Recent conversations"
            style={{
              top: position.top,
              left: position.left,
            }}
            className="fixed z-50 w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl"
          >
            <div className="px-3 pb-1.5 pt-2 text-xs font-medium text-muted-foreground">
              Recents
            </div>

            <div className="max-h-85 space-y-0.5 overflow-y-auto pr-1">
              {isLoading ? (
                <div
                  aria-busy="true"
                  aria-label="Loading conversations"
                  className="space-y-1 px-1 py-1"
                >
                  {SKELETON_WIDTHS.map((widthClass, index) => (
                    <div
                      key={index}
                      className="flex h-9 items-center rounded-xl px-2.5"
                    >
                      <div
                        className={`h-3.5 ${widthClass} animate-pulse rounded-md bg-muted`}
                      />
                    </div>
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                  No conversations yet
                </p>
              ) : (
                conversations.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onSelectConversation(conversation.id);
                        setOpen(false);
                      }}
                      title={conversation.title}
                      className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActive
                          ? "bg-accent/70 font-medium text-accent-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <span className="truncate">{conversation.title}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}