import { z } from "zod";

import { ConflictAnalysisSchema } from "./analysis";
import { DialogueInputSchema } from "./dialogue";
import { EmotionCheckInSchema } from "./emotion";

export const SESSION_STAGES = [
  "calm_down",
  "input",
  "analyzing",
  "review",
  "insights",
  "reconnect",
  "export",
  "complete",
  "paused",
] as const;

const PausableStagesEnum = z.enum([
  "calm_down",
  "input",
  "analyzing",
  "review",
  "insights",
  "reconnect",
  "export",
]);

const SessionStageEnum = z.enum(SESSION_STAGES);

export const SavedInsightSchema = z.object({
  id: z.string(),
  type: z.enum([
    "反对不等于针对",
    "威胁源于恐惧",
    "批评源于痛苦",
    "轻蔑源于自卑",
  ]),
  content: z.object({
    theirBehavior: z.string(),
    alternativeView: z.string(),
  }),
  userNote: z.string().optional(),
  savedAt: z.string(),
});

export const SessionSchema = z.object({
  id: z.string(),
  stage: SessionStageEnum,
  pausedFromStage: PausableStagesEnum.optional(),
  emotionCheckIn: EmotionCheckInSchema.optional(),
  dialogueInput: DialogueInputSchema.optional(),
  analysis: ConflictAnalysisSchema.optional(),
  savedInsights: z.array(SavedInsightSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SessionStage = (typeof SESSION_STAGES)[number];
export type SavedInsight = z.infer<typeof SavedInsightSchema>;
export type Session = z.infer<typeof SessionSchema>;
