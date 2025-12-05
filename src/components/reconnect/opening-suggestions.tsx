const SUGGESTIONS = [
  "我想听听你的想法，可以吗？",
  "我想确认我理解了你的意思，对吗？",
  "你能告诉我你的顾虑是什么吗？",
];

export function OpeningSuggestions() {
  return (
    <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-900">开场白建议</div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
        {SUGGESTIONS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
