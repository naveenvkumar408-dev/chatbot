import "server-only";

type GeminiPart = {
  text?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
};

export type GeminiHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

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

export async function generateGeminiResponse(
  history: GeminiHistoryMessage[],
  customApiKey?: string,
): Promise<string> {
  const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();
  const primaryModel = process.env.GEMINI_MODEL?.trim();
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL?.trim();

  if (!apiKey) {
    throw new Error(
      "No Gemini API key configured. Add your key in Settings > API Configure.",
    );
  }

  if (!primaryModel) {
    throw new Error("GEMINI_MODEL is not configured.");
  }

  const contents = history.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.content }],
  }));

  let lastErrorMessage = "Gemini could not generate a response.";

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
        throw new Error("Gemini returned an empty response.");
      }

      return answer;
    }

    lastErrorMessage =
      data.error?.message ?? "Gemini could not generate a response.";

    console.warn(`[Gemini] Attempt ${attempt + 1} failed (${primaryModel}):`, {
      status: response.status,
      message: lastErrorMessage,
    });

    if (!RETRYABLE_STATUSES.has(response.status)) {
      throw new Error(lastErrorMessage);
    }
  }

  // Optional fallback model if primary model remains overloaded after all retries
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
        return answer;
      }
    }
  }

  throw new Error(lastErrorMessage);
}