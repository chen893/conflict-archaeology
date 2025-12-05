import { streamObject } from "ai";

import { openai, DEFAULT_MODEL } from "./config";
import { formatPrompt, SYSTEM_PROMPT } from "./prompts";
import { ConflictAnalysisSchema, type DialogueInput } from "~/lib/schemas";

function buildMessages(input: DialogueInput) {
  const messages: any[] = [];

  if (input.images?.length) {
    messages.push({
      role: "user",
      content: [
        { type: "text", text: "请识别以下聊天截图中的对话内容：" },
        ...input.images.map((img) => ({
          type: "image" as const,
          image: img.base64,
        })),
      ],
    });
  }

  messages.push({
    role: "user",
    content: [{ type: "text", text: formatPrompt(input) }],
  });

  return messages;
}

export function analyzeConflict(input: DialogueInput) {
  const messages = buildMessages(input);

  return streamObject({
    model: openai(DEFAULT_MODEL),
    schema: ConflictAnalysisSchema,
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.3,
  });
}
