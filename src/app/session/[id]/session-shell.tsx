"use client";

import { useMemo } from "react";

import { Header } from "~/components/layout/header";
import { GlobalSafetyButton } from "~/components/layout/global-safety-button";
import { StageProgress } from "~/components/layout/stage-progress";
import { SessionProvider, useSession } from "~/contexts/session-context";
import { cn } from "~/lib/utils/cn";

function SessionFrame({ children }: { children: React.ReactNode }) {
  const { session, pauseSession } = useSession();
  const currentStage = session?.stage ?? "calm_down";

  const content = useMemo(() => {
    if (!session) {
      return <div className="text-sm text-gray-500">正在加载会话...</div>;
    }
    return children;
  }, [children, session]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onPause={pauseSession} />
      <main className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6">
        <StageProgress currentStage={currentStage} />
        <div className={cn("rounded-2xl bg-white p-6 shadow-sm")}>{content}</div>
      </main>
      <GlobalSafetyButton />
    </div>
  );
}

export function SessionShell({
  sessionId,
  children,
}: {
  sessionId: string;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider sessionId={sessionId}>
      <SessionFrame>{children}</SessionFrame>
    </SessionProvider>
  );
}
