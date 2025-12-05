"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AnalysisView } from "~/components/analysis/analysis-view";
import { EmotionCurve } from "~/components/analysis/emotion-curve";
import { useSession } from "~/contexts/session-context";
import type { ConflictAnalysis } from "~/lib/schemas";

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { session, updateSession } = useSession();

  useEffect(() => {
    if (session && !session.dialogueInput) {
      router.replace(`/session/${id}/input`);
    }
  }, [id, router, session]);

  const handleComplete = async (analysis: ConflictAnalysis) => {
    await updateSession({ analysis, stage: "review" });
  };

  if (!session || !session.dialogueInput) {
    return <div className="text-sm text-gray-500">正在准备分析...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">理解双方</h1>
        <p className="text-sm text-gray-600">流式展示分析结果，安全优先。</p>
      </div>
      <AnalysisView
        input={session.dialogueInput}
        initialData={session.analysis ?? undefined}
        onComplete={handleComplete}
      />
      {session.analysis?.messages && (
        <EmotionCurve messages={session.analysis.messages} />
      )}
    </div>
  );
}
