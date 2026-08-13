import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example.com"),
  title: {
    default: "YOUR NAME — AI / 3D / Visual / E-commerce Designer",
    template: "%s — YOUR NAME",
  },
  description: "AI 设计师、三维设计师、视觉设计师与电商美工作品集。以策略、审美和新技术创造清晰、有记忆点的视觉体验。",
  keywords: ["AI设计师", "三维设计师", "视觉设计师", "电商美工", "AIGC", "三维设计", "作品集"],
  openGraph: {
    title: "YOUR NAME — AI / 3D / Visual / E-commerce Designer",
    description: "2026 视觉 × 电商设计作品集。",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
