
"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, UserRound, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/features/profile/hooks/use-profile";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const AVATAR_SIZE = 256;

async function resizeAvatar(file: File): Promise<string> {
    const image = await createImageBitmap(file);

    try {
        const canvas = document.createElement("canvas");
        canvas.width = AVATAR_SIZE;
        canvas.height = AVATAR_SIZE;

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Could not process this image.");
        }

        const scale = Math.max(
            AVATAR_SIZE / image.width,
            AVATAR_SIZE / image.height
        );

        const width = image.width * scale;
        const height = image.height * scale;

        context.drawImage(
            image,
            (AVATAR_SIZE - width) / 2,
            (AVATAR_SIZE - height) / 2,
            width,
            height
        );

        return canvas.toDataURL("image/jpeg", 0.8);
    } finally {
        image.close();
    }
}

export function ProfileCompletionForm() {
    const router = useRouter();
    const { profile, isLoaded, saveProfile } = useProfile();

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isLoaded) return;

        setFullName(profile.fullName);
        setUsername(profile.username);
        setBio(profile.bio);
        setAvatarUrl(profile.avatarUrl || "");
    }, [
        isLoaded,
        profile.fullName,
        profile.username,
        profile.bio,
        profile.avatarUrl,
    ]);

    const completion = [
        fullName.trim().length > 0,
        username.trim().length > 0,
        bio.trim().length > 0,
        avatarUrl.length > 0,
    ].filter(Boolean).length;

    const progress = Math.round((completion / 4) * 100);

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
        event.currentTarget.value = "";

        if (!file) return;

        setError("");
        setSaved(false);

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError("Choose an image smaller than 5 MB.");
            return;
        }

        try {
            const resizedImage = await resizeAvatar(file);
            setAvatarUrl(resizedImage);
        } catch {
            setError("Could not process this image. Try another one.");
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSaved(false);
        setError("");

        const cleanName = fullName.trim();
        const cleanUsername = username.trim().replace(/^@/, "");

        if (!cleanName) {
            setError("Please enter your full name.");
            return;
        }

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanUsername)) {
            setError(
                "Username must be 3–20 characters using letters, numbers, or underscores."
            );
            return;
        }

        setIsSaving(true);

        const success = saveProfile({
            fullName: cleanName,
            username: cleanUsername,
            bio: bio.trim(),
            avatarUrl,
        });

        setIsSaving(false);

        if (success) {
            router.push("/chat");
        } else {
            setError("Could not save your profile. Please try again.");
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
                <p className="text-sm font-medium text-primary">
                    YOUR ACCOUNT
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Complete your profile
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Add a few details so your account feels like yours.
                    You can update these details at any time.
                </p>
            </div>

            {/* Profile preview */}
            <div className="mb-8 rounded-xl border p-4 sm:p-5">
                <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Profile preview"
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
                            {username.trim()
                                ? `@${username.trim().replace(/^@/, "")}`
                                : "Your username"}
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
                {/* Avatar upload */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Profile picture
                    </label>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-secondary">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Selected profile picture"
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
                                onClick={() =>
                                    document.getElementById("avatarUpload")?.click()
                                }
                            >
                                <Upload className="mr-2 size-4" />
                                Upload image
                            </Button>

                            {avatarUrl && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setAvatarUrl("");
                                        setSaved(false);
                                    }}
                                >
                                    <X className="mr-2 size-4" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <p className="text-xs text-muted-foreground">
                        JPG, PNG, or another image format. Maximum 5 MB.
                    </p>
                </div>

                {/* Full name */}
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
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                        Username *
                    </label>
                    <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        placeholder="e.g. alex_smith"
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        3–20 characters. Letters, numbers, and underscores only.
                    </p>
                </div>

                {/* Bio */}
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
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                {saved && (
                    <p
                        role="status"
                        className="flex items-center gap-2 text-sm text-green-600"
                    >
                        <Check className="size-4" />
                        Profile saved successfully.
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/chat")}
                    >
                        Do this later
                    </Button>

                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
