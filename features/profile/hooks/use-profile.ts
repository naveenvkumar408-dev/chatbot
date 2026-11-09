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
};

type ImageApiResponse = {
  message?: string;
  imageKey: string | null;
  imageUrl: string | null;
};

const PROFILE_UPDATED_EVENT = "profile-updated";

async function readResponse<T>(response: Response): Promise<T> {
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

  return data as T;
}

function mapProfile(data: ApiProfile): UserProfile {
  return {
    id: data.id,
    fullName: data.name ?? "",
    email: data.email ?? "",
    bio: data.bio ?? "",
    imageKey: data.imageKey ?? null,
    avatarUrl: data.imageUrl ?? "",
  };
}

/**
 * Broadcast a profile update to every mounted useProfile() instance.
 */
function publishProfileUpdate(profile: UserProfile) {
  window.dispatchEvent(
    new CustomEvent<UserProfile>(PROFILE_UPDATED_EVENT, {
      detail: profile,
    }),
  );
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Listen for profile changes from other components.
   * This synchronizes SidebarProfile and ProfileCompletionForm.
   */
  useEffect(() => {
    function handleProfileUpdated(event: Event) {
      const customEvent = event as CustomEvent<UserProfile>;

      if (customEvent.detail) {
        setProfile(customEvent.detail);
      }
    }

    window.addEventListener(
      PROFILE_UPDATED_EVENT,
      handleProfileUpdated,
    );

    return () => {
      window.removeEventListener(
        PROFILE_UPDATED_EVENT,
        handleProfileUpdated,
      );
    };
  }, []);

  /**
   * Fetch the latest profile from the server.
   */
  const reloadProfile = useCallback(async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    });

    const data = await readResponse<ApiProfile>(response);
    const updatedProfile = mapProfile(data);

    setProfile(updatedProfile);
    publishProfileUpdate(updatedProfile);

    return updatedProfile;
  }, []);

  /**
   * Load profile when the hook mounts.
   */
  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        const data = await readResponse<ApiProfile>(response);

        if (active) {
          setProfile(mapProfile(data));
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load profile.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          setIsLoaded(true);
        }
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, []);

  /**
   * Save name and bio.
   */
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

        await readResponse<{ message: string }>(response);

        // Reload and broadcast the updated name/bio to all components.
        await reloadProfile();

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not save profile.",
        );

        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [reloadProfile],
  );

  /**
   * Upload an avatar and immediately update every component.
   */
  const uploadAvatar = useCallback(
    async (file: File): Promise<boolean> => {
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

        const result =
          await readResponse<ImageApiResponse>(response);

        // Update the current profile immediately.
        const updatedProfile: UserProfile = {
          ...profile,
          imageKey: result.imageKey,
          avatarUrl: result.imageUrl ?? "",
        };

        setProfile(updatedProfile);

        // Update SidebarProfile and every other useProfile() instance.
        publishProfileUpdate(updatedProfile);

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not upload image.",
        );

        return false;
      } finally {
        setIsUploading(false);
      }
    },
    [profile],
  );

  /**
   * Remove the avatar and immediately show the user's initials.
   */
  const removeAvatar = useCallback(async () => {
    setIsUploading(true);
    setError("");

    try {
      const response = await fetch("/api/profile/image", {
        method: "DELETE",
        credentials: "same-origin",
      });

      const result =
        await readResponse<ImageApiResponse>(response);

      const updatedProfile: UserProfile = {
        ...profile,
        imageKey: result.imageKey,
        avatarUrl: result.imageUrl ?? "",
      };

      setProfile(updatedProfile);
      publishProfileUpdate(updatedProfile);

      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not remove image.",
      );

      return false;
    } finally {
      setIsUploading(false);
    }
  }, [profile]);

  return {
    profile,
    isLoaded,
    loading,
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