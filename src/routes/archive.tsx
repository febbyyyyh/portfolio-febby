import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Camera } from "lucide-react";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "The Archive | Febiola Lengkong" },
      {
        name: "description",
        content:
          "A scrapbook of the people, projects, and little moments that shaped Febiola Lengkong's campus years.",
      },
    ],
  }),
  component: ArchivePage,
});

const ARCHIVE_GROUP_ORDER = ["college", "high-school", "junior-high"];

const ARCHIVE_GROUPS = [
  {
    id: "junior-high",
    label: "JUNIOR HIGH SCHOOL",
    title: "Junior High School",
    description: "Dance competitions, school events, and memories with classmates.",
    photos: [
      {
        src: "/assets/archive/jhs-1.webp",
        caption: "A school-day memory with friends",
      },
      {
        src: "/assets/archive/jhs-2.webp",
        caption: "A school visit with classmates",
      },
      {
        src: "/assets/archive/jhs-9a.webp",
        caption: "Class 9A together",
      },
      {
        src: "/assets/archive/jhs-jrbl-3.webp",
        caption: "The dance team at the 2018 Junior Basketball League (JRBL)",
      },
      {
        src: "/assets/archive/jhs-jrbl-4.webp",
        caption: "Dance team photo at the 2018 Junior Basketball League (JRBL)",
      },
      {
        src: "/assets/archive/jhs-jrbl.webp",
        caption: "Dance team selfie at the 2018 Junior Basketball League (JRBL)",
      },
      {
        src: "/assets/archive/jhs-valentine-panitia.webp",
        caption: "OSIS Valentine event committee",
      },
      {
        src: "/assets/archive/jhs.webp",
        caption: "A happy moment with junior high classmates",
      },
    ],
  },
  {
    id: "high-school",
    label: "HIGH SCHOOL",
    title: "High School",
    description: "OSIS, school competitions, class activities, and the people behind them.",
    photos: [
      {
        src: "/assets/archive/shs-bakti-sosial-angkatan.webp",
        caption: "Class community service day",
      },
      {
        src: "/assets/archive/shs-dekor-kelas.webp",
        caption: "Decorating the classroom together",
      },
      {
        src: "/assets/archive/shs-foto-yearbook.webp",
        caption: "A yearbook portrait with friends",
      },
      {
        src: "/assets/archive/shs-gradu.webp",
        caption: "Graduation day",
      },
      {
        src: "/assets/archive/shs-lomba-mading-osis.webp",
        caption: "OSIS magazine wall competition",
      },
      {
        src: "/assets/archive/shs-lomba-vokal-grup.webp",
        caption: "A vocal group competition",
      },
      {
        src: "/assets/archive/shs-lomba-yel-yel.webp",
        caption: "Cheer competition with OSIS teams",
      },
      {
        src: "/assets/archive/shs-osis-2.webp",
        caption: "An OSIS group gathering",
      },
      {
        src: "/assets/archive/shs-osis-bersih.webp",
        caption: "Working together on a school clean-up",
      },
      {
        src: "/assets/archive/shs-osis-ipa-4.webp",
        caption: "OSIS of 12 IPA 4",
      },
      {
        src: "/assets/archive/shs-osis.webp",
        caption: "An OSIS portrait with the team",
      },
      {
        src: "/assets/archive/shs-osiss.webp",
        caption: "A high school group photo (OSIS)",
      },
      {
        src: "/assets/archive/shs-pertemuan-berkala-katolik.webp",
        caption: "Catholic student fellowship gathering",
      },
      {
        src: "/assets/archive/shs-pramuka.webp",
        caption: "A fun moment with friends from Pramuka",
      },
      {
        src: "/assets/archive/shs-vila.webp",
        caption: "A class outing with friends",
      },
      {
        src: "/assets/archive/shs-vokal-grup.webp",
        caption: "Performing with the vocal group",
      },
      {
        src: "/assets/archive/shs.webp",
        caption: "A high school memory with classmates",
      },
    ],
  },
  {
    id: "college",
    label: "COLLEGE",
    title: "College",
    description: "Campus organizations, student projects, competitions, and event teams.",
    photos: [
      {
        src: "/assets/archive/kuliah-hme-project.webp",
        caption: "Working on an HME project with the team",
      },
      {
        src: "/assets/archive/kuliah-lidm.webp",
        caption: "A team moment from the LIDM competition",
      },
      {
        src: "/assets/archive/kuliah-lomba-gemastik-2.webp",
        caption: "A quick photo during GEMASTIK",
      },
      {
        src: "/assets/archive/kuliah-ppk-ormawa-dengan-dekan.webp",
        caption: "PPK Ormawa team meeting with the dean",
      },
      {
        src: "/assets/archive/kuliah-ppk-ormawa.webp",
        caption: "A PPK Ormawa team gathering",
      },
      {
        src: "/assets/QA.jpg",
        caption: "Celebrating a Quality Assurance achievement with the team",
      },
      {
        src: "/assets/sertifikat-ppk ormawa.jpg",
        caption: "PPK Ormawa 2024 implementation team certificate",
      },
      {
        src: "/assets/archive/kuliah-pranatal.webp",
        caption: "A PRANATAL HME gathering",
      },
      {
        src: "/assets/archive/kuliah-rapat-pengurus-hme.webp",
        caption: "An HME committee meeting",
      },
      {
        src: "/assets/archive/kuliah.webp",
        caption: "A campus organization gathering",
      },
      {
        src: "/assets/archive/kuliiah-volunteer-suro-cup.webp",
        caption: "Volunteering with the SURO CUP team",
      },
    ],
  },
].sort((first, second) => {
  return ARCHIVE_GROUP_ORDER.indexOf(first.id) - ARCHIVE_GROUP_ORDER.indexOf(second.id);
});

function ArchivePage() {
  return (
    <main className="grid-paper min-h-screen overflow-hidden px-4 pb-16 pt-6">
      <header className="brutal mx-auto flex max-w-6xl items-center justify-between rounded-full bg-card px-4 py-3">
        <Link
          to="/"
          className="brutal rounded-full bg-primary px-3 py-1 font-display text-sm text-primary-foreground"
        >
          FEBIOLA.DEV
        </Link>
        <Link
          to="/"
          hash="projects"
          className="brutal brutal-press inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </header>

      <section className="mx-auto max-w-6xl py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <p className="font-pixel text-[9px] leading-relaxed text-primary">
            SCHOOL DAYS / CAMPUS LIFE / MEMORIES
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl">The Archive</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground sm:text-lg">
            A scrapbook of the people, projects, and moments that shaped my journey from school to
            college.
          </p>
          <span className="brutal mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
            <Camera size={17} />{" "}
            {ARCHIVE_GROUPS.reduce((count, group) => count + group.photos.length, 0)} memories
            across three chapters
          </span>
        </motion.div>

        <nav aria-label="Archive chapters" className="mb-12 flex flex-wrap justify-center gap-3">
          {ARCHIVE_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="brutal brutal-press rounded-full bg-card px-4 py-2 text-sm font-bold"
            >
              {group.title}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {ARCHIVE_GROUPS.map((group, groupIndex) => (
            <section key={group.id} id={group.id} className="scroll-mt-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-pixel text-[8px] text-primary">{group.label}</p>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl">{group.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                    {group.description}
                  </p>
                </div>
                <span className="brutal w-fit rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold">
                  {String(group.photos.length).padStart(2, "0")} PHOTOS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.photos.map((photo, photoIndex) => (
                  <motion.figure
                    key={photo.src}
                    initial={{ opacity: 0, y: 18, rotate: (photoIndex % 3) - 1 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    whileHover={{ y: -4, rotate: photoIndex % 2 === 0 ? 0.5 : -0.5 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.3, delay: (photoIndex % 3) * 0.05 }}
                    className={`brutal group overflow-hidden rounded-xl bg-card p-2 ${
                      photoIndex % 3 === 1 ? "lg:translate-y-3" : ""
                    }`}
                  >
                    <div className="overflow-hidden rounded-lg border-2 border-ink bg-muted">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="flex items-start gap-3 px-2 py-3">
                      <span className="font-pixel text-[8px] text-primary">
                        {String(photoIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-bold leading-snug">{photo.caption}</span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
              {groupIndex < ARCHIVE_GROUPS.length - 1 && (
                <div className="mt-12 border-b-2 border-dashed border-ink/30" aria-hidden="true" />
              )}
            </section>
          ))}
        </div>

        <div className="brutal-lg mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary p-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-pixel text-[8px]">MORE MEMORIES TO COME</p>
            <p className="mt-2 font-bold">Thanks for taking a little trip through my archive.</p>
          </div>
          <Link
            to="/"
            hash="about"
            className="brutal brutal-press inline-flex shrink-0 items-center gap-2 rounded-full bg-card px-4 py-2 font-bold"
          >
            Back to About <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
