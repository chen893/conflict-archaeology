"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { SafetyResourcesDialog } from "./safety-resources";

export function LoadingWithSafetyHint() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-700 shadow-sm">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
      <div className="text-sm">正在分析中...</div>
      <div className="text-xs text-gray-500">
        如果你现在感到不安全，可以先查看求助资源。
      </div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        查看资源
      </Button>
      <SafetyResourcesDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
