# Susi Air Crew App

Technical test for Frontend Developer in Susi Air, created with 3 pages: Sign In, Home (dashboard), and Schedule.

Nuxt project in folder  `susi-air-app/`, so change directory`cd`if want run anything command. 
## Tech Stack

- Nuxt 4 (Composition API, `<script setup>`)
- TypeScript
- Pinia for state management
- SCSS
- lucide-vue-next for icon-icon

No Backend, just use JSON file from `public/data/`.

## how to run
```bash
cd susi-air-app
npm install
npm run dev
```

Run `http://localhost:3000`.

Another command if need:
```bash
npm run build      # build production
npm run generate   # static generate
npm run preview    # preview hasil build
```

## Folder Structure 
```
susi-air-app/
  app/
    components/    # split per section: dashboard, documents, schedule, navigation
    composables/    # useToday.ts & useFlightHours.ts — this is the brain of the Hours to Limit chart
    pages/          # index (sign in), home, schedule, + logbook & more (placeholder)
    stores/         # pinia store per data domain
  public/data/      # all the mock json files
```

