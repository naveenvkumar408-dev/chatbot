"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Check,
  LoaderCircle,
  Mail,
  Pencil,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/features/profile/hooks/use-profile";

export function ProfileCompletionForm() {
  const {
    profile,
    loading,
    isSaving,
    isUploading,
    error,
    setError,
    saveProfile,
    uploadAvatar,
    removeAvatar,
  } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  // Populate the form after the profile has loaded.
  useEffect(() => {
    if (loading) return;

    setFullName(profile.fullName ?? "");
    setBio(profile.bio ?? "");
  }, [loading, profile.fullName, profile.bio]);

  // Reset the image error whenever a new avatar URL is received.
  useEffect(() => {
    setAvatarError(false);
  }, [profile.avatarUrl]);

  // Always use the first letter of the full name as the fallback.
  const initials =
    profile.fullName?.trim().charAt(0).toUpperCase() || "U";

  const hasChanges =
    fullName !== (profile.fullName ?? "") ||
    bio !== (profile.bio ?? "");

  function startEditing() {
    setError("");
    setMessage("");
    setIsEditing(true);
  }

  function handleCancel() {
    setFullName(profile.fullName ?? "");
    setBio(profile.bio ?? "");
    setError("");
    setMessage("");
    setIsEditing(false);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setError("");
    setMessage("");

    const success = await saveProfile({
      fullName: fullName.trim(),
      bio: bio.trim(),
    });

    if (success) {
      setMessage("Profile updated successfully.");
      setIsEditing(false);
    }
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    // Allow selecting the same file again.
    event.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size === 0 || file.size > 5 * 1024 * 1024) {
      setError("The image must be between 1 byte and 5 MB.");
      return;
    }

    setError("");
    setMessage("");

    const success = await uploadAvatar(file);

    if (success) {
      setAvatarError(false);
      setMessage("Profile picture updated.");
    }
  }

  async function handleRemoveAvatar() {
    setError("");
    setMessage("");

    const success = await removeAvatar();

    if (success) {
      setAvatarError(false);
      setMessage("Profile picture removed.");
    }
  }

  function handleAvatarEditClick() {
    if (isUploading) return;

    if (!isEditing) {
      startEditing();
    }

    fileInputRef.current?.click();
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="size-7 animate-spin text-muted-foreground" />
        <span className="ml-3 text-sm text-muted-foreground">
          Loading profile...
        </span>
      </div>
    );
  }

  return (
    <div className="relative mx-auto min-h-full w-full max-w-5xl px-5 py-8 sm:px-10 sm:py-12">
      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Choose profile picture"
      />

      {/* Top-right actions */}
      <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-10 sm:top-8">
        {isEditing ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving || isUploading}
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              form="profile-edit-form"
              disabled={isSaving || isUploading || !hasChanges}
            >
              {isSaving ? (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              ) : (
                <Check className="mr-2 size-4" />
              )}

              {isSaving ? "Saving..." : "Save"}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={startEditing}
          >
            <Pencil className="mr-2 size-4" />
            Edit profile
          </Button>
        )}
      </div>

      {/* Profile image and identity */}
      <section className="flex flex-col items-center pb-8 pt-16 text-center sm:pt-14">
        <div className="group relative mx-auto size-40">
          <div className="flex size-full items-center justify-center overflow-hidden rounded-full border bg-muted text-5xl font-semibold text-foreground shadow-sm">
            {profile.avatarUrl && !avatarError ? (
              <img
                key={profile.avatarUrl}
                src={profile.avatarUrl}
                alt={`${profile.fullName || "User"} profile picture`}
                onError={() => setAvatarError(true)}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAvatarEditClick}
            disabled={isUploading}
            aria-label="Edit profile picture"
            className="absolute right-1 top-1 flex size-10 items-center justify-center rounded-full bg-neutral-600 text-white opacity-0 shadow-md transition hover:bg-neutral-700 group-hover:opacity-100 focus-visible:opacity-100 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Pencil className="size-5" />
            )}
          </button>
        </div>

        <h1 className="mt-3 max-w-full text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.fullName || "Your name"}
        </h1>

        <p className="mt-2 max-w-full break-all text-base text-muted-foreground">
          {profile.email}
        </p>
      </section>

      {/* Feedback messages */}
      {error && (
        <div
          role="alert"
          className="mx-auto mb-5 flex max-w-2xl items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <X className="size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div
          role="status"
          className="mx-auto mb-5 flex max-w-2xl items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm"
        >
          <Check className="size-4 shrink-0 text-emerald-600" />
          <p>{message}</p>
        </div>
      )}

      {/* View mode */}
      {!isEditing && (
        <section className="mx-auto max-w-2xl border-t pt-8">
          <h2 className="mb-5 text-lg font-semibold">About</h2>

          <div className="rounded-2xl border bg-card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <UserRound className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Full name</p>
                <p className="mt-1 wrap-words text-sm text-muted-foreground">
                  {profile.fullName || "Not provided"}
                </p>
              </div>
            </div>

            <div className="my-5 border-t" />

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Mail className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Email address</p>
                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {profile.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="my-5 border-t" />

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Pencil className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">About you</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {profile.bio || "You haven't added a bio yet."}
                </p>
              </div>
            </div>

            {profile.avatarUrl && (
              <>
                <div className="my-5 border-t" />

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Profile picture</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Remove your uploaded profile picture.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploading}
                    onClick={handleRemoveAvatar}
                  >
                    {isUploading ? "Removing..." : "Remove"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Edit mode */}
      {isEditing && (
        <form
          id="profile-edit-form"
          onSubmit={handleSave}
          className="mx-auto max-w-2xl border-t pt-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Edit your profile
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal information and profile picture.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6">
            <div className="space-y-2">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium"
              >
                Full name{" "}
                <span className="text-destructive">*</span>
              </label>

              <Input
                id="profile-name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profile-email"
                className="text-sm font-medium"
              >
                Email address
              </label>

              <Input
                id="profile-email"
                type="email"
                value={profile.email}
                readOnly
                className="bg-muted/50"
              />

              <p className="text-xs text-muted-foreground">
                Your email is managed by your authentication account.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="profile-bio"
                  className="text-sm font-medium"
                >
                  About you
                </label>

                <span className="text-xs text-muted-foreground">
                  {bio.length}/300
                </span>
              </div>

              <Textarea
                id="profile-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Tell us about yourself..."
                rows={5}
                maxLength={300}
                className="resize-y"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}