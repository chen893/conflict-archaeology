"use client";

import { cn } from "~/lib/utils/cn";
import type { Session } from "~/lib/schemas";

const STAGES: { key: Session["stage"]; label: string }[] = [
  { key: "calm_down", label: "平复自己" },
  { key: "review", label: "理解双方" },
  { key: "insights", label: "视角转换" },
  { key: "reconnect", label: "重建连接" },
];

const stageDisplayMap: Record<Session["stage"], Session["stage"]> = {
  calm_down: "calm_down",
  input: "review",
  analyzing: "review",
  review: "review",
  insights: "insights",
  reconnect: "reconnect",
  export: "reconnect",
  complete: "reconnect",
  paused: "calm_down",
};

export function StageProgress({ currentStage }: { currentStage: Session["stage"] }) {
  const displayStage = stageDisplayMap[currentStage] ?? "calm_down";
  const currentIndex = STAGES.findIndex((stage) => stage.key === displayStage);

  return (
    <div className="flex items-center justify-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
      {STAGES.map((stage, index) => {
        const state =
          currentIndex === -1
            ? "idle"
            : index < currentIndex
              ? "done"
              : index === currentIndex
                ? "current"
                : "upcoming";

        return (
          <div key={stage.key} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                state === "done" && "bg-green-100 text-green-700",
                state === "current" && "bg-blue-600 text-white",
                state === "upcoming" && "bg-gray-200 text-gray-500",
                state === "idle" && "bg-gray-200 text-gray-500",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "ml-2 hidden text-sm sm:inline",
                state === "current" ? "text-gray-900 font-medium" : "text-gray-500",
              )}
            >
              {stage.label}
            </span>
            {index < STAGES.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8",
                  state === "done" ? "bg-green-300" : "bg-gray-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
