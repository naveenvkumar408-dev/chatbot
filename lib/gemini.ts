import "server-only";
import { DEFAULT_GEMINI_MODEL } from "@/lib/models";

type GeminiPart = {
  text?: string;
};

type GeminiUsageMetadata = {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  thoughtsTokenCount?: number;
  totalTokenCount?: number;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  usageMetadata?: GeminiUsageMetadata;
  error?: {
    message?: string;
  };
};

export type GeminiHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GeminiGenerationResult = {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
};

export class GeminiApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiApiError";
    this.status = status;
  }
}

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const RETRY_DELAYS_MS = [0, 1000, 2500];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestGemini(
  model: string,
  apiKey: string,
  contents: Array<{ role: string; parts: Array<{ text: string }> }>,
) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(60_000),
    },
  );

  const data = (await response.json().catch(() => ({}))) as GeminiResponse;
  return { response, data };
}

export function extractGeminiTokens(usage?: GeminiUsageMetadata) {
  const inputTokens = usage?.promptTokenCount ?? 0;
  const outputTokens =
    (usage?.candidatesTokenCount ?? 0) + (usage?.thoughtsTokenCount ?? 0);

  return { inputTokens, outputTokens };
}

export async function generateGeminiResponse(
  history: GeminiHistoryMessage[],
  customApiKey?: string,
  selectedModel?: string,
): Promise<GeminiGenerationResult> {
  const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();
  const primaryModel =
    selectedModel?.trim() ||
    process.env.GEMINI_MODEL?.trim() ||
    DEFAULT_GEMINI_MODEL;
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL?.trim();

  if (!apiKey) {
    throw new GeminiApiError(
      "No Gemini API key configured. Add your key in Settings > API Configure.",
      400,
    );
  }

  const contents = history.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.content }],
  }));

  let lastErrorMessage = "Gemini could not generate a response.";
  let lastStatus = 502;

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length; attempt++) {
    const delay = RETRY_DELAYS_MS[attempt];
    if (delay > 0) {
      await sleep(delay);
    }

    const { response, data } = await requestGemini(
      primaryModel,
      apiKey,
      contents,
    );

    if (response.ok) {
      const answer = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (!answer) {
        throw new GeminiApiError("Gemini returned an empty response.", 502);
      }

      const { inputTokens, outputTokens } = extractGeminiTokens(
        data.usageMetadata,
      );

      return {
        text: answer,
        model: primaryModel,
        inputTokens,
        outputTokens,
      };
    }

    lastStatus = response.status;
    lastErrorMessage =
      data.error?.message ?? "Gemini could not generate a response.";

    console.warn(`[Gemini] Attempt ${attempt + 1} failed (${primaryModel}):`, {
      status: response.status,
      message: lastErrorMessage,
    });

    if (!RETRYABLE_STATUSES.has(response.status)) {
      throw new GeminiApiError(lastErrorMessage, response.status);
    }
  }

  if (fallbackModel && fallbackModel !== primaryModel) {
    const { response, data } = await requestGemini(
      fallbackModel,
      apiKey,
      contents,
    );

    if (response.ok) {
      const answer = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (answer) {
        const { inputTokens, outputTokens } = extractGeminiTokens(
          data.usageMetadata,
        );

        return {
          text: answer,
          model: fallbackModel,
          inputTokens,
          outputTokens,
        };
      }
    }
  }

  throw new GeminiApiError(lastErrorMessage, lastStatus);
}