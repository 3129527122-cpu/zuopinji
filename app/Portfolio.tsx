"use client";

import { useEffect, useState } from "react";
import { aboutHighlights, experiences, profile, skillTools } from "../data/portfolio";

const optimizedWorkImage = (src: string) =>
  src.replace(/\.(?:jpe?g|png)$/i, ".webp");

const serviceNavigation = [
  "主图设计",
  "产品建模",
  "AI赋能电商",
  "三维渲染",
  "产品海报",
  "AI视频",
  "活动与首页设计",
  "线下包装、彩盒与说明书",
  "详情页设计",
];

const serviceSectionIds = [
  "work-main-images",
  "work-product-modeling",
  "work-ai-commerce",
  "work-3d-rendering",
  "work-product-posters",
  "work-ai-video",
  "work-campaign-homepage-design",
  "work-offline-packaging",
  "work-detail-page-design",
];

const mainImageSubNavigation = ["电池", "排插", "数据线与充电宝", "清洁机器", "母婴产品"];
const subServiceIds: Record<string, string> = {
  "电池": "work-battery",
  "排插": "work-fast-3c",
  "数据线与充电宝": "work-cables-powerbanks",
  "清洁机器": "work-cleaning",
  "母婴产品": "work-maternal",
};

const detailPageSubNavigation = ["充电头", "擦窗机器人", "相机电池", "充电宝", "扩展坞", "母婴产品", "耳机"];
const detailPageSubServiceIds: Record<string, string> = {
  "充电头": "work-detail-charger",
  "擦窗机器人": "work-detail-window-cleaner",
  "相机电池": "work-detail-camera-battery",
  "充电宝": "work-detail-power-bank",
  "扩展坞": "work-detail-dock",
  "母婴产品": "work-detail-maternal",
  "耳机": "work-detail-headphones",
};

const batteryMainImages = Array.from({ length: 13 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const extension = index >= 9 && index <= 11 ? "jpg" : "png";
  return {
    id: `battery-main-${number}`,
    src: `/work/main-images/battery/battery-${number}.${extension}`,
    title: `电池主图 ${number}`,
  };
}).filter((image) => image.id !== "battery-main-09");

const batteryFeatureImages = [
  { id: "battery-feature-01", src: "/work/main-images/battery/battery-feature-01.png", title: "相机电池容量主图" },
  { id: "battery-feature-02", src: "/work/main-images/battery/battery-feature-02.png", title: "相机电池充电器主图" },
];

const fastMoving3cImages = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `fast-3c-${number}`,
    src: `/work/main-images/fast-moving-3c/fast-3c-${number}.jpg`,
    title: `排插主图 ${number}`,
  };
});

const cablePowerbankImages = [
  { id: "cable-01", src: "/work/main-images/cables-powerbanks/cable-01.jpg", title: "数据线与充电宝主图 01" },
  { id: "cable-02", src: "/work/main-images/cables-powerbanks/cable-02.jpg", title: "数据线与充电宝主图 02" },
  { id: "cable-03", src: "/work/main-images/cables-powerbanks/cable-03.jpg", title: "数据线与充电宝主图 03" },
  { id: "cable-04", src: "/work/main-images/cables-powerbanks/cable-04.png", title: "数据线与充电宝主图 04" },
  { id: "cable-05", src: "/work/main-images/cables-powerbanks/cable-05.png", title: "数据线与充电宝主图 05" },
  { id: "cable-06", src: "/work/main-images/cables-powerbanks/cable-06.png", title: "数据线与充电宝主图 06" },
  { id: "powerbank-01", src: "/work/main-images/cables-powerbanks/powerbank-01.gif", title: "充电宝主图 01" },
  { id: "powerbank-02", src: "/work/main-images/cables-powerbanks/powerbank-02.jpg", title: "充电宝主图 02" },
  { id: "powerbank-03", src: "/work/main-images/cables-powerbanks/powerbank-03.jpg", title: "充电宝主图 03" },
  { id: "powerbank-04", src: "/work/main-images/cables-powerbanks/powerbank-04.jpg", title: "充电宝主图 04" },
  { id: "powerbank-06", src: "/work/main-images/cables-powerbanks/powerbank-06.jpg", title: "充电宝主图 06" },
  { id: "powerbank-07", src: "/work/main-images/cables-powerbanks/powerbank-07.jpg", title: "充电宝主图 07" },
];

const cleaningRobotImages = [
  ...Array.from({ length: 18 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const extension = index === 1 || index === 6 ? "png" : "jpg";
    return {
      id: `cleaning-${number}`,
      src: `/work/main-images/cleaning-robot/cleaning-${number}.${extension}`,
      title: `清洁机器主图 ${number}`,
    };
  }).filter((image) => !["cleaning-11", "cleaning-13"].includes(image.id)),
  { id: "cleaning-11", src: "/work/main-images/cleaning-robot/cleaning-11.jpg", title: "清洁机器主图 11" },
  { id: "cleaning-13", src: "/work/main-images/cleaning-robot/cleaning-13.jpg", title: "清洁机器主图 13" },
];

const maternalProductImages = [
  { id: "maternal-01", src: "/work/main-images/maternal/maternal-01.jpg", title: "母婴产品主图 01" },
  { id: "maternal-02", src: "/work/main-images/maternal/maternal-02.png", title: "母婴产品主图 02" },
  { id: "maternal-03", src: "/work/main-images/maternal/maternal-03.jpg", title: "母婴产品主图 03" },
  { id: "maternal-04", src: "/work/main-images/maternal/maternal-04.jpg", title: "母婴产品主图 04" },
  { id: "maternal-05", src: "/work/main-images/maternal/maternal-05.jpg", title: "母婴产品主图 05" },
  { id: "maternal-06", src: "/work/main-images/maternal/maternal-06.jpg", title: "母婴产品主图 06" },
  { id: "maternal-07", src: "/work/main-images/maternal/maternal-07.jpg", title: "母婴产品主图 07" },
  { id: "maternal-08", src: "/work/main-images/maternal/maternal-08.jpg", title: "母婴产品主图 08" },
  { id: "maternal-09", src: "/work/main-images/maternal/maternal-09.jpg", title: "母婴产品主图 09" },
  { id: "maternal-10", src: "/work/main-images/maternal/maternal-10.jpg", title: "母婴产品英文主图 01" },
  { id: "maternal-11", src: "/work/main-images/maternal/maternal-11.jpg", title: "母婴产品英文主图 02" },
  { id: "maternal-12", src: "/work/main-images/maternal/maternal-12.jpg", title: "母婴产品英文主图 03" },
];

const productModelingImages = [
  { id: "modeling-01", src: "/work/product-modeling/modeling-01.jpg", title: "Product modeling render 01" },
  { id: "modeling-02", src: "/work/product-modeling/modeling-02.jpg", title: "Product modeling wireframe 01" },
  { id: "modeling-03", src: "/work/product-modeling/modeling-03.jpg", title: "Product modeling render 02" },
  { id: "modeling-04", src: "/work/product-modeling/modeling-04.jpg", title: "Product modeling wireframe 02" },
  { id: "modeling-05", src: "/work/product-modeling/modeling-05.jpg", title: "Product modeling render 03" },
  { id: "modeling-06", src: "/work/product-modeling/modeling-06.png", title: "Product modeling wireframe 03" },
  { id: "modeling-07", src: "/work/product-modeling/modeling-07.jpg", title: "Product modeling render 04" },
  { id: "modeling-08", src: "/work/product-modeling/modeling-08.jpg", title: "Product modeling wireframe 04" },
  { id: "modeling-09", src: "/work/product-modeling/modeling-09.png", title: "Product modeling render 05" },
  { id: "modeling-10", src: "/work/product-modeling/modeling-10.jpg", title: "Product modeling wireframe 05" },
  { id: "modeling-11", src: "/work/product-modeling/modeling-11.png", title: "Product modeling render 06" },
  { id: "modeling-12", src: "/work/product-modeling/modeling-12.jpg", title: "Product modeling wireframe 06" },
];

const aiCommerceImages = [
  { id: "ai-commerce-01", src: "/work/ai-commerce/ai-commerce-01.png", title: "AI赋能电商 01" },
  { id: "ai-commerce-02", src: "/work/ai-commerce/ai-commerce-02.png", title: "AI赋能电商 02" },
  { id: "ai-commerce-03", src: "/work/ai-commerce/ai-commerce-03.png", title: "AI赋能电商 03" },
  { id: "ai-commerce-05", src: "/work/ai-commerce/ai-commerce-05.png", title: "AI赋能电商 05" },
  { id: "ai-commerce-07", src: "/work/ai-commerce/ai-commerce-07.jpg", title: "AI赋能电商 07" },
  { id: "ai-commerce-08", src: "/work/ai-commerce/ai-commerce-08.jpg", title: "AI赋能电商 08" },
  { id: "ai-commerce-09", src: "/work/ai-commerce/ai-commerce-09.jpg", title: "AI赋能电商 09" },
  { id: "ai-commerce-11", src: "/work/ai-commerce/ai-commerce-11.jpg", title: "AI赋能电商 11" },
  { id: "ai-commerce-12", src: "/work/ai-commerce/ai-commerce-12.jpg", title: "AI赋能电商 12" },
  { id: "ai-commerce-13", src: "/work/ai-commerce/ai-commerce-13.jpg", title: "AI赋能电商 13" },
];

const threeDRenderingImages = [
  { id: "rendering-01", src: "/work/3d-rendering/rendering-01.jpg", title: "三维渲染 01" },
  { id: "rendering-02", src: "/work/3d-rendering/rendering-02.jpg", title: "三维渲染 02" },
  { id: "rendering-03", src: "/work/3d-rendering/rendering-03.jpg", title: "三维渲染 03" },
  { id: "rendering-04", src: "/work/3d-rendering/rendering-04.jpg", title: "三维渲染 04" },
  { id: "rendering-05", src: "/work/3d-rendering/rendering-05.jpg", title: "三维渲染 05" },
  { id: "rendering-06", src: "/work/3d-rendering/rendering-06.jpg", title: "三维渲染 06" },
  { id: "rendering-07", src: "/work/3d-rendering/rendering-07.jpg", title: "三维渲染 07" },
  { id: "rendering-08", src: "/work/3d-rendering/rendering-08.jpg", title: "三维渲染 08" },
  { id: "rendering-09", src: "/work/3d-rendering/rendering-09.jpg", title: "三维渲染 09" },
  { id: "rendering-10", src: "/work/3d-rendering/rendering-10.jpg", title: "三维渲染 10" },
  { id: "rendering-11", src: "/work/3d-rendering/rendering-11.png", title: "三维渲染 11" },
  { id: "rendering-12", src: "/work/3d-rendering/rendering-12.jpg", title: "三维渲染 12" },
  { id: "rendering-13", src: "/work/3d-rendering/rendering-13.jpg", title: "三维渲染 13" },
  { id: "rendering-14", src: "/work/3d-rendering/rendering-14.jpg", title: "三维渲染 14" },
  { id: "rendering-15", src: "/work/3d-rendering/rendering-15.jpg", title: "三维渲染 15" },
  { id: "rendering-16", src: "/work/3d-rendering/rendering-16.jpg", title: "三维渲染 16" },
  { id: "rendering-17", src: "/work/3d-rendering/rendering-17.jpg", title: "三维渲染 17" },
  { id: "rendering-18", src: "/work/3d-rendering/rendering-18.jpg", title: "三维渲染 18" },
  { id: "rendering-19", src: "/work/3d-rendering/rendering-19.jpg", title: "三维渲染 19" },
  { id: "rendering-20", src: "/work/3d-rendering/rendering-20.jpg", title: "三维渲染 20" },
];

const productPosterOrder = [1, 2, 3, 4, 10, 5, 6, 7, 8, 9];

const productPosterImages = [
  ...productPosterOrder.map((posterNumber, index) => {
    const number = String(posterNumber).padStart(2, "0");
    return {
      id: `product-poster-${number}-${index + 1}`,
      src: `/work/product-posters/poster-${number}.jpg`,
      title: `产品海报 ${number}`,
      wide: [1, 5, 6, 7, 8, 9].includes(posterNumber),
    };
  }),
];

const aiVideoItems = [
  { id: "ai-video-01", src: "/work/ai-video/video-01.mp4", title: "擦窗机器人视频" },
  { id: "ai-video-02", src: "/work/ai-video/video-02.mp4", title: "AI视频 02" },
  { id: "ai-video-03", src: "/work/ai-video/video-03.mp4", title: "AI视频 03" },
  { id: "ai-video-04", src: "/work/ai-video/video-04.mp4", title: "AI视频 04" },
];

const campaignHomepageImages = [
  { id: "campaign-homepage-01", src: "/work/campaign-homepage-design/campaign-01.jpg", title: "双12活动页 01" },
  { id: "campaign-homepage-02", src: "/work/campaign-homepage-design/campaign-02.jpg", title: "双12活动页 02" },
];

const campaignHomepageTopImages = [
  { id: "campaign-homepage-top-01", src: "/work/campaign-homepage-design/homepage-top-01.jpg", title: "首页设计 01" },
  { id: "campaign-homepage-top-02", src: "/work/campaign-homepage-design/homepage-top-02.jpg", title: "首页设计 02" },
  { id: "campaign-homepage-top-03", src: "/work/campaign-homepage-design/homepage-top-03.jpg", title: "首页设计 03" },
  { id: "campaign-homepage-top-04", src: "/work/campaign-homepage-design/homepage-top-04.jpg", title: "首页设计 04" },
];

const offlinePackagingImages = [
  { id: "offline-packaging-01", src: "/work/offline-packaging/packaging-01.jpg", title: "线下包装 01", tall: true },
  { id: "offline-packaging-02", src: "/work/offline-packaging/packaging-02.jpg", title: "线下包装 02" },
  { id: "offline-packaging-03", src: "/work/offline-packaging/packaging-03.jpg", title: "线下包装 03" },
  { id: "offline-packaging-04", src: "/work/offline-packaging/packaging-04.jpg", title: "线下包装 04" },
  { id: "offline-packaging-05", src: "/work/offline-packaging/packaging-05.jpg", title: "线下包装 05" },
  { id: "offline-packaging-06", src: "/work/offline-packaging/packaging-06.jpg", title: "线下包装 06" },
  { id: "offline-packaging-07", src: "/work/offline-packaging/packaging-07.jpg", title: "线下包装 07" },
];

const detailPageImages = [
  { id: "detail-page-01", src: "/work/detail-page-design/detail-page-01.jpg", title: "充电器详情页 01" },
  { id: "detail-page-02", src: "/work/detail-page-design/detail-page-02.jpg", title: "充电器详情页 02" },
];

const windowCleanerDetailImages = [
  { id: "window-cleaner-detail-01", src: "/work/detail-page-design/window-cleaner-01.jpg", title: "擦窗机器人详情页 01" },
  { id: "window-cleaner-detail-02", src: "/work/detail-page-design/window-cleaner-02.jpg", title: "擦窗机器人详情页 02" },
  { id: "window-cleaner-detail-03", src: "/work/detail-page-design/window-cleaner-03.gif", title: "擦窗机器人详情页 03" },
  { id: "window-cleaner-detail-04", src: "/work/detail-page-design/window-cleaner-04.gif", title: "擦窗机器人详情页 04" },
];

const cameraBatteryDetailImages = [
  { id: "camera-battery-detail-01", src: "/work/detail-page-design/camera-battery-01.jpg", title: "相机电池详情页 01" },
  { id: "camera-battery-detail-02", src: "/work/detail-page-design/camera-battery-02.jpg", title: "相机电池详情页 02" },
  { id: "camera-battery-detail-05", src: "/work/detail-page-design/camera-battery-05.jpg", title: "相机电池详情页 05" },
  { id: "camera-battery-detail-06", src: "/work/detail-page-design/camera-battery-06.jpg", title: "相机电池详情页 06" },
];

const powerBankDetailImages = [
  { id: "power-bank-detail-01", src: "/work/detail-page-design/power-bank-01.jpg", title: "充电宝详情页 01" },
  { id: "power-bank-detail-02", src: "/work/detail-page-design/power-bank-02.jpg", title: "充电宝详情页 02" },
];

const dockDetailImages = [
  { id: "dock-detail-01", src: "/work/detail-page-design/dock-01.jpg", title: "扩展坞详情页 01" },
  { id: "dock-detail-02", src: "/work/detail-page-design/dock-02.jpg", title: "扩展坞详情页 02" },
];

const maternalDetailImages = [
  { id: "maternal-detail-01", src: "/work/detail-page-design/maternal-01.jpg", title: "母婴产品详情页 01" },
  { id: "maternal-detail-02", src: "/work/detail-page-design/maternal-02.jpg", title: "母婴产品详情页 02" },
];

const headphonesDetailImages = [
  { id: "headphones-detail-01", src: "/work/detail-page-design/headphones-01.jpg", title: "耳机详情页 01" },
  { id: "headphones-detail-02", src: "/work/detail-page-design/headphones-02.jpg", title: "耳机详情页 02" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeSubService, setActiveSubService] = useState<string | null>(mainImageSubNavigation[0]);
  const [activeDetailSubService, setActiveDetailSubService] = useState<string | null>(detailPageSubNavigation[0]);
  useEffect(() => {
    const sections = mainImageSubNavigation
      .map((item) => document.getElementById(subServiceIds[item]))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const item = mainImageSubNavigation.find((name) => subServiceIds[name] === visible.target.id);
          if (item) setActiveSubService(item);
        }
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0, .15, .35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = detailPageSubNavigation
      .map((item) => document.getElementById(detailPageSubServiceIds[item]))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const item = detailPageSubNavigation.find((name) => detailPageSubServiceIds[name] === visible.target.id);
          if (item) setActiveDetailSubService(item);
        }
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0, .15, .35] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = serviceSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.serviceIndex);
        if (Number.isInteger(index)) setActiveService(index);
      },
      { rootMargin: "-20% 0px -62% 0px", threshold: [0, .08, .2] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navigateToService = (index: number) => {
    setActiveService(index);
    setMenuOpen(false);
    document.getElementById(serviceSectionIds[index])?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToSubService = (item: string) => {
    setActiveService(0);
    setActiveSubService(item);
    setMenuOpen(false);
    document.getElementById(subServiceIds[item])?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToDetailSubService = (item: string) => {
    setActiveService(8);
    setActiveDetailSubService(item);
    setMenuOpen(false);
    document.getElementById(detailPageSubServiceIds[item])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`portfolio-layout ${sidebarCollapsed ? "sidebar-is-collapsed" : ""}`}>
      <aside className={`side-nav ${menuOpen ? "mobile-is-open" : ""}`} aria-label="作品分类导航">
        <div className="side-nav-head">
          <a className="wordmark side-home-link" href="#top" aria-label="回到首页" onClick={closeMenu}>
            回到首页<span className="blue-dot">.</span>
          </a>
          <button
            className="collapse-button"
            type="button"
            aria-label={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
            aria-expanded={!sidebarCollapsed}
            onClick={() => setSidebarCollapsed((value) => !value)}
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>
        <p className="side-label">WORK INDEX / 作品目录</p>
        <nav className="service-nav">
          {serviceNavigation.map((item, index) => (
            <div className="service-group" key={item}>
              <button
                type="button"
                className={activeService === index ? "is-active" : ""}
                onClick={() => navigateToService(index)}
                aria-current={activeService === index ? "page" : undefined}
                title={sidebarCollapsed ? item : undefined}
              >
                <span className="service-no">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-name">{item}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </button>
              {index === 0 && (
                <div className="service-subnav" aria-label="主图设计分类">
                  {mainImageSubNavigation.map((subItem) => (
                    <button
                      type="button"
                      className={activeService === 0 && activeSubService === subItem ? "is-active" : ""}
                      aria-current={activeService === 0 && activeSubService === subItem ? "page" : undefined}
                      onClick={() => navigateToSubService(subItem)}
                      key={subItem}
                    >
                      <span aria-hidden="true" />
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
              {index === 8 && (
                <div className="service-subnav" aria-label="详情页设计分类">
                  {detailPageSubNavigation.map((subItem) => (
                    <button
                      type="button"
                      className={activeService === 8 && activeDetailSubService === subItem ? "is-active" : ""}
                      aria-current={activeService === 8 && activeDetailSubService === subItem ? "page" : undefined}
                      onClick={() => navigateToDetailSubService(subItem)}
                      key={subItem}
                    >
                      <span aria-hidden="true" />
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="side-nav-footer">
          <p>AVAILABLE FOR PROJECTS</p>
          <a href="#about" onClick={closeMenu} title={sidebarCollapsed ? "联系我" : undefined}>
            <span className="availability-dot" />
            <span className="side-contact-text">联系我</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>

      <button
        className="mobile-nav-trigger"
        type="button"
        aria-label={menuOpen ? "关闭作品目录" : "打开作品目录"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span>{menuOpen ? "关闭" : "目录"}</span>
        <i />
      </button>

      <main className="portfolio-main">
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-color-zones" aria-hidden="true" />
        <div className="hero-shade" />

        <div className="skill-orbit" aria-label="技能工具">
          <div className="skill-orbit-line" aria-hidden="true" />
          <p className="skill-orbit-label">CREATIVE TOOLKIT <span>08</span></p>
          {skillTools.map((tool) => (
            <button
              className={`skill-tool ${tool.className}`}
              style={{ "--float-delay": tool.delay } as React.CSSProperties}
              type="button"
              key={tool.name}
              aria-label={tool.name}
            >
              <span className="skill-icon-wrap">
                <img src={tool.icon} alt="" />
              </span>
              <span className="skill-tooltip">{tool.shortName}</span>
            </button>
          ))}
        </div>

        <header className="nav shell">
          <a className="wordmark" href="#top" aria-label="返回首页">
            YN<span className="blue-dot">.</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#work" onClick={closeMenu}>作品</a>
            <a href="#about" onClick={closeMenu}>关于</a>
            <a href="#strengths" onClick={closeMenu}>能力</a>
          </nav>
          <a className="contact-pill" href={`mailto:${profile.email}`}>
            联系我 <Arrow diagonal />
          </a>
        </header>

        <div className="hero-copy shell">
          <p className="eyebrow light reveal">VISUAL × AI × BRAND</p>
          <h1 className="reveal delay-1">
            <strong className="hero-year">2026</strong>
            <br />
            <span>视觉 × 电商设计</span>
          </h1>
          <div className="hero-bottom reveal delay-2">
            <p>{profile.role}</p>
            <a className="circle-link" href="#work" aria-label="浏览精选作品">
              <Arrow />
            </a>
          </div>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE <span /></div>
      </section>

      <section className="about section about-compact" id="about">
        <div className="shell">
          <div className="section-kicker about-kicker">
            <span>01</span>
            <p>ABOUT / 关于我</p>
          </div>
          <div className="about-overview">
            <div className="about-profile-panel">
              <div className="about-identity">
                <p className="about-overline">HELLO, I&apos;M</p>
                <div className="about-name-row">
                  <h2>谢华林<span className="blue-dot">.</span></h2>
                  <p className="about-role" aria-label="三年以上电商设计经验">
                    <strong>3+</strong>
                    <span>年电商设计经验</span>
                  </p>
                </div>
              </div>

              <div className="about-summary">
                <p className="about-lead">以设计与 AI，解决真实的商业问题。</p>
                <p className="about-body">{profile.intro}</p>
              </div>

              <div className="profile-facts" aria-label="个人资料">
                <div><span>年龄</span><strong>{profile.age}</strong></div>
                <div><span>性别</span><strong>{profile.gender}</strong></div>
                <div><span>职业</span><strong>{profile.occupation}</strong></div>
                <div><span>地址</span><strong>{profile.location}</strong></div>
                <div className="fact-wechat"><span>微信</span><strong>{profile.wechat}</strong></div>
              </div>

              <div className="about-highlight-grid">
                {aboutHighlights.map((item) => (
                  <article className="about-highlight" key={item.no}>
                    <span>{item.no}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>

            </div>

            <div className="experience-block">
              <div className="experience-heading">
                <p>EXPERIENCE</p>
                <h2>工作经历</h2>
            </div>
            <div className="experience-list">
              {experiences.map((experience, index) => (
                <article className="experience-item" key={`${experience.period}-${experience.company}`}>
                  <div className="experience-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <time>{experience.period}</time>
                  </div>
                  <div className="experience-content">
                    <div className="experience-title">
                      <h3>{experience.company}</h3>
                      <p>{experience.role}</p>
                    </div>
                    <ul>
                      {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work section work-tinted-dark" id="work">
        <div className="shell">
          <div className="work-service-section" id="work-main-images" data-service-index="0">
            <div className="section-kicker light">
              <span>02</span>
              <p>SELECTED WORK / 主图设计</p>
            </div>

            <div className="work-subsection work-subsection-first" id="work-battery">
              <div className="battery-gallery">
                {batteryMainImages.map((image) => (
                  <figure className="battery-gallery-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
              <div className="battery-feature-row">
                {batteryFeatureImages.map((image) => (
                  <figure className="battery-feature-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="work-subsection" id="work-fast-3c">
              <div className="battery-gallery fast-3c-gallery">
                {fastMoving3cImages.map((image) => (
                  <figure className="battery-gallery-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="work-subsection" id="work-cables-powerbanks">
              <div className="battery-gallery cables-powerbanks-gallery">
                {cablePowerbankImages.map((image) => (
                  <figure className="battery-gallery-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="work-subsection" id="work-cleaning">
              <div className="battery-gallery cleaning-gallery">
                {cleaningRobotImages.map((image) => (
                  <figure className="battery-gallery-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="work-subsection" id="work-maternal">
              <div className="battery-gallery maternal-gallery">
                {maternalProductImages.map((image) => (
                  <figure className="battery-gallery-item" key={image.id}>
                    <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="work-service-section" id="work-product-modeling" data-service-index="1">
            <div className="section-kicker light">
              <span>02</span>
              <p>SELECTED WORK / 产品建模</p>
            </div>
            <div className="battery-gallery product-modeling-gallery">
              {productModelingImages.map((image) => (
                <figure className="battery-gallery-item" key={image.id}>
                  <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>

          {serviceNavigation.slice(2).map((service, index) => {
            const serviceIndex = index + 2;
            return (
              <div
                className="work-service-section work-service-pending"
                id={serviceSectionIds[serviceIndex]}
                data-service-index={serviceIndex}
                key={service}
              >
                <div className="section-kicker light">
                  <span>{String(serviceIndex + 1).padStart(2, "0")}</span>
                  <p>SELECTED WORK / {service}</p>
                </div>
                {serviceIndex === 2 ? (
                  <div className="battery-gallery ai-commerce-gallery">
                    {aiCommerceImages.map((image) => (
                      <figure className="battery-gallery-item" key={image.id}>
                        <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                ) : serviceIndex === 3 ? (
                  <div className="rendering-gallery">
                    {threeDRenderingImages.map((image) => (
                      <figure className="battery-gallery-item" key={image.id}>
                        <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                ) : serviceIndex === 4 ? (
                  <div className="product-poster-gallery">
                    {productPosterImages.map((image) => (
                      <figure
                        className={`battery-gallery-item${image.wide ? " product-poster-wide" : ""}`}
                        key={image.id}
                      >
                        <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                ) : serviceIndex === 5 ? (
                  <div className="ai-video-gallery">
                    {aiVideoItems.map((video) => (
                      <figure className="ai-video-card" key={video.id}>
                        <video controls preload="metadata" playsInline>
                          <source src={video.src} type="video/mp4" />
                        </video>
                      </figure>
                    ))}
                  </div>
                ) : serviceIndex === 6 ? (
                  <div className="campaign-homepage-stack">
                    <div className="campaign-homepage-top-row">
                      {campaignHomepageTopImages.map((image) => (
                        <figure className="battery-gallery-item" key={image.id}>
                          <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                        </figure>
                      ))}
                    </div>
                    <div className="campaign-homepage-gallery">
                      {campaignHomepageImages.map((image) => (
                        <figure className="battery-gallery-item" key={image.id}>
                          <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : serviceIndex === 7 ? (
                  <div className="offline-packaging-gallery">
                    {offlinePackagingImages.map((image) => (
                      <figure
                        className={`battery-gallery-item${image.tall ? " offline-packaging-tall" : ""}`}
                        key={image.id}
                      >
                        <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                      </figure>
                    ))}
                  </div>
                ) : serviceIndex === 8 ? (
                  <div className="detail-page-sections">
                    {detailPageSubNavigation.map((subItem, subIndex) => (
                      <section
                        className="detail-page-subsection"
                        id={detailPageSubServiceIds[subItem]}
                        key={subItem}
                      >
                        <div className="detail-page-subsection-heading">
                          <span>{String(subIndex + 1).padStart(2, "0")}</span>
                          <h3>{subItem}</h3>
                        </div>
                        {subItem === "充电头" ? (
                          <div className="detail-page-gallery">
                            {detailPageImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "擦窗机器人" ? (
                          <div className="detail-page-gallery">
                            {windowCleanerDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "相机电池" ? (
                          <div className="detail-page-gallery">
                            {cameraBatteryDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "充电宝" ? (
                          <div className="detail-page-gallery">
                            {powerBankDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "扩展坞" ? (
                          <div className="detail-page-gallery">
                            {dockDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "母婴产品" ? (
                          <div className="detail-page-gallery">
                            {maternalDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : subItem === "耳机" ? (
                          <div className="detail-page-gallery">
                            {headphonesDetailImages.map((image) => (
                              <figure className="battery-gallery-item" key={image.id}>
                                <img src={optimizedWorkImage(image.src)} alt={image.title} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        ) : (
                          <div className="detail-page-empty">
                            <p>{subItem}详情页作品待补充。</p>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="work-category-placeholder">
                    <h2>{service}</h2>
                    <p>该分类作品将在此处连续展示。</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="contact-screen" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-inner">
          <p className="eyebrow light">LET&apos;S CREATE SOMETHING MEANINGFUL</p>
          <h2>有一个好想法？<br /><span>我们聊聊。</span></h2>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email} <Arrow diagonal />
          </a>
          <div className="footer-row">
            <p>© 2026 {profile.name}. ALL RIGHTS RESERVED.</p>
            <div>
              <span>BEHANCE</span>
              <span>REDNOTE</span>
              <span>INSTAGRAM</span>
            </div>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
