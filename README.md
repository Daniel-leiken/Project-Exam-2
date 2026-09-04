# Holidaze

A modern front end for **Holidaze**, an accommodation booking application built against the
[Noroff API v2](https://docs.noroff.dev/docs/v2). Customers can browse, search and book venues,
while venue managers can create and manage venues and see their bookings.

This is the Project Exam 2 submission for the Noroff Front-end Development programme.

**Live demo:** https://project-exam-2-danielstr.netlify.app

## Features

**For everyone**

- Browse a paginated list of venues
- Search venues by name or description
- View a single venue with images, amenities, host and rating
- See a venue's availability on a calendar (booked dates are blocked)

**For registered customers** (`stud.noroff.no` email)

- Register, log in and log out
- Update your avatar
- Book a venue for a date range and number of guests
- View your upcoming bookings

**For venue managers**

- Everything a customer can do, plus:
- Create, edit and delete your own venues
- View the bookings made on your venues
- Toggle venue-manager status from your profile

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite |
| Styling | Tailwind CSS 3 |
| Routing | React Router 7 |
| Icons | Lucide |
| Calendar | react-day-picker + date-fns |
| Linting / formatting | ESLint + Prettier |
| Hosting | Netlify |

## Getting started

### Prerequisites

- Node.js 18 or newer

### Setup

```bash
git clone https://github.com/Daniel-leiken/Project-Exam-2.git
cd Project-Exam-2
npm install
```

Create a local `.env` from the example:

```bash
cp .env.example .env
```

```ini
# Optional — defaults to the Noroff production API if unset
VITE_API_BASE_URL=https://v2.api.noroff.dev
```

> **API key:** you do **not** need to set one. The app creates a Noroff API key automatically
> when you log in (via `POST /auth/create-api-key`) and stores it for the session. You can
> optionally pin a static key with `VITE_API_KEY`, but it is not required.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source files with Prettier |

## Notes for testers

- Registration **requires a `stud.noroff.no` email address**.
- Use one account to test the **customer** flow: browse → search → open a venue → pick dates and
  guests → **Book now** → see it under **Upcoming bookings** on your profile.
- To test the **venue manager** flow, either register with the "venue manager" option, or open
  your **Profile** and click **Become a venue manager**. A **Dashboard** link then appears where
  you can create, edit and delete venues and view their bookings.

## Project structure

```
src/
├── api/          # Noroff API client + endpoint modules (auth, venues, bookings, profiles)
├── components/   # UI kit (ui/), layout, and feature components (venue/)
├── context/      # Auth and Toast providers
├── hooks/        # useAuth, useToast, useApiQuery, useDebounce, useDocumentTitle
├── pages/        # Route pages
├── utils/        # cn, storage, validation, formatting helpers
├── App.jsx       # Routes (lazy-loaded) with protected + manager-only areas
└── main.jsx      # Entry: Router + providers
```

## Required links

- **Repository:** https://github.com/Daniel-leiken/Project-Exam-2
- **Hosted demo:** https://project-exam-2-danielstr.netlify.app
- **Kanban board:** https://github.com/users/Daniel-leiken/projects/2
- **Gantt chart:** [GANTT.md](GANTT.md)
- **Design prototype:** https://www.figma.com/design/PcsdABq1I9XK7yMARsEJZD/Project-Exam-2---Holidaze?node-id=1-1000
- **Style guide:** https://project-exam-2-danielstr.netlify.app/Holidaze-Style-Guide.pdf

## Planning

- [Project plan](PROJECT-PLAN.md)
- [Gantt chart](GANTT.md)
