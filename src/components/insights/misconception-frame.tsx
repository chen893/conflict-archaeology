const FRAMES = [
  { title: "反对不等于针对", desc: "对方反对时，可能在保护自己的利益，而不是针对我。" },
  { title: "威胁源于恐惧", desc: "威胁往往来自害怕失去控制、关系或利益。" },
  { title: "批评源于痛苦", desc: "批评可能是痛苦的外显，而非故意伤害。" },
  { title: "轻蔑源于自卑", desc: "轻蔑可能是在掩饰自卑或无力感。" },
];

export function MisconceptionFrame() {
  return (
    <div className="space-y-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-900">四大误区框架</div>
      <div className="grid gap-2 md:grid-cols-2">
        {FRAMES.map((frame) => (
          <div key={frame.title} className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
            <div className="font-medium text-gray-900">{frame.title}</div>
            <p className="text-gray-700">{frame.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
