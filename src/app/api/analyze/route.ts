import { NextResponse } from "next/server";

import { analyzeConflict } from "~/lib/ai/analyze";
import { DialogueInputSchema } from "~/lib/schemas";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    if (!rawBody.trim()) {
      return NextResponse.json({ error: "请求体为空" }, { status: 400 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "请求体不是有效的 JSON" }, { status: 400 });
    }

    const parsed = DialogueInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "请求参数格式不正确", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = analyzeConflict(parsed.data);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Analysis failed:", error);
    return NextResponse.json({ error: "分析过程中遇到问题，请稍后重试" }, { status: 500 });
  }
}
