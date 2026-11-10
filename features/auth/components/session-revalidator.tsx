
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

const REVALIDATION_INTERVAL = 2 * 60 * 60 * 1000;

export function SessionRevalidation() {
    const router = useRouter();

    useEffect(() => {
        let isChecking = false;
        let lastChecked = 0;

        async function revalidateSession(force = false) {
            if (isChecking || document.visibilityState === "hidden") {
                console.log("[Auth] Revalidation function called");
                return;
            }

            const now = Date.now();

            if (!force && now - lastChecked < REVALIDATION_INTERVAL) {
                return;
            }

            isChecking = true;

            try {
                console.log("[Auth] Sending get-session request...");
                const result = await authClient.getSession();

                if (result.error) {
                    console.error("[Auth] Session check failed:", result.error);
                    return;
                }

                lastChecked = Date.now();

                const session = result.data?.session;
                const user = result.data?.user;

                if (!session || !user || new Date(session.expiresAt).getTime() <= Date.now()) {
                    router.replace("/login");
                    router.refresh();
                    return;
                }

                console.log("[Auth] Session is valid.");
            } catch (error) {
                console.error("[Auth] Session revalidation error:", error);
            } finally {
                isChecking = false;
            }
        }

        // Initial check
        void revalidateSession(true);

        // Every 2 hours
        const intervalId = window.setInterval(() => {
            console.log(
                "[Auth] 30-second interval triggered:",
                new Date().toLocaleTimeString()
            );

            void revalidateSession(true);
        }, REVALIDATION_INTERVAL);

        // Check when returning to the browser tab
        function handleVisibilityChange() {
            if (document.visibilityState === "visible") {
                void revalidateSession();
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.clearInterval(intervalId);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, [router]);

    return null;
}
