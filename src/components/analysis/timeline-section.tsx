import type { ConflictAnalysis } from "~/lib/schemas";

import { MessageItem } from "./message-item";

export function TimelineSection({ messages }: { messages: ConflictAnalysis["messages"] }) {
  return (
    <section className="space-y-3">
      <div className="text-sm font-semibold text-gray-900">对话时间线</div>
      <div className="space-y-3">
        {messages.map((insight) => (
          <MessageItem key={insight.index} insight={insight} />
        ))}
      </div>
    </section>
  );
}
