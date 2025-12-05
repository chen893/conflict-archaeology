"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { getSafetyResources } from "~/lib/constants/safety-resources";

interface SafetyScreenProps {
  concern?: string;
}

export function SafetyScreen({ concern }: SafetyScreenProps) {
  const router = useRouter();
  const resources = getSafetyResources();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="w-full max-w-lg space-y-5 rounded-2xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-red-700">你的安全是最重要的</h1>
        {concern && <p className="text-sm text-red-700">检测到的风险：{concern}</p>}
        <p className="text-sm text-red-800">如果你正在经历或担心人身安全问题，请寻求专业帮助：</p>
        <div className="space-y-2">
          {resources.hotlines.map((hotline) => (
            <a
              key={hotline.number}
              href={`tel:${hotline.number}`}
              className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-left text-sm text-gray-900 shadow-sm"
            >
              <span className="font-medium">{hotline.name}</span>
              <span className="text-blue-700">{hotline.number}</span>
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            退出
          </Button>
          <Button onClick={() => router.back()}>我现在安全</Button>
        </div>
      </div>
    </div>
  );
}
