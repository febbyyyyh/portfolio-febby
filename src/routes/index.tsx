import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Star,
  MessageCircle,
  ArrowUp,
  Mail,
  Send,
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw,
  Briefcase,
  Users,
  GraduationCap,
  Palette,
  Code2,
  BadgeCheck,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import { PROJECTS, type Project } from "../lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Febiola Hortensia Lengkong, S.Kom — Fullstack & Frontend Web Developer | UI/UX Designer",
      },
      {
        name: "description",
        content:
          "Portfolio of Febiola Hortensia Lengkong, S.Kom — transforming complex workflows into accessible, bold, and pixel-perfect digital experiences.",
      },
      { property: "og:title", content: "Febiola Hortensia Lengkong, S.Kom — Portfolio" },
      {
        property: "og:description",
        content: "Fullstack & Frontend Web Developer | UI/UX Designer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["About", "Experience", "Projects", "Certifications", "Contact"];
const CV = "/assets/cv-febiola.pdf";
const EMAIL = "febilengkong7@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const CONFETTI_COLORS = ["#FF5DA2", "#2BD980", "#A3E635", "#FFE6F0"];

/* ---------- 8-bit sound store (Web Audio API, no files) ---------- */
const sound = { on: false, subs: new Set<() => void>() };
function useSound(): [boolean, () => void] {
  const on = useSyncExternalStore(
    (cb) => {
      sound.subs.add(cb);
      return () => sound.subs.delete(cb);
    },
    () => sound.on,
    () => false,
  );
  const toggle = () => {
    sound.on = !sound.on;
    sound.subs.forEach((f) => f());
    if (sound.on) blip(880, 0.08);
  };
  return [on, toggle];
}
function blip(freq = 660, dur = 0.07, type: OscillatorType = "square") {
  if (!sound.on) return;
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
    osc.onended = () => void ctx.close();
  } catch {
    /* audio unavailable */
  }
}

function Index() {
  const stickersRef = useRef<HTMLDivElement>(null);
  return (
    <div id="top" className="grid-paper relative min-h-screen overflow-x-hidden">
      <div
        ref={stickersRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      />
      <Stickers constraintsRef={stickersRef} />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <EmergencyRoom />
      <Contact />
      <footer className="px-4 py-10 text-center font-pixel text-[10px] leading-relaxed">
        © 2026 Febiola Hortensia Lengkong, S.Kom.
        <br />
        Crafted with React, Tailwind, and lots of coffee. ☕
      </footer>
      <BackToTop />
    </div>
  );
}

/* ---------- Draggable retro stickers ---------- */
function Stickers({ constraintsRef }: { constraintsRef: React.RefObject<HTMLDivElement | null> }) {
  const stickers = [
    { e: "🐛", x: "4%", y: "12%" },
    { e: "☕", x: "90%", y: "20%" },
    { e: "💻", x: "3%", y: "55%" },
    { e: "❖", x: "92%", y: "62%" },
    { e: "🎨", x: "6%", y: "85%" },
  ];
  return (
    <>
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.4}
          whileDrag={{ scale: 1.3, rotate: 10 }}
          whileHover={{ scale: 1.15 }}
          className="pointer-events-auto absolute z-30 cursor-grab select-none text-3xl active:cursor-grabbing"
          style={{ left: s.x, top: s.y }}
        >
          {s.e}
        </motion.div>
      ))}
    </>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [on, toggleSound] = useSound();
  useEffect(() => {
    const isDark = window.localStorage.getItem("portfolio-theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  return (
    <header className="sticky top-4 z-40 mx-auto max-w-6xl px-4">
      <nav className="brutal flex items-center justify-between rounded-full bg-card px-4 py-2">
        <motion.a
          href="#top"
          whileHover={{ y: [0, -5, 0] }}
          className="brutal rounded-full bg-primary px-3 py-1 font-display text-sm"
        >
          FEBIOLA.DEV
        </motion.a>
        <div className="hidden gap-5 font-bold md:flex">
          {NAV.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              onClick={() => blip()}
              className="hover:text-primary"
            >
              {n}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={on ? "Mute sounds" : "Unmute sounds"}
            onClick={toggleSound}
            className="brutal brutal-press rounded-full bg-muted p-2"
          >
            {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <a
            href={CV}
            download
            className="brutal brutal-press hidden items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground md:flex"
          >
            <Download size={16} /> CV
          </a>
          <button
            aria-label="Toggle dark mode"
            onClick={() => {
              const nextDark = !dark;
              setDark(nextDark);
              window.localStorage.setItem("portfolio-theme", nextDark ? "dark" : "light");
              document.documentElement.classList.toggle("dark", nextDark);
              blip(520);
            }}
            className="brutal relative flex h-8 w-16 items-center rounded-full bg-muted px-1"
          >
            <motion.span
              layout
              className={`brutal flex h-6 w-6 items-center justify-center rounded-full ${dark ? "ml-auto bg-primary" : "bg-accent"} text-accent-foreground`}
            >
              {dark ? <Moon size={13} /> : <Sun size={13} />}
            </motion.span>
          </button>
          <button
            aria-label="Menu"
            className="brutal rounded-full bg-accent p-1.5 text-accent-foreground md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="brutal mt-3 flex flex-col gap-3 rounded-2xl bg-card p-5 font-bold md:hidden"
          >
            {NAV.map((n) => (
              <a key={n} onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`}>
                {n}
              </a>
            ))}
            <a
              href={CV}
              download
              className="brutal flex items-center gap-2 self-start rounded-full bg-secondary px-4 py-1.5 text-secondary-foreground"
            >
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Hero with typewriter roles + floating dev badges ---------- */
const ROLES = ["Frontend Web Developer", "UI/UX Designer", "Fullstack Enthusiast"];
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0,
      i = 0,
      del = false;
    const tick = () => {
      const word = words[w] ?? "";
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let t = del ? 45 : 90;
      if (!del && i === word.length) {
        del = true;
        t = 1400;
      } else if (del && i === 0) {
        del = false;
        w = (w + 1) % words.length;
        t = 300;
      }
      id = setTimeout(tick, t);
    };
    let id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

function Float({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute select-none ${className}`}
      animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 4, repeat: Infinity, delay }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const role = useTypewriter(ROLES);
  return (
    <section className="relative mx-auto grid min-h-[88vh] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:gap-14 sm:py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:py-24">
      <div className="relative z-10 text-center md:text-left">
        <Float className="-left-2 -top-10 hidden md:block">
          <span className="brutal rounded-full bg-accent px-3 py-1 font-pixel text-[10px] text-accent-foreground">
            &lt;Code /&gt;
          </span>
        </Float>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: -3 }}
          className="brutal mb-6 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground"
        >
          Fullstack &amp; Frontend Web Developer · UI/UX Designer
        </motion.span>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-4xl leading-tight sm:text-6xl md:text-5xl lg:text-6xl"
        >
          Hi, I'm{" "}
          <span className="brutal inline-block -rotate-2 rounded-xl bg-primary px-3 text-primary-foreground">
            Febiola
          </span>{" "}
          Hortensia Lengkong,{" "}
          <span className="brutal inline-block rotate-2 rounded-xl bg-accent px-3 text-accent-foreground">
            S.Kom
          </span>
        </motion.h1>
        <p className="mt-6 h-8 font-mono text-lg font-bold text-muted-foreground">
          {role}
          <span className="animate-pulse text-primary">▌</span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground md:mx-0">
          "Transforming complex workflows into accessible, bold, and pixel-perfect digital
          experiences."
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="#projects"
            onClick={() => blip()}
            className="brutal brutal-press rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            Explore Projects
          </a>
          <a
            href={MAILTO}
            onClick={() => {
              blip(980);
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.3 },
                colors: CONFETTI_COLORS,
              });
            }}
            className="brutal brutal-press flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-secondary-foreground"
          >
            <Mail size={18} /> Hire Me
          </a>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        whileHover={{ y: -8, rotate: 0, scale: 1.025 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[18rem] sm:max-w-84 md:mr-6"
      >
        <div className="brutal-lg absolute inset-0 rotate-[-7deg] rounded-3xl bg-accent" />
        <div className="brutal-lg relative rotate-2 overflow-hidden rounded-3xl bg-primary p-2">
          <img
            src="/assets/febby.jpg"
            alt="Febiola Hortensia Lengkong mengenakan selempang wisuda"
            className="aspect-3/4 w-full rounded-2xl border-2 border-ink object-cover"
          />
          <span className="brutal absolute bottom-5 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-card px-4 py-2 font-pixel text-[9px]">
            THAT'S ME! ✨
          </span>
        </div>
        <Float className="-right-6 top-8 hidden text-4xl sm:block">✦</Float>
        <Float className="-bottom-5 -left-8 hidden md:block" delay={0.5}>
          <span className="brutal rounded-full bg-secondary px-3 py-1 font-pixel text-[9px] text-secondary-foreground">
            S.Kom · CUM LAUDE
          </span>
        </Float>
      </motion.div>
    </section>
  );
}

/* ---------- About: chat bubbles + confetti skill pills ---------- */
const TAGS = [
  "S.Kom",
  "React.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MySQL",
  "UI/UX Design",
  "Figma",
  "Quality Assurance",
  "Responsive Layout",
  "DevOps Basics",
  "Data Analysis",
  "INFJ",
  "Coffee Lover",
];
const SKILL_INFO: Record<string, string> = {
  "S.Kom": "Bachelor of Computer Science — Universitas Sam Ratulangi, Cum Laude (GPA 3.98/4.00) 🎓",
  "React.js": "Advanced — hooks, state management, component architecture",
  "Tailwind CSS": "Expert — design systems, custom tokens, animations",
  "Node.js": "Advanced — REST APIs, auth, middleware",
  "Express.js": "Advanced — routing, validation, clean structure",
  MySQL: "Advanced — schema design, queries, optimization (taught it as a lab assistant!)",
  "UI/UX Design": "Expert — wireframes, prototypes, design thinking",
  Figma: "Expert — AutoLayout, components, design systems",
  "Quality Assurance": "Skilled — test scenarios, responsiveness checks, bug hunting 🐛",
  "Responsive Layout": "Expert — mobile-first, accessible layouts",
  "DevOps Basics": "Certified — Dicoding DevOps fundamentals",
  "Data Analysis": "Certified — data visualization & analytics (RevoU, Dicoding)",
  INFJ: "Personality — thoughtful, empathetic, detail-oriented",
  "Coffee Lover": "Fuel — espresso powered debugging sessions ☕",
};

function Tag({ label }: { label: string }) {
  const [showInfo, setShowInfo] = useState(false);
  const pop = (e: React.MouseEvent<HTMLButtonElement>) => {
    blip(760);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 60,
      startVelocity: 25,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: CONFETTI_COLORS,
    });
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 2200);
  };
  return (
    <span className="relative">
      <motion.button
        whileTap={{ scale: 0.85, rotate: -6 }}
        onClick={pop}
        className="brutal rounded-full bg-card px-3 py-1 text-sm font-bold even:bg-muted"
      >
        {label} <span className="ml-1 text-primary">×</span>
      </motion.button>
      <AnimatePresence>
        {showInfo && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="brutal absolute -top-14 left-1/2 z-20 w-56 -translate-x-1/2 rounded-xl bg-accent p-2 text-xs font-bold text-accent-foreground"
          >
            {SKILL_INFO[label] ?? label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-10 text-center font-display text-3xl md:text-5xl">{children}</h2>;
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-20">
      <div className="space-y-4">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="brutal flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <MessageCircle size={18} />
          </span>
          <p className="brutal rounded-2xl rounded-tl-none bg-secondary px-4 py-2 font-bold text-secondary-foreground">
            I want to know you 💬
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <p className="brutal max-w-[90%] rounded-2xl rounded-tr-none bg-card px-4 py-2 font-bold">
            Oh, Sure! This is... about ME ✨
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="brutal-lg mt-8 rounded-3xl bg-card p-6 md:p-10"
      >
        <div className="flex items-center gap-3">
          <Star className="fill-accent text-ink" size={34} />
          <h3 className="font-display text-3xl">ABOUT ME</h3>
        </div>
        <p className="mt-4 text-muted-foreground">
          I'm a Computer Science graduate (S.Kom) from Universitas Sam Ratulangi, graduated Cum
          Laude with a 3.98/4.00 GPA. I'm passionate about frontend engineering and clean UI/UX
          design — transforming complex workflows into accessible, bold, and pixel-perfect digital
          experiences. I also bring a QA mindset: if there's a bug, I'll find it. 🐛
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {TAGS.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Experience: retro browser window with tabs ---------- */
const TABS = [
  {
    id: "work",
    label: "Work & Technical",
    icon: Briefcase,
    items: [
      {
        year: "Volunteer",
        title: "Volunteer Graphic Designer",
        place:
          "POTEMA.ID · Branding & visual campaigns — recognized as Best Volunteer Graphic Designer 🏅",
        color: "bg-primary",
      },
      {
        year: "UNSRAT",
        title: "Database Technology Laboratory Assistant",
        place:
          "Universitas Sam Ratulangi · Assisted laboratory courses, mentored students on relational databases & SQL queries",
        color: "bg-secondary",
      },
      {
        year: "QA",
        title: "Quality Assurance & Web Tester",
        place:
          "Web-Dev.XML / Projects · Evaluated application responsiveness, validated model responses, logged functional test scenarios",
        color: "bg-accent",
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership & Organization",
    icon: Users,
    items: [
      {
        year: "Committee",
        title: "Secretary / Committee Coordinator",
        place:
          "Student Association Christmas Event & Campus Initiatives · Managed administrative documentation, coordinated cross-functional student teams & scheduling",
        color: "bg-accent",
      },
      {
        year: "Community",
        title: "Documentation & Branding Coordinator",
        place: "Village Community Project · Led UI design and visual identity initiatives",
        color: "bg-sky",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    items: [
      {
        year: "Computer Science · Bachelor's Degree",
        title: "Universitas Sam Ratulangi",
        place: "Bachelor of Computer Science (S.Kom) · Graduated Cum Laude — GPA 3.98 / 4.00 🎓",
        color: "bg-primary",
      },
    ],
  },
];

function Experience() {
  const [tab, setTab] = useState(0);
  const active = TABS[tab] ?? TABS[0]!;
  return (
    <section id="experience" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-20">
      <SectionTitle>Experience</SectionTitle>
      <motion.div
        initial={{ opacity: 0, y: 28, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="brutal-lg overflow-hidden rounded-2xl bg-card"
      >
        <div className="flex items-center gap-2 border-b-[2.5px] border-ink bg-muted px-4 py-3">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-destructive" />
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-accent" />
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-secondary" />
          <span className="ml-3 font-pixel text-[10px]">journey.exe</span>
        </div>
        <div className="flex flex-wrap gap-2 border-b-[2.5px] border-ink bg-background p-3">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(i);
                blip(700 + i * 100);
              }}
              className={`brutal brutal-press flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold sm:text-sm ${i === tab ? "bg-primary text-primary-foreground" : "bg-card"}`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
        <ol className="relative space-y-8 p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {active.items.map((t) => (
                <li key={t.title} className="relative flex list-none gap-5">
                  <span className={`brutal z-10 mt-1 h-5 w-5 shrink-0 rounded-full ${t.color}`} />
                  <div>
                    <span className="font-pixel text-[10px] text-muted-foreground">{t.year}</span>
                    <h3 className="font-display text-lg">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.place}</p>
                  </div>
                </li>
              ))}
            </motion.div>
          </AnimatePresence>
        </ol>
      </motion.div>
    </section>
  );
}

/* ---------- Projects: retro folders with sliding preview cards ---------- */
function ProjectFolder({
  p,
  index,
  onSelect,
}: {
  p: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <motion.a
        key={p.title}
        href={`/projects/${p.id}`}
        onClick={(event) => {
          event.preventDefault();
          onSelect(p);
        }}
        className="group relative block h-64 overflow-hidden text-foreground hover:overflow-visible"
        style={{ perspective: 800 }}
      >
        <div
          className={`brutal absolute left-0 top-0 z-10 rounded-t-xl border-b-0 px-4 py-1 font-pixel text-[9px] text-primary-foreground ${p.color}`}
        >
          {p.tab}
        </div>
        <div
          className={`brutal absolute inset-x-0 bottom-0 top-6 z-10 rounded-2xl rounded-tl-none ${p.color}`}
        />
        <div
          className={`project-browser-card absolute bottom-0 left-1/2 z-20 h-60 w-[92%] -translate-x-1/2 translate-y-6 overflow-hidden rounded-xl border-[2.5px] border-black bg-[#FFFDF8] text-black shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out group-hover:-translate-y-8 group-active:-translate-y-8 focus-within:-translate-y-8 ${
            index % 2 === 0 ? "-rotate-1 group-hover:rotate-1" : "rotate-1 group-hover:-rotate-1"
          }`}
        >
          <div className="flex h-7 items-center gap-1.5 border-b-[2.5px] border-black bg-[#FFE6F0] px-2.5 dark:text-black">
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#FF5D5D]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#FFE047]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black bg-[#2BD980]" />
            <span className="ml-auto max-w-[7rem] truncate font-mono text-[8px] font-bold uppercase tracking-tight dark:text-black">
              {p.id}.web
            </span>
          </div>

          <div className="p-1.5">
            <img
              src="https://placehold.co/600x400/FF5DA2/FFFDF8?text=Project+Screenshot"
              alt={`${p.title} project screenshot preview`}
              className="mx-auto aspect-video w-full max-w-48 border-2 border-black object-cover"
            />
            <div className="mt-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 font-display text-sm leading-tight">{p.title}</h3>
              <span className="inline-flex shrink-0 items-center gap-1 border-2 border-black bg-[#2BD980] px-1.5 py-1 font-mono text-[8px] font-bold uppercase text-black">
                Open <ExternalLink size={10} />
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {p.tech.map((t, techIndex) => (
                <span
                  key={t}
                  className={`rounded-full border-[1.5px] border-black px-1.5 py-0.5 text-[8px] font-bold uppercase leading-tight text-black ${
                    ["bg-[#FFE6F0]", "bg-[#2BD980]", "bg-white"][techIndex % 3]
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`brutal absolute inset-x-0 bottom-0 z-30 flex h-12 items-center justify-between rounded-2xl px-3 py-1.5 ${p.color} text-primary-foreground`}
        >
          <span className="text-sm font-bold">View project details</span>
          <ExternalLink size={16} />
        </div>
      </motion.a>
    </motion.div>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveScreenshot(0);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "ArrowLeft") {
        setActiveScreenshot((current) => Math.max(0, current - 1));
      }
      if (event.key === "ArrowRight") {
        setActiveScreenshot((current) =>
          Math.min((selectedProject?.screenshots.length ?? 1) - 1, current + 1),
        );
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionTitle>Projects Tucked Inside My Folders</SectionTitle>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, index) => (
          <ProjectFolder key={p.title} p={p} index={index} onSelect={selectProject} />
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="project-details-window my-auto max-h-[90vh] w-[95%] max-w-5xl overflow-y-auto border-[3px] border-black bg-[#FFFDF8] text-black shadow-[12px_12px_0px_#000] md:w-[80%]"
            >
              <div className="flex items-center gap-2 border-b-[3px] border-black bg-[#FFE6F0] px-4 py-3 dark:text-black">
                <button
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setSelectedProject(null)}
                  className="h-4 w-4 rounded-full border-2 border-black bg-[#FF5D5D] transition-transform hover:scale-110"
                />
                <span className="h-4 w-4 rounded-full border-2 border-black bg-[#FFE047]" />
                <span className="h-4 w-4 rounded-full border-2 border-black bg-[#2BD980]" />
                <span className="ml-3 truncate font-mono text-xs font-bold uppercase">
                  {selectedProject.id}.project
                </span>
                <button
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setSelectedProject(null)}
                  className="group ml-auto flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black transition-all duration-150 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-[#FF5DA2] hover:shadow-[3px_3px_0px_#000] dark:hover:shadow-[3px_3px_0px_#fff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <X
                    size={16}
                    className="transition-transform duration-150 group-hover:rotate-90"
                  />
                </button>
              </div>

              <div className="project-modal-scroll max-h-[calc(100dvh-8rem)] overflow-y-auto p-4 sm:p-7">
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <div className="self-start border-2 border-black bg-[#FFE6F0] p-2 dark:bg-[#1E1E24]">
                    <img
                      src={
                        selectedProject.screenshots[activeScreenshot]?.src ||
                        `https://placehold.co/800x500/${
                          ["FF5DA2", "2BD980", "FFFDF8", "FFE047", "FFE6F0"][activeScreenshot % 5]
                        }/000000?text=Screenshot+${activeScreenshot + 1}`
                      }
                      alt={`${selectedProject.title} — ${
                        selectedProject.screenshots[activeScreenshot]?.caption ??
                        `Screenshot ${activeScreenshot + 1}`
                      }`}
                      className="aspect-video w-full border-2 border-black object-cover transition-transform duration-200 hover:rotate-1"
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="truncate font-mono text-[10px] font-bold uppercase">
                        {selectedProject.screenshots[activeScreenshot]?.caption ??
                          `Screenshot ${activeScreenshot + 1}`}
                      </p>
                      <span className="shrink-0 font-mono text-[10px] font-bold">
                        {activeScreenshot + 1} / {selectedProject.screenshots.length}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        aria-label="Previous screenshot"
                        onClick={() =>
                          setActiveScreenshot(
                            (current) =>
                              (current - 1 + selectedProject.screenshots.length) %
                              selectedProject.screenshots.length,
                          )
                        }
                        className="border-2 border-black bg-[#FFE047] px-3 py-1.5 font-mono text-sm font-bold text-black active:translate-y-1"
                      >
                        Prev ←
                      </button>
                      <div className="flex items-center gap-2" aria-label="Choose screenshot">
                        {selectedProject.screenshots.map((screenshot, index) => (
                          <button
                            key={screenshot.caption}
                            type="button"
                            aria-label={`Show screenshot ${index + 1}`}
                            aria-current={activeScreenshot === index}
                            onClick={() => setActiveScreenshot(index)}
                            className={`h-3 w-3 border-2 border-black ${
                              activeScreenshot === index ? "bg-[#2BD980]" : "bg-white"
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        aria-label="Next screenshot"
                        onClick={() =>
                          setActiveScreenshot(
                            (current) => (current + 1) % selectedProject.screenshots.length,
                          )
                        }
                        className="border-2 border-black bg-[#FFE6F0] px-3 py-1.5 font-mono text-sm font-bold text-black active:translate-y-1"
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="w-fit border-2 border-black bg-[#FFE047] px-2 py-1 font-mono text-[10px] font-bold uppercase">
                      Case study / {selectedProject.id}
                    </span>
                    <h2
                      id="project-modal-title"
                      className="mt-4 font-display text-3xl leading-tight sm:text-4xl"
                    >
                      {selectedProject.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-800 sm:text-base">
                      {selectedProject.description}
                    </p>

                    <h3 className="mt-6 font-display text-lg">Tech stack</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProject.tech.map((technology, techIndex) => (
                        <span
                          key={technology}
                          className={`border-2 border-black px-2.5 py-1 text-xs font-bold uppercase text-black ${
                            ["bg-[#2BD980]", "bg-[#FFE6F0]", "bg-[#FFE047]"][techIndex % 3]
                          }`}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-8">
                      <a
                        href="https://example.com"
                        target="_blank"
                        rel="noreferrer"
                        className="brutal brutal-press inline-flex items-center justify-center gap-2 rounded-full bg-[#2BD980] px-4 py-2.5 text-sm font-bold text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        View Live Site <ExternalLink size={16} />
                      </a>
                      <a
                        href={selectedProject.href}
                        target="_blank"
                        rel="noreferrer"
                        className="brutal brutal-press inline-flex items-center justify-center gap-2 rounded-full bg-[#FFE6F0] px-4 py-2.5 text-sm font-bold text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        GitHub Repo <Code2 size={16} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-t-[3px] border-black pt-5">
                  <h3 className="font-display text-xl">Project highlights</h3>
                  <ul className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {selectedProject.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border-2 border-black bg-white p-3 text-sm font-medium transition-all duration-150 hover:-translate-y-1 hover:bg-[#FFE6F0] hover:shadow-[4px_4px_0px_#000] dark:bg-[#1E1E24] dark:text-white dark:hover:bg-[#244b3c] dark:hover:shadow-[4px_4px_0px_#fff]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-col gap-5 border-t-[2.5px] border-black bg-[#FFE6F0] p-5 dark:border-white dark:bg-[#2A2A35] sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">
                  <div>
                    <h3 className="font-display text-xl leading-tight sm:text-2xl dark:text-white">
                      Like what you see? Let&apos;s build something bold together.
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      I&apos;m currently available for freelance projects and full-time roles.
                    </p>
                  </div>
                  <a
                    href="mailto:febilengkong7@gmail.com"
                    className="brutal brutal-press inline-flex shrink-0 items-center justify-center gap-2 self-start border-2 border-black bg-[#2BD980] px-6 py-3 font-display text-lg text-black shadow-[4px_4px_0px_#000] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:border-white dark:shadow-[4px_4px_0px_#fff] md:self-auto"
                  >
                    Hire Me <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Certifications: brutalist badge vault ---------- */
const CERTS = [
  {
    title: "Becoming an Expert React Web Developer",
    issuer: "Dicoding Indonesia",
    id: "6RPNO63R4X2M",
    date: "Sep 2026 – Sep 2029",
  },
  {
    title: "React Web App Fundamentals",
    issuer: "Dicoding Indonesia",
    id: "N9ZO0DJ0YXG5",
    date: "Aug 2026 – Aug 2029",
  },
  {
    title: "Building a React Web App",
    issuer: "Dicoding Indonesia",
    id: "GRX50G232Z0M",
    date: "Aug 2026 – Aug 2029",
  },
  {
    title: "DevOps Fundamentals",
    issuer: "Dicoding Indonesia",
    id: "MRZMV4KKLZYQ",
    date: "Sep 2026 – Sep 2029",
  },
  {
    title: "SQL Fundamentals",
    issuer: "Dicoding Indonesia",
    id: "98XW8RM10PM3",
    date: "Sep 2026 – Sep 2029",
  },
  {
    title: "Data Visualization Fundamentals",
    issuer: "Dicoding Indonesia",
    id: "MRZMVD6ONZYQ",
    date: "Sep 2026 – Sep 2029",
  },
  {
    title: "Mobile App Development Fundamentals",
    issuer: "Dicoding Indonesia",
    id: "1OP875WE1ZQK",
    date: "Sep 2026 – Sep 2029",
  },
  {
    title: "Intro to UI/UX (Gold)",
    issuer: "Skilvul",
    id: "mQjxuloaTiup48wgje6UFA",
    date: "Nov 2024 – Nov 2026",
  },
  {
    title: "Intro to Data Analytics",
    issuer: "RevoU",
    id: "DAMC-06012025-01-1-00055",
    date: "Issued Jan 2025",
  },
  {
    title: "Design Thinking 101",
    issuer: "Future Skills by Pijar Foundation",
    id: "079167/142/FCC/25",
    date: "Issued Jan 2025",
  },
  {
    title: "Using Microsoft Excel for Data Management",
    issuer: "Future Skills Indonesia",
    id: "078677/140/FCC/25",
    date: "Issued Jan 2025",
  },
  {
    title: "Google Play Store Listing Certificate",
    issuer: "Google Play Academy",
    id: "118229643",
    date: "Oct 2024 – Oct 2027",
  },
  { title: "C++", issuer: "Sololearn", id: "CT-J7IHQHRE", date: "Issued Oct 2022" },
].map((cert) => ({ ...cert, url: "https://example.com" }));

function Certifications() {
  const [selectedCert, setSelectedCert] = useState<(typeof CERTS)[number] | null>(null);

  useEffect(() => {
    if (!selectedCert) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCert(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <SectionTitle>Licenses &amp; Certifications 🏆</SectionTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c) => (
          <motion.div
            key={c.id}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="brutal flex flex-col rounded-2xl bg-card p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <BadgeCheck className="shrink-0 text-primary" size={26} />
              <span className="rounded-full border-2 border-ink bg-muted px-2 font-pixel text-[8px]">
                {c.date}
              </span>
            </div>
            <h3 className="mt-3 font-display text-base leading-snug">{c.title}</h3>
            <p className="mt-1 text-sm font-bold text-muted-foreground">{c.issuer}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">ID: {c.id}</p>
            <button
              onClick={() => {
                setSelectedCert(c);
                blip(840);
              }}
              className="brutal brutal-press mt-4 self-start rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-secondary-foreground"
            >
              Show Credential
            </button>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              className="certificate-window max-h-[90vh] w-[95%] max-w-2xl overflow-y-auto rounded-2xl border-[3px] border-black bg-[#FFFDF8] text-black shadow-[8px_8px_0px_#000] md:w-[80%]"
            >
              <div className="flex items-center justify-between gap-3 border-b-[3px] border-black bg-[#FFE6F0] px-4 py-3 dark:text-black">
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Close certificate preview"
                    onClick={() => setSelectedCert(null)}
                    className="h-4 w-4 rounded-full border-2 border-black bg-[#FF5D5D] transition-transform hover:scale-110"
                  />
                  <span className="h-4 w-4 rounded-full border-2 border-black bg-[#FFE047]" />
                  <span className="h-4 w-4 rounded-full border-2 border-black bg-[#2BD980]" />
                </div>
                <h2
                  id="certificate-modal-title"
                  className="truncate text-center font-display text-sm sm:text-base"
                >
                  {selectedCert.title || "Certificate Viewer"}
                </h2>
                <span className="w-14 shrink-0" aria-hidden="true" />
              </div>

              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto p-4 sm:p-7">
                <div
                  role="img"
                  aria-label={`Preview placeholder for ${selectedCert.title}`}
                  className="grid min-h-52 place-items-center border-2 border-black bg-[#FFE6F0] p-6 sm:min-h-72"
                >
                  <div className="w-full max-w-md border-[3px] border-black bg-[#FFFDF8] p-5 text-center shadow-[5px_5px_0px_#000] dark:border-white dark:bg-[#1E1E24] dark:text-white dark:shadow-[5px_5px_0px_#fff] sm:p-8">
                    <BadgeCheck className="mx-auto text-[#FF5DA2]" size={42} />
                    <p className="mt-4 font-pixel text-[9px] text-black/60">CERTIFICATE PREVIEW</p>
                    <p className="mt-3 font-display text-lg sm:text-2xl">{selectedCert.title}</p>
                    <span className="mx-auto mt-5 block h-2 w-24 bg-[#2BD980]" />
                  </div>
                </div>

                <div className="mt-5 border-[3px] border-black bg-white p-4 dark:border-white dark:bg-[#1E1E24] dark:text-white sm:p-5">
                  <p className="font-pixel text-[9px] text-[#FF5DA2]">CREDENTIAL DETAILS</p>
                  <h3 className="mt-3 font-display text-xl leading-tight sm:text-2xl">
                    {selectedCert.title}
                  </h3>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-bold text-black/60">Issuer</dt>
                      <dd className="mt-1 font-bold">{selectedCert.issuer}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-black/60">Issue Date</dt>
                      <dd className="mt-1 font-bold">{selectedCert.date}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-bold text-black/60">Credential ID</dt>
                      <dd className="mt-1 break-all font-mono">{selectedCert.id}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="brutal brutal-press rounded-full bg-white px-5 py-2.5 font-bold text-black dark:bg-[#1E1E24] dark:text-white"
                  >
                    Close
                  </button>
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="brutal brutal-press inline-flex items-center justify-center gap-2 rounded-full bg-[#2BD980] px-5 py-2.5 text-center font-bold text-black"
                  >
                    Verify Original Credential <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Emergency Room: 3-level debugging mini-game ---------- */
const LEVELS = ["Center the Div", "Contrast Police", "Pesky Overflow"];

function EmergencyRoom() {
  const [level, setLevel] = useState(0);
  const [done, setDone] = useState([false, false, false]);
  const [l1, setL1] = useState({ flex: false, justify: false, align: false });
  const [l2, setL2] = useState<"bad" | "worse" | "good">("bad");
  const [l3, setL3] = useState(false);

  const complete = useCallback(
    (i: number) => {
      if (done[i]) return;
      setDone((d) => {
        const n = [...d];
        n[i] = true;
        return n;
      });
      blip(980 + i * 160, 0.12, "triangle");
    },
    [done],
  );
  const allDone = done.every(Boolean);

  useEffect(() => {
    if (allDone) {
      confetti({ particleCount: 160, spread: 120, origin: { y: 0.6 }, colors: CONFETTI_COLORS });
      blip(1320, 0.2, "triangle");
    }
  }, [allDone]);

  useEffect(() => {
    if (l1.flex && l1.justify && l1.align) complete(0);
  }, [complete, l1]);
  useEffect(() => {
    if (l2 === "good") complete(1);
  }, [complete, l2]);
  useEffect(() => {
    if (l3) complete(2);
  }, [complete, l3]);

  const reset = () => {
    setDone([false, false, false]);
    setL1({ flex: false, justify: false, align: false });
    setL2("bad");
    setL3(false);
    setLevel(0);
  };

  const toggle = (k: keyof typeof l1) => {
    setL1((s) => ({ ...s, [k]: !s[k] }));
    blip(700);
  };

  const btnStyle =
    l2 === "good"
      ? { background: "#000", color: "#A3E635", border: "3px solid #A3E635" }
      : l2 === "worse"
        ? { background: "#FFFDF8", color: "#FFE6F0", border: "3px solid #FFE6F0" }
        : { background: "#A3E635", color: "#FDE047", border: "3px solid #FDE047" };

  return (
    <section id="debug" className="mx-auto max-w-4xl scroll-mt-28 px-4 py-20">
      <SectionTitle>The UI/Dev Emergency Room 🚑</SectionTitle>
      <p className="mx-auto mb-6 max-w-md text-center text-sm text-muted-foreground">
        You're the <b>Debugger</b> on call. Fix all 3 iconic UI/CSS bugs to earn your certificate!
      </p>
      <motion.div
        initial={{ opacity: 0, y: 28, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="brutal-lg overflow-hidden rounded-3xl bg-card"
      >
        <div className="flex flex-wrap items-center gap-2 border-b-[2.5px] border-ink bg-muted px-4 py-3">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-destructive" />
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-accent" />
          <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-secondary" />
          <span className="ml-2 font-pixel text-[10px]">emergency-room.fig</span>
          <div className="ml-auto flex gap-2">
            {LEVELS.map((l, i) => (
              <button
                key={l}
                onClick={() => {
                  setLevel(i);
                  blip(600 + i * 100);
                }}
                className={`brutal brutal-press rounded-full px-3 py-1 text-xs font-bold ${i === level ? "bg-primary text-primary-foreground" : "bg-card"}`}
              >
                {done[i] ? "✓ " : ""}Lv{i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!allDone && level === 0 && (
              <motion.div
                key="l1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-display text-lg">Level 1: Center the Div</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A poor 🏆 is stuck in the corner. Apply the right CSS:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(
                    [
                      ["flex", "display: flex"],
                      ["justify", "justify-content: center"],
                      ["align", "align-items: center"],
                    ] as const
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => toggle(k)}
                      className={`brutal brutal-press rounded-full px-4 py-2 font-mono text-xs font-bold ${l1[k] ? "bg-secondary text-secondary-foreground" : "bg-background"}`}
                    >
                      {label} {l1[k] ? "✓" : ""}
                    </button>
                  ))}
                </div>
                <div
                  className={`brutal mt-5 h-48 rounded-xl bg-background ${l1.flex ? "flex" : ""} ${l1.justify ? "justify-center" : ""} ${l1.align ? "items-center" : ""}`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="text-4xl"
                  >
                    🏆
                  </motion.span>
                </div>
                {done[0] && (
                  <p className="mt-3 font-pixel text-[10px] text-secondary">
                    ✓ BUG FIXED — DEAD CENTER!
                  </p>
                )}
              </motion.div>
            )}
            {!allDone && level === 1 && (
              <motion.div
                key="l2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-display text-lg">Level 2: The Contrast Police 🚨</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Yellow text on light green? WCAG nightmare. Pick an accessible combo:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setL2("worse");
                      blip(300, 0.15, "sawtooth");
                    }}
                    className={`brutal brutal-press rounded-full px-4 py-2 text-xs font-bold ${l2 === "worse" ? "bg-destructive text-destructive-foreground" : "bg-background"}`}
                  >
                    Pastel Dream (white on pink)
                  </button>
                  <button
                    onClick={() => setL2("good")}
                    className={`brutal brutal-press rounded-full px-4 py-2 text-xs font-bold ${l2 === "good" ? "bg-secondary text-secondary-foreground" : "bg-background"}`}
                  >
                    High Contrast Neo-Brutalism
                  </button>
                </div>
                <div className="mt-5 flex justify-center">
                  <motion.button
                    layout
                    style={btnStyle}
                    className="rounded-xl px-8 py-4 font-display uppercase"
                  >
                    Buy Now
                  </motion.button>
                </div>
                <AnimatePresence>
                  {l2 === "good" && (
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="brutal mx-auto mt-4 w-fit rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground"
                    >
                      Accessible &amp; Pixel Perfect! 🎯
                    </motion.p>
                  )}
                </AnimatePresence>
                {l2 === "worse" && (
                  <p className="mt-3 text-center font-pixel text-[10px] text-destructive">
                    ✗ STILL UNREADABLE — TRY AGAIN
                  </p>
                )}
              </motion.div>
            )}
            {!allDone && level === 2 && (
              <motion.div
                key="l3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-display text-lg">Level 3: The Pesky Overflow</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This card spills out of the mobile viewport. Ugly horizontal scrollbar! 😱
                </p>
                <button
                  onClick={() => {
                    setL3(true);
                    blip(1100, 0.12, "triangle");
                  }}
                  className="brutal brutal-press mt-4 rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground"
                >
                  {l3 ? "✓ max-w-full overflow-hidden" : "Make Responsive"}
                </button>
                <div className="mx-auto mt-5 w-48 rounded-xl border-[2.5px] border-dashed border-ink p-2">
                  <p className="mb-1 text-center font-pixel text-[8px]">MOBILE VIEWPORT</p>
                  <div className="overflow-hidden">
                    <motion.div
                      animate={{ x: l3 ? 0 : 60, width: l3 ? "100%" : 320 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="brutal rounded-lg bg-accent p-3 text-xs font-bold text-accent-foreground"
                    >
                      Oversized card content that refuses to fit the screen 📦
                    </motion.div>
                  </div>
                </div>
                {done[2] && (
                  <p className="mt-3 font-pixel text-[10px] text-secondary">
                    ✓ SNAPPED INTO PLACE!
                  </p>
                )}
              </motion.div>
            )}
            {allDone && (
              <motion.div
                key="cert"
                initial={{ scale: 0.6, rotate: -4, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                className="text-center"
              >
                <div className="brutal-lg mx-auto max-w-md rounded-2xl bg-accent p-6 text-accent-foreground">
                  <p className="font-pixel text-[10px]">🏅 ACHIEVEMENT UNLOCKED 🏅</p>
                  <h3 className="mt-3 font-display text-2xl">
                    Certified Pixel Perfectionist &amp; Bug Slayer!
                  </h3>
                  <p className="mt-2 text-sm font-bold">
                    You centered the div, passed the contrast police, and tamed the overflow.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <a
                    href="#contact"
                    onClick={() => blip()}
                    className="brutal brutal-press rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
                  >
                    Hire Febiola to fix real bugs 🐛
                  </a>
                  <button
                    onClick={reset}
                    className="brutal brutal-press flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-bold text-secondary-foreground"
                  >
                    <RotateCcw size={16} /> Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!allDone && (
            <p className="mt-6 text-center font-pixel text-[10px] text-muted-foreground">
              BUGS FIXED: {done.filter(Boolean).length}/3
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const input =
    "brutal w-full rounded-xl bg-background px-4 py-3 font-medium outline-none focus:bg-muted";
  const socials = [
    { icon: Mail, label: EMAIL, href: MAILTO, c: "bg-primary" },
    {
      icon: Briefcase,
      label: "linkedin.com/in/dummy",
      href: "https://linkedin.com/in/dummy",
      c: "bg-secondary",
    },
    { icon: Code2, label: "github.com/dummy", href: "https://github.com/dummy", c: "bg-accent" },
    { icon: Palette, label: "behance.net/dummy", href: "https://behance.net/dummy", c: "bg-sky" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-4 py-20">
      <SectionTitle>Let's Build Something Bold Together!</SectionTitle>
      <div className="mb-10 text-center">
        <motion.a
          href={MAILTO}
          whileHover={{ rotate: -2, scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() =>
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.7 }, colors: CONFETTI_COLORS })
          }
          className="brutal-lg inline-flex items-center gap-3 rounded-full bg-secondary px-10 py-5 font-display text-2xl uppercase text-secondary-foreground"
        >
          <Mail size={28} /> Hire Me
        </motion.a>
        <p className="mt-3 font-mono text-sm text-muted-foreground">{EMAIL}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-4"
        >
          {socials.map(({ icon: I, label, href, c }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              variants={{
                hidden: { opacity: 0, x: -20, rotate: -1 },
                visible: { opacity: 1, x: 0, rotate: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              whileHover={{ x: 4, rotate: -1 }}
              className={`brutal brutal-press flex items-center gap-3 rounded-2xl p-4 font-bold text-primary-foreground ${c}`}
            >
              <I size={20} /> {label}
            </motion.a>
          ))}
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 24, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            blip(1040, 0.12);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setSent(false), 2500);
          }}
          className="brutal-lg space-y-4 rounded-3xl bg-card p-6"
        >
          <input required placeholder="Name" className={input} />
          <input required type="email" placeholder="Email" className={input} />
          <textarea required rows={4} placeholder="Message" className={input} />
          <motion.button
            whileHover={{ rotate: -3, scale: 1.04 }}
            whileTap={{ scale: 0.9, rotate: 4 }}
            className="brutal flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display uppercase text-primary-foreground"
          >
            {sent ? (
              "Sent! ✓ STAMPED"
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ y: 80, scale: 0.5 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 80, scale: 0.5 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="brutal brutal-press fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
        >
          <ArrowUp />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
