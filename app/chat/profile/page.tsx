import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function ProtectedProfile() {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        redirect("/login");
    }

    return <ProfileCompletionForm />;
}

export default function ChatProfilePage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading Profile...
                </div>
            }
        >
            <ProtectedProfile />
        </Suspense>
    );
}