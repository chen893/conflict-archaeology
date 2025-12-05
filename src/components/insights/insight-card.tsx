import type { ConflictAnalysis } from "~/lib/schemas";

export function InsightCard({ insight }: { insight: ConflictAnalysis["insights"][number] }) {
  return (
    <div className="space-y-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide">{insight.type}</span>
        {insight.relatedMessageIndex !== undefined && (
          <span className="text-xs text-blue-700">关联消息 #{insight.relatedMessageIndex}</span>
        )}
      </div>
      <div>
        <div className="font-medium text-blue-900">你可能以为：</div>
        <p>{insight.youMightThink}</p>
      </div>
      <div>
        <div className="font-medium text-blue-900">另一个可能是：</div>
        <p>{insight.alternativeView}</p>
      </div>
      <div className="text-xs text-blue-800">书中智慧：{insight.bookQuote}</div>
      <div className="text-xs text-blue-800">TA 的行为：{insight.theirBehavior}</div>
    </div>
  );
}
