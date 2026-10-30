export type ProjectScreenshot = {
  caption: string;
  src: string;
  fit?: "cover" | "contain";
};

export type Project = {
  id: string;
  title: string;
  tab: string;
  tech: string[];
  liveHref?: string;
  repositoryHref?: string;
  designHref?: string;
  role: string;
  color: string;
  motif: string;
  summary: string;
  description: string;
  highlights: string[];
  screenshots: ProjectScreenshot[];
};

function projectScreenshots(
  projectTitle: string,
  filenames: string[],
  fit?: ProjectScreenshot["fit"],
): ProjectScreenshot[] {
  return filenames.map((filename, index) => ({
    caption: `${projectTitle} — Screenshot ${index + 1}`,
    src: `/assets/${encodeURIComponent(filename)}`,
    ...(fit ? { fit } : {}),
  }));
}

const PROJECT_ORDER = [
  "butter-crumb",
  "lip-velvet",
  "anatokid",
  "e-course",
  "mediva",
  "alerta",
  "ocean-guardians",
  "ar-furniture",
  "satria-data",
  "learnify",
];

export const PROJECTS: Project[] = [
  {
    id: "anatokid",
    title: "AnatoKid",
    tab: "WEB APP",
    tech: [
      "React 19",
      "Vite 7",
      "Tailwind CSS 4",
      "React Router 7",
      "Lucide React",
      "Web Speech API",
    ],
    repositoryHref: "https://github.com/febbyyyyh/human-body-multimedia-project",
    role: "Developer",
    color: "bg-primary",
    motif: "ANATOMY",
    summary: "An interactive anatomy learning app for elementary school students.",
    description:
      "AnatoKid is an interactive learning app that helps elementary school students explore the human body's organs through illustrations and clear, age-appropriate explanations.",
    highlights: [
      "Explore six major organs: the lungs, heart, stomach, intestines, liver, and kidneys.",
      "Listen to organ descriptions and fun facts with browser-based text-to-speech.",
      "Explore structured detail pages combining anatomy illustrations, functions, and fun facts.",
      "Use intuitive navigation and a responsive layout across desktop, tablet, and mobile.",
    ],
    screenshots: projectScreenshots("AnatoKid", ["anato-1.png", "anato-2.png", "anato-3.png"]),
  },
  {
    id: "e-course",
    title: "E-Course",
    tab: "FRONTEND",
    tech: ["HTML5", "Modular CSS3", "Vanilla JavaScript", "Font Awesome", "Google Fonts (Inter)"],
    repositoryHref: "https://github.com/febbyyyyh/project-ecommerce",
    role: "Frontend Developer",
    color: "bg-secondary",
    motif: "COURSE",
    summary: "A frontend prototype for an online course platform.",
    description:
      "E-Course is a frontend prototype for an online learning platform. Users can browse a course catalog, view course details, review their cart, try a checkout flow, and access their learning activity and profile.",
    highlights: [
      "Browse and search popular courses, with topic details and class prerequisites.",
      "Review a shopping cart and try a manual bank-transfer checkout with an interactive confirmation dialog.",
      "Track course activity and learning progress from a dedicated dashboard.",
      "Use role-based login and a profile page with account information and purchase history.",
    ],
    screenshots: projectScreenshots("E-Course", [
      "ecourse-1.png",
      "ecourse-2.png",
      "ecourse-3.png",
      "ecourse-4.png",
    ]),
  },
  {
    id: "mediva",
    title: "MEDIVA (Medical Health Center)",
    tab: "FULLSTACK",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap 4",
      "jQuery Slim",
      "Popper.js",
      "Font Awesome",
      "Google Fonts (Inter)",
    ],
    repositoryHref: "https://github.com/febbyyyyh/medical-health-web",
    role: "Frontend Developer",
    color: "bg-accent",
    motif: "MEDIVA",
    summary: "A hospital information system prototype for patients and staff.",
    description:
      "MEDIVA is a healthcare web prototype connecting patients, doctors, and hospital administrators. It includes doctor search and appointment booking for patients, plus schedule, shift, and service-report management for medical staff and administrators.",
    highlights: [
      "Provide separate role-based interfaces for patients, doctors, and administrators.",
      "Let patients find doctors, book appointments, manage profiles, and receive consultation and medication reminders.",
      "Help doctors review daily consultations, patient lists, notifications, and work-hour reports.",
      "Give administrators operational statistics and tools to manage appointments, practice schedules, staff shifts, and service reports.",
    ],
    screenshots: projectScreenshots("MEDIVA", [
      "mediva-1.png",
      "mediva-2.png",
      "mediva-3.png",
      "mediva-4.png",
    ]),
  },
  {
    id: "alerta",
    title: "ALERTA",
    tab: "UI/UX DESIGN",
    tech: [
      "Figma",
      "User Research",
      "Wireframing",
      "High-Fidelity UI Design",
      "Interactive Prototyping",
    ],
    designHref:
      "https://www.figma.com/proto/bvBTOoDVhxbtzMWvSfb8sy/MENYALA?page-id=0%3A1&node-id=9-2032&viewport=809%2C-4274%2C0.89&t=7e1dCFmys5wjV6Pc-1&scaling=scale-down&starting-point-node-id=9%3A2032&show-proto-sidebar=1",
    role: "UI/UX Designer",
    color: "bg-sky",
    motif: "ALERTA",
    summary: "An emergency-response app concept for disaster alerts and evacuation support.",
    description:
      "ALERTA is a natural-disaster mitigation app concept designed to deliver critical information and navigation quickly and clearly during emergencies. Its UI/UX focuses on emergency response, where people need to understand what to do within seconds.",
    highlights: [
      "Send early-warning notifications in the app and by message when a nearby disaster is detected.",
      "Use the user's location to provide a map route to the nearest safe evacuation point.",
      "Connect family members in a shared monitoring group using a referral code.",
      "Share family members' live locations, safety statuses, and emergency messages in one place.",
    ],
    screenshots: projectScreenshots("ALERTA", ["alerta.jpeg"], "contain"),
  },
  {
    id: "ocean-guardians",
    title: "Ocean Guardians",
    tab: "GAME UI / 3D",
    tech: ["Figma", "Blender", "Canva"],
    designHref:
      "https://www.figma.com/proto/ZuR55pSMwhQISJR8VeZFMj/Game-Project?node-id=1-264&viewport=76%2C92%2C0.16&t=h1fe2myBMchktt0n-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A264&page-id=0%3A1&show-proto-sidebar=1",
    role: "UI/UX Designer & 2D/3D Visual Asset Artist",
    color: "bg-primary",
    motif: "OCEAN",
    summary: "An educational 3D game about marine pollution and ocean cleanup (SDG 14).",
    description:
      "Ocean Guardians: Sea Waste Clean-Up is an educational 3D game that encourages players to tackle marine pollution through waste-collection missions. Inspired by Sustainable Development Goal 14, Life Below Water, it promotes ocean conservation through an engaging and interactive experience.",
    highlights: [
      "Explore an underwater-themed main menu with navigation and an exit-confirmation dialog.",
      "Choose Easy, Normal, or Hard difficulty to adjust the challenge of each cleanup mission.",
      "Follow a clear in-game HUD showing the score, waste target, and countdown timer.",
      "See educational win and timeout screens with messages about single-use plastics and their impact on marine mammals.",
      "Experience custom 2D interface graphics alongside an interactive 3D environment.",
    ],
    screenshots: projectScreenshots("Ocean Guardians", [
      "og-1.png",
      "og-2.png",
      "og-3.png",
      "og-4.png",
    ]),
  },
  {
    id: "ar-furniture",
    title: "AR Furniture Application",
    tab: "3D ART",
    tech: ["Blender 4.2.1 LTS"],
    role: "3D Artist",
    color: "bg-secondary",
    motif: "FURNITURE",
    summary: "Real-scale 3D furniture assets designed for an augmented reality app.",
    description:
      "The AR Furniture Application lets users visualize household furniture, including tables, chairs, and beds, directly in their physical space. Detailed 3D assets with real-world proportions help users make more informed decisions about arranging a room.",
    highlights: [
      "Model furniture to accurate real-world dimensions using metric units.",
      "Create varied assets, including dining or work tables, modern metal-leg chairs, cushioned chairs, and beds.",
      "Build realistic wood, metal, and fabric materials with shader-based texturing.",
      "Organize meshes and scene collections to support export and performance optimization for AR.",
    ],
    screenshots: projectScreenshots("AR Furniture", ["ar-1.jpg", "ar-2.jpg", "ar-3.jpg"]),
  },
  {
    id: "satria-data",
    title: "Satria Data (National Competition)",
    tab: "DATA VIS.",
    tech: ["Figma", "Canva", "Microsoft Excel", "Data Processing"],
    role: "Infographic & Data Visualization Designer",
    color: "bg-accent",
    motif: "DATA",
    summary: "A pop-art infographic comparing poverty in rural and urban Indonesia.",
    description:
      'Created for the national SATRIA DATA competition, this data-processing and infographic project explores "Poverty Rates in Rural and Urban Areas" in Indonesia from 2010 to 2020. Comic-inspired pop-art storytelling makes comparisons of economic trends, population distribution, and poverty levels accessible to a broad audience.',
    highlights: [
      "Compare urban and rural populations and poverty through bar charts, alongside GDP and HDI trends in line charts.",
      "Present urbanization trends alongside changes in poverty rates in urban and rural areas.",
      "Show the relationship between poverty, GDP per capita, and the Human Development Index (HDI).",
      "Visualize six social impacts of poverty and four pillars for inclusive economic equity.",
      "Guide readers from the problem and data analysis through its social impact to potential solutions with a pop-art comic-strip layout.",
    ],
    screenshots: projectScreenshots("Satria Data", ["satria data.jpeg"], "contain"),
  },
  {
    id: "learnify",
    title: "Learnify (LIDM Competition)",
    tab: "UI/UX DESIGN",
    tech: [
      "Figma",
      "User Flows",
      "Wireframing",
      "High-Fidelity UI Design",
      "Design Systems",
      "Interactive Prototyping",
    ],
    designHref: "https://www.figma.com/",
    role: "UI/UX Designer",
    color: "bg-sky",
    motif: "LEARNIFY",
    summary: "A gamified short-video learning app concept for a digital innovation competition.",
    description:
      "Learnify is an interactive mobile learning concept that combines short-form videos with gamification to help students build motivation and consistent study habits. Developed for a digital innovation competition, it makes complex science and mathematics topics more approachable through concise, social, and competitive learning experiences.",
    highlights: [
      "Browse vertical lesson and problem-solving videos with comments, emoji reactions, and quick search.",
      "Challenge another learner to a one-on-one multiple-choice quiz battle with a progress indicator.",
      "Track weekly learning streaks alongside personal totals for active days, videos watched, and quizzes completed.",
      "Explore popular topics and filter lessons by subject and grade level.",
      "Save lessons to custom playlists or create new playlists to organize study materials.",
    ],
    screenshots: [
      ...projectScreenshots("Learnify (LIDM)", ["LIDM.jpeg"], "contain"),
      ...projectScreenshots("LIDM Documentation", ["lidm-dokumentasi.jpg"], "contain"),
    ],
  },
  {
    id: "butter-crumb",
    title: "Butter & Crumb",
    tab: "FRONTEND",
    tech: [
      "React 19",
      "JavaScript",
      "Vite 8",
      "Tailwind CSS 3",
      "PostCSS",
      "Autoprefixer",
      "ESLint",
    ],
    liveHref: "https://landing-page-fnb.vercel.app/",
    repositoryHref: "https://github.com/febbyyyyh/landing-page-fnb.git",
    role: "Frontend Developer",
    color: "bg-primary",
    motif: "BAKERY",
    summary: "A responsive landing page for an artisan bakery brand.",
    description:
      "Butter & Crumb is a responsive landing page that introduces an artisan bakery brand and showcases its pastries. Visitors can explore featured products, menus, promotions, and the brand story, then try an ordering flow with product quantities and pickup or delivery options. Prices and order totals update automatically.",
    highlights: [
      "Responsive layouts for desktop and mobile devices.",
      "Interactive navigation to Home, Menu, About Us, and Order Now, including a mobile menu.",
      "Showcase featured pastries and menu items with images, descriptions, and prices.",
      "Browse pastry options with a menu carousel.",
      "Add and remove cart items, clear the cart, and review the total price.",
      "Highlight a happy-hour promotion with 30% off selected pastries.",
      "Try an order flow with product, quantity, pickup or delivery selection, and automatic total calculation.",
      "Introduce the bakery's story and values, with a shortcut back to the top of the page.",
    ],
    screenshots: projectScreenshots("Butter & Crumb", [
      "crumb-1.png",
      "crumb-2.png",
      "crumb-3.png",
      "crumb-4.png",
    ]),
  },
  {
    id: "lip-velvet",
    title: "Lip Velvet (Velvetté)",
    tab: "FRONTEND",
    tech: [
      "JavaScript",
      "React 19",
      "Vite 8",
      "Tailwind CSS 4",
      "Framer Motion 13",
      "Lucide React",
      "Google Fonts",
    ],
    liveHref: "https://velvette-wine.vercel.app/",
    repositoryHref: "https://github.com/febbyyyyh/lip-lp.git",
    role: "Frontend Developer — React UI & Interaction Implementation",
    color: "bg-secondary",
    motif: "VELVETTÉ",
    summary: "A responsive cosmetics landing page with an interactive lipstick shade finder.",
    description:
      "I developed an e-commerce landing page for Velvetté, a cosmetics brand with a soft-pink editorial identity. It showcases lipstick collections, bundle promotions, and brand information, with an interactive shade finder and shopping cart. Responsive layouts and animation support the experience across desktop and mobile.",
    highlights: [
      "Explore hero, bundle promotion, best seller, product catalog, shade finder, about, and footer sections.",
      "Get shade recommendations based on a selected skin tone.",
      "Browse three products with prices and add-to-cart controls.",
      "Manage cart quantities, review the total, and remove products.",
      "Use simple search to navigate to page sections.",
      "Navigate the mobile layout and return to the top of the page.",
      "Experience product and page animations.",
    ],
    screenshots: projectScreenshots("Lip Velvet", [
      "lip-1.png",
      "lip-2.png",
      "lip-3.png",
      "lip-4.png",
      "lip-5.png",
    ]),
  },
].sort((first, second) => PROJECT_ORDER.indexOf(first.id) - PROJECT_ORDER.indexOf(second.id));
