export const EMOTION_OPTIONS = [
  "愤怒",
  "委屈",
  "焦虑",
  "失望",
  "冷漠",
  "混乱",
  "其他",
] as const;

export type EmotionOption = (typeof EMOTION_OPTIONS)[number];
