
export interface UserProfile {
    fullName: string;
    username: string;
    bio: string;
    avatarUrl: string;
    updatedAt: string;
}

export const DEFAULT_PROFILE: UserProfile = {
    fullName: "",
    username: "",
    bio: "",
    avatarUrl: "",
    updatedAt: "",
};
