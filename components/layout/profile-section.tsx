
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  UserRound,
  Palette,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SettingsSection = "profile" | "appearance";

interface SidebarProfileProps {
  settingsMode?: boolean;
  activeSettingsSection?: SettingsSection;
  onSelectSettingsSection?: (section: SettingsSection) => void;
}

export function SidebarProfile({
  settingsMode = false,
  activeSettingsSection = "profile",
  onSelectSettingsSection,
}: SidebarProfileProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Unable to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  if (settingsMode) {
    const items = [
      {
        id: "profile" as const,
        label: "Profile",
        icon: UserRound,
      },
      {
        id: "appearance" as const,
        label: "Appearance",
        icon: Palette,
      },
    ];

    return (
      <div className="w-full space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeSettingsSection === item.id;

          return (
            <Button
              key={item.id}
              type="button"
              variant={active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onSelectSettingsSection?.(item.id)}
            >
              <Icon className="size-4" />
              {item.label}
            </Button>
          );
        })}

        <div className="my-2 border-t" />

        <Button
          type="button"
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          disabled={loggingOut}
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          {loggingOut ? "Logging out..." : "Log out"}
        </Button>

        {logoutError && (
          <p role="alert" className="px-2 pt-2 text-xs text-destructive">
            {logoutError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          disabled={loggingOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left hover:bg-accent"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user?.name || "My account"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || ""}
            </p>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuItem
            onClick={() =>
              router.push("/chat?view=settings&section=profile")
            }
          >
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={loggingOut}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4 text-destructive" />
            <span className="text-destructive">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {logoutError && (
        <p role="alert" className="px-3 pt-2 text-xs text-destructive">
          {logoutError}
        </p>
      )}
    </div>
  );
}
