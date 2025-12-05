import { z } from "zod";

export const PerspectiveSchema = z.object({
  emotion: z.string().describe("此刻可能的情绪"),
  fear: z.string().describe("可能在害怕/担心什么"),
  need: z.string().describe("未被满足的需求"),
});

export const MessageInsightSchema = z.object({
  index: z.number().describe("消息在原始列表中的索引"),
  speaker: z.enum(["我", "TA"]),
  originalText: z.string(),
  myPerspective: PerspectiveSchema.describe("我在这条消息时的视角"),
  theirPerspective: PerspectiveSchema.describe("TA在这条消息时可能的视角"),
  escalationType: z.enum(["正常", "解释", "威胁", "辱骂", "沉默"]).optional(),
  isKeyMoment: z.boolean().describe("是否为关键时刻"),
});

export const ConflictAnalysisSchema = z.object({
  safety: z.object({
    level: z.enum(["safe", "caution", "danger"]),
    concern: z.string().optional().describe("检测到的风险信号描述"),
  }),
  overview: z.object({
    oneLiner: z.string().describe("用一句话概括这次冲突的核心张力"),
    escalationPattern: z.string().describe("这次冲突的升级路径描述"),
  }),
  messages: z.array(MessageInsightSchema).describe("对每条消息的分析"),
  perspectives: z.object({
    mine: z.object({
      surfaceEmotion: z.string().describe("我整体呈现的情绪基调"),
      underlyingFear: z.string().describe("我可能在害怕/担心什么"),
      unmetNeed: z.string().describe("我未被满足的核心需求"),
    }),
    theirs: z.object({
      surfaceEmotion: z.string().describe("TA整体呈现的情绪基调"),
      underlyingFear: z.string().describe("TA可能在害怕/担心什么"),
      unmetNeed: z.string().describe("TA未被满足的核心需求"),
    }),
  }),
  keyMoments: z
    .array(
      z.object({
        messageIndex: z.number().describe("对应 messages 数组的索引"),
        quote: z.string().describe("引用原文"),
        speaker: z.enum(["我", "TA"]),
        significance: z.string().describe("这个时刻为什么重要"),
        myFeeling: z.string().describe("我在这个时刻可能的感受"),
        theirFeeling: z.string().describe("TA在这个时刻可能的感受"),
      }),
    )
    .describe("关键时刻，最多 3 条（请在提示词中控制数量）"),
  insights: z
    .array(
      z.object({
        type: z.enum([
          "反对不等于针对",
          "威胁源于恐惧",
          "批评源于痛苦",
          "轻蔑源于自卑",
        ]),
        relatedMessageIndex: z.number().optional(),
        theirBehavior: z.string().describe("TA的具体行为"),
        youMightThink: z.string().describe("你可能以为..."),
        alternativeView: z.string().describe("另一个可能是..."),
        bookQuote: z.string().describe("相关的书中原话"),
      }),
    )
    .describe("洞见列表，最多 2 条（请在提示词中控制数量）"),
  reconnection: z.object({
    coreUnderstanding: z.string().describe("我理解你可能..."),
    sampleScript: z.string().describe("完整的对话示例，包含开场和确认"),
    timingAdvice: z.string().describe("什么时候适合开启这个对话"),
  }),
});

export type Perspective = z.infer<typeof PerspectiveSchema>;
export type MessageInsight = z.infer<typeof MessageInsightSchema>;
export type ConflictAnalysis = z.infer<typeof ConflictAnalysisSchema>;
export type SafetyLevel = ConflictAnalysis["safety"]["level"];
