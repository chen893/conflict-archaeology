"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UnderstandingTemplate } from "~/components/reconnect/understanding-template";
import { OpeningSuggestions } from "~/components/reconnect/opening-suggestions";
import { TimingAdvice } from "~/components/reconnect/timing-advice";
import { useSession } from "~/contexts/session-context";

export default function ReconnectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { session, updateSession } = useSession();

  useEffect(() => {
    if (!session) return;
    if (!session.analysis) {
      router.replace(`/session/${id}/review`);
      return;
    }
    if (session.stage === "insights") {
      void updateSession({ stage: "reconnect" });
    }
  }, [id, router, session, updateSession]);

  if (!session?.analysis) {
    return <div className="text-sm text-gray-500">正在获取重建连接建议...</div>;
  }

  const reconnection = session.analysis.reconnection;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">重建连接</h1>
        <p className="text-sm text-gray-600">将理解表达出来，帮助关系回到连接。</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-900">核心理解</div>
        <p className="mt-1 text-sm text-gray-700">{reconnection.coreUnderstanding}</p>
      </div>

      <UnderstandingTemplate initialText={reconnection.sampleScript} />
      <OpeningSuggestions />
      <TimingAdvice text={reconnection.timingAdvice} />
    </div>
  );
}
