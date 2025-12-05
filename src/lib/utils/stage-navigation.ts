import type { Session } from "~/lib/schemas";

export const STAGE_ORDER: Session["stage"][] = [
  "calm_down",
  "input",
  "analyzing",
  "review",
  "insights",
  "reconnect",
  "export",
  "complete",
];

export function getNextStage(current: Session["stage"]): Session["stage"] | null {
  if (current === "paused") return null;
  const currentIndex = STAGE_ORDER.indexOf(current);
  if (currentIndex === -1 || currentIndex >= STAGE_ORDER.length - 1) return null;
  const nextStage = STAGE_ORDER[currentIndex + 1];
  return nextStage ?? null;
}

export function canGoToStage(
  current: Session["stage"],
  target: Session["stage"],
  session: Session,
): boolean {
  if (target === "paused") return true;

  const currentIndex = STAGE_ORDER.indexOf(current);
  const targetIndex = STAGE_ORDER.indexOf(target);

  if (targetIndex === -1) return false;
  if (currentIndex !== -1 && targetIndex > currentIndex + 1) return false;

  if (target !== "calm_down" && !session.emotionCheckIn?.readyToProceed) {
    return false;
  }

  return true;
}

export function getStageUrl(sessionId: string, stage: Session["stage"]): string {
  const stageToPath: Record<Session["stage"], string> = {
    calm_down: "calm-down",
    input: "input",
    analyzing: "review",
    review: "review",
    insights: "insights",
    reconnect: "reconnect",
    export: "export",
    complete: "export",
    paused: "",
  };

  const path = stageToPath[stage] || "";
  return path ? `/session/${sessionId}/${path}` : `/session/${sessionId}`;
}
