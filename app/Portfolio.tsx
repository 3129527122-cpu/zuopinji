"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects, skillTools, stats, strengths } from "../data/portfolio";

const artwork = "/images/portfolio-master-3c-v2.webp";

const serviceNavigation = [
  "AI赋能电商",
  "主图设计",
  "产品建模",
  "三维渲染",
  "产品海报",
  "AI视频",
  "线下包装、彩盒与说明书",
  "首页设计",
  "详情页设计",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) videoRef.current?.pause();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navigateToService = (index: number) => {
    setActiveService(index);
    setMenuOpen(false);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`portfolio-layout ${sidebarCollapsed ? "sidebar-is-collapsed" : ""}`}>
      <aside className={`side-nav ${menuOpen ? "mobile-is-open" : ""}`} aria-label="作品分类导航">
        <div className="side-nav-head">
          <a className="wordmark" href="#top" aria-label="返回首页" onClick={closeMenu}>
            YN<span className="blue-dot">.</span>
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
            <button
              type="button"
              className={activeService === index ? "is-active" : ""}
              key={item}
              onClick={() => navigateToService(index)}
              aria-current={activeService === index ? "page" : undefined}
              title={sidebarCollapsed ? item : undefined}
            >
              <span className="service-no">{String(index + 1).padStart(2, "0")}</span>
              <span className="service-name">{item}</span>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </button>
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

      <section className="about section" id="about">
        <div className="shell">
          <div className="section-kicker">
            <span>01</span>
            <p>ABOUT / 关于我</p>
          </div>
          <div className="about-grid">
            <div className="portrait" role="img" aria-label="设计师形象照占位">
              <div className="portrait-art" />
              <span>PORTRAIT / REPLACE HERE</span>
            </div>
            <div className="about-copy">
              <p className="about-lead">设计不止于好看，<br />更是建立感知与信任。</p>
              <p className="about-body">{profile.intro}</p>
              <div className="contact-list">
                <a href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.zh}<br />{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-kicker light">
            <span>02</span>
            <p>SELECTED WORK / {serviceNavigation[activeService]}</p>
          </div>
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
