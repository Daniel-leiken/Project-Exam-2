# Holidaze

Front end for **Holidaze**, an accommodation booking application built against the
[Noroff API v2](https://docs.noroff.dev/docs/v2). Customers can browse and book venues,
while venue managers can create and manage their own venues and view bookings.

This is the Project Exam 2 submission for the Noroff Front-end Development programme.

## Tech stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router** for client-side routing
- Deployed on **Netlify**

## Getting started

### Prerequisites

- Node.js 18 or newer
- An API key from the Noroff API (see below)

### Setup

```bash
git clone https://github.com/Daniel-leiken/Project-Exam-2.git
cd Project-Exam-2
npm install
```

Create a `.env` file based on the example and add your API key:

```bash
cp .env.example .env
```

```ini
VITE_API_BASE_URL=https://v2.api.noroff.dev
VITE_API_KEY=your-api-key
```

> An API key is created by sending a `POST` request to `/auth/create-api-key` with a logged-in
> token. See the [Noroff API key docs](https://docs.noroff.dev/docs/v2/auth/api-key) for details.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source files with Prettier |

## Notes for testers

Registration requires a `stud.noroff.no` email address. Use one account to test the customer
flow (browse, search, book) and register as a venue manager to test creating and managing venues.

## Project planning

- [Project plan](PROJECT-PLAN.md)
- [Gantt chart](GANTT.md)
- [Kanban board](https://github.com/users/Daniel-leiken/projects/2)
