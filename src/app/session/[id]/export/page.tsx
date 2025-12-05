"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { useSession } from "~/contexts/session-context";
import { exportSessionToPDF } from "~/lib/utils/export-pdf";

export default function ExportPage() {
  const { session, updateSession } = useSession();
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (session && session.stage !== "export" && session.stage !== "complete") {
      void updateSession({ stage: "export" });
    }
  }, [session, updateSession]);

  if (!session) {
    return <div className="text-sm text-gray-500">正在加载会话...</div>;
  }

  const handleDownload = async () => {
    if (!session) return;
    try {
      setDownloading(true);
      const pdfBytes = await exportSessionToPDF(session);
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `conflict-analysis-${session.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setDone(true);
      void updateSession({ stage: "complete" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">导出</h1>
        <p className="text-sm text-gray-600">保存本次分析的关键洞察与话术，方便随时回看。</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-700">点击下方按钮导出 PDF。包含概览、双方视角、关键时刻、洞察与话术。</p>
        <div className="mt-3 flex items-center gap-3">
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? "生成中..." : "导出 PDF"}
          </Button>
          {done && <span className="text-sm text-green-600">已生成</span>}
        </div>
      </div>
    </div>
  );
}
