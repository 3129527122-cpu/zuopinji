"use client";

import { useEffect, useRef, useState } from "react";
import { aboutHighlights, experiences, profile, projects, skillTools, strengths } from "../data/portfolio";

const artwork = "/images/portfolio-master-3c-v2.webp";

const serviceNavigation = [
  "主图设计",
  "AI赋能电商",
  "产品建模",
  "三维渲染",
  "产品海报",
  "AI视频",
  "线下包装、彩盒与说明书",
  "首页设计",
  "详情页设计",
];

const mainImageSubNavigation = ["电池", "快消 3C", "清洁机器", "母婴产品"];
const subServiceIds: Record<string, string> = {
  "电池": "work-battery",
  "快消 3C": "work-fast-3c",
  "清洁机器": "work-cleaning",
  "母婴产品": "work-maternal",
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
    title: `快消 3C 主图 ${number}`,
  };
});

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

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeSubService, setActiveSubService] = useState<string | null>(mainImageSubNavigation[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) videoRef.current?.pause();
  }, []);

  useEffect(() => {
    if (activeService !== 0) return;
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
  }, [activeService]);

  const closeMenu = () => setMenuOpen(false);

  const navigateToService = (index: number) => {
    setActiveService(index);
    setActiveSubService(index === 0 ? (activeSubService ?? mainImageSubNavigation[0]) : null);
    setMenuOpen(false);
    const targetId = index === 0 ? subServiceIds[activeSubService ?? mainImageSubNavigation[0]] : "work";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToSubService = (item: string) => {
    setActiveService(0);
    setActiveSubService(item);
    setMenuOpen(false);
    document.getElementById(subServiceIds[item])?.scrollIntoView({ behavior: "smooth" });
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
                      className={activeSubService === subItem ? "is-active" : ""}
                      aria-current={activeSubService === subItem ? "page" : undefined}
                      onClick={() => navigateToSubService(subItem)}
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
          <a href={`mailto:${profile.email}`} title={sidebarCollapsed ? "联系我" : undefined}>
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
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={artwork}
          aria-hidden="true"
        >
          <source src="/media/hero-showreel.mp4" type="video/mp4" />
        </video>
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

      <section className={`work section ${activeService === 0 ? "work-tinted-dark" : ""}`} id="work">
        <div className="shell">
          <div className="section-kicker light">
            <span>02</span>
            <p>SELECTED WORK / {serviceNavigation[activeService]}</p>
          </div>
          {activeService === 0 ? (
            <>
              <div className="work-subsection work-subsection-first" id="work-battery">
                <div className="battery-gallery">
                  {batteryMainImages.map((image, index) => (
                    <figure className="battery-gallery-item" key={image.id}>
                      <img src={image.src} alt={image.title} loading={index < 6 ? "eager" : "lazy"} />
                    </figure>
                  ))}
                </div>
                <div className="battery-feature-row">
                  {batteryFeatureImages.map((image) => (
                    <figure className="battery-feature-item" key={image.id}>
                      <img src={image.src} alt={image.title} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>

              <div className="work-subsection" id="work-fast-3c">
                <div className="battery-gallery fast-3c-gallery">
                  {fastMoving3cImages.map((image, index) => (
                    <figure className="battery-gallery-item" key={image.id}>
                      <img src={image.src} alt={image.title} loading={index < 4 ? "eager" : "lazy"} />
                    </figure>
                  ))}
                </div>
              </div>

              <div className="work-subsection" id="work-cleaning">
                <div className="battery-gallery cleaning-gallery">
                  {cleaningRobotImages.map((image, index) => (
                    <figure className="battery-gallery-item" key={image.id}>
                      <img src={image.src} alt={image.title} loading={index < 4 ? "eager" : "lazy"} />
                    </figure>
                  ))}
                </div>
              </div>

              <div className="work-subsection work-subsection-empty" id="work-maternal" />
            </>
          ) : (
            <>
              <div className="work-heading">
                <h2>以视觉，定义<br />独特的品牌感知。</h2>
                <p>涵盖 AIGC、三维视觉、品牌与产品设计的部分实验性作品。</p>
              </div>
              <div className="project-grid">
                {projects.map((project, index) => (
                  <article className={`project-card project-${index + 1}`} key={project.id}>
                    <a href={`#${project.id}`} aria-label={`查看项目：${project.title}`}>
                      <div
                        className="project-image"
                        style={{ backgroundImage: `url(${artwork})`, backgroundPosition: project.imagePosition }}
                      >
                        <span className="project-index">/{project.index}</span>
                        <span className="project-open"><Arrow diagonal /></span>
                      </div>
                      <div className="project-meta">
                        <div>
                          <h3>{project.title}</h3>
                          <p>{project.englishTitle}</p>
                        </div>
                        <div className="project-meta-right">
                          <p>{project.category}</p>
                          <p>{project.year}</p>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="strengths section" id="strengths">
        <div className="shell">
          <div className="section-kicker">
            <span>03</span>
            <p>CAPABILITIES / 个人优势</p>
          </div>
          <div className="strength-heading">
            <h2>策略与审美并行，<br />技术为创意服务。</h2>
            <p>从概念到最终呈现，我关注的不只是单张视觉，而是完整体验如何形成。</p>
          </div>
          <div className="strength-grid">
            {strengths.map((item) => (
              <article className="strength-card" key={item.no}>
                <span className="strength-no">/{item.no}</span>
                <div className="strength-symbol" aria-hidden="true"><span /></div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="strength-en">{item.en}</p>
                  <p className="strength-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
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
              <a href="#" aria-label="Behance">BEHANCE</a>
              <a href="#" aria-label="小红书">REDNOTE</a>
              <a href="#" aria-label="Instagram">INSTAGRAM</a>
            </div>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
