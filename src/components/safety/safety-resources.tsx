"use client";

import { useMemo } from "react";

import { Button } from "~/components/ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { getSafetyResources } from "~/lib/constants/safety-resources";

interface SafetyResourcesDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SafetyResourcesDialog({ open, onClose }: SafetyResourcesDialogProps) {
  const resources = useMemo(() => getSafetyResources(), []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>需要帮助？</DialogTitle>
        <DialogDescription>如果你在关系中感到不安全，这里有可以联系的求助热线。</DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-3">
        {resources.hotlines.map((hotline) => (
          <a
            key={hotline.number}
            href={`tel:${hotline.number}`}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-gray-800 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="font-medium">{hotline.name}</span>
            <span className="text-blue-600">{hotline.number}</span>
          </a>
        ))}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          我知道了
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
