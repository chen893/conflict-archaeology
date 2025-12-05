"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { DialogueMessage } from "~/lib/schemas";

interface MessageInputProps {
  onAdd: (message: DialogueMessage) => void;
}

export function MessageInput({ onAdd }: MessageInputProps) {
  const [speaker, setSpeaker] = useState<DialogueMessage["speaker"]>("我");
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd({ speaker, text: text.trim() });
    setText("");
  };

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant={speaker === "我" ? "default" : "outline"}
          size="sm"
          onClick={() => setSpeaker("我")}
        >
          我
        </Button>
        <Button
          variant={speaker === "TA" ? "default" : "outline"}
          size="sm"
          onClick={() => setSpeaker("TA")}
        >
          TA
        </Button>
      </div>
      <Input
        placeholder="输入一句关键话（例：你为什么总是这样？）"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <div className="flex justify-end">
        <Button size="sm" onClick={handleAdd}>
          添加消息
        </Button>
      </div>
    </div>
  );
}
