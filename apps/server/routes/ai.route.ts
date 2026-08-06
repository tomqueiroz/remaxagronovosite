import { Hono, type Context } from "hono";
import { z } from "zod";
import { apiFailure, apiSuccess } from "@repo/shared/http";
import { protectedRoute } from "../_core/route-helpers";
import { PlatformAIError, requestPlatformAIChat } from "../services/platform-ai";

const SceneKeySchema = z
  .string()
  .trim()
  .regex(/^[a-z][a-z0-9_]{0,63}$/)
  .refine((sceneKey) => !sceneKey.endsWith("_") && !sceneKey.includes("__"));

const ChatRequestSchema = z.object({
  scene_key: SceneKeySchema,
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string()
      })
    )
    .min(1)
    .max(50)
});

export const aiRouter = new Hono();

const chatHandler = async (c: Context) => {
  const parsed = ChatRequestSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) {
    return c.json(apiFailure("INVALID_INPUT", "Invalid AI chat input"), 400);
  }

  try {
    const result = await requestPlatformAIChat({
      sceneKey: parsed.data.scene_key,
      messages: parsed.data.messages
    });
    // TODO: Persist AI interaction and scene_key business metadata after the product layer defines the write policy.
    return c.json(apiSuccess(result), 200);
  } catch (error) {
    if (error instanceof PlatformAIError) {
      return c.json(apiFailure(error.code, error.message), error.status);
    }
    throw error;
  }
};

aiRouter.post("", protectedRoute, chatHandler);
aiRouter.post("/", protectedRoute, chatHandler);
