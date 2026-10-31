"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type"
>;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`pr-11 ${props.className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 -translate-y-1/2
          rounded-sm text-muted-foreground hover:text-foreground
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring"
      >
        <HugeiconsIcon
          icon={visible ? ViewOffIcon : ViewIcon}
          size={20}
        />
      </button>
    </div>
  );
}
