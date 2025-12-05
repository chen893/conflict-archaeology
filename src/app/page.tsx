"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { createSession } from "~/lib/db/sessions";

const steps = [
  { title: "平复自己", desc: "情绪着陆，先确认自己的感受与强度。" },
  { title: "理解双方", desc: "输入对话，AI 帮你分析双方的情绪与需求。" },
  { title: "视角转换", desc: "应用四大误区框架，看到对方背后的恐惧与痛苦。" },
  { title: "重建连接", desc: "生成表达理解的话术，重新打开对话。" },
];

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);
      const id = await createSession();
      router.push(`/session/${id}/calm-down`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            15 分钟完成「平复自己 → 理解对方 → 重建连接」
          </p>
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            Conflict Archaeology
          </h1>
          <p className="text-lg text-gray-600">
            我们不做裁判，只做陪伴者。用温和、好奇、不评判的方式，帮你看清冲突背后的恐惧与需求，安全地重新连接。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={handleStart} disabled={loading}>
              {loading ? "创建会话中..." : "开始"}
            </Button>
            <span className="text-sm text-gray-500">无需登录，数据仅存储在本地设备。</span>
          </div>
        </div>

        <Card className="border-blue-100 bg-white/80">
          <CardHeader>
            <CardTitle>四步旅程</CardTitle>
            <CardDescription>跟随流程，逐步完成情绪平复与理解。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-3 rounded-lg border border-gray-100 px-3 py-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {index + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>安全声明</CardTitle>
          <CardDescription>如果检测到危险信号，会立即进入安全模式并提示求助渠道。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            <div className="font-semibold text-gray-900">不评判</div>
            <p>避免「对错」标签，只提供视角与理解。</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            <div className="font-semibold text-gray-900">安全优先</div>
            <p>检测到人身威胁或自伤信号时，直接中断分析。</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            <div className="font-semibold text-gray-900">本地存储</div>
            <p>会话与洞察默认保存在你的设备上，可随时清除。</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
