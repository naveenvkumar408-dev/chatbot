import "server-only";

import { auth } from "@/lib/auth/server";

export async function getServerUser() {
  const { data, error } = await auth.getSession();

  if (error || !data?.session || !data?.user) {
    return null;
  }

  return data.user;
}