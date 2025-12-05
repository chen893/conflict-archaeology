import { createOpenAI } from "@ai-sdk/openai";

import { env } from "~/env";

export const openai = createOpenAI({
  apiKey: '2d0a97fe-9c38-46d6-ae6d-07ad66b7e997',
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

console.log('openai', openai)
export const DEFAULT_MODEL = "deepseek-v3-1-terminus";
