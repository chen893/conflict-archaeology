"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { saveInsight } from "~/lib/db/insights";
import type { ConflictAnalysis } from "~/lib/schemas";

interface InsightSaverProps {
  insight: ConflictAnalysis["insights"][number];
}

export function InsightSaver({ insight }: InsightSaverProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveInsight({
        type: insight.type,
        content: {
          theirBehavior: insight.theirBehavior,
          alternativeView: insight.alternativeView,
        },
        userNote: "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleSave} disabled={saving || saved}>
      {saved ? "已保存" : saving ? "保存中..." : "保存到洞察库"}
    </Button>
  );
}
