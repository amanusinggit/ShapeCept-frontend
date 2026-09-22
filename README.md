# ShapeCept — Frontend (React + Vite)

A modern React frontend for ShapeCept — a learning platform for building and delivering interactive lessons. This repository contains a Vite-powered React app with a small component library, lesson rendering blocks, stores for application state, and utilities for exporting lesson content.

This README documents how to get the project running, the folder layout, development workflow, and suggestions for contribution.

## Table of contents

- Project overview
- Quick start
- Scripts
- Folder structure
- Key components and stores
- Development notes
- Contributing
- License

## Project overview

This frontend is built with:

- React (JSX) — functional components and hooks
- Vite — fast dev server and build tooling
- ESLint — linting configuration (see `eslint.config.js`)

The app renders courses and lessons made of content blocks (paragraphs, headings, code blocks, videos, MCQs), provides course listing and search UI, and supports exporting lesson content to PDF.

## Quick start

Prerequisites:

- Node.js 18+ (LTS recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
yarn
```

Run development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:5173 in your browser (Vite default) to view the app.

Build for production:

```bash
npm run build
# or
yarn build
```

Preview production build locally:

```bash
npm run preview
# or
yarn preview
```

Run the linter:

```bash
npm run lint
# or
yarn lint
```

## Scripts

Common scripts are defined in `package.json`:

- `dev` — start Vite dev server
- `build` — build production assets
- `preview` — locally preview built app
- `lint` — run ESLint

Check `package.json` for the exact script commands.

## Folder structure

Top-level important files:

- `index.html` — app entry
- `vite.config.js` — Vite configuration
- `eslint.config.js` — ESLint config
- `src/` — application source

Key `src` folders:

- `assets/` — static assets
- `Components/` — reusable UI components (cards, header, nav, lesson blocks)
- `app/` — application stores: `ApplicationStore.js`, `CourseStore.js`, `LessonStore.js`, `ModuleStore.js`
- `Pages/` — route components for views (Home, Courses, Course, Lesson, Auth, Error)
- `Utils/` — utilities such as `canvasToPDF.js`, `getOrdinalSuffix.js`, and `Theme.js`

## Key components and stores

- `LessonRenderer/LessonRenderer.jsx` — composes lesson blocks into a lesson view
- `LessonRenderer/Block/*` — individual block renderers (Paragraph, Heading, Code, MCQ, Video)
- `CourseCard/CourseCard.jsx` — course preview card used in listings
- `ApplicationStore.js` — top-level state and UI flags
- `CourseStore.js`, `LessonStore.js`, `ModuleStore.js` — domain stores for courses, lessons, modules

If you're editing stores, prefer careful state updates and keep side-effects (network calls) separate from pure state reducers.

## Development notes & tips

- Component styling: the project uses `index.css` as a global stylesheet. Follow existing conventions when adding styles.
- Add new blocks by creating files under `src/Components/LessonRenderer/Block/` and exporting them from `LessonRenderer.jsx`.
- For large refactors, run `npm run lint` and ensure no new ESLint errors are introduced.
- When adding external dependencies, keep the `package.json` tidy and add a short note in this README about why the package was added.

### Exporting lessons to PDF

The repository includes `src/Utils/canvasToPDF.js` which helps convert lesson canvas content to PDF. If you modify PDF-related logic, test using the largest lesson content you expect to support.

## Contributing

1. Fork the repository (or create a branch) and make your changes.
2. Run the test/dev server locally and verify behavior.
3. Open a pull request with a clear description of changes and rationale.

For larger features, open an issue first to discuss design and API changes.

## License

Add your license information here (e.g., MIT). If you don't want to open-source, indicate that in the repository description.

---

If you'd like, I can:

- add a short `DEVELOPMENT.md` with contribution guidelines,
- generate a `CHANGELOG.md` starter,
- or update `package.json` scripts if you want custom commands.

Tell me which of the follow-ups you'd like me to do next.
