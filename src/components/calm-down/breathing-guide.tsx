"use client";

import { useEffect, useState } from "react";

const steps = [1, 2, 3];

export function BreathingGuide() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
      <div className="text-sm font-semibold text-blue-900">深呼吸（3 次）</div>
      <p className="mt-1 text-xs text-blue-800">吸气 4 秒，停顿 2 秒，呼气 4 秒，重复三次。</p>
      <div className="mt-3 flex items-center gap-2">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className="h-2 flex-1 rounded-full bg-blue-100 transition-all"
            style={{ opacity: active === idx ? 1 : 0.35 }}
          />
        ))}
      </div>
      <div className="mt-3 text-xs text-blue-800">
        提示：把注意力放在呼吸上，允许情绪先着陆，再进入回顾。
      </div>
    </div>
  );
}
