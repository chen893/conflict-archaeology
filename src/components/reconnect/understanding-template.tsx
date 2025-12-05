"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

interface UnderstandingTemplateProps {
  initialText: string;
}

export function UnderstandingTemplate({ initialText }: UnderstandingTemplateProps) {
  const [text, setText] = useState(initialText);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">理解表达（可修改）</div>
        {saved && <span className="text-xs text-green-600">已保存</span>}
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave}>
          保存我的版本
        </Button>
      </div>
    </div>
  );
}
