import { auth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

const authMiddleware = auth.middleware({
  loginUrl: "/login",
});

export default function proxy(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/profile/:path*"],
};