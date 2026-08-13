export type Project = {
  id: string;
  index: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  description: string;
  imagePosition: string;
  tone: "dark" | "light";
};

export const profile = {
  name: "YOUR NAME",
  role: "AI 设计师 / 三维设计师 / 视觉设计师 / 电商美工",
  intro:
    "我专注于品牌视觉、AIGC 与三维影像之间的连接。通过策略、审美与新技术，把抽象的品牌想法转译成清晰、有记忆点的视觉体验。",
  email: "hello@yourname.design",
  location: "中国 · 可远程合作",
};

export type SkillTool = {
  name: string;
  shortName: string;
  icon: string;
  className: string;
  delay: string;
};

export const skillTools: SkillTool[] = [
  { name: "Adobe Illustrator", shortName: "Illustrator", icon: "/skills/illustrator.png", className: "skill-ai", delay: "-1.2s" },
  { name: "Cinema 4D", shortName: "Cinema 4D", icon: "/skills/cinema-4d.png", className: "skill-c4d", delay: "-3.8s" },
  { name: "Codex", shortName: "Codex", icon: "/skills/codex.png", className: "skill-codex", delay: "-6.1s" },
  { name: "ChatGPT", shortName: "ChatGPT", icon: "/skills/chatgpt.png", className: "skill-gpt", delay: "-2.6s" },
  { name: "剪映", shortName: "剪映", icon: "/skills/jianying.png", className: "skill-jianying", delay: "-5.4s" },
  { name: "Adobe Photoshop", shortName: "Photoshop", icon: "/skills/photoshop.png", className: "skill-ps", delay: "-.4s" },
  { name: "即梦 AI", shortName: "即梦 AI", icon: "/skills/jimeng.png", className: "skill-jimeng", delay: "-4.6s" },
  { name: "Nano Banana", shortName: "Nano Banana", icon: "/skills/nano-banana.png", className: "skill-banana", delay: "-7.2s" },
];

export const stats = [
  { value: "08+", label: "YEARS EXPERIENCE", zh: "年设计经验" },
  { value: "60+", label: "PROJECTS COMPLETED", zh: "完成项目" },
  { value: "18", label: "BRANDS COLLABORATED", zh: "合作品牌" },
];

export const projects: Project[] = [
  {
    id: "synthetic-nature",
    index: "01",
    title: "合成自然",
    englishTitle: "Synthetic Nature",
    category: "AIGC 视觉实验",
    year: "2026",
    description: "以生成式工作流探索玻璃、金属与光的有机共生。",
    imagePosition: "0% center",
    tone: "dark",
  },
  {
    id: "silent-form",
    index: "02",
    title: "寂静形态",
    englishTitle: "Silent Form",
    category: "三维艺术指导",
    year: "2026",
    description: "用雕塑感面料与克制光影，构建安静而有张力的品牌意象。",
    imagePosition: "34% center",
    tone: "light",
  },
  {
    id: "object-system",
    index: "03",
    title: "对象系统",
    englishTitle: "Object System",
    category: "产品视觉设计",
    year: "2025",
    description: "围绕精密材质建立统一、可延展的产品视觉语言。",
    imagePosition: "66% center",
    tone: "dark",
  },
  {
    id: "blue-horizon",
    index: "04",
    title: "蓝色地平线",
    englishTitle: "Blue Horizon",
    category: "品牌概念影像",
    year: "2025",
    description: "在液态金属景观中，以唯一的蓝塑造清晰品牌识别。",
    imagePosition: "100% center",
    tone: "dark",
  },
];

export const strengths = [
  {
    no: "01",
    title: "视觉策略",
    en: "Visual Strategy",
    description: "从商业目标与品牌语境出发，搭建清晰、一致且可持续生长的视觉系统。",
  },
  {
    no: "02",
    title: "AIGC 创意",
    en: "AI Art Direction",
    description: "将生成式 AI 融入创意构思与制作流程，扩大视觉探索的速度与边界。",
  },
  {
    no: "03",
    title: "三维表达",
    en: "3D Visualization",
    description: "用材质、光影与动态叙事，为品牌与产品建立具有空间感的视觉体验。",
  },
  {
    no: "04",
    title: "品牌落地",
    en: "Brand Execution",
    description: "从核心概念到数字触点，确保设计表达在每一个交付场景中准确落地。",
  },
];
