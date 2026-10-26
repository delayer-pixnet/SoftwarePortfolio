import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Download, Github, Layers3, Menu, Search, Sparkles, TerminalSquare, X } from 'lucide-react';
import { projectService } from './services/ProjectService';
import type { PortfolioProject, ProjectCategory } from './types/project';
import type { ProjectLinks } from './types/project';
import { getSafeHttpsUrl, resolveProjectImageUrl } from './utils/projectAssets';

const filters: Array<ProjectCategory | '全部'> = ['全部', 'WinForms', 'WPF', 'Web', '其他'];
const shortDate = (date: string | null) => date ? new Date(`${date}T00:00:00`).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '待更新';

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-wrap">
    <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">S.</span><span>Software<span className="brand-light">Portfolio</span></span></Link>
    <button className="menu-toggle" aria-label={open ? '關閉選單' : '開啟選單'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="主要導覽">
      {[['/', '首頁'], ['/projects', '作品集'], ['/about', '關於我']].map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <Link className="nav-cta" to="/projects" onClick={() => setOpen(false)}>探索作品 <ArrowUpRight size={15} /></Link>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link className="brand footer-brand" to="/"><span className="brand-mark">S.</span><span>Software<span className="brand-light">Portfolio</span></span></Link><span>用程式，讓想法落地。</span><span>© {new Date().getFullYear()} 個人軟體作品集</span></div></footer>;
}

function Tag({ children, subdued = false }: { children: React.ReactNode; subdued?: boolean }) { return <span className={subdued ? 'tag subdued' : 'tag'}>{children}</span>; }

function ProjectCard({ project, index = 0 }: { project: PortfolioProject; index?: number }) {
  const screenshot = project.screenshots.find((item) => resolveProjectImageUrl(item.src, import.meta.env.BASE_URL));
  const screenshotUrl = screenshot ? resolveProjectImageUrl(screenshot.src, import.meta.env.BASE_URL) : undefined;
  return <Link to={`/projects/${project.slug}`} className={`project-card card-tone-${index % 4}`}>
    <div className="card-top"><span className="card-category"><span className="category-dot" />{project.category}</span><span className="card-arrow"><ArrowUpRight size={17} /></span></div>
    <div className={screenshotUrl ? 'card-art has-screenshot' : 'card-art'} aria-hidden="true">{screenshotUrl ? <img className="card-screenshot" src={screenshotUrl} alt="" loading="lazy" /> : <div className="art-window"><div className="window-dots"><i /><i /><i /></div><div className="window-content"><span className="art-kicker">{project.category === 'WinForms' ? 'DESKTOP APP' : project.category.toUpperCase()}</span><strong>{project.name}</strong><div className="art-lines"><i /><i /><i /></div><span className="art-chip">{project.technologies[1] ?? project.technologies[0]}</span></div></div>}<span className="art-index">{String(index + 1).padStart(2, '0')}</span></div>
    <div className="card-body"><h3>{project.name}</h3><p>{project.summary}</p><div className="card-tags">{project.technologies.slice(0, 3).map((technology) => <Tag key={technology} subdued>{technology}</Tag>)}</div><div className="card-foot"><span>{project.status}</span><span>了解專案 <ArrowRight size={14} /></span></div></div>
  </Link>;
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}

function HomePage() {
  const featured = projectService.getFeatured();
  const recent = projectService.getRecent(3);
  const hasRecentDates = recent.some((project) => project.updatedAt);
  return <>
    <section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="availability"><span /> 持續打造有用的小工具</div><h1>把繁瑣的事，<br />交給<span className="accent-text">好用的軟體。</span></h1><p className="hero-desc">嗨，我是軟體開發者。喜歡把日常遇到的問題，變成簡單、可靠、能真正派上用場的工具。</p><div className="hero-actions"><Link className="button button-dark" to="/projects">看看我的作品 <ArrowRight size={16} /></Link><Link className="text-link" to="/about">認識我 <ArrowDownRight size={16} /></Link></div><div className="hero-tech"><span>常用技術</span>{['C#', '.NET', 'React', 'TypeScript', 'SQL Server'].map((item) => <Tag key={item} subdued>{item}</Tag>)}</div></div><div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-code"><div className="code-top"><span>✳</span><span>BUILDING / 001</span><span className="code-status"><i /> READY</span></div><div className="code-lines"><p><span className="code-muted">01</span> <span className="code-purple">const</span> idea = <span className="code-green">"好點子"</span>;</p><p><span className="code-muted">02</span> <span className="code-purple">function</span> <span className="code-blue">makeItReal</span>() {'{'}</p><p><span className="code-muted">03</span>　<span className="code-purple">return</span> <span className="code-green">build</span>(idea);</p><p><span className="code-muted">04</span> {'}'}</p><p className="code-blank"><span className="code-muted">05</span> <span className="cursor" /></p></div><div className="code-bottom"><span><TerminalSquare size={14} /> 小工具，大幫助</span><span>↗ 讓點子運作起來</span></div></div><div className="float-card float-card-top"><Sparkles size={15} /><span>從問題開始</span></div><div className="float-card float-card-bottom"><span className="float-number">4+</span><span>已整理作品</span></div><div className="hero-stamp">{'<'}<br />CODE<br />{' />'}</div></div><div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div></div></section>
    <section className="intro-strip"><div className="container intro-grid"><span className="intro-label">開發者手記 <ArrowDownRight size={15} /></span><p>從桌面工具到網頁應用，專注把複雜流程整理得清楚一點，讓每天的工作順手一點。</p><span className="intro-mark">✳</span></div></section>
    <section className="section container"><SectionHeading eyebrow="SELECTED WORK" title="精選作品" description="每個作品，都是一次把問題變簡單的練習。" action={<Link className="section-link" to="/projects">全部作品 <ArrowRight size={15} /></Link>} />{featured.length ? <div className="project-grid">{featured.slice(0, 3).map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div> : <EmptyState title="精選作品即將登場" text="可以在 projects.json 將作品標記為精選。" />}</section>
    <section className="section recent-section"><div className="container"><SectionHeading eyebrow="RECENT UPDATES" title="最近更新" description={hasRecentDates ? '依已提供的日期整理作品更新。' : '目前尚未提供作品更新日期。'} action={<Link className="section-link" to="/projects">瀏覽作品集 <ArrowRight size={15} /></Link>} />{recent.length ? <div className="recent-list">{recent.map((project) => <Link className="recent-row" key={project.id} to={`/projects/${project.slug}`}><span className="recent-date">{shortDate(project.updatedAt)}</span><span className="recent-name">{project.name}</span><Tag subdued>{project.category}</Tag><span className="recent-status">{project.status}</span><ArrowUpRight size={17} /></Link>)}</div> : <EmptyState title="目前還沒有更新紀錄" text="新增作品後，更新資訊會顯示在這裡。" />}</div></section>
    <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">HAVE A LOOK AROUND</span><h2>好工具，值得被看見。</h2><p>從桌面應用到網站，一起看看這些實際動手做出來的作品。</p></div><Link className="button button-light" to="/projects">前往作品集 <ArrowRight size={16} /></Link><span className="cta-spark">✳</span></div></section>
  </>;
}

function EmptyState({ title, text }: { title: string; text: string }) { return <div className="empty-state"><Layers3 size={24} /><h3>{title}</h3><p>{text}</p></div>; }

function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory | '全部'>('全部');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState<'updated-desc' | 'name-asc'>('updated-desc');
  const results = useMemo(() => projectService.getAll({ category, keyword, sort }), [category, keyword, sort]);
  return <main className="page-main"><section className="page-hero"><div className="container"><span className="eyebrow">THE WORKS</span><h1>作品集<span className="accent-text">。</span></h1><p>工具、介面與想法，從這裡開始探索。</p><div className="page-count"><span>{String(results.length).padStart(2, '0')}</span> 件作品</div></div></section><section className="container project-listing"><div className="toolbar"><div className="filter-row" role="group" aria-label="依分類篩選">{filters.map((item) => <button className={category === item ? 'filter-button active' : 'filter-button'} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="listing-tools"><label className="search-field"><Search size={16} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋作品或技術..." aria-label="搜尋作品或技術" />{keyword && <button aria-label="清除搜尋" onClick={() => setKeyword('')}><X size={14} /></button>}</label><select aria-label="排序方式" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="updated-desc">最近更新</option><option value="name-asc">名稱排序</option></select></div></div><p className="result-count">找到 {results.length} 件作品</p>{results.length ? <div className="project-grid">{results.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div> : <EmptyState title="找不到符合條件的作品" text="試試其他關鍵字或分類。" />}</section></main>;
}

function LinkButton({ href, children, directDownload = false }: { href?: string; children: React.ReactNode; directDownload?: boolean }) {
  const safeHref = getSafeHttpsUrl(href);
  if (!safeHref) return null;
  return <a className="button button-dark" href={safeHref} target={directDownload ? undefined : '_blank'} rel={directDownload ? undefined : 'noreferrer'}>{children}{directDownload ? <Download size={17} /> : <ArrowUpRight size={17} />}</a>;
}

export function ProjectActionLinks({ links }: { links: ProjectLinks }) {
  return <div className="detail-actions"><LinkButton href={links.github}><Github size={17} /> GitHub 原始碼</LinkButton><LinkButton href={links.releases}>版本紀錄</LinkButton><LinkButton href={links.download} directDownload>下載 Windows 版</LinkButton><LinkButton href={links.demo}>線上 Demo</LinkButton></div>;
}

function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = projectService.getBySlug(slug);
  if (!project) return <main className="container not-found"><span className="eyebrow">404 / NOT FOUND</span><h1>找不到這件作品。</h1><p>作品可能已移除，或連結輸入有誤。</p><Link className="button button-dark" to="/projects"><ArrowLeft size={16} /> 回到作品集</Link></main>;
  const screenshots = project.screenshots.flatMap((screenshot) => {
    const src = resolveProjectImageUrl(screenshot.src, import.meta.env.BASE_URL);
    return src ? [{ ...screenshot, src }] : [];
  });
  return <main className="page-main detail-page"><div className="container"><Link className="back-link" to="/projects"><ArrowLeft size={17} /> 回到作品集</Link><section className="detail-hero"><div><div className="detail-kicker"><Tag>{project.category}</Tag><span>{project.status}</span></div><h1>{project.name}<span className="accent-text">。</span></h1><p>{project.summary}</p><ProjectActionLinks links={project.links} /></div><div className="detail-index"><span>PROJECT</span><strong>{String(projectService.getAll().findIndex((item) => item.id === project.id) + 1).padStart(2, '0')}</strong><span>OF {String(projectService.getAll().length).padStart(2, '0')}</span></div></section><div className="detail-meta"><div><span>版本</span><strong>{project.version ?? '待補'}</strong></div><div><span>最近更新</span><strong>{shortDate(project.updatedAt)}</strong></div><div><span>專案狀態</span><strong>{project.status}</strong></div><div><span>作品分類</span><strong>{project.category}</strong></div></div><div className="detail-columns"><section className="detail-block"><span className="eyebrow">WHAT IT DOES</span><h2>功能介紹</h2>{project.features.length ? <ul className="feature-list">{project.features.map((feature) => <li key={feature}><span>↗</span>{feature}</li>)}</ul> : <p className="muted-copy">功能資訊整理中。</p>}</section><section className="detail-block"><span className="eyebrow">BUILT WITH</span><h2>技術架構</h2><p className="architecture-copy">{project.architecture ?? '架構資訊整理中。'}</p><div className="tech-tags">{project.technologies.length ? project.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>) : <span className="muted-copy">技術資訊待補</span>}</div></section></div><section className="detail-block screenshots-block"><span className="eyebrow">A CLOSER LOOK</span><h2>畫面展示</h2>{screenshots.length ? <div className="screenshots">{screenshots.map((screenshot) => <figure key={screenshot.src}><img src={screenshot.src} alt={screenshot.alt} loading="lazy" /><figcaption>{screenshot.caption ?? screenshot.alt}</figcaption></figure>)}</div> : <div className="screenshot-empty"><Layers3 size={24} /><span>作品畫面整理中，敬請期待。</span></div>}</section></div></main>;
}

function AboutPage() {
  return <main className="page-main"><section className="page-hero about-hero"><div className="container"><span className="eyebrow">A LITTLE ABOUT ME</span><h1>嗨，我是<span className="accent-text">開發者。</span></h1><p>喜歡觀察工作中的小麻煩，然後動手做一個能解決它的工具。</p></div></section><section className="container about-content"><div className="about-note"><span className="note-icon">✳</span><span className="eyebrow">MY APPROACH</span><h2>先理解問題，<br />再讓解法變簡單。</h2><p>我相信軟體不一定要很大，能在對的時候幫上忙，就已經很有價值。從 Windows 桌面工具到 Web 應用，我持續練習把日常流程整理成容易使用、可靠好維護的作品。</p></div><div className="about-details"><section><span className="eyebrow">TECH STACK</span><h3>開發技術</h3><p>依照問題選擇合適的工具，重視程式結構、使用體驗與長期維護。</p><div className="tech-tags">{['C#', '.NET', 'Windows Forms', 'WPF', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SQL Server', 'Git'].map((item) => <Tag key={item}>{item}</Tag>)}</div></section><section><span className="eyebrow">WORKFLOW</span><h3>工具與工作方式</h3><p>使用 Visual Studio、VS Code 與 Git 管理開發流程，搭配 Codex App 協助拆解需求、整理程式碼及加快迭代。</p><div className="workflow-list"><span><i>01</i>從實際需求出發</span><span><i>02</i>與 AI 協作探索實作方案</span><span><i>03</i>親自檢查、建置與持續改善</span></div></section></div></section><section className="about-bottom"><div className="container about-bottom-inner"><span className="eyebrow">KEEP BUILDING</span><p>每一個小作品，<br />都讓下一次更好一點。</p><Link className="section-link" to="/projects">看看作品 <ArrowRight size={15} /></Link></div></section></main>;
}

export default function App() {
  return <><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/:slug" element={<ProjectDetailPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<main className="container not-found"><span className="eyebrow">404 / NOT FOUND</span><h1>找不到這個頁面。</h1><Link className="button button-dark" to="/">回到首頁 <ArrowRight size={16} /></Link></main>} /></Routes><Footer /></>;
}
