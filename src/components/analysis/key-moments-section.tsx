import type { ConflictAnalysis } from "~/lib/schemas";

export function KeyMomentsSection({ moments }: { moments: ConflictAnalysis["keyMoments"] }) {
  if (!moments.length) return null;
  return (
    <section className="space-y-3">
      <div className="text-sm font-semibold text-gray-900">关键时刻</div>
      <div className="grid gap-3 md:grid-cols-2">
        {moments.map((moment, index) => (
          <div
            key={index}
            className="space-y-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900"
          >
            <div className="font-semibold">#{index + 1} {moment.speaker} 的话</div>
            <p className="text-base text-amber-900">“{moment.quote}”</p>
            <p>为什么重要：{moment.significance}</p>
            <p>我当时可能的感受：{moment.myFeeling}</p>
            <p>TA 当时可能的感受：{moment.theirFeeling}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
