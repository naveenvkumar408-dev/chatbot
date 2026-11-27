export const GEMINI_MODELS = [
  {
    id: "gemini-3.5-flash-lite",
    label: "Gemini 3.5 Flash-Lite",
    description: "Fastest response speed for everyday chat and quick tasks",
    badge: "Fast",
    dailyLimit: 500,
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash-Lite",
    description: "Ultra-lightweight model for simple prompts and basic Q&A",
    badge: "Lite",
    dailyLimit: 500,
  },
  {
    id: "gemma-4-31b-it",
    label: "Gemma 4 31B IT",
    description: "Open-weights 31B model strong at tool use and reasoning",
    badge: "Open",
    dailyLimit: 100,
  },
  {
    id: "gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
    description: "Intelligent Flash model for multi-step reasoning and analysis",
    badge: "Balanced",
    dailyLimit: 20,
  },
  {
    id: "gemini-4-hydrogen",
    label: "Gemini 4 Hydrogen",
    description: "Frontier Gemini 4 speed for coding and agentic workflows",
    badge: "Coding",
    dailyLimit: 20,
  },
] as const;

export type GeminiModelOption = (typeof GEMINI_MODELS)[number];
export type GeminiModelId = GeminiModelOption["id"];

export const DEFAULT_GEMINI_MODEL: GeminiModelId = "gemini-3.5-flash-lite";

const VALID_MODEL_IDS = new Set<string>(GEMINI_MODELS.map((m) => m.id));

export function isValidGeminiModel(value: unknown): value is GeminiModelId {
  return typeof value === "string" && VALID_MODEL_IDS.has(value);
}

export function getDefaultDailyLimit(modelId: string): number {
  const found = GEMINI_MODELS.find((m) => m.id === modelId);
  return found ? found.dailyLimit : 500;
}