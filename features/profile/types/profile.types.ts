export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    bio: string;
    imageKey: string | null;
    avatarUrl: string;
}

export const DEFAULT_PROFILE: UserProfile = {
    id: "",
    fullName: "",
    email: "",
    bio: "",
    imageKey: null,
    avatarUrl: "",
};
