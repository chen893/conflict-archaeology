import type { ConflictAnalysis } from "~/lib/schemas";

export function PerspectivesSection({ data }: { data: ConflictAnalysis["perspectives"] }) {
  const items = [
    {
      title: "我的视角",
      body: data.mine,
    },
    {
      title: "TA 的视角",
      body: data.theirs,
    },
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-gray-900">{item.title}</div>
          <dl className="mt-2 space-y-1 text-sm text-gray-700">
            <div>
              <dt className="font-medium text-gray-800">情绪</dt>
              <dd>{item.body.surfaceEmotion}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">可能的担忧</dt>
              <dd>{item.body.underlyingFear}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-800">未被满足的需求</dt>
              <dd>{item.body.unmetNeed}</dd>
            </div>
          </dl>
        </div>
      ))}
    </section>
  );
}
