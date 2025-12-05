import { use } from "react";
import type { ReactNode } from "react";

import { SessionShell } from "./session-shell";

export default function SessionLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <SessionShell sessionId={id}>{children}</SessionShell>;
}
