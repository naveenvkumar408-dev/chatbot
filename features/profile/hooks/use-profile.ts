
"use client";

import { useEffect, useState } from "react";
import {
    DEFAULT_PROFILE,
    type UserProfile,
} from "@/features/profile/types/profile.types";

const STORAGE_KEY = "chatgpt-clone-profile-v1";

export function useProfile() {
    const [profile, setProfile] =
        useState<UserProfile>(DEFAULT_PROFILE);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    parsed &&
                    typeof parsed === "object" &&
                    "fullName" in parsed &&
                    "username" in parsed &&
                    "bio" in parsed
                ) {
                    const data = parsed as Record<string, unknown>;

                    setProfile({
                        fullName:
                            typeof data.fullName === "string"
                                ? data.fullName
                                : "",
                        username:
                            typeof data.username === "string"
                                ? data.username
                                : "",
                        bio:
                            typeof data.bio === "string"
                                ? data.bio
                                : "",
                        avatarUrl:
                            typeof data.avatarUrl === "string"
                                ? data.avatarUrl
                                : "",
                        updatedAt:
                            typeof data.updatedAt === "string"
                                ? data.updatedAt
                                : "",
                    });
                }
            }
        } catch (error) {
            console.error("Could not load profile:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    function saveProfile(
        values: Omit<UserProfile, "updatedAt">
    ): boolean {
        const updatedProfile: UserProfile = {
            ...values,
            fullName: values.fullName.trim(),
            username: values.username.trim().replace(/^@/, ""),
            bio: values.bio.trim(),
            avatarUrl: values.avatarUrl || "",
            updatedAt: new Date().toISOString(),
        };

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedProfile)
            );

            setProfile(updatedProfile);
            return true;
        } catch (error) {
            console.error("Could not save profile:", error);
            return false;
        }
    }

    return { profile, isLoaded, saveProfile };
}
