# CrackIt

A DSA interview-prep tracker that answers one question a spreadsheet can't:
**am I actually ready?**

Most prep trackers count solved problems. Counting rewards grinding easy
problems in patterns you already know. CrackIt instead computes a 0–100
**readiness score** from four weighted signals, so the number only moves when
your actual interview readiness does.

## The readiness model

| Component            | Weight | What it measures                                        |
|----------------------|--------|---------------------------------------------------------|
| DSA depth            | 30     | Solved volume, scaled against a 100-problem target       |
| Revision consistency | 25     | Share of scheduled revisions completed on time          |
| Pattern coverage     | 25     | How many of the 18 patterns have 5+ solved problems     |
| Solve speed          | 20     | Time-to-solve trend relative to target                  |

Pattern coverage is the part that makes it honest: 200 problems concentrated in
four patterns scores worse than 90 spread across eighteen, which reflects how
interviews actually sample.

Problems are tagged on two independent axes — **topic** (Arrays, Graphs, DP…)
and **pattern** (Sliding Window, Two Pointers, Monotonic Stack…) — because the
pattern is what transfers between problems and the topic is only where it
happened to appear.

## Spaced repetition

Each solved problem gets a three-stage revision schedule. The Revisions page
surfaces what's due today; completed-on-time revisions feed back into the
consistency score, so skipping reviews visibly costs you readiness rather than
silently decaying.

## Features

- **Dashboard** — readiness score, streaks, and what's due now
- **Problems** — log solves with topic, pattern, difficulty, and time taken
- **Revisions** — spaced-repetition queue
- **Analytics** — Recharts breakdowns of pattern coverage and score history
- **Study Plan** — structured progression
- **Company Sets** — problem sets grouped by target company
- **Mock Interview** — timed practice mode
- **Notes** — free-form notes per problem
- **Settings** — targets, import/export

## Stack

React 19 · React Router 7 · Recharts · Tailwind CSS · date-fns ·
react-hot-toast · Create React App

State persists to `localStorage` — no backend, no account, no data leaves the
browser. LeetCode URLs are parsed to auto-fill problem metadata on entry.

## Run locally

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build to ./build
```

Deploys as a static site; `render.yaml` configures the SPA rewrite for Render.

## Limitations

- Single-device by design — `localStorage` means no sync across machines. Use
  the export in Settings to move data.
- Test coverage is limited to the CRA smoke test. `src/utils/scoring.js` is pure
  and is the obvious first thing to cover.
