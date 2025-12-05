"use client";

import { useEffect, useMemo, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";

import { CautionBanner } from "~/components/safety/caution-banner";
import { LoadingWithSafetyHint } from "~/components/safety/loading-with-safety-hint";
import { SafetyResourcesDialog } from "~/components/safety/safety-resources";
import { SafetyScreen } from "~/components/safety/safety-screen";
import { ConflictAnalysisSchema, type ConflictAnalysis, type DialogueInput } from "~/lib/schemas";

import { KeyMomentsSection } from "./key-moments-section";
import { OverviewSection } from "./overview-section";
import { PerspectivesSection } from "./perspectives-section";
import { TimelineSection } from "./timeline-section";

interface AnalysisViewProps {
  input: DialogueInput;
  initialData?: ConflictAnalysis | null;
  onComplete?: (analysis: ConflictAnalysis) => void;
}

export function AnalysisView({ input, initialData, onComplete }: AnalysisViewProps) {
  const [showResources, setShowResources] = useState(false);
  const [data, setData] = useState<ConflictAnalysis | null>(initialData ?? null);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/analyze",
    schema: ConflictAnalysisSchema,
    onFinish: ({ object }) => {
      if (object) {
        setData(object);
        onComplete?.(object);
      }
    },
  });

  useEffect(() => {
    if (!initialData) {
      submit(input);
    }
  }, [input, initialData, submit]);

  const effectiveData = useMemo(() => data ?? (object as ConflictAnalysis | null) ?? null, [data, object]);
  const resolvedData = effectiveData as ConflictAnalysis | null;

  if (resolvedData?.safety?.level === "danger") {
    return <SafetyScreen concern={resolvedData.safety.concern} />;
  }

  return (
    <div className="space-y-6">
      {isLoading && !resolvedData && <LoadingWithSafetyHint />}
      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
          分析过程中遇到问题，请稍后重试。
        </div>
      )}

      {resolvedData?.overview && <OverviewSection data={resolvedData.overview} />}
      {resolvedData?.messages && <TimelineSection messages={resolvedData.messages} />}
      {resolvedData?.perspectives && <PerspectivesSection data={resolvedData.perspectives} />}
      {resolvedData?.keyMoments && resolvedData.keyMoments.length > 0 && (
        <KeyMomentsSection moments={resolvedData.keyMoments} />
      )}

      <CautionBanner
        show={resolvedData?.safety?.level === "caution"}
        onShowResources={() => setShowResources(true)}
      />
      <SafetyResourcesDialog open={showResources} onClose={() => setShowResources(false)} />
    </div>
  );
}
