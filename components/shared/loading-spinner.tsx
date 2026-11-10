
import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
  compact?: boolean;
}

export function LoadingSpinner({
  text = "Loading profile...",
  fullScreen = false,
  compact = false,
}: LoadingSpinnerProps) {
  if (compact) {
    return (
      <span
        className="inline-flex items-center justify-center gap-2"
        role="status"
        aria-live="polite"
      >
        <LoaderCircle
          className="size-4 animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm">{text}</span>
      </span>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-dvh" : "min-h-64"
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="size-8 animate-spin text-primary"
        aria-hidden="true"
      />

      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
