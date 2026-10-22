"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({
    onSend,
    disabled = false,
}: ChatInputProps) {
    const [value, setValue] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = value.trim();

        if (!message || disabled) return;

        onSend(message);
        setValue("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-3xl px-4 pb-3"
        >
            <div className="rounded-2xl border bg-background p-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <Textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                        ) {
                            event.preventDefault();
                            event.currentTarget.form?.requestSubmit();
                        }
                    }}
                    placeholder="Message your AI assistant..."
                    aria-label="Message your AI assistant"
                    disabled={disabled}
                    rows={2}
                    className="max-h-48 min-h-12 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                />

                <div className="flex items-center justify-between pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Attach a file (not implemented)"
                        disabled
                    >
                        <Paperclip className="size-4" />
                    </Button>

                    <Button
                        type="submit"
                        size="icon"
                        aria-label="Send message"
                        disabled={disabled || !value.trim()}
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                </div>
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
                AI can make mistakes. Check important information.
            </p>
        </form>
    );
}