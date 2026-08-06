import { env } from "../_core/env";

const CHAT_COMPLETIONS_PATH = "/skycowork_llm/v1/proxy/chat/completions";
const REQUEST_TIMEOUT_MS = 30_000;

export type PlatformAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type PlatformAIChatInput = {
  sceneKey: string;
  messages: PlatformAIMessage[];
};

export type PlatformAIErrorCode =
  | "PLATFORM_AI_NOT_CONFIGURED"
  | "PLATFORM_AI_UPSTREAM_ERROR"
  | "PLATFORM_AI_REQUEST_FAILED"
  | "PLATFORM_AI_INVALID_RESPONSE";

export class PlatformAIError extends Error {
  constructor(
    readonly code: PlatformAIErrorCode,
    message: string,
    readonly status: 500 | 502
  ) {
    super(message);
    this.name = "PlatformAIError";
  }
}

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
};

function platformAIUrl() {
  const baseUrl = env.SKYWORK_AI_BASE_URL.trim().replace(/\/+$/, "");
  if (!baseUrl || !env.SKYWORK_API_TOKEN) {
    throw new PlatformAIError("PLATFORM_AI_NOT_CONFIGURED", "Platform AI is not configured", 500);
  }

  return `${baseUrl}${CHAT_COMPLETIONS_PATH}`;
}

export async function requestPlatformAIChat(input: PlatformAIChatInput) {
  const url = platformAIUrl();
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Skywork-Api-Token": env.SKYWORK_API_TOKEN,
        "x-skywork-billing-source": "skybot",
        "X-Skywork-Scene": input.sceneKey
      },
      body: JSON.stringify({
        messages: input.messages,
        stream: false,
        max_tokens: 2048
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });
  } catch {
    throw new PlatformAIError("PLATFORM_AI_REQUEST_FAILED", "AI request failed", 502);
  }

  if (!response.ok) {
    throw new PlatformAIError(
      "PLATFORM_AI_UPSTREAM_ERROR",
      `AI upstream error: ${response.status}`,
      502
    );
  }

  let data: ChatCompletionResponse;
  try {
    data = (await response.json()) as ChatCompletionResponse;
  } catch {
    throw new PlatformAIError("PLATFORM_AI_INVALID_RESPONSE", "AI response was invalid", 502);
  }

  const reply = data.choices?.[0]?.message?.content;
  return { reply: typeof reply === "string" ? reply : "" };
}
