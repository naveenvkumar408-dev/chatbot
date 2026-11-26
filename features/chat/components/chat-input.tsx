"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, FormEvent } from "react";
import { ArrowUp, Check, ChevronDown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GEMINI_MODELS,
  type GeminiModelId,
} from "@/lib/models";

interface ChatInputProps {
  onSend: (content: string) => void | Promise<void>;
  disabled?: boolean;
  selectedModel: GeminiModelId;
  onModelChange: (model: GeminiModelId) => void;
}

export function ChatInput({
  onSend,
  disabled = false,
  selectedModel,
  onModelChange,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const currentModel =
    GEMINI_MODELS.find((m) => m.id === selectedModel) ?? GEMINI_MODELS[0];

  function resetHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function submitMessage() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    setValue("");
    resetHeight();
    void onSend(trimmed);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-background p-3 shadow-sm focus-within:ring-1 focus-within:ring-ring"
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message your AI assistant..."
          rows={1}
          disabled={disabled}
          className="max-h-40 min-h-10 w-full resize-none border-0 bg-transparent px-1 py-1.5 text-sm shadow-none focus-visible:ring-0"
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Model Selector Dropdown (replaces link/attachment icon) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                className="h-8 gap-1.5 rounded-full px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="size-3.5 text-primary" />
                <span>{currentModel.label}</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="top" className="w-72 p-1.5">
              {GEMINI_MODELS.map((model) => {
                const isSelected = model.id === selectedModel;

                return (
                  <DropdownMenuItem
                    key={model.id}
                    onSelect={() => onModelChange(model.id)}
                    className="flex cursor-pointer items-start justify-between gap-2 rounded-lg p-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {model.label}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {model.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {model.description}
                      </p>
                    </div>

                    {isSelected && (
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="size-8 shrink-0 rounded-full"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </form>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        AI can make mistakes. Check important information.
      </p>
    </div>
  );
}