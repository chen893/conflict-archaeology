"use client";

import { Button } from "~/components/ui/button";
import type { DialogueMessage } from "~/lib/schemas";

interface MessageListProps {
  messages: DialogueMessage[];
  onEdit: (index: number, message: DialogueMessage) => void;
  onDelete: (index: number) => void;
}

export function MessageList({ messages, onEdit, onDelete }: MessageListProps) {
  if (!messages.length) {
    return <p className="text-sm text-gray-500">还没有消息，先添加一条吧。</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
              {message.speaker}
            </span>
            <span className="text-gray-800">{message.text}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const nextText = prompt("修改内容", message.text);
                if (nextText === null) return;
                onEdit(index, { ...message, text: nextText.trim() });
              }}
            >
              编辑
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(index)}>
              删除
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
