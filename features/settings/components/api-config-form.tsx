"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  KeyRound,
  Trash2,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/password-input";
import { GEMINI_MODELS, getDefaultDailyLimit } from "@/lib/models";

type UsageStats = {
  configured: boolean;
  keyHint: string | null;
  activeSince: string | null;
  inputTokens: number;
  outputTokens: number;
  totalRequests: number;
  totalErrors: number;
  todayRequests: number;
  todayByModel: Array<{
    model: string;
    requestsToday: number;
  }>;
  byModel: Array<{
    model: string;
    requests: number;
    totalTokens: number;
  }>;
};

const EMPTY_USAGE: UsageStats = {
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
};

const CUSTOM_LIMITS_STORAGE_KEY = "gemini_custom_daily_limits_v1";

function calculateQuotaPercent(used: number, limit: number): number {
  if (limit <= 0) return 0;
  const raw = (used / limit) * 100;
  return Math.min(100, Math.round(raw * 10) / 10);
}

function getQuotaBarColor(percent: number): string {
  if (percent >= 90) return "bg-destructive";
  if (percent >= 70) return "bg-amber-500";
  return "bg-emerald-500";
}

export function ApiConfigForm() {
  const [apiKey, setApiKey] = useState("");
  const [configured, setConfigured] = useState(false);
  const [keyHint, setKeyHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [usage, setUsage] = useState<UsageStats>(EMPTY_USAGE);
  const [usageLoading, setUsageLoading] = useState(true);

  const [customLimits, setCustomLimits] = useState<Record<string, number>>({});
  const [editingLimits, setEditingLimits] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CUSTOM_LIMITS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, number>;
        if (parsed && typeof parsed === "object") {
          setCustomLimits(parsed);
        }
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }, []);

  function updateModelLimit(modelId: string, nextValue: string) {
    const parsed = Number.parseInt(nextValue, 10);
    const sanitized = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

    setCustomLimits((prev) => {
      const updated = { ...prev, [modelId]: sanitized };
      try {
        window.localStorage.setItem(
          CUSTOM_LIMITS_STORAGE_KEY,
          JSON.stringify(updated),
        );
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  }

  function resetModelLimits() {
    setCustomLimits({});
    try {
      window.localStorage.removeItem(CUSTOM_LIMITS_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }

  const loadUsage = useCallback(async () => {
    setUsageLoading(true);
    try {
      const res = await fetch("/api/settings/usage", {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as UsageStats;
        setUsage({
          configured: Boolean(data.configured),
          keyHint: data.keyHint ?? null,
          activeSince: data.activeSince ?? null,
          inputTokens: data.inputTokens ?? 0,
          outputTokens: data.outputTokens ?? 0,
          totalRequests: data.totalRequests ?? 0,
          totalErrors: data.totalErrors ?? 0,
          todayRequests: data.todayRequests ?? 0,
          todayByModel: Array.isArray(data.todayByModel)
            ? data.todayByModel
            : [],
          byModel: Array.isArray(data.byModel) ? data.byModel : [],
        });
      }
    } catch {
      // Keep default metrics on failure
    } finally {
      setUsageLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/settings/api-key", {
          credentials: "same-origin",
          cache: "no-store",
        });
        const data = await res.json();

        if (active && res.ok) {
          setConfigured(Boolean(data.configured));
          setKeyHint(data.keyHint ?? null);
        }
      } catch {
        if (active) setError("Could not load API configuration.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    void loadUsage();

    return () => {
      active = false;
    };
  }, [loadUsage]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings/api-key", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save API key.");
      }

      setConfigured(true);
      setKeyHint(data.keyHint);
      setApiKey("");
      setSuccess("Gemini API key saved securely. Live usage tracking started.");
      void loadUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save API key.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    setError("");
    setSuccess("");
    setRemoving(true);

    try {
      const res = await fetch("/api/settings/api-key", {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to remove API key.");
      }

      setConfigured(false);
      setKeyHint(null);
      setUsage(EMPTY_USAGE);
      setSuccess("API key removed. Falling back to default server key.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove API key.");
    } finally {
      setRemoving(false);
    }
  }

  const quotaRows = useMemo(() => {
    const todayMap = new Map(
      usage.todayByModel.map((item) => [item.model, item.requestsToday]),
    );

    return GEMINI_MODELS.map((model) => {
      const used = todayMap.get(model.id) ?? 0;
      const limit = customLimits[model.id] ?? getDefaultDailyLimit(model.id);
      const percent = calculateQuotaPercent(used, limit);

      return {
        id: model.id,
        label: model.label,
        used,
        limit,
        percent,
      };
    });
  }, [usage.todayByModel, customLimits]);

  const totalDailyLimit = useMemo(
    () => quotaRows.reduce((sum, row) => sum + row.limit, 0),
    [quotaRows],
  );

  const overallQuotaPercent = calculateQuotaPercent(
    usage.todayRequests,
    totalDailyLimit,
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6 sm:p-10">
      <div>
        <p className="text-sm text-muted-foreground">DEVELOPER</p>
        <h1 className="mt-2 text-2xl font-semibold">API Configure</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your own Gemini API key. Keys are encrypted with AES-256-GCM
          before being stored and are never exposed back to the browser.
        </p>
      </div>

      {/* API Key Form Card */}
      <div className="space-y-5 rounded-xl border p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/50">
              <KeyRound className="size-5" />
            </div>
            <div>
              <h2 className="font-medium">Gemini API Key</h2>
              <p className="text-xs text-muted-foreground">
                {loading
                  ? "Checking saved key..."
                  : configured
                    ? `Saved key: ${keyHint}`
                    : "No personal key configured"}
              </p>
            </div>
          </div>

          {configured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-3.5" />
              Active
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="gemini-api-key" className="text-sm font-medium">
              {configured ? "Replace API Key" : "Enter API Key"}
            </label>
            <PasswordInput
              id="gemini-api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              autoComplete="off"
              disabled={saving || removing}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-600 dark:text-green-400">
              {success}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={saving || removing || !apiKey.trim()}>
              {saving ? "Saving..." : configured ? "Update Key" : "Save Key"}
            </Button>

            {configured && (
              <Button
                type="button"
                variant="outline"
                disabled={saving || removing}
                onClick={() => void handleRemove()}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-2 size-4" />
                {removing ? "Removing..." : "Remove Key"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Live Usage Tracking (Active Personal Key Only) */}
      {!loading && !configured ? (
        <div className="rounded-xl border border-dashed p-5 text-center">
          <p className="text-sm font-medium">No personal API key active</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Save your Gemini API key above to start tracking live quota and
            token usage while using your key.
          </p>
        </div>
      ) : (
        <>
          {/* Daily % Quota Used Card */}
          <div className="space-y-4 rounded-xl border p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-medium">Daily Quota Used</h2>
                <p className="text-xs text-muted-foreground">
                  Tracked while using {keyHint ?? "your active key"} · Resets
                  daily at midnight Pacific Time.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingLimits((prev) => !prev)}
                  className="h-8 gap-1.5 text-xs"
                >
                  <SlidersHorizontal className="size-3.5" />
                  {editingLimits ? "Done" : "Edit RPD limits"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={usageLoading}
                  onClick={() => void loadUsage()}
                  className="h-8 gap-1.5 text-xs"
                >
                  <RefreshCw
                    className={`size-3.5 ${usageLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Overall % Quota Progress Bar */}
            <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-2xl font-semibold tabular-nums">
                    {usageLoading ? "—" : `${overallQuotaPercent}%`}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    of 100% daily quota used
                  </span>
                </div>

                <span className="text-xs text-muted-foreground tabular-nums">
                  {usageLoading
                    ? "Loading..."
                    : `${usage.todayRequests.toLocaleString()} / ${totalDailyLimit.toLocaleString()} requests`}
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${getQuotaBarColor(overallQuotaPercent)}`}
                  style={{ width: `${usageLoading ? 0 : overallQuotaPercent}%` }}
                />
              </div>
            </div>

            {/* Per-Model Daily Quota Breakdown */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  Per-model daily quota (RPD)
                </p>
                {editingLimits && (
                  <button
                    type="button"
                    onClick={resetModelLimits}
                    className="text-xs text-primary hover:underline"
                  >
                    Reset defaults
                  </button>
                )}
              </div>

              <div className="space-y-3 rounded-lg border p-3.5">
                {quotaRows.map((row) => (
                  <div key={row.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-medium">{row.label}</span>

                      <div className="flex items-center gap-2 tabular-nums">
                        {editingLimits ? (
                          <label className="flex items-center gap-1.5 text-muted-foreground">
                            <span>{row.used} /</span>
                            <Input
                              type="number"
                              min={1}
                              value={row.limit}
                              onChange={(e) =>
                                updateModelLimit(row.id, e.target.value)
                              }
                              className="h-6 w-20 px-2 text-right text-xs"
                            />
                            <span>RPD</span>
                          </label>
                        ) : (
                          <span className="text-muted-foreground">
                            {row.used} / {row.limit} ({row.percent}%)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getQuotaBarColor(row.percent)}`}
                        style={{
                          width: `${usageLoading ? 0 : row.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Key Totals Card */}
          <div className="space-y-4 rounded-xl border p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-medium">Active Key Totals</h2>
                <p className="text-xs text-muted-foreground">
                  Cumulative usage recorded since this key was activated.
                </p>
              </div>

              <a
                href="https://aistudio.google.com/usage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium hover:bg-accent"
              >
                AI Studio
                <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border bg-muted/30 p-3.5">
                <p className="text-xs text-muted-foreground">Input tokens</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">
                  {usageLoading ? "—" : usage.inputTokens.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3.5">
                <p className="text-xs text-muted-foreground">Output tokens</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">
                  {usageLoading ? "—" : usage.outputTokens.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3.5">
                <p className="text-xs text-muted-foreground">Total requests</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">
                  {usageLoading ? "—" : usage.totalRequests.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3.5">
                <p className="text-xs text-muted-foreground">Errors</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">
                  {usageLoading ? "—" : usage.totalErrors.toLocaleString()}
                </p>
              </div>
            </div>

            {usage.byModel.length > 0 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Breakdown by model
                </p>
                <div className="divide-y rounded-lg border text-xs">
                  {usage.byModel.map((item) => (
                    <div
                      key={item.model}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <span className="font-medium">{item.model}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.requests} req ·{" "}
                        {item.totalTokens.toLocaleString()} tokens
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}