
import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  text = "Loading profile...",
  fullScreen = false,
}: LoadingSpinnerProps) {
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

      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
