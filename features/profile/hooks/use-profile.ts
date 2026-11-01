
"use client";

import { useCallback, useEffect, useState } from "react";
import {
    DEFAULT_PROFILE,
    type UserProfile,
} from "@/features/profile/types/profile.types";

type ApiProfile = {
    id: string;
    name: string | null;
    email: string;
    bio: string | null;
    imageKey: string | null;
    imageUrl?: string | null;
    image?: string | null;
};

async function readResponse(response: Response) {
    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message =
            data &&
            typeof data === "object" &&
            "error" in data &&
            typeof data.error === "string"
                ? data.error
                : "Request failed. Please try again.";

        throw new Error(message);
    }

    return data;
}

function mapProfile(data: ApiProfile): UserProfile {
    return {
        id: data.id,
        fullName: data.name ?? "",
        email: data.email ?? "",
        bio: data.bio ?? "",
        imageKey: data.imageKey ?? null,
        avatarUrl: data.imageUrl ?? data.image ?? "",
    };
}

export function useProfile() {
    const [profile, setProfile] =
        useState<UserProfile>(DEFAULT_PROFILE);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const reloadProfile = useCallback(async () => {
        const response = await fetch("/api/profile", {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
        });

        const data = (await readResponse(response)) as ApiProfile;
        setProfile(mapProfile(data));
    }, []);

    useEffect(() => {
        let active = true;

        async function load() {
            try {
                setError("");

                const response = await fetch("/api/profile", {
                    credentials: "same-origin",
                    cache: "no-store",
                });

                const data = (await readResponse(response)) as ApiProfile;

                if (active) {
                    setProfile(mapProfile(data));
                }
            } catch (err) {
                if (active) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Could not load profile."
                    );
                }
            } finally {
                if (active) {
                    setIsLoaded(true);
                }
            }
        }

        void load();

        return () => {
            active = false;
        };
    }, []);

    const saveProfile = useCallback(
        async (values: { fullName: string; bio: string }) => {
            setIsSaving(true);
            setError("");

            try {
                const response = await fetch("/api/profile", {
                    method: "PATCH",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: values.fullName.trim(),
                        bio: values.bio.trim(),
                    }),
                });

                await readResponse(response);
                await reloadProfile();

                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not save profile."
                );

                return false;
            } finally {
                setIsSaving(false);
            }
        },
        [reloadProfile]
    );

    const uploadAvatar = useCallback(
        async (file: File) => {
            setIsUploading(true);
            setError("");

            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/profile/image", {
                    method: "POST",
                    credentials: "same-origin",
                    body: formData,
                });

                await readResponse(response);
                await reloadProfile();

                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not upload image."
                );

                return false;
            } finally {
                setIsUploading(false);
            }
        },
        [reloadProfile]
    );

    const removeAvatar = useCallback(async () => {
        setIsUploading(true);
        setError("");

        try {
            const response = await fetch("/api/profile/image", {
                method: "DELETE",
                credentials: "same-origin",
            });

            await readResponse(response);
            await reloadProfile();

            return true;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not remove image."
            );

            return false;
        } finally {
            setIsUploading(false);
        }
    }, [reloadProfile]);

    return {
        profile,
        isLoaded,
        isSaving,
        isUploading,
        error,
        setError,
        saveProfile,
        uploadAvatar,
        removeAvatar,
        reloadProfile,
    };
}
