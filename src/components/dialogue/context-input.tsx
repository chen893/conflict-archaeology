"use client";

import { Textarea } from "~/components/ui/textarea";

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContextInput({ value, onChange }: ContextInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">补充背景（可选）</span>
        <span className="text-xs text-gray-500">例如：最近工作压力大，晚上吵架后冷战</span>
      </div>
      <Textarea
        placeholder="想补充的背景信息、场景或触发点"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
