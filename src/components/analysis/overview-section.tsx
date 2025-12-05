import type { ConflictAnalysis } from "~/lib/schemas";

export function OverviewSection({ data }: { data: ConflictAnalysis["overview"] }) {
  return (
    <section className="space-y-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
      <div className="text-sm font-semibold text-gray-900">冲突概览</div>
      <p className="text-base text-gray-800">{data.oneLiner}</p>
      <p className="text-sm text-gray-600">升级路径：{data.escalationPattern}</p>
    </section>
  );
}
