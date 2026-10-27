# Saavn Music Web (Vite + React)

```bash
npm install
cp .env.example .env     # VITE_API_URL=https://saavn-api-mukesh.vercel.app/api
npm run dev
```

## Pages
Home (Recently Played, Trending Now, New Releases per language, Artist Stations, Fresh Hits, Best Of 90s), Search, Create, Library, Import, Settings, and a now-playing sheet (tap the player bar).

## Deploy (all three are configured)
| Host | How |
|---|---|
| **Vercel** | Import the repo. Framework: Vite. `vercel.json` handles SPA routing. Add env `VITE_API_URL`. |
| **Cloudflare Pages** (`*.pages.dev`) | Build: `npm run build`, output: `dist`. `public/_redirects` handles SPA routing. Or `npm run deploy:pages`. |
| **Cloudflare Workers** (`*.workers.dev`) | `npm run deploy:workers` (`wrangler.toml` serves `dist` as a single-page app). |

`VITE_API_URL` is baked in at build time, so set it before building.
