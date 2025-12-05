import Dexie, { type Table } from "dexie";

import type { SavedInsight, Session } from "~/lib/schemas";

export class ConflictArchaeologyDB extends Dexie {
  sessions!: Table<Session>;
  insights!: Table<SavedInsight>;

  constructor() {
    super("ConflictArchaeologyDB");
    this.version(1).stores({
      sessions: "id, stage, createdAt, updatedAt",
      insights: "id, type, savedAt",
    });
  }
}

export const db = new ConflictArchaeologyDB();

export async function cleanupOldSessions() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await db.sessions
    .where("createdAt")
    .below(thirtyDaysAgo.toISOString())
    .delete();
}

if (typeof window !== "undefined") {
  cleanupOldSessions().catch(() => {
    // 忽略清理异常，避免阻塞前端渲染
  });
}
