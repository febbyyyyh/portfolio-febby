# Febiola Hortensia Lengkong — Portfolio

A personal portfolio showcasing my work across frontend development, full-stack web projects, and UI/UX design. The site pairs a playful Y2K Neo-Brutalist visual style with interactive project folders, case-study modals, and responsive layouts.

## Features

- Responsive portfolio sections for my introduction, experience, projects, certifications, and contact information.
- Interactive project folders with detailed previews, screenshot galleries, technology stacks, and project links.
- Certificate preview modals that keep visitors on the portfolio.
- Persistent light and dark themes.
- Custom animated cursor and motion effects.
- Mobile navigation and layouts designed for touch screens.
- Direct email contact links.

## Tech Stack

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Tailwind CSS 4
- Framer Motion
- Vite
- Vitest and Testing Library

## Getting Started

Requirements: Node.js and npm.

```bash
git clone https://github.com/febbyyyyh/portfolio-febby.git
cd portfolio-febby
npm install
npm run dev
```

The development server prints its local URL after it starts.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite |

## Updating Portfolio Content

- Edit project descriptions, technologies, highlights, links, and screenshot paths in [`src/lib/projects.ts`](./src/lib/projects.ts).
- Replace the sample image files in `public/assets/` with your own portfolio assets as needed.
- Update the portfolio copy, contact information, and section content in [`src/routes/index.tsx`](./src/routes/index.tsx).

Some project descriptions, screenshots, and external links are currently sample content and should be replaced with the final project details.

## Contact

- Email: [febilengkong7@gmail.com](mailto:febilengkong7@gmail.com)
- GitHub: [@febbyyyyh](https://github.com/febbyyyyh)
