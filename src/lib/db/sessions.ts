import { nanoid } from "nanoid";

import { db } from "./index";
import type { Session } from "~/lib/schemas";

export async function createSession(): Promise<string> {
  const id = nanoid();
  const now = new Date().toISOString();
  const session: Session = {
    id,
    stage: "calm_down",
    createdAt: now,
    updatedAt: now,
  };

  await db.sessions.add(session);
  return id;
}

export function getSession(id: string): Promise<Session | undefined> {
  return db.sessions.get(id);
}

export async function updateSession(
  id: string,
  updates: Partial<Session>,
): Promise<void> {
  const existing = await db.sessions.get(id);
  if (!existing) return;

  const updated: Session = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await db.sessions.put(updated);
}

export function deleteSession(id: string): Promise<void> {
  return db.sessions.delete(id);
}

export function getAllSessions(): Promise<Session[]> {
  return db.sessions.orderBy("updatedAt").reverse().toArray();
}
