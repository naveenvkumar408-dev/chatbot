"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const result = await authClient.getSession();

        if (cancelled || result.error) return;

        const isAuthenticated = Boolean(
          result.data?.session && result.data?.user
        );

        const isAuthPage =
          pathname === "/login" || pathname === "/signup";

        if (isAuthenticated && isAuthPage) {
          router.replace("/chat");
        } else if (!isAuthenticated && pathname.startsWith("/chat")) {
          router.replace("/login");
        }
      } catch (error) {
        console.error("[Auth] Initial session check failed:", error);
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  return null;
}