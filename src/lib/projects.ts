export type ProjectScreenshot = {
  caption: string;
  src: string;
};

export type Project = {
  id: string;
  title: string;
  tab: string;
  tech: string[];
  href: string;
  sourceLabel: string;
  color: string;
  motif: string;
  summary: string;
  description: string;
  highlights: string[];
  screenshots: ProjectScreenshot[];
};

export const PROJECTS: Project[] = [
  {
    id: "anatokid",
    title: "AnatoKid: Human Anatomy Web App",
    tab: "WEB APP · REACT",
    tech: ["React.js", "JavaScript"],
    href: "https://github.com/dummy/anatokid",
    sourceLabel: "GitHub repository",
    color: "bg-primary",
    motif: "ANATOMY",
    summary: "Interactive multimedia educational web app for learning human anatomy.",
    description:
      "AnatoKid is an interactive learning experience that introduces human anatomy through visual materials, bite-sized explanations, and playful activities. Replace this sample with the project background, your role, and the problem it solves.",
    highlights: [
      "Interactive anatomy learning module",
      "Responsive learning experience",
      "Visual-first educational content",
    ],
    screenshots: [
      { caption: "Home page", src: "" },
      { caption: "Learning module", src: "" },
      { caption: "Mobile layout", src: "" },
    ],
  },
  {
    id: "e-course",
    title: "E-Course: Online Learning Platform",
    tab: "FRONTEND",
    tech: ["HTML", "CSS", "React"],
    href: "https://github.com/dummy/e-course",
    sourceLabel: "GitHub repository",
    color: "bg-secondary",
    motif: "LEARN",
    summary: "E-commerce platform for online course enrollment.",
    description:
      "An online course platform concept where learners can discover classes, compare course details, and manage enrollment. Replace this sample with the actual product story and implementation details.",
    highlights: [
      "Course discovery and detail pages",
      "Enrollment-focused user flow",
      "Reusable responsive interface",
    ],
    screenshots: [
      { caption: "Course catalog", src: "" },
      { caption: "Course detail", src: "" },
      { caption: "Enrollment flow", src: "" },
    ],
  },
  {
    id: "mediva",
    title: "MEDIVA: Hospital Information System",
    tab: "FULLSTACK",
    tech: ["Web Engineering", "MySQL"],
    href: "https://github.com/dummy/mediva",
    sourceLabel: "GitHub repository",
    color: "bg-accent",
    motif: "HEALTH",
    summary: "Medical and hospital management portal.",
    description:
      "MEDIVA is a hospital information system concept for bringing common patient and operational workflows into one place. Replace this sample with the specific features, architecture, and contribution for this project.",
    highlights: [
      "Organized hospital information",
      "Clear patient-facing workflows",
      "Structured relational data",
    ],
    screenshots: [
      { caption: "Dashboard", src: "" },
      { caption: "Patient information", src: "" },
      { caption: "Management view", src: "" },
    ],
  },
  {
    id: "alerta",
    title: "ALERTA: Natural Disaster Preparedness",
    tab: "GEMASTIK 2024",
    tech: ["UI/UX Design", "Research", "Figma"],
    href: "https://www.figma.com/dummy/alerta",
    sourceLabel: "Figma prototype",
    color: "bg-sky",
    motif: "ALERT",
    summary: "Disaster alert prototype for natural disaster mitigation.",
    description:
      "ALERTA explores how people can access useful disaster updates and preparedness guidance through a clear, accessible digital experience. Replace this sample with your research process and design decisions.",
    highlights: [
      "Disaster information at a glance",
      "Preparedness and safety guidance",
      "Research-led interface concept",
    ],
    screenshots: [
      { caption: "Information home", src: "" },
      { caption: "Alert details", src: "" },
      { caption: "Mobile prototype", src: "" },
    ],
  },
  {
    id: "ocean-guardians",
    title: "Ocean Guardians: Sea Waste Clean-Up",
    tab: "GAME UI",
    tech: ["UI Design", "Game Assets"],
    href: "https://www.figma.com/dummy/ocean-guardians",
    sourceLabel: "Figma prototype",
    color: "bg-primary",
    motif: "OCEAN",
    summary: "Gamified environmental cleanup interface.",
    description:
      "Ocean Guardians turns ocean cleanup into a playful game concept, using visual feedback to encourage environmentally conscious actions. Replace this sample with the game loop and design contribution.",
    highlights: [
      "Playful cleanup mission concept",
      "Game-ready visual assets",
      "Progress and reward feedback",
    ],
    screenshots: [
      { caption: "Game menu", src: "" },
      { caption: "Gameplay screen", src: "" },
      { caption: "Progress and rewards", src: "" },
    ],
  },
  {
    id: "ar-furniture",
    title: "AR Furniture Application",
    tab: "AR CONCEPT",
    tech: ["3D Modeling", "Blender", "AR"],
    href: "https://github.com/dummy/ar-furniture",
    sourceLabel: "GitHub repository",
    color: "bg-secondary",
    motif: "SPACE",
    summary: "Interactive spatial furniture visualization.",
    description:
      "An augmented reality concept for previewing furniture in a room before making a purchase decision. Replace this sample with the supported devices, 3D workflow, and your implementation details.",
    highlights: [
      "3D furniture visualization",
      "Room-scale placement concept",
      "Product preview experience",
    ],
    screenshots: [
      { caption: "Product selection", src: "" },
      { caption: "AR room preview", src: "" },
      { caption: "Furniture details", src: "" },
    ],
  },
  {
    id: "satria-data",
    title: "Statistics & Data Science (SATRIA DATA)",
    tab: "INFOGRAPHIC",
    tech: ["Infographic Design", "Figma"],
    href: "https://www.figma.com/dummy/satria-data",
    sourceLabel: "Figma design",
    color: "bg-accent",
    motif: "DATA",
    summary: "Data visualization on poverty metrics.",
    description:
      "A data storytelling concept that makes selected poverty indicators easier to understand through a focused infographic. Replace this sample with the dataset, key findings, and design rationale.",
    highlights: [
      "Data translated into visual stories",
      "Clear information hierarchy",
      "Infographic design system",
    ],
    screenshots: [
      { caption: "Main infographic", src: "" },
      { caption: "Data visualization detail", src: "" },
      { caption: "Presentation version", src: "" },
    ],
  },
  {
    id: "lidm",
    title: "LIDM: Digital Learning Innovation",
    tab: "PROTOTYPE",
    tech: ["Prototyping", "Figma"],
    href: "https://www.figma.com/dummy/lidm",
    sourceLabel: "Figma prototype",
    color: "bg-sky",
    motif: "STUDY",
    summary: "Digital learning platform design.",
    description:
      "A digital learning platform prototype focused on helping students move through learning content in a more engaging and structured way. Replace this sample with your target users and design process.",
    highlights: [
      "Structured learning journeys",
      "Interactive prototype flows",
      "Student-focused interface concept",
    ],
    screenshots: [
      { caption: "Learning dashboard", src: "" },
      { caption: "Course materials", src: "" },
      { caption: "Learning progress", src: "" },
    ],
  },
  {
    id: "mood",
    title: "MOOD: Emotion Detection App",
    tab: "UI/UX",
    tech: ["UI/UX Design", "HCI"],
    href: "https://www.figma.com/dummy/mood",
    sourceLabel: "Figma prototype",
    color: "bg-primary",
    motif: "MOOD",
    summary: "Emotion detection platform based on image and sound.",
    description:
      "MOOD is an emotion-awareness app concept exploring image and sound inputs with a calm, human-centered interface. Replace this sample with the actual interaction flow and privacy considerations.",
    highlights: [
      "Image and sound input concept",
      "Emotion result visualization",
      "Human-centered interaction design",
    ],
    screenshots: [
      { caption: "Home page", src: "" },
      { caption: "Input and analysis", src: "" },
      { caption: "Detection results", src: "" },
    ],
  },
];
