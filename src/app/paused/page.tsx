"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export default function PausedPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">已暂停</h1>
        <p className="text-sm text-gray-600">
          情绪需要时间平复。当你准备好了，可以继续或重新开始。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => router.back()}>
            返回上一页
          </Button>
          <Button onClick={() => router.push("/")}>重新开始</Button>
        </div>
        <p className="text-xs text-gray-500">
          如果你需要帮助：全国心理援助热线 400-161-9995，紧急情况请拨打 110。
        </p>
      </div>
    </main>
  );
}
