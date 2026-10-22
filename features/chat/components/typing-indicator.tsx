import { Bot } from "lucide-react";

export function TypingIndicator() {
    return (
        <div
            className="flex items-center gap-3 py-5"
            role="status"
            aria-label="Assistant is responding"
        >
            <div className="flex size-8 items-center justify-center rounded-full border">
                <Bot className="size-4" />
            </div>

            <div className="flex items-center gap-1">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
            </div>
        </div>
    );
}