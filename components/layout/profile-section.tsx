"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Palette,
  KeyRound,
  Settings,
  LogOut,
  Trash2,
} from "lucide-react";

import { authClient } from "@/lib/auth/client";
import { useProfile } from "@/features/profile/hooks/use-profile";
import type { SettingsSection } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SidebarProfileProps {
  settingsMode?: boolean;
  activeSettingsSection?: SettingsSection;
  onSelectSettingsSection?: (section: SettingsSection) => void;
  dropdownCloseKey?: number;
}

const SETTINGS_NAV_ITEMS: Array<{
  id: SettingsSection;
  label: string;
  icon: typeof User;
}> = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API Configure", icon: KeyRound },
];

export function SidebarProfile({
  settingsMode = false,
  activeSettingsSection = "profile",
  onSelectSettingsSection,
  dropdownCloseKey = 0,
}: SidebarProfileProps) {
  const router = useRouter();
  const { profile } = useProfile();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [actionError, setActionError] = useState("");

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const prevCloseKeyRef = useRef(dropdownCloseKey);

  useEffect(() => {
    if (prevCloseKeyRef.current !== dropdownCloseKey) {
      prevCloseKeyRef.current = dropdownCloseKey;
      setMenuOpen(false);
    }
  }, [dropdownCloseKey]);

  function handleMenuOpenChange(nextOpen: boolean) {
    if (nextOpen && triggerRef.current) {
      const measured = Math.round(
        triggerRef.current.getBoundingClientRect().width,
      );
      setMenuWidth(Math.max(224, measured));
    }
    setMenuOpen(nextOpen);
  }

  const displayName = profile?.fullName?.trim() || "User";
  const displayEmail = profile?.email?.trim() || "";
  const avatarUrl = profile?.avatarUrl || undefined;
  const initials =
    displayName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  function openLogoutConfirm() {
    setActionError("");
    setMenuOpen(false);
    setLogoutDialogOpen(true);
  }

  function openDeleteConfirm() {
    setActionError("");
    setMenuOpen(false);
    setDeleteDialogOpen(true);
  }

  async function handleConfirmLogout() {
    setActionError("");
    setIsLoggingOut(true);

    try {
      await authClient.signOut();
      setLogoutDialogOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to log out. Try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  async function handleConfirmDeleteAccount() {
    setActionError("");
    setIsDeletingAccount(true);

    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
        credentials: "same-origin",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }

      await authClient.signOut().catch(() => {});
      setDeleteDialogOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Failed to delete account. Please try again.",
      );
    } finally {
      setIsDeletingAccount(false);
    }
  }

  return (
    <>
      {settingsMode ? (
        <nav aria-label="Settings sections" className="space-y-1">
          {SETTINGS_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSettingsSection === item.id;

            return (
              <Button
                key={item.id}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => onSelectSettingsSection?.(item.id)}
                className="w-full justify-start gap-2.5"
              >
                <Icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </Button>
            );
          })}

          <Separator className="my-3" />

          <Button
            type="button"
            variant="ghost"
            onClick={openLogoutConfirm}
            className="w-full justify-start gap-2.5 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Log out</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={openDeleteConfirm}
            className="w-full justify-start gap-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4 shrink-0" />
            <span>Delete account</span>
          </Button>
        </nav>
      ) : (
        <DropdownMenu open={menuOpen} onOpenChange={handleMenuOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button
              ref={triggerRef}
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start gap-3 rounded-xl px-2 py-2 text-left"
            >
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">
                  {displayName}
                </p>
                {displayEmail && (
                  <p className="truncate text-xs text-muted-foreground">
                    {displayEmail}
                  </p>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            style={menuWidth ? { width: `${menuWidth}px` } : undefined}
            className="min-w-56 rounded-2xl p-1.5"
          >
            <DropdownMenuItem
              onSelect={() => router.push("/chat?view=settings&section=profile")}
              className="cursor-pointer gap-2.5 rounded-xl px-3 py-2.5"
            >
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onSelect={openLogoutConfirm}
              className="cursor-pointer gap-2.5 rounded-xl px-3 py-2.5 text-destructive focus:text-destructive"
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Logout Confirmation Popup */}
      <Dialog
        open={logoutDialogOpen}
        onOpenChange={(open) => {
          if (!isLoggingOut) {
            setLogoutDialogOpen(open);
            if (!open) setActionError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again
              to access your chats and settings.
            </DialogDescription>
          </DialogHeader>

          {actionError && logoutDialogOpen && (
            <p role="alert" className="text-sm text-destructive">
              {actionError}
            </p>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isLoggingOut}
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoggingOut}
              onClick={() => void handleConfirmLogout()}
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Popup */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isDeletingAccount) {
            setDeleteDialogOpen(open);
            if (!open) setActionError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete your account? All your
              conversations, messages, and saved API keys will be erased and
              cannot be recovered.
            </DialogDescription>
          </DialogHeader>

          {actionError && deleteDialogOpen && (
            <p role="alert" className="text-sm text-destructive">
              {actionError}
            </p>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isDeletingAccount}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletingAccount}
              onClick={() => void handleConfirmDeleteAccount()}
            >
              {isDeletingAccount ? "Deleting..." : "Delete account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}