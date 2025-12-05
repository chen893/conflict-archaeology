"use client";

import { Button } from "~/components/ui/button";

interface CautionBannerProps {
  show?: boolean;
  onShowResources?: () => void;
}

export function CautionBanner({ show, onShowResources }: CautionBannerProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-amber-50 px-4 py-3 shadow-inner">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 text-amber-800">
        <div className="text-sm">
          ⚠️ 如果你在这段关系中感到不安全，可以查看求助资源。
        </div>
        <Button size="sm" variant="outline" onClick={onShowResources}>
          查看资源
        </Button>
      </div>
    </div>
  );
}
