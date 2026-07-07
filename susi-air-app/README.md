# Susi Air Crew — Technical Test (Front-End Developer)

A mobile-first pilot logbook & schedule companion app, built for the Susi Air Front-End
Developer technical test. Three screens: Sign In, Home (Dashboard), and Schedule (Calendar).

## Tech Stack

- **Nuxt 3/4** with Composition API + `<script setup>`
- **TypeScript**
- **Pinia** for state management (`stores/auth.ts`, `stores/dashboard.ts`, `stores/schedule.ts`)
- **SCSS** for styling (design tokens in `assets/scss/_variables.scss`)
- **lucide-vue-next** for line icons
- No backend — all data comes from the mock JSON files in `public/data/`

## Project Structure

```
app/
  components/
    dashboard/     Header, Upcoming Flight, Latest News, Hours-to-Limit, chart, summary cards
    documents/      My Documents list
    schedule/       Calendar grid + legend
    navigation/     Bottom nav
    common/         Shared placeholder sheet
  composables/
    useToday.ts         Fixed "today" reference (31 May 2026, per the brief)
    useFlightHours.ts   Rolling-sum calculation engine for the Hours-to-Limit chart
  layouts/default.vue
  pages/
    index.vue       Sign In
    home.vue        Dashboard
    schedule.vue    Monthly calendar
    logbook.vue      "Coming soon" placeholder (out of scope per brief)
    more.vue         Sign out / placeholder menu
  stores/
  types/
public/data/        mock-flight-hours.json, mock-documents.json, mock-schedules.json, mock-upcoming-flight.json
```

## Setup & Run

```bash
npm install
npm run dev       # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm run generate    # static generation
npm run preview     # preview a production build
```

## Mock data notes

The three provided mock files each carry their own `today` reference, which this app
respects rather than using a single global date:

- `mock-flight-hours.json` has no explicit `today` — the Hours-to-Limit chart uses a fixed
  `2026-05-31` (see `composables/useToday.ts`), matching the last date in `flightHours`.
- `mock-documents.json` has `"today": "2026-05-31"` plus `thresholds.warningDays`; document
  badge status (green/amber/red) is computed live from that date, not hardcoded.
- `mock-schedules.json` has its own `"today": "2026-05-15"`; the Schedule page opens on that
  month by default and highlights that date on the calendar.
- Each schedule entry's `base_color` is used directly as the day-cell fill, and the
  top-right badge shows `count_schedules` unless `count_logbooks === count_schedules`,
  in which case a checkmark is shown instead (per the file's own `fieldGuide`).

## Notes on the Hours-to-Limit logic

Each point on the trend chart is a **rolling sum**, not a single day's hours:

```
Y(D) = sum of flight hours from (D − windowDays + 1) to D inclusive
```

- The X-axis always shows 15 points: 7 days before "today", today, and 7 days after —
  regardless of which range toggle (1w/1m/3m/6m/1y) is selected.
- Only the **window size** used to compute each point's Y value changes with the toggle.
- "Today" is pinned to **31 May 2026** (as instructed in the brief) so the chart has real
  data on both sides of "today". This is centralised in `composables/useToday.ts` — swapping
  to `new Date()` for production is a one-line change.
- Days after "today" (i.e. not yet flown) are treated as 0 hours in the rolling sum, since
  they haven't happened yet in the mock dataset. This is a reasonable assumption for a "hours
  flown to date" chart, but a real implementation might instead show a dashed
  "projected" segment if future duty is already scheduled.
- Verified independently against the provided mock dataset: with "today" = 31 May 2026,
  the weekly (7-day) and monthly (30-day) rolling sums both exceed their limits, which
  correctly triggers the red / "over limit" state on both the summary card and the chart.

## Document expiry badges

Badge color is computed live from each document's `expiryDate` versus "today" (not hardcoded):
green (>30 days), amber (<30 days), red (expired). Documents are also sorted soonest-expiring first.

## What I'd do differently with more time

- Swap the custom hand-rolled SVG line chart for a charting library (e.g. Chart.js or D3) if the
  team already has patterns for one — kept it dependency-free here since it's a single, well-specified chart.
- Add a proper auth guard / route middleware once real authentication exists.
- Build the Logbook and full Schedule "detail" screens (explicitly out of scope for this test).
- Add unit tests for `useFlightHours`'s rolling-sum logic (the trickiest piece of business logic).
- PWA basics (manifest + service worker) — noted as a plus in the brief but not implemented here,
  to keep the scope focused on the three required screens.
- Persist the signed-in state (e.g. via a cookie) so refreshing `/home` doesn't require
  re-visiting the sign-in screen — not required since there's no real auth to check.

## Design

Followed the provided color palette (navy `#0E2138`, brand red `#E63757`), Plus Jakarta Sans
typeface, 12–16px card radii / pill buttons, and subtle shadows — aiming for a clean
"operations tool" feel rather than a consumer travel app. Verified at 390px width.
