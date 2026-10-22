
"use client";

import { useState } from "react";
import {
    MessageSquare,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Conversation } from "../types/conversation.types";

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onRename: (newTitle: string) => void;
}

export function ConversationItem({
    conversation,
    isActive,
    onSelect,
    onDelete,
    onRename,
}: ConversationItemProps) {
    const [renameOpen, setRenameOpen] = useState(false);
    const [title, setTitle] = useState(conversation.title);

    // function openRenameDialog() {
    //     // Pre-fill the input with the existing title.
    //     setTitle(conversation.title);
    //     setRenameOpen(true);
    // }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newTitle = title.trim();

        // Don't save an empty title.
        if (!newTitle) return;

        // Don't call the rename handler if nothing changed.
        if (newTitle !== conversation.title) {
            onRename(newTitle);
        }

        setRenameOpen(false);
    }

    return (
        <>
            <div
                className={`group flex items-center gap-1 rounded-lg ${isActive ? "bg-muted" : "hover:bg-muted/60"
                    }`}
            >
                <button
                    type="button"
                    onClick={onSelect}
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm"
                >
                    <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{conversation.title}</span>
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        type="button"
                        aria-label="Conversation options"
                        className="mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md opacity-0 hover:bg-muted group-hover:opacity-100 focus-visible:opacity-100"
                    >
                        <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                setTitle(conversation.title);
                                setRenameOpen(true);
                            }}
                        >
                            <Pencil className="mr-2 size-4" />
                            Rename
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={onDelete}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 size-4" />
                            Delete conversation
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename conversation</DialogTitle>
                        <DialogDescription>
                            Enter a new title for this conversation.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave}>
                        <Input
                            autoFocus
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            aria-label="Conversation title"
                            maxLength={100}
                        />

                        <DialogFooter className="mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setTitle(conversation.title);
                                    setRenameOpen(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={!title.trim()}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
