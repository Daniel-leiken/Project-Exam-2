# Holidaze — Project Plan (Project Exam 2)

> Front-end accommodation booking app built against the Noroff Holidaze API.
> This plan is the source for the **Gantt chart** and **GitHub Projects (Kanban)** board.

## Locked decisions (Technical Restrictions ✅)

| Area | Choice | Spec status |
|------|--------|-------------|
| JS framework | **React 18 + Vite** | React (>16) — approved |
| CSS framework | **Tailwind CSS** (+ shadcn/ui from Figma Make export) | Tailwind (>3) — approved |
| Hosting | **Netlify** | approved static host |
| Design app | **Figma** (design already in Figma Make) | approved |
| Planning app | **GitHub Projects** | approved |
| API | Noroff Holidaze API (v2) | required |

## Delivery target
- **Deadline: 13 September 2026**
- Start: 8 June 2026 → ~14 weeks (part-time, one step per work session)
- Final merge to `main`. README must explain setup, run, and tester instructions.

## Required links to deliver (Moodle)
1. Gantt chart — _from this plan_
2. Design prototype — _Figma_
3. Style guide — _Figma_
4. Kanban board — _GitHub Projects_
5. Repository link — _GitHub_
6. Hosted demo link — _Netlify_

---

## How to use this plan
The work is split into **8 phases (epics)**. Each phase is a set of **tasks** → these become Kanban cards.
Tackle them top-to-bottom, roughly one phase per 1–2 weeks. Each task notes which **User Story (US)** or
**Marking Criterion (MC)** it satisfies, so nothing graded is missed.

---

## Phase 0 — Project setup & required links foundation
**Target: Week 1 (Jun 8–14)** · *Goal: everything green and deploying before any feature code.*

- [ ] Create GitHub repository + connect local repo
- [ ] Install & auth `gh` CLI (`brew install gh`), or set up board in browser
- [ ] Create **GitHub Projects** Kanban board (columns: Backlog / To do / In progress / Review / Done)
- [ ] Turn this plan's phases into board cards / issues
- [ ] Build the **Gantt chart** from these phase dates
- [ ] Scaffold React + Vite project (`npm create vite@latest`)
- [ ] Install & configure **Tailwind CSS**
- [ ] Set up ESLint + Prettier (MC: JS well formatted / best practices)
- [ ] Define folder structure (`/components`, `/pages`, `/api`, `/context`, `/hooks`, `/utils`)
- [ ] `.env` for API base URL + API key; `.gitignore`
- [ ] Connect repo to **Netlify**, get first deploy live (SPA redirects configured)
- [ ] Confirm CI: push to `main` → auto-deploy works

## Phase 1 — Design: prototype & style guide
**Target: Week 2 (Jun 15–21)** · *Goal: finalize the design deliverables.*

- [ ] Finalize **Figma prototype** (clickable, from Figma Make) — *Required link*
- [ ] Create **Style guide** in Figma: colours, typography, spacing, buttons, components — *Required link*
- [ ] Verify **WCAG colour compliance** of the palette (MC: WCAG compliant)
- [ ] Component inventory: list every reusable UI piece to build

## Phase 2 — Core infrastructure (API, auth scaffold, routing, UI kit)
**Target: Week 3–4 (Jun 22 – Jul 5)** · *Goal: the shared foundation all features sit on.*

- [ ] API client wrapper (base URL, headers, API key, error handling)
- [ ] Auth context + token/localStorage handling
- [ ] React Router setup (routes + protected route wrapper)
- [ ] App layout: Header/Nav + Footer (MC: navigation accessible)
- [ ] Pull Figma Make components into the codebase (shadcn/ui): Button, Input, Card, Modal, Toast, Spinner
- [ ] Reusable booking **Calendar / date-range** component
- [ ] Toast/alert system for user feedback (MC: errors handled with useful alerts)

## Phase 3 — Authentication & user account
**Target: Week 5–6 (Jul 6–19)**

- [ ] Register form — customer (stud.noroff.no email validation) — *US: register as customer*
- [ ] Register form — venue manager option — *US: register as Venue manager*
- [ ] Login — *US: login*
- [ ] Logout — *US: logout*
- [ ] Update avatar — *US: update avatar*
- [ ] Protected routes / redirect when unauthenticated
- [ ] Form validation + accessible inputs on all auth forms (MC: validated & accessible)

## Phase 4 — Customer-facing venue features
**Target: Week 7–9 (Jul 20 – Aug 9)**

- [ ] Venues list page with pagination — *US: view list of Venues*
- [ ] Search venues — *US: search for a Venue*
- [ ] Single venue page by id — *US: view Venue by id*
- [ ] Availability calendar on venue page — *US: view calendar of available dates*
- [ ] Create booking flow — *US: create a booking*
- [ ] Profile: view upcoming bookings — *US: view upcoming bookings*

## Phase 5 — Venue manager (admin) features
**Target: Week 10–11 (Aug 10–23)**

- [ ] Manager dashboard / view own venues
- [ ] Create venue (form + media) — *US: create a Venue*
- [ ] Update venue — *US: update a Venue*
- [ ] Delete venue (with confirm) — *US: delete a Venue*
- [ ] View bookings for a managed venue — *US: view bookings for managed Venue*

## Phase 6 — UX polish, accessibility & validation
**Target: Week 12 (Aug 24–30)**

- [ ] Validation pass on every form (MC: all inputs validated & accessible)
- [ ] Error/empty/loading states everywhere (MC: errors handled)
- [ ] Responsive layout pass — mobile → desktop (MC: responsive layout)
- [ ] Accessibility audit: keyboard nav, focus, alt text, ARIA, contrast (MC: navigation accessible, WCAG)
- [ ] Theme appeal review for target audience (MC: appealing theme)

## Phase 7 — Testing, docs & delivery
**Target: Week 13–14 (Aug 31 – Sep 13)**

- [ ] Manual test pass across browsers + screen sizes
- [ ] Code cleanup: no console errors, best practices, remove dead code (MC: JS/CSS/HTML best practices)
- [ ] Lighthouse / accessibility check
- [ ] Write **README.md**: description, setup, run locally, tester instructions
- [ ] Final Netlify production deploy + verify demo link
- [ ] Verify all 6 required links work
- [ ] Final merge to `main`
- [ ] **Submit on Moodle (by Sep 13)** 🎯

---

## Gantt summary (for the chart)

| Phase | Name | Start | End |
|-------|------|-------|-----|
| 0 | Setup & required links | Jun 8 | Jun 14 |
| 1 | Design: prototype & style guide | Jun 15 | Jun 21 |
| 2 | Core infrastructure | Jun 22 | Jul 5 |
| 3 | Auth & user account | Jul 6 | Jul 19 |
| 4 | Customer venue features | Jul 20 | Aug 9 |
| 5 | Venue manager features | Aug 10 | Aug 23 |
| 6 | UX, a11y & validation | Aug 24 | Aug 30 |
| 7 | Testing, docs & delivery | Aug 31 | Sep 13 |

_Built-in buffer: ~1 week before deadline for slippage._
