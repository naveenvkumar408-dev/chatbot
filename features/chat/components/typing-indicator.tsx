import { Bot } from "lucide-react";

export function TypingIndicator() {
    return (
        <div
            className="flex items-start gap-3 py-5"
            role="status"
            aria-label="Assistant is responding"
        >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                <Bot className="size-4 animate-pulse" />
            </div>

            <div className="flex h-8 items-center gap-1.5 rounded-2xl bg-muted/60 px-4">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </div>
        </div>
    );
}