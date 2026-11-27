import { auth } from "@/lib/auth/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const { data, error } = await auth.getSession();

    if (error || !data?.session || !data?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keyRows = await sql`
      SELECT
        ak.id::text AS "apiKeyId",
        ak.key_hint AS "keyHint",
        ak.updated_at AS "updatedAt"
      FROM public.api_keys AS ak
      INNER JOIN public.profiles AS p
        ON p.id = ak.profile_id
      WHERE
        p.user_id = ${data.user.id}::uuid
        AND ak.provider = 'gemini'
      LIMIT 1
    `;

    const activeKey = keyRows[0];

    if (!activeKey) {
      return Response.json({
        configured: false,
        keyHint: null,
        activeSince: null,
        inputTokens: 0,
        outputTokens: 0,
        totalRequests: 0,
        totalErrors: 0,
        todayRequests: 0,
        todayByModel: [],
        byModel: [],
      });
    }

    const apiKeyId = String(activeKey.apiKeyId);
    const activeSince = new Date(
      activeKey.updatedAt as string | Date,
    ).toISOString();

    const [summaryRows, modelRows, todayModelRows] = await Promise.all([
      sql`
        SELECT
          COALESCE(SUM(u.input_tokens), 0)::int AS "inputTokens",
          COALESCE(SUM(u.output_tokens), 0)::int AS "outputTokens",
          COUNT(*)::int AS "totalRequests",
          COUNT(*) FILTER (WHERE u.status_code >= 400)::int AS "totalErrors"
        FROM public.api_usage_logs AS u
        INNER JOIN public.api_keys AS ak
          ON ak.id = u.api_key_id
        WHERE
          u.api_key_id = ${apiKeyId}::bigint
          AND u.created_at >= ak.updated_at
      `,
      sql`
        SELECT
          u.model,
          COUNT(*)::int AS "requests",
          COALESCE(SUM(u.input_tokens + u.output_tokens), 0)::int AS "totalTokens"
        FROM public.api_usage_logs AS u
        INNER JOIN public.api_keys AS ak
          ON ak.id = u.api_key_id
        WHERE
          u.api_key_id = ${apiKeyId}::bigint
          AND u.created_at >= ak.updated_at
        GROUP BY u.model
        ORDER BY "requests" DESC
      `,
      sql`
        SELECT
          u.model,
          COUNT(*)::int AS "requestsToday"
        FROM public.api_usage_logs AS u
        INNER JOIN public.api_keys AS ak
          ON ak.id = u.api_key_id
        WHERE
          u.api_key_id = ${apiKeyId}::bigint
          AND u.created_at >= ak.updated_at
          AND DATE(u.created_at AT TIME ZONE 'America/Los_Angeles') =
              DATE(NOW() AT TIME ZONE 'America/Los_Angeles')
        GROUP BY u.model
      `,
    ]);

    const summary = summaryRows[0];

    const todayByModel = todayModelRows.map((row) => ({
      model: String(row.model),
      requestsToday: Number(row.requestsToday ?? 0),
    }));

    const byModel = modelRows.map((row) => ({
      model: String(row.model),
      requests: Number(row.requests ?? 0),
      totalTokens: Number(row.totalTokens ?? 0),
    }));

    const todayRequests = todayByModel.reduce(
      (sum, row) => sum + row.requestsToday,
      0,
    );

    return Response.json({
      configured: true,
      keyHint: activeKey.keyHint ? String(activeKey.keyHint) : null,
      activeSince,
      inputTokens: Number(summary?.inputTokens ?? 0),
      outputTokens: Number(summary?.outputTokens ?? 0),
      totalRequests: Number(summary?.totalRequests ?? 0),
      totalErrors: Number(summary?.totalErrors ?? 0),
      todayRequests,
      todayByModel,
      byModel,
    });
  } catch (err) {
    console.error("GET /api/settings/usage error:", err);
    return Response.json(
      { error: "Failed to load usage statistics" },
      { status: 500 },
    );
  }
}