
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  UserRound,
  Palette,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../shared/loading-spinner";

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
  dropdownCloseKey?: number;
}

export function SidebarProfile({
  settingsMode = false,
  activeSettingsSection = "profile",
  onSelectSettingsSection,
  dropdownCloseKey = 0,
}: SidebarProfileProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { profile } = useProfile();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [profile.avatarUrl]);

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

  const initials =
    (profile.fullName || user?.name || "U")
      .trim()
      .charAt(0)
      .toUpperCase();

  if (settingsMode) {
    const items = [
      { id: "profile" as const, label: "Profile", icon: UserRound },
      { id: "appearance" as const, label: "Appearance", icon: Palette },
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
          {loggingOut ? (
            <LoadingSpinner text="Logging out..." compact />
          ) : (
            <>
              <LogOut className="size-4" />
              Log out
            </>
          )}
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
    <div className="w-full min-w-0">
      <DropdownMenu key={dropdownCloseKey}
        onOpenChange={(open) => {
          console.log("Profile dropdown:", open ? "OPENED" : "CLOSED");
        }}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={loggingOut}
            className="flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-sm font-semibold">
              {profile.avatarUrl && !avatarError ? (
                <img
                  src={profile.avatarUrl}
                  alt=""
                  onError={() => setAvatarError(true)}
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user?.name || profile.fullName || "My account"}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {user?.email || profile.email || ""}
              </p>
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-dropdown min-w-48"
        >
          <DropdownMenuItem
            onSelect={() =>
              router.push("/chat?view=settings&section=profile")
            }
          >
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={loggingOut}
            onSelect={handleLogout}
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
