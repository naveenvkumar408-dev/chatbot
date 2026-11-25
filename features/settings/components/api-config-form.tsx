"use client";

import { useEffect, useState } from "react";
import { KeyRound, Trash2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/shared/password-input";

export function ApiConfigForm() {
  const [apiKey, setApiKey] = useState("");
  const [configured, setConfigured] = useState(false);
  const [keyHint, setKeyHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    return () => {
      active = false;
    };
  }, []);

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
      setSuccess("Gemini API key saved securely.");
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
      setSuccess("API key removed. Falling back to default server key.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove API key.");
    } finally {
      setRemoving(false);
    }
  }

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

      <div className="rounded-xl border p-5 space-y-5">
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
    </div>
  );
}