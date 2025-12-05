import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import type { ConflictAnalysis, Session } from "~/lib/schemas";

export async function exportSessionToPDF(session: Session): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  let y = height - 50;

  const drawText = (text: string, size = 12, color = rgb(0, 0, 0)) => {
    if (y < 60) {
      page = pdfDoc.addPage();
      y = height - 50;
    }
    page.drawText(text, { x: 50, y, size, font, color });
    y -= size + 8;
  };

  drawText("Conflict Archaeology - 冲突分析报告", 18);
  drawText(`生成时间：${new Date().toLocaleString("zh-CN")}`, 10, rgb(0.4, 0.4, 0.4));
  y -= 12;

  const analysis: ConflictAnalysis | undefined = session.analysis ?? undefined;
  if (!analysis) {
    drawText("暂无分析结果。", 12, rgb(0.6, 0.6, 0.6));
    return pdfDoc.save();
  }

  // 概览
  drawText("【冲突概览】", 14);
  drawText(analysis.overview.oneLiner);
  drawText(`升级路径：${analysis.overview.escalationPattern}`, 11, rgb(0.2, 0.2, 0.2));
  y -= 6;

  // 双方视角
  drawText("【我的视角】", 13);
  drawText(`情绪：${analysis.perspectives.mine.surfaceEmotion}`, 11);
  drawText(`担忧：${analysis.perspectives.mine.underlyingFear}`, 11);
  drawText(`需求：${analysis.perspectives.mine.unmetNeed}`, 11);
  y -= 6;

  drawText("【TA 的视角】", 13);
  drawText(`情绪：${analysis.perspectives.theirs.surfaceEmotion}`, 11);
  drawText(`担忧：${analysis.perspectives.theirs.underlyingFear}`, 11);
  drawText(`需求：${analysis.perspectives.theirs.unmetNeed}`, 11);
  y -= 10;

  // 关键时刻
  if (analysis.keyMoments.length) {
    drawText("【关键时刻】", 13);
    analysis.keyMoments.forEach((moment, idx) => {
      drawText(`${idx + 1}. "${moment.quote}"`, 11);
      drawText(`- ${moment.significance}`, 10, rgb(0.35, 0.35, 0.35));
    });
    y -= 6;
  }

  // 误区洞察
  if (analysis.insights.length) {
    drawText("【视角转换】", 13);
    analysis.insights.forEach((insight) => {
      drawText(`类型：${insight.type}`, 11);
      drawText(`你可能以为：${insight.youMightThink}`, 10, rgb(0.3, 0.3, 0.3));
      drawText(`另一个可能：${insight.alternativeView}`, 10, rgb(0.3, 0.3, 0.3));
      drawText(`书中智慧：${insight.bookQuote}`, 10, rgb(0.3, 0.3, 0.3));
      y -= 4;
    });
    y -= 6;
  }

  // 重建连接
  drawText("【理解表达】", 13);
  drawText(analysis.reconnection.coreUnderstanding, 11);
  drawText("【对话示例】", 12);
  drawText(analysis.reconnection.sampleScript, 10);
  y -= 6;
  drawText("【时机建议】", 12);
  drawText(analysis.reconnection.timingAdvice, 10);

  return pdfDoc.save();
}
