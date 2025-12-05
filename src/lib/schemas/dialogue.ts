import { z } from "zod";

export const DialogueMessageSchema = z.object({
  speaker: z.enum(["我", "TA"]),
  text: z.string(),
});

export const DialogueImageSchema = z.object({
  base64: z.string(),
  mimeType: z.enum(["image/png", "image/jpeg", "image/webp"]),
});

export const DialogueInputSchema = z.object({
  messages: z.array(DialogueMessageSchema),
  context: z.string().optional(),
  images: z.array(DialogueImageSchema).optional(),
});

export type DialogueMessage = z.infer<typeof DialogueMessageSchema>;
export type DialogueImage = z.infer<typeof DialogueImageSchema>;
export type DialogueInput = z.infer<typeof DialogueInputSchema>;
