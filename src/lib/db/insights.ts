import { nanoid } from "nanoid";

import { db } from "./index";
import type { SavedInsight } from "~/lib/schemas";

export async function saveInsight(content: Omit<SavedInsight, "id" | "savedAt">): Promise<string> {
  const id = nanoid();
  const payload: SavedInsight = {
    ...content,
    id,
    savedAt: new Date().toISOString(),
  };
  await db.insights.add(payload);
  return id;
}

export function getInsights(): Promise<SavedInsight[]> {
  return db.insights.orderBy("savedAt").reverse().toArray();
}

export function deleteInsight(id: string): Promise<void> {
  return db.insights.delete(id);
}
