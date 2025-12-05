"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { db } from "~/lib/db";
import { getSession, updateSession as updateDbSession } from "~/lib/db/sessions";
import type { Session } from "~/lib/schemas";

interface SessionContextValue {
  session: Session | null;
  refresh: () => Promise<void>;
  updateSession: (updates: Partial<Session>) => Promise<void>;
  goToStage: (stage: Session["stage"]) => Promise<void>;
  pauseSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

async function ensureSession(sessionId: string): Promise<Session> {
  const existing = await getSession(sessionId);
  if (existing) return existing;

  const now = new Date().toISOString();
  const session: Session = {
    id: sessionId,
    stage: "calm_down",
    createdAt: now,
    updatedAt: now,
  };
  await db.sessions.add(session);
  return session;
}

export function SessionProvider({
  sessionId,
  children,
}: {
  sessionId: string;
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  const refresh = async () => {
    const data = await ensureSession(sessionId);
    setSession(data);
  };

  useEffect(() => {
    void refresh();
  }, [sessionId]);

  const updateSession = async (updates: Partial<Session>) => {
    if (!session) return;
    await updateDbSession(session.id, updates);
    await refresh();
  };

  const goToStage = async (stage: Session["stage"]) => {
    await updateSession({ stage });
  };

  const pauseSession = async () => {
    if (!session) return;
    const pausedFromStage =
      session.stage === "complete"
        ? "export"
        : session.stage === "paused"
          ? session.pausedFromStage ?? "calm_down"
          : session.stage;
    await updateSession({
      stage: "paused",
      pausedFromStage,
    });
  };

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      refresh,
      updateSession,
      goToStage,
      pauseSession,
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession 必须在 SessionProvider 内使用");
  }
  return context;
}
