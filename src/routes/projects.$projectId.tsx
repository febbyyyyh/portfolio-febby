import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Image as ImageIcon,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { PROJECTS } from "../lib/projects";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Details — Febiola Hortensia Lengkong" },
      {
        name: "description",
        content:
          "Explore project details, technology stacks, and visual previews from Febiola Hortensia Lengkong's portfolio.",
      },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const project = PROJECTS.find((item) => item.id === projectId);

  if (!project) {
    return (
      <main className="grid-paper flex min-h-screen items-center justify-center px-4">
        <div className="brutal-lg max-w-lg rounded-3xl bg-card p-8 text-center">
          <p className="font-pixel text-xs text-primary">404 · PROJECT NOT FOUND</p>
          <h1 className="mt-4 font-display text-3xl">No project in this folder!</h1>
          <p className="mt-3 text-muted-foreground">
            The project you are looking for is not in this portfolio.
          </p>
          <Link
            to="/"
            hash="projects"
            className="brutal brutal-press mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground"
          >
            <ArrowLeft size={18} /> Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid-paper min-h-screen px-4 pb-20 pt-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          hash="projects"
          className="brutal brutal-press inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 font-bold"
        >
          <ArrowLeft size={18} /> All projects
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`brutal-lg relative mt-8 overflow-hidden rounded-3xl p-6 sm:p-10 ${project.color}`}
        >
          <span className="inline-flex rounded-full border-2 border-ink bg-card px-3 py-1 font-pixel text-[9px]">
            {project.tab}
          </span>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-pixel text-[10px] uppercase tracking-wider">
                Project file / {project.id}
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm font-medium sm:text-base">{project.summary}</p>
            </div>
            <div
              className="project-detail-art relative flex h-28 w-28 items-center justify-center justify-self-start sm:h-36 sm:w-36"
              aria-hidden="true"
            >
              <span className="project-detail-art-shape" />
              <span className="brut relative z-10 rounded-full bg-card px-3 py-2 font-pixel text-[10px]">
                {project.motif}
              </span>
              <span className="project-detail-art-dot" />
            </div>
          </div>
        </motion.header>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <section className="brutal rounded-3xl bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="brutal flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Sparkles size={20} />
              </span>
              <h2 className="font-display text-2xl">About the project</h2>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{project.description}</p>

            <h3 className="mt-8 font-display text-lg">Highlights</h3>
            <ul className="mt-3 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="brutal mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-bold">
                    ✓
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-6">
            <section className="brutal rounded-3xl bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="brutal flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Code2 size={20} />
                </span>
                <h2 className="font-display text-xl">Tech stack</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="brutal rounded-full bg-muted px-3 py-1.5 text-sm font-bold"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="brutal rounded-3xl bg-card p-6">
              <h2 className="font-display text-xl">Project link</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Replace the sample URL in the project data with the correct link.
              </p>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="brutal brutal-press mt-5 flex items-center justify-between gap-3 rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground"
              >
                {project.sourceLabel} <ExternalLink size={18} />
              </a>
            </section>
          </aside>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-pixel text-[9px] text-primary">PROJECT GALLERY / PREVIEW</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">Project gallery</h2>
            </div>
            <span className="hidden rounded-full border-2 border-ink bg-accent px-3 py-1 font-pixel text-[8px] sm:inline-block">
              {project.screenshots.length} SCREENSHOTS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.map((screenshot, index) => (
              <figure
                key={screenshot.caption}
                className="brutal group overflow-hidden rounded-2xl bg-card p-3 transition-transform duration-200 hover:-translate-y-1"
              >
                {screenshot.src.trim() ? (
                  <img
                    src={screenshot.src}
                    alt={`${project.title} — ${screenshot.caption}`}
                    className="aspect-[16/10] w-full rounded-xl border-2 border-ink object-cover"
                  />
                ) : (
                  <div className="project-screenshot-placeholder grid-paper relative flex aspect-[16/10] flex-col overflow-hidden rounded-xl border-2 border-ink bg-muted p-4">
                    <div
                      className={`mb-3 flex h-6 items-center gap-1.5 rounded-md border-2 border-ink px-2 ${project.color}`}
                    >
                      <span className="h-2 w-2 rounded-full border border-ink bg-card" />
                      <span className="h-2 w-2 rounded-full border border-ink bg-card" />
                      <span className="ml-auto font-pixel text-[6px]">PREVIEW 0{index + 1}</span>
                    </div>
                    <div className="flex min-h-0 flex-1 gap-3">
                      <div
                        className={`project-preview-art relative flex w-1/3 items-center justify-center overflow-hidden rounded-lg border-2 border-ink ${project.color}`}
                      >
                        <span className="project-art-mark" aria-hidden="true" />
                        <span className="relative z-10 brutal rounded-full bg-card px-2 py-1 font-pixel text-[7px]">
                          {project.motif}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 py-1">
                        <span className="h-2 w-4/5 rounded-full bg-foreground/70" />
                        <span className="h-2 w-3/5 rounded-full bg-foreground/30" />
                        <span className="mt-auto h-8 rounded-lg border-2 border-ink bg-card" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-full border border-ink bg-card p-1.5">
                      <ImageIcon size={13} />
                    </span>
                  </div>
                )}
                <figcaption className="flex items-center justify-between gap-3 px-1 pb-1 pt-3">
                  <span className="font-bold">{screenshot.caption}</span>
                  <span className="font-pixel text-[8px] text-muted-foreground">0{index + 1}</span>
                </figcaption>
                {!screenshot.src.trim() && (
                  <p className="px-1 pb-1 text-xs text-muted-foreground">
                    Set `src` to the screenshot path in the project data.
                  </p>
                )}
              </figure>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="brutal-lg relative mt-16 overflow-hidden rounded-3xl bg-secondary p-6 sm:p-10"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rotate-12 border-[10px] border-ink/10"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="font-pixel text-[9px] uppercase tracking-wider">LIKE WHAT YOU SEE?</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Let’s make something great together.
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base">
                Have a question about this project or want to discuss an idea? I’d love to hear from
                you.
              </p>
            </div>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=febilengkong7%40gmail.com&su=${encodeURIComponent(`Tell me about ${project.title}`)}&body=${encodeURIComponent(`Hi Febiola,\n\nI saw your project "${project.title}" and would love to learn more.\n\n`)}`}
              target="_blank"
              rel="noreferrer"
              className="brutal brutal-press inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground md:self-center"
            >
              <Mail size={18} /> Contact me on Gmail <Send size={16} />
            </a>
          </div>
          <p className="relative z-10 mt-6 font-mono text-xs font-bold">febilengkong7@gmail.com</p>
        </motion.section>
      </div>
    </main>
  );
}
