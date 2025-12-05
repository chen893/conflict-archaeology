import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Conflict Archaeology",
  description: "在 15 分钟内完成平复情绪、理解对方、重建连接的旅程。",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
