"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BreathingGuide } from "~/components/calm-down/breathing-guide";
import { EmotionCheckIn } from "~/components/calm-down/emotion-check-in";
import { ReadinessConfirm } from "~/components/calm-down/readiness-confirm";
import { WisdomQuote } from "~/components/calm-down/wisdom-quote";
import type { EmotionCheckIn as EmotionCheckInType } from "~/lib/schemas";
import { useSession } from "~/contexts/session-context";

const defaultCheckIn: EmotionCheckInType = {
  emotion: "愤怒",
  intensity: 3,
  readyToProceed: false,
};

export default function CalmDownPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { session, updateSession } = useSession();
  const [checkIn, setCheckIn] = useState<EmotionCheckInType>(defaultCheckIn);

  useEffect(() => {
    if (session?.emotionCheckIn) {
      setCheckIn(session.emotionCheckIn);
    }
  }, [session?.emotionCheckIn]);

  const handleConfirm = async () => {
    const payload: EmotionCheckInType = { ...checkIn, readyToProceed: true };
    await updateSession({ emotionCheckIn: payload, stage: "input" });
    router.push(`/session/${id}/input`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">平复自己</h1>
        <p className="text-sm text-gray-600">
          情绪稳定后再进入分析。先看见自己，再去理解对方。
        </p>
      </div>

      <EmotionCheckIn value={checkIn} onChange={setCheckIn} />
      <BreathingGuide />
      <WisdomQuote />
      <ReadinessConfirm disabled={!checkIn.emotion || !checkIn.intensity} onConfirm={handleConfirm} />
    </div>
  );
}
