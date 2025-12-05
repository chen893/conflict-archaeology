"use client";

import { useState } from "react";

import { SafetyResourcesDialog } from "~/components/safety/safety-resources";

export function GlobalSafetyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 rounded-full bg-white/80 px-3 py-2 text-sm text-gray-600 shadow-sm backdrop-blur transition hover:text-gray-900"
      >
        需要帮助？
      </button>
      <SafetyResourcesDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
