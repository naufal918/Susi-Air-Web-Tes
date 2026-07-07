# Susi Air Crew App

Technical test buat posisi Frontend Developer di Susi Air. Bikin 3 halaman: Sign In, Home (dashboard), sama Schedule (kalender duty).

Project Nuxt-nya ada di folder `susi-air-app/`, jadi `cd` ke situ dulu sebelum jalanin command apapun.

## Tech Stack

- Nuxt 4 (Composition API, `<script setup>`)
- TypeScript
- Pinia buat state management
- SCSS
- lucide-vue-next buat icon-icon

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

