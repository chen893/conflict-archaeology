import type { ConflictAnalysis } from "~/lib/schemas";

/**
 * 简化版情绪曲线：用条形高度表示 intensity（推断为 1-5），主要用于移动端可横向滚动。
 */
export function EmotionCurve({ messages }: { messages: ConflictAnalysis["messages"] }) {
  if (!messages.length) return null;

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-gray-900">情绪曲线（示意）</div>
      <div className="overflow-x-auto">
        <div className="flex min-w-[480px] gap-2 rounded-xl border border-gray-100 bg-white p-3">
          {messages.map((msg) => (
            <div key={msg.index} className="flex min-w-[60px] flex-col items-center gap-1">
              <div className="text-[10px] text-gray-500">{msg.speaker}</div>
              <div className="flex h-16 w-6 items-end justify-center rounded bg-gray-100">
                <div
                  className="w-4 rounded bg-blue-500"
                  style={{ height: `${Math.max(20, Math.random() * 60)}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500">#{msg.index}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500">
        仅示意：后续可替换为基于情绪强度字段的真实曲线，移动端支持横向滚动。
      </p>
    </div>
  );
}
