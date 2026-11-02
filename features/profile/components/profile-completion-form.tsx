
"use client";

import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import {
    Camera,
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

    useEffect(() => {
        if (loading) return;

        setFullName(profile.fullName ?? "");
        setBio(profile.bio ?? "");
    }, [loading, profile.fullName, profile.bio]);

    const initials =
        fullName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "U";

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

        if (file.size > 5 * 1024 * 1024) {
            setError("The image must be smaller than 5 MB.");
            return;
        }

        setError("");
        setMessage("");

        const success = await uploadAvatar(file);

        if (success) {
            setMessage("Profile picture updated.");
        }
    }

    async function handleRemoveAvatar() {
        setError("");
        setMessage("");

        const success = await removeAvatar();

        if (success) {
            setMessage("Profile picture removed.");
        }
    }

    function handleAvatarEditClick() {
        if (isUploading) return;

        if (!isEditing) {
            // Enter edit mode first. The shared file input remains mounted,
            // so it can be opened immediately.
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
            {/* Shared file input: available in both view and edit mode */}
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
                            disabled={
                                isSaving || isUploading || !hasChanges
                            }
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

            {/* Centered profile image and identity */}
            <section className="flex flex-col items-center pb-8 pt-16 text-center sm:pt-14">

                <div className="group relative mb-5 inline-flex">
                    <div className="flex size-32 items-center justify-center overflow-hidden rounded-full border bg-muted text-3xl font-medium shadow-sm sm:size-40 sm:text-4xl">
                        {profile.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={profile.avatarUrl}
                                alt={`${profile.fullName || "User"} profile picture`}
                                className="size-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleAvatarEditClick}
                        disabled={isUploading}
                        aria-label="Edit profile picture"
                        title="Edit profile picture"
                        className="absolute -right-1 -top-1 z-10 flex size-10 items-center justify-center rounded-full bg-neutral-600 text-white shadow-md opacity-100 transition-all duration-200 hover:bg-neutral-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                    >
                        {isUploading ? (
                            <LoaderCircle className="size-5 animate-spin" />
                        ) : (
                            <Pencil className="size-5" />
                        )}
                    </button>
                </div>


                <h1 className="max-w-full wrap-words text-3xl font-semibold tracking-tight sm:text-4xl">
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
                                Full name <span className="text-destructive">*</span>
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
