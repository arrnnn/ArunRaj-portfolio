import { useEffect, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Check,
  ChevronDown, Code2, Github, GraduationCap, Layers3, Linkedin, Mail, Menu,
  MoveUpRight, ScanLine, Sparkles, X,
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const skills = [
  { name: 'AI & ML', items: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Generative AI', 'LLMs', 'Agentic AI', 'Computer Vision', 'OCR'] },
  { name: 'LLM & Agent Engineering', items: ['Prompt Engineering', 'LangChain', 'LangGraph', 'Groq', 'Llama', 'Structured Outputs', 'Tool Calling', 'AI Workflows', 'AI Guardrails'] },
  { name: 'ML', items: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'TensorFlow Lite', 'MobileNetV2', 'CNN', 'Model Evaluation'] },
  { name: 'Backend', items: ['FastAPI', 'Django REST Framework', 'REST APIs', 'Pydantic', 'SQLAlchemy'] },
  { name: 'Full Stack', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { name: 'Database', items: ['PostgreSQL', 'MySQL', 'Prisma', 'SQL'] },
  { name: 'Deployment', items: ['Vercel', 'Render', 'Neon', 'Git', 'GitHub', 'Environment Variables / Secrets'] },
];

const processSteps = ['Idea', 'Architecture', 'AI-assisted development', 'Test & debug', 'Validate', 'Deploy'];
const buildCards = [
  ['01', 'Explore', 'Architecture ideas and technical approaches'],
  ['02', 'Build', 'Accelerate implementation and boilerplate'],
  ['03', 'Debug', 'Analyze errors and investigate failures'],
  ['04', 'Iterate', 'Rapidly test and improve features'],
  ['05', 'Validate', 'Review, test and verify AI-generated solutions'],
  ['06', 'Ship', 'Deploy working products'],
];
const external = { target: '_blank', rel: 'noreferrer' };

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

function Eyebrow({ children, index }: { children: ReactNode; index: string }) {
  return <div className="eyebrow flex items-center gap-3"><span className="text-white/35">{index}</span><span className="h-px w-8 bg-white/20" />{children}</div>;
}

function ExternalLink({ href, children, className = '', testId }: { href: string; children: ReactNode; className?: string; testId?: string }) {
  return <a href={href} {...external} data-testid={testId} className={className}>{children}</a>;
}

function SectionHeading({ eyebrow, title, description, index }: { eyebrow: string; title: ReactNode; description?: string; index: string }) {
  return <Reveal className="mb-12 md:mb-16">
    <Eyebrow index={index}>{eyebrow}</Eyebrow>
    <h2 className="section-heading max-w-4xl">{title}</h2>
    {description && <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#a7a8b2] md:text-base">{description}</p>}
  </Reveal>;
}

function ProjectCard({ number, name, category, description, tags, visual, children, links }: {
  number: string; name: string; category: string; description: string; tags: string[];
  visual: ReactNode; children: ReactNode; links: { label: string; href: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  const tiltCard = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.transform = `perspective(1400px) rotateX(${y * -1.3}deg) rotateY(${x * 1.3}deg)`;
  };
  const resetTilt = (event: ReactMouseEvent<HTMLElement>) => { event.currentTarget.style.transform = ''; };
  return <Reveal className="mb-6">
    <article onMouseMove={tiltCard} onMouseLeave={resetTilt} className="project-card surface overflow-hidden rounded-[26px]" data-testid={`project-${name.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="grid lg:grid-cols-[.94fr_1.06fr]">
        <div className="relative min-h-[270px] overflow-hidden border-b border-white/[.07] bg-[#11141d] p-5 sm:min-h-[350px] lg:order-2 lg:border-b-0 lg:border-l lg:p-8">
          <div className="absolute inset-0 subtle-grid opacity-40" />
          <div className="relative z-[1] flex h-full items-center justify-center">{visual}</div>
        </div>
        <div className="flex flex-col p-6 sm:p-9 lg:order-1 lg:p-11">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">{category}</span>
            <span className="font-mono text-xs text-white/35">{number}</span>
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-.055em] text-[#f2f0eb] sm:text-4xl">{name}</h3>
          <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#a9aab3]">{description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{tags.map(tag => <span key={tag} className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-[#c0c0c8]">{tag}</span>)}</div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {links.map(link => <ExternalLink key={link.href} href={link.href} className="button-quiet !min-h-10 !px-4 !text-xs" testId={`link-${name.toLowerCase().replaceAll(' ', '-')}-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}<ArrowUpRight size={14} /></ExternalLink>)}
            <button type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-medium text-[#bbc9f3] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8baf2]" data-testid={`button-details-${number}`}>
              {expanded ? 'Less detail' : 'Engineering details'}<ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {expanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="overflow-hidden">
              <div className="mt-7 border-t border-white/[.09] pt-6">{children}</div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </article>
  </Reveal>;
}

function RecoverVisual() {
  const nodes = ['Payment failure', 'ML prediction', 'LLM analysis', 'Decision router', 'Policy engine', 'Recovery simulation', 'Outcome', 'Analytics'];
  return <div className="w-full max-w-[440px] rounded-2xl border border-white/[.1] bg-[#0d1018]/90 p-4 shadow-2xl shadow-black/30 sm:p-5">
    <div className="mb-4 flex items-center justify-between border-b border-white/[.08] pb-3">
      <div><div className="font-display text-sm font-semibold">Recovery workflow</div><div className="mt-1 font-mono text-[9px] text-white/40">POLICY-GOVERNED · SIMULATION</div></div>
      <span className="rounded-full border border-[#9eb2ee]/25 bg-[#9eb2ee]/10 px-2.5 py-1 font-mono text-[9px] text-[#c1cffb]">8 NODES</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {nodes.map((node, i) => <div key={node} className={`flex items-center gap-2 rounded-lg border px-2.5 py-2.5 ${i === 4 ? 'border-[#a795d9]/40 bg-[#a795d9]/[.09]' : 'border-white/[.07] bg-white/[.025]'}`}>
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i < 2 ? 'bg-[#93a8ec]' : i === 4 ? 'bg-[#bba5e8]' : 'bg-[#697184]'}`} />
        <span className="truncate text-[10px] text-[#d2d1d8]">{node}</span>
      </div>)}
    </div>
    <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[.035] px-3 py-2.5">
      <span className="font-mono text-[9px] text-white/42">DECISION TRACE</span><span className="flex items-center gap-1.5 text-[10px] text-[#c3d0fb]"><Check size={12} />Policy checked</span>
    </div>
  </div>;
}

function VoyagerVisual() {
  return <div className="w-full max-w-[410px] rotate-[-1deg] rounded-2xl border border-white/[.11] bg-[#11141c] p-4 shadow-2xl shadow-black/30 sm:p-5">
    <div className="flex items-center justify-between"><span className="font-mono text-[9px] tracking-[.12em] text-[#aabaf2]">VOYAGER / YOUR TRIP</span><span className="rounded-full bg-[#8198e8]/10 px-2 py-1 text-[9px] text-[#c8d2f6]">AI PLANNED</span></div>
    <div className="mt-5 flex items-end justify-between">
      <div><p className="font-mono text-[9px] text-white/35">7 DAYS · COUPLES</p><h4 className="mt-1 font-display text-2xl font-semibold tracking-[-.05em]">Kyoto, Japan</h4></div>
      <div className="text-right"><p className="font-mono text-[9px] text-white/35">EST. BUDGET</p><p className="mt-1 text-sm text-[#d2d8ee]">$1,840</p></div>
    </div>
    <div className="mt-5 space-y-2">
      {[['DAY 01', 'Arrive · Nishiki Market'], ['DAY 02', 'Fushimi Inari · Higashiyama'], ['DAY 03', 'Arashiyama · Riverside lunch']].map(([day, item], i) => <div key={day} className="flex items-center gap-3 rounded-lg border border-white/[.07] bg-white/[.025] p-2.5"><span className="font-mono text-[8px] text-[#99a9df]">{day}</span><span className="text-[10px] text-[#d2d0d9]">{item}</span>{i === 0 && <Sparkles size={12} className="ml-auto text-[#aab9ee]" />}</div>)}
    </div>
    <div className="mt-4 flex gap-2"><span className="rounded-md border border-white/[.08] px-2 py-1.5 font-mono text-[8px] text-white/45">EXPORT PDF</span><span className="rounded-md border border-white/[.08] px-2 py-1.5 font-mono text-[8px] text-white/45">SHARE TRIP</span></div>
  </div>;
}

function FoodSnapVisual() {
  return <div className="relative w-[190px] rounded-[33px] border-[5px] border-[#292c35] bg-[#080a0e] p-2 shadow-2xl shadow-black/50 sm:w-[205px]">
    <div className="relative overflow-hidden rounded-[25px] bg-[#151922]">
      <div className="absolute left-1/2 top-2 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-[#080a0e]" />
      <div className="h-[310px] px-3 pb-3 pt-7">
        <div className="flex items-center justify-between"><span className="font-display text-[11px] font-bold">FoodSnap</span><ScanLine size={13} className="text-[#9daee7]" /></div>
        <p className="mt-4 text-[9px] text-white/45">TODAY · LUNCH</p>
        <div className="mt-2 flex h-[88px] items-center justify-center rounded-xl border border-[#c09a6e]/20 bg-[radial-gradient(ellipse_at_50%_60%,rgba(180,135,83,.35),rgba(80,66,50,.12)_58%,rgba(25,28,34,.7))]">
          <div className="h-12 w-12 rounded-full border border-[#e0c69e]/35 bg-[#b9834c]/25 shadow-[0_0_20px_rgba(196,148,91,.14)]" />
        </div>
        <div className="mt-3 flex items-center justify-between"><span className="text-[11px] font-semibold">Masala dosa</span><span className="font-mono text-[8px] text-[#aab7e8]">92% match</span></div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">{[['Calories', '312 kcal'], ['Protein', '8.4 g'], ['Carbs', '48 g'], ['Fat', '10 g']].map(([key, value]) => <div key={key} className="rounded-lg border border-white/[.06] bg-white/[.025] p-2"><p className="text-[7px] text-white/40">{key}</p><p className="mt-1 text-[9px]">{value}</p></div>)}</div>
        <div className="mt-3 rounded-lg border border-[#9cace5]/15 bg-[#9cace5]/[.06] p-2 text-[8px] text-[#c5cde3]">Add a protein-rich side for a more balanced meal.</div>
      </div>
    </div>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection((visible.target as HTMLElement).id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const motionDuration = reduceMotion ? 0 : .6;

  return <div className="portfolio-shell noise">
    <div aria-hidden="true" className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-white/[.035]">
      <motion.div className="h-full origin-left bg-gradient-to-r from-[#8ea8f3] to-[#bd9fe8]" style={{ scaleX: progress / 100 }} />
    </div>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${progress > 1 ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="container-wide flex h-[74px] items-center justify-between">
        <a href="#home" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" aria-label="Arun Raj M R, home" data-testid="link-home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.12] bg-white/[.04] font-display text-xs font-bold tracking-tight text-[#e5e9f4] transition group-hover:border-[#a8b7ec]/50">AR</span>
          <span className="hidden text-[13px] font-semibold tracking-wide text-[#dedee4] sm:block">Arun Raj M R</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map(item => <a key={item.href} href={item.href} data-testid={`nav-${item.label.toLowerCase()}`} className={`relative rounded-full px-3.5 py-2 text-xs transition-colors ${activeSection === item.href.slice(1) ? 'text-[#e6e9f2]' : 'text-[#858792] hover:text-white'}`}>
            {item.label}{activeSection === item.href.slice(1) && <motion.span layoutId="nav-active" className="absolute inset-x-3 bottom-0 h-px bg-[#a9baf2]" transition={{ duration: motionDuration }} />}
          </a>)}
        </nav>
        <a href="#contact" className="button-quiet hidden !min-h-9 !px-4 !text-[11px] md:inline-flex">Let’s talk <ArrowUpRight size={13} /></a>
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#e4e4eb] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)} data-testid="button-mobile-menu">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: motionDuration }} className="nav-glass absolute inset-x-0 top-full border-t-0 px-[18px] pb-5 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[600px] flex-col">
            {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`border-b border-white/[.06] py-3.5 text-sm ${activeSection === item.href.slice(1) ? 'text-[#bbc9f3]' : 'text-[#c7c7cf]'}`} data-testid={`mobile-nav-${item.label.toLowerCase()}`}>{item.label}</a>)}
          </div>
        </motion.nav>}
      </AnimatePresence>
    </header>

    <main>
      <section id="home" className="relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-28 md:min-h-[820px]">
        <div className="hero-orb pointer-events-none absolute -right-[18%] top-[3%] h-[750px] w-[750px] rounded-full" />
        <div className="pointer-events-none absolute inset-0 subtle-grid opacity-35" />
        <div className="container-wide relative z-[1] grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration, delay: .05 }} className="eyebrow flex items-center gap-2.5"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9eb5f7] opacity-30" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#a7baf1]" /></span>AI Engineer · 2026 CSE Graduate</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration, delay: .14 }} className="mt-7 max-w-[720px] font-display text-[clamp(3.25rem,8vw,6.9rem)] font-semibold leading-[.94] tracking-[-.075em] text-[#f1f0ed]">
              Arun Raj <span className="text-gradient">M R</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: motionDuration, delay: .27 }} className="mt-6 font-display text-lg font-medium tracking-[-.025em] text-[#c9cad2] sm:text-xl">AI Engineer <span className="text-[#777b8a]">|</span> Generative AI <span className="text-[#777b8a]">|</span> Agentic AI</motion.p>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration, delay: .34 }} className="mt-5 max-w-[600px] text-[15px] leading-7 text-[#a1a2ad] sm:text-base">Building practical AI systems with Machine Learning, LLMs, Agentic AI and AI-assisted development.</motion.p>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration, delay: .42 }} className="mt-4 max-w-[620px] text-[13px] leading-6 text-[#858792]">I build and deploy AI-powered applications — from computer vision and LLM applications to agentic AI systems. I use modern AI development tools to accelerate architecture, implementation, debugging and iteration while owning the engineering decisions and validation.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionDuration, delay: .52 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="button-primary" data-testid="button-view-projects">View projects <ArrowDownRight size={16} /></a>
              <ExternalLink href="https://github.com/arrnnn" className="button-quiet" testId="link-github-hero"><Github size={16} />GitHub <ArrowUpRight size={13} /></ExternalLink>
              <ExternalLink href="https://linkedin.com/in/arunraajj" className="button-quiet" testId="link-linkedin-hero"><Linkedin size={16} />LinkedIn <ArrowUpRight size={13} /></ExternalLink>
              <a href="#contact" className="button-quiet" data-testid="button-contact-hero">Contact me <ArrowRight size={15} /></a>
            </motion.div>
            <a href="#about" className="mt-14 inline-flex items-center gap-3 font-mono text-[9px] tracking-[.19em] text-white/40 transition hover:text-white/80" data-testid="link-scroll-explore"><span className="scroll-cue"><ArrowDown size={13} /></span>SCROLL TO EXPLORE</a>
          </div>
          <motion.div initial={{ opacity: 0, x: 22, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .85, delay: .2, ease: [.2, .7, .2, 1] }} className="relative order-1 mx-auto w-full max-w-[500px] lg:order-2">
            <div className="absolute -inset-5 rounded-[42%] bg-[radial-gradient(ellipse_at_55%_46%,rgba(102,119,179,.16),transparent_67%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/[.12] bg-[#171820]">
              <img src="/arun-raj-portrait.png" alt="Portrait of Arun Raj M R" className="aspect-[1.17/1] w-full object-cover object-[center_39%] sm:aspect-[1.22/1] lg:aspect-[.91/1]" fetchPriority="high" data-testid="img-profile" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101116]/90 via-transparent to-[#11131a]/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                <div><p className="font-mono text-[9px] tracking-[.16em] text-white/55">BUILDING AT THE INTERSECTION OF</p><p className="mt-2 font-display text-sm font-medium text-white/90">Machine learning · Product engineering</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[#d6def5] backdrop-blur"><BrainCircuit size={18} /></span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden items-center gap-3 rounded-2xl border border-white/[.12] bg-[#171922]/95 px-4 py-3 shadow-xl backdrop-blur sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#8ea6eb]/10 text-[#a9b8ea]"><Code2 size={15} /></span>
              <span><span className="block font-mono text-[8px] tracking-wider text-white/40">FOCUS</span><span className="mt-1 block text-[11px] text-[#dddde4]">Practical AI systems</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section border-t border-white/[.055] bg-[#0b0d13]">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
            <div><SectionHeading index="01" eyebrow="A little about me" title={<>I build with AI,<br /><span className="text-[#8f9fc9]">not just about AI.</span></>} /></div>
            <Reveal delay={.12} className="pt-1">
              <p className="text-[16px] leading-8 text-[#d0cfd5]">I'm a 2026 Computer Science & Engineering graduate focused on AI Engineering, Generative AI and Agentic AI.</p>
              <p className="mt-5 text-[14px] leading-7 text-[#9d9ea8]">My approach is practical: identify a problem, design the system, use AI tools efficiently to accelerate development, validate the output, and ship a working product.</p>
              <p className="mt-5 text-[14px] leading-7 text-[#9d9ea8]">My projects span Computer Vision, Generative AI, Machine Learning, Agentic AI, backend engineering and full-stack application development.</p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              { value: '2026', label: 'B.Tech CSE Graduate', icon: GraduationCap },
              { value: '03', label: 'Major AI Projects', icon: Layers3 },
              { value: 'AI', label: 'Computer Vision → GenAI → Agentic AI', icon: BrainCircuit },
            ].map((item, i) => <Reveal key={item.value} delay={i * .08}><div className="flex min-h-[126px] items-center gap-4 rounded-2xl border border-white/[.075] bg-white/[.018] p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9caee5]/15 bg-[#9caee5]/[.06] text-[#aebbe7]"><item.icon size={17} /></span>
              <div><p className="font-display text-[27px] font-semibold tracking-[-.055em] text-[#e8e7e4]">{item.value}</p><p className="mt-1 text-[11px] leading-5 text-[#999aa5]">{item.label}</p></div>
            </div></Reveal>)}
          </div>
        </div>
      </section>

      <section id="approach" className="section overflow-hidden">
        <div className="container-wide">
          <SectionHeading index="02" eyebrow="How I approach engineering" title={<>An idea becomes a<br /><span className="text-gradient">working system.</span></>} description="A deliberate loop from problem framing to a validated, deployable product." />
          <div className="relative mt-14">
            <div className="absolute left-[16px] top-5 bottom-5 w-px timeline-line md:left-0 md:right-0 md:top-[20px] md:bottom-auto md:h-px md:w-auto" />
            <div className="relative grid gap-7 md:grid-cols-6 md:gap-4">
              {processSteps.map((step, index) => <Reveal key={step} delay={index * .065} className="md:!transform-none">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-5">
                  <span className="z-[1] flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-full border border-[#93a7e7]/35 bg-[#10131c] font-mono text-[10px] text-[#bac8f4]">{String(index + 1).padStart(2, '0')}</span>
                  <div className="md:min-h-[60px]"><p className="font-display text-[13px] font-semibold capitalize text-[#e3e2e2]">{step}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.1em] text-white/35">{index === 2 ? 'Human-led · AI accelerated' : index < 3 ? 'Define & design' : 'Quality & delivery'}</p></div>
                </div>
              </Reveal>)}
            </div>
          </div>
          <Reveal className="mt-14">
            <blockquote className="relative rounded-2xl border border-white/[.08] bg-[#12141b] px-6 py-7 sm:px-9 sm:py-8">
              <span className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-[#91a9f2] to-[#bca2e1]" />
              <p className="max-w-4xl text-[14px] leading-7 text-[#c5c5cc] sm:text-[16px] sm:leading-8">I use AI coding tools as engineering multipliers — for architecture exploration, implementation, debugging, refactoring and iteration — while keeping ownership of the architecture, decisions and validation.</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section border-y border-white/[.055] bg-[#0b0d13]">
        <div className="container-wide">
          <SectionHeading index="03" eyebrow="Selected work" title={<>Projects that make<br /><span className="text-[#8f9fc9]">AI useful.</span></>} description="Three hands-on explorations, from mobile vision to governed agentic workflows." />
          <div className="space-y-6">
            <ProjectCard number="01 / AGENTIC AI" name="RecoverAI" category="Agentic AI · Machine Learning · AI Governance" description="An Agentic AI revenue-recovery platform that helps businesses decide what to do when payments fail, subscriptions expire, abandoned checkouts occur, or invoices become overdue." tags={['LangGraph', 'Groq / Llama', 'FastAPI', 'PostgreSQL', 'Next.js']} visual={<RecoverVisual />} links={[
              { label: 'Live demo', href: 'https://recoverai-bice.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/arrnnn/recoverai' },
              { label: 'API docs', href: 'https://recoverai-nrvw.onrender.com/docs' },
            ]}>
              <p className="font-display text-sm font-semibold text-[#e6e5e4]">ML predicts. AI recommends. Policies control.</p>
              <p className="mt-2 text-[12px] leading-6 text-[#9d9ea8]">Compared Logistic Regression, Random Forest and Gradient Boosting on 20,000 synthetic cases. The selected evaluation reports ROC-AUC 0.784, Recall 91.7% and F1 0.773.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{[['Workflow', 'LangGraph · 8 nodes'], ['Policy', 'Deterministic engine'], ['Services', 'FastAPI · PostgreSQL'], ['Interface', 'Next.js dashboard'], ['Deployment', 'Render + Vercel']].map(([label, value]) => <div key={label} className="rounded-lg border border-white/[.06] bg-white/[.02] p-3"><span className="font-mono text-[8px] uppercase tracking-wider text-white/40">{label}</span><p className="mt-1.5 text-[10px] leading-4 text-[#c6c6ce]">{value}</p></div>)}</div>
              <p className="mt-4 rounded-lg border border-[#d5b379]/20 bg-[#d5b379]/[.055] px-3.5 py-3 text-[11px] leading-5 text-[#dbc7a5]">Financial recovery actions are simulated. No real payments or emails are processed.</p>
            </ProjectCard>
            <ProjectCard number="02 / GENERATIVE AI" name="Voyager AI" category="Generative AI · Full-Stack AI" description="A full-stack AI travel planner powered by Llama 3 that generates personalized travel itineraries, budgets, hotel recommendations, food suggestions and destination-specific insights." tags={['Next.js 14', 'React 18', 'Groq Llama 3', 'PostgreSQL', 'Prisma']} visual={<VoyagerVisual />} links={[
              { label: 'Live demo', href: 'https://travel-ai-ruddy-phi.vercel.app' },
              { label: 'GitHub', href: 'https://github.com/arrnnn/voyager-AI' },
            ]}>
              <p className="font-display text-sm font-semibold text-[#e6e5e4]">Contextual planning, structured for real use.</p>
              <p className="mt-2 text-[12px] leading-6 text-[#9d9ea8]">Structured JSON itinerary generation with contextual prompting powers destination assistance and a context-aware chatbot. The app supports different travel groups and trip styles.</p>
              <div className="mt-4 flex flex-wrap gap-2">{['Couples / family / solo / group', 'Hotel + food suggestions', 'Budget planning', 'USD ↔ INR conversion', 'PDF / HTML export', 'Secure shareable trip links', 'Clerk authentication', 'Vercel'].map(feature => <span key={feature} className="rounded-full border border-white/[.08] px-2.5 py-1.5 text-[10px] text-[#b6b6bf]">{feature}</span>)}</div>
            </ProjectCard>
            <ProjectCard number="03 / COMPUTER VISION" name="FoodSnap AI" category="Computer Vision · Deep Learning · Mobile AI" description="An AI-powered mobile application that recognizes food from images and provides nutritional insights such as calories, protein, carbohydrates and fat." tags={['Flutter', 'MobileNetV2', 'TensorFlow Lite', 'OpenCV', 'Django REST']} visual={<FoodSnapVisual />} links={[]}>
              <p className="font-display text-sm font-semibold text-[#e6e5e4]">On-device vision, with useful context.</p>
              <p className="mt-2 text-[12px] leading-6 text-[#9d9ea8]">MobileNetV2 CNN with an attention mechanism supports food image classification. Additional capabilities include TensorFlow Lite, OpenCV, OCR ingredient scanning with Tesseract, personalized food recommendations and an AI chatbot.</p>
              <p className="mt-4 text-[12px] leading-6 text-[#c2c2c9]"><span className="text-[#aebbe7]">My contribution:</span> AI model integration, backend development, API integration, system validation and testing of AI predictions and application workflows.</p>
              <div className="mt-4 flex flex-wrap gap-2">{['Python', 'Django REST Framework', 'TensorFlow', 'MySQL', 'Tesseract OCR'].map(item => <span key={item} className="rounded-full border border-white/[.08] px-2.5 py-1.5 text-[10px] text-[#b6b6bf]">{item}</span>)}</div>
            </ProjectCard>
          </div>
        </div>
      </section>

      <section id="evolution" className="section">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div><SectionHeading index="04" eyebrow="Project evolution" title={<>From vision to<br /><span className="text-gradient">agentic systems.</span></>} description="My projects represent my progression from integrating AI models into applications to designing complete AI-driven systems." /></div>
            <div className="relative space-y-4">
              <div className="absolute bottom-10 left-[19px] top-10 w-px timeline-line" />
              {[
                { name: 'FoodSnap AI', field: 'Computer Vision + Deep Learning', icon: ScanLine, accent: 'Mobile model integration' },
                { name: 'Voyager AI', field: 'Generative AI + LLM Applications', icon: Sparkles, accent: 'Contextual generation' },
                { name: 'RecoverAI', field: 'Machine Learning + Agentic AI + AI Governance', icon: BrainCircuit, accent: 'Policy-governed workflows' },
              ].map((item, i) => <Reveal key={item.name} delay={i * .12}><div className="relative flex gap-5 rounded-2xl border border-white/[.075] bg-white/[.018] p-5 sm:gap-6 sm:p-6">
                <span className="z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9caee5]/20 bg-[#131722] text-[#aab8ec]"><item.icon size={17} /></span>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-lg font-semibold tracking-[-.035em]">{item.name}</h3><span className="font-mono text-[9px] text-white/35">0{i + 1}</span></div><p className="mt-1.5 text-[12px] text-[#b3b4be]">{item.field}</p><p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#8c9dcc]">{item.accent}</p></div>
              </div></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section border-y border-white/[.055] bg-[#0b0d13]">
        <div className="container-wide">
          <SectionHeading index="05" eyebrow="Technical toolkit" title={<>The tools behind<br /><span className="text-[#8f9fc9]">the work.</span></>} description="A working set across AI, software, and the infrastructure that connects them. Select a cluster to focus it." />
          <div className="grid gap-3 md:grid-cols-2">
            {skills.map((group, i) => {
              const selected = selectedCluster === group.name;
              return <Reveal key={group.name} delay={i % 2 * .07} className={i === 0 || i === 1 ? 'md:col-span-1' : ''}>
                <button type="button" onClick={() => setSelectedCluster(selected ? null : group.name)} aria-pressed={selected} className={`h-full w-full rounded-2xl border p-5 text-left transition-colors sm:p-6 ${selected ? 'border-[#93a9ec]/40 bg-[#171b29]' : 'border-white/[.075] bg-[#11131a] hover:border-white/[.16]'}`} data-testid={`skill-cluster-${group.name.toLowerCase().replaceAll(' ', '-')}`}>
                  <div className="mb-5 flex items-center justify-between"><h3 className="font-display text-sm font-semibold text-[#e5e4e4]">{group.name}</h3><span className={`font-mono text-[9px] ${selected ? 'text-[#b8c6f2]' : 'text-white/35'}`}>{String(group.items.length).padStart(2, '0')} SKILLS</span></div>
                  <div className="flex flex-wrap gap-2">{group.items.map(item => <span key={item} className={`skill-pill rounded-full px-3 py-1.5 text-[10px] text-[#b6b6c0] ${selected ? 'active' : ''}`}>{item}</span>)}</div>
                </button>
              </Reveal>;
            })}
          </div>
          <p className="mt-5 min-h-5 text-center font-mono text-[9px] tracking-wider text-white/35" aria-live="polite">{selectedCluster ? `FOCUSED: ${selectedCluster.toUpperCase()} — SELECT AGAIN TO CLEAR` : 'SELECT A CLUSTER TO EXPLORE'}</p>
        </div>
      </section>

      <section id="how-i-build" className="section">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[.09] bg-[#10121a] px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -right-32 -top-48 h-[480px] w-[480px] rounded-full bg-[radial-gradient(ellipse,rgba(100,113,167,.12),transparent_68%)]" />
            <div className="relative">
              <SectionHeading index="06" eyebrow="AI-assisted development" title={<>How I <span className="text-gradient">build.</span></>} description="I don't see AI coding tools as a replacement for engineering. I use them as a multiplier." />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {buildCards.map(([number, title, content], i) => <Reveal key={title} delay={(i % 3) * .07}><div className="flex min-h-[142px] flex-col justify-between rounded-2xl border border-white/[.075] bg-[#151720]/75 p-5 transition-colors hover:border-[#91a5e6]/30">
                  <span className="font-mono text-[9px] tracking-wider text-[#8b9dcc]">{number} / PROCESS</span><div><h3 className="font-display text-base font-semibold tracking-[-.025em]">{title}</h3><p className="mt-1.5 text-[12px] leading-5 text-[#9697a2]">{content}</p></div>
                </div></Reveal>)}
              </div>
              <p className="mt-8 max-w-3xl border-l border-[#9aaeea]/50 pl-4 text-[14px] leading-7 text-[#c6c6ce]">AI helps me move faster. <span className="text-[#e8e7e4]">Engineering judgment decides what gets shipped.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section border-y border-white/[.055] bg-[#0b0d13]">
        <div className="container-wide">
          <SectionHeading index="07" eyebrow="Experience & education" title={<>Grounded in building.<br /><span className="text-[#8f9fc9]">Always learning.</span></>} />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal><article className="surface h-full rounded-2xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Experience</p><h3 className="mt-4 font-display text-xl font-semibold tracking-[-.04em]">Flutter App Development Intern</h3><p className="mt-2 text-sm text-[#a8a8b2]">Pace Lab</p></div><span className="rounded-full border border-white/[.1] px-3 py-1.5 font-mono text-[9px] text-white/45">2 MONTHS</span></div>
              <div className="mt-7 border-t border-white/[.08] pt-5"><p className="font-mono text-[9px] tracking-wider text-white/35">FOCUS AREAS</p><div className="mt-3 flex flex-wrap gap-2">{['Flutter', 'Mobile development', 'API integration', 'Debugging', 'Application development'].map(item => <span key={item} className="rounded-full border border-white/[.08] px-3 py-1.5 text-[10px] text-[#c0c0c8]">{item}</span>)}</div></div>
            </article></Reveal>
            <Reveal delay={.1}><article className="surface h-full rounded-2xl p-6 sm:p-8">
              <p className="eyebrow">Education</p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-.04em]">B.Tech Computer Science & Engineering</h3>
              <p className="mt-3 text-[13px] leading-6 text-[#aaaab4]">MGM Technological Campus<br />APJ Abdul Kalam Technological University</p>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[.08] pt-5">
                <span className="rounded-full border border-white/[.08] px-3 py-1.5 font-mono text-[10px] text-[#c4c4cc]">2026</span>
                <span className="rounded-full border border-white/[.08] px-3 py-1.5 font-mono text-[10px] text-[#c4c4cc]">CGPA 6.53 / 10</span>
              </div>
            </article></Reveal>
          </div>
          <Reveal className="mt-4">
            <div className="rounded-2xl border border-white/[.075] bg-[#11131a] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
              <div className="max-w-sm"><p className="eyebrow">Learning & workshops</p><h3 className="mt-3 font-display text-lg font-semibold tracking-[-.035em]">Curiosity, kept active.</h3></div>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-0">{['Dubai Government AI Course', 'Anthropic Claude learning', 'Tegrand Web Development', 'RedTeam Cybersecurity Workshop'].map(item => <span key={item} className="rounded-full border border-white/[.09] bg-white/[.025] px-3.5 py-2 text-[10px] text-[#c0c0c8]">{item}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="building" className="section">
        <div className="container-wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <Reveal><Eyebrow index="08">Building in public</Eyebrow><h2 className="section-heading max-w-3xl">Build it. Break it.<br /><span className="text-gradient">Learn from it.</span></h2><p className="mt-5 max-w-xl text-[14px] leading-7 text-[#a2a3ac]">Most of my learning happens by building, breaking, debugging and shipping.</p></Reveal>
            <Reveal delay={.12} className="flex flex-wrap gap-3 lg:justify-end">
              <ExternalLink href="https://github.com/arrnnn" className="button-quiet !min-h-12" testId="link-github-public"><Github size={17} />GitHub profile <ArrowUpRight size={14} /></ExternalLink>
              <ExternalLink href="https://linkedin.com/in/arunraajj" className="button-quiet !min-h-12" testId="link-linkedin-public"><Linkedin size={17} />LinkedIn <ArrowUpRight size={14} /></ExternalLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden border-t border-white/[.07] bg-[#0c0e14] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(104,117,177,.16),transparent_55%)]" />
        <div className="container-wide relative text-center">
          <Reveal><Eyebrow index="09">Get in touch</Eyebrow><h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[.97] tracking-[-.075em]">Let’s build something<br /><span className="text-gradient">with AI.</span></h2>
            <p className="mx-auto mt-6 max-w-xl text-[14px] leading-7 text-[#a5a6b0]">Open to AI Engineering, Generative AI, and software engineering opportunities.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="mailto:araj73232@gmail.com" className="button-primary" data-testid="link-email-contact"><Mail size={16} />araj73232@gmail.com <MoveUpRight size={14} /></a>
              <ExternalLink href="https://linkedin.com/in/arunraajj" className="button-quiet" testId="link-linkedin-contact"><Linkedin size={16} />LinkedIn <ArrowUpRight size={13} /></ExternalLink>
              <ExternalLink href="https://github.com/arrnnn" className="button-quiet" testId="link-github-contact"><Github size={16} />GitHub <ArrowUpRight size={13} /></ExternalLink>
            </div>
          </Reveal>
          <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/[.08] pt-6 text-[10px] text-white/40 sm:flex-row">
            <p>Arun Raj M R <span className="mx-2 text-white/20">/</span> AI Engineer</p>
            <p>Built with curiosity and engineering judgment.</p>
            <a href="#home" className="inline-flex items-center gap-2 transition hover:text-white/75" data-testid="link-back-to-top">Back to top <ArrowUpRight size={12} /></a>
          </footer>
        </div>
      </section>
    </main>
  </div>;
}

export default App;