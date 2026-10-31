
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarProfile() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

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

  const displayName = user?.name?.trim() || user?.email || "My account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          disabled={loggingOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left hover:bg-accent"
        >
          {/* Avatar */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* User details */}
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
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <span><UserRound className="size-4" /></span>
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={loggingOut}
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2 text-destructive">
              <LogOut className="size-4" />
              Log out
            </div>
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
