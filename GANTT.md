# Holidaze — Gantt Chart

Project timing for Project Exam 2, June 8 – September 13, 2026.
The board with live status lives in [GitHub Projects](https://github.com/users/Daniel-leiken/projects/2).

```mermaid
gantt
    title Holidaze – Project Exam 2
    dateFormat YYYY-MM-DD
    axisFormat %d %b

    section 0 · Setup
    Setup & required links             :active, p0, 2026-06-08, 2026-06-14
    section 1 · Design
    Prototype & style guide            :p1, 2026-06-15, 2026-06-21
    section 2 · Infrastructure
    API, auth, routing, UI kit         :p2, 2026-06-22, 2026-07-05
    section 3 · Auth & account
    Register / login / logout / avatar :p3, 2026-07-06, 2026-07-19
    section 4 · Customer features
    Venues, search, calendar, booking  :p4, 2026-07-20, 2026-08-09
    section 5 · Manager features
    Create / edit / delete, bookings   :p5, 2026-08-10, 2026-08-23
    section 6 · UX & accessibility
    Validation, responsive, WCAG       :p6, 2026-08-24, 2026-08-30
    section 7 · Delivery
    Testing, README, deploy            :p7, 2026-08-31, 2026-09-12
    Submit on Moodle                   :milestone, done, m1, 2026-09-13, 0d
```

## Phase breakdown

| Phase | Focus | Start | End |
|-------|-------|-------|-----|
| 0 | Setup & required links | Jun 8 | Jun 14 |
| 1 | Design: prototype & style guide | Jun 15 | Jun 21 |
| 2 | Core infrastructure | Jun 22 | Jul 5 |
| 3 | Auth & user account | Jul 6 | Jul 19 |
| 4 | Customer venue features | Jul 20 | Aug 9 |
| 5 | Venue manager features | Aug 10 | Aug 23 |
| 6 | UX, accessibility & validation | Aug 24 | Aug 30 |
| 7 | Testing, docs & delivery | Aug 31 | Sep 13 |

See [PROJECT-PLAN.md](PROJECT-PLAN.md) for the task-level breakdown behind each phase.
