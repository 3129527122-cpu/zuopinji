import type { Metadata } from "next";
import Portfolio from "./Portfolio";

export const metadata: Metadata = {
  title: "作品集｜视觉设计 · AI 设计 · 品牌设计",
  description: "AI 设计师、三维设计师、视觉设计师与电商美工作品集。",
};

export default function Home() {
  return <Portfolio />;
}
