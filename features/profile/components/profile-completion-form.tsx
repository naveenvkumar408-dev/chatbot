
"use client";

import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, UserRound, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/features/profile/hooks/use-profile";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export function ProfileCompletionForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        profile,
        isLoaded,
        isSaving,
        isUploading,
        error,
        setError,
        saveProfile,
        uploadAvatar,
        removeAvatar,
    } = useProfile();

    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [saved, setSaved] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if (!isLoaded) return;

        setFullName(profile.fullName);
        setBio(profile.bio);
    }, [isLoaded, profile.fullName, profile.bio]);

    const completion = [
        fullName.trim().length > 0,
        bio.trim().length > 0,
        Boolean(profile.avatarUrl),
    ].filter(Boolean).length;

    const progress = Math.round((completion / 3) * 100);

    const initials =
        fullName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "U";

    async function handleAvatarChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.currentTarget.files?.[0];

        // Allow selecting the same file again later.
        event.currentTarget.value = "";

        if (!file) return;

        setError("");
        setSaved(false);
        setStatusMessage("");

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setError("Choose a JPEG, PNG, or WebP image.");
            return;
        }

        if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
            setError("Choose an image smaller than 5 MB.");
            return;
        }

        const success = await uploadAvatar(file);

        if (success) {
            setStatusMessage("Profile picture uploaded successfully.");
        }
    }

    async function handleRemoveAvatar() {
        setError("");
        setSaved(false);
        setStatusMessage("");

        const success = await removeAvatar();

        if (success) {
            setStatusMessage("Profile picture removed.");
        }
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setSaved(false);
        setError("");
        setStatusMessage("");

        const cleanName = fullName.trim();

        if (!cleanName || cleanName.length > 100) {
            setError("Name must be between 1 and 100 characters.");
            return;
        }

        if (bio.length > 500) {
            setError("Bio must be 500 characters or fewer.");
            return;
        }

        const success = await saveProfile({
            fullName: cleanName,
            bio,
        });

        if (success) {
            setSaved(true);
            setStatusMessage("Profile saved successfully.");
        }
    }

    if (!isLoaded) {
        return (
            <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
                Loading your profile...
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8">
            <div className="mb-8">
                <Button
                    type="button"
                    variant="ghost"
                    className="-ml-3 mb-4"
                    onClick={() => router.push("/chat")}
                >
                    <ArrowLeft className="mr-2 size-4" />
                    Back to chat
                </Button>

                <p className="text-sm font-medium text-primary">
                    YOUR ACCOUNT
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Your profile
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Manage your account information and profile picture.
                </p>
            </div>

            {/* Profile preview */}
            <div className="mb-8 rounded-xl border p-4 sm:p-5">
                <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold">
                        {profile.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt="Profile picture"
                                className="size-full object-cover"
                            />
                        ) : initials === "U" ? (
                            <UserRound className="size-7 text-muted-foreground" />
                        ) : (
                            initials
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                            {fullName.trim() || "Your name"}
                        </p>

                        <p className="mt-1 truncate text-sm text-muted-foreground">
                            {profile.email}
                        </p>

                        {bio.trim() && (
                            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                {bio}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Profile completion
                        </span>
                        <span className="font-medium">{progress}%</span>
                    </div>

                    <div
                        className="h-2 overflow-hidden rounded-full bg-secondary"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        aria-label="Profile completion"
                    >
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* S3 profile image */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Profile picture
                    </label>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-secondary">
                            {profile.avatarUrl ? (
                                <img
                                    src={profile.avatarUrl}
                                    alt="Current profile picture"
                                    className="size-full object-cover"
                                />
                            ) : (
                                <UserRound className="size-8 text-muted-foreground" />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isUploading}
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                            >
                                <Upload className="mr-2 size-4" />
                                {isUploading ? "Please wait..." : "Upload image"}
                            </Button>

                            {profile.imageKey && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={isUploading}
                                    onClick={() => void handleRemoveAvatar()}
                                >
                                    <X className="mr-2 size-4" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(event) =>
                                void handleAvatarChange(event)
                            }
                        />
                    </div>

                    <p className="text-xs text-muted-foreground">
                        JPEG, PNG, or WebP. Maximum 5 MB.
                    </p>
                </div>

                {/* Name is saved in neon_auth."user" */}
                <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                        Full name *
                    </label>

                    <Input
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        value={fullName}
                        onChange={(event) => {
                            setFullName(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        maxLength={100}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email is read from Neon Auth */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email address
                    </label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        readOnly
                        disabled
                    />

                    <p className="text-xs text-muted-foreground">
                        Your email is managed by your authentication account.
                    </p>
                </div>

                {/* Bio is saved in public.profiles */}
                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                        About you
                    </label>

                    <Textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(event) => {
                            setBio(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        placeholder="Tell us a little about yourself..."
                        rows={4}
                        maxLength={500}
                    />

                    <p className="text-right text-xs text-muted-foreground">
                        {bio.length}/500
                    </p>
                </div>

                {error && (
                    <p role="alert" className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                {statusMessage && (
                    <p role="status" className="text-sm text-green-600">
                        {statusMessage}
                    </p>
                )}

                {saved && (
                    <p className="flex items-center gap-2 text-sm text-green-600">
                        <Check className="size-4" />
                        Changes saved.
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/chat")}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSaving || isUploading}
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
