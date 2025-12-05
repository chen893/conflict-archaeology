export function TimingAdvice({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-900">时机建议</div>
      <p className="mt-1 text-sm text-gray-700">{text}</p>
    </div>
  );
}
