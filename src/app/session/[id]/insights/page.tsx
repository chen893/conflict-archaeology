"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

import { InsightCard } from "~/components/insights/insight-card";
import { MisconceptionFrame } from "~/components/insights/misconception-frame";
import { InsightSaver } from "~/components/insights/insight-saver";
import { useSession } from "~/contexts/session-context";

export default function InsightsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { session, updateSession } = useSession();

  useEffect(() => {
    if (!session) return;
    if (!session.analysis) {
      router.replace(`/session/${id}/review`);
      return;
    }
    if (session.stage === "review" || session.stage === "analyzing") {
      void updateSession({ stage: "insights" });
    }
  }, [id, router, session, updateSession]);

  if (!session?.analysis) {
    return <div className="text-sm text-gray-500">正在获取分析结果...</div>;
  }

  const insights = session.analysis.insights ?? [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">视角转换</h1>
        <p className="text-sm text-gray-600">用四大误区框架重新理解对方的行为。</p>
      </div>

      <MisconceptionFrame />

      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-900">精选洞察</div>
        {insights.length === 0 ? (
          <p className="text-sm text-gray-600">暂未生成洞察。</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {insights.map((insight, idx) => (
              <div key={idx} className="space-y-2">
                <InsightCard insight={insight} />
                <InsightSaver insight={insight} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
