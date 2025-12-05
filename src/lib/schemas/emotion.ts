import { z } from "zod";

import { EMOTION_OPTIONS } from "~/lib/constants/emotions";

export const EmotionCheckInSchema = z.object({
  emotion: z.enum(EMOTION_OPTIONS),
  intensity: z.number().min(1).max(5),
  readyToProceed: z.boolean(),
});

export type EmotionCheckIn = z.infer<typeof EmotionCheckInSchema>;
