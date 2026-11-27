import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

export async function DELETE() {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = data.user.id;

    // Delete app profile (cascades to conversations, messages, api_keys, and api_usage_logs)
    await sql.begin(async (tx) => {
      await tx`
        DELETE FROM public.profiles
        WHERE user_id = ${userId}::uuid
      `;
    });

    // Remove Neon Auth user record (cascades sessions and accounts)
    try {
      await sql`
        DELETE FROM neon_auth."user"
        WHERE id = ${userId}::uuid
      `;
    } catch (authCleanupError) {
      console.warn(
        "Skipped neon_auth user cleanup (check schema permissions):",
        authCleanupError,
      );
    }

    return Response.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /api/account error:", err);
    return Response.json(
      { error: "Failed to delete account. Please try again." },
      { status: 500 },
    );
  }
}