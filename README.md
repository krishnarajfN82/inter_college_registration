# TECHNOVA'26 — TMG College of Arts and Science

Symposium registration site, restyled after the reference site with a
neon tech/gaming theme, scroll/hover effects, an event-details modal, and
a working backend that runs entirely on Netlify (Functions + Blobs) so it
keeps working after you deploy — no separate server to host.

```
technova-tmg/
├── netlify.toml              routes /api/* to the functions, sets publish dir
├── package.json              backend dependencies (installed during Netlify's build)
├── frontend/                 the published site
│   ├── index.html
│   ├── styles.css
│   ├── script.js             <- edit CONFIG at the top: events, fees, symposium name
│   └── admin.html            organizer dashboard (view/export registrations)
└── netlify/functions/        the backend — each file is one serverless endpoint
    ├── register.js           POST  /api/register        save entry + generate QR badge
    ├── verify.js             GET   /api/verify/:id       look up a registration (for scanning)
    ├── check-in.js           POST  /api/check-in/:id     mark checked in (admin key required)
    ├── admin-list.js         GET   /api/admin-list       list all registrations (admin key required)
    └── admin-export.js       GET   /api/admin-export     CSV export (admin key required)
```

## Why this works on Netlify (and a plain Express server wouldn't)

Netlify only hosts static files plus short-lived serverless **Functions** —
there's no always-on server and no writable disk that persists between
requests. So this backend uses:

- **Netlify Functions** instead of an Express server — each API route is
  its own function, run on demand.
- **Netlify Blobs** (`@netlify/blobs`) instead of SQLite — a small
  built-in data store that comes with every Netlify site and persists
  across requests and deploys, with nothing extra to sign up for.
- **`qrcode`** — a pure-JS QR generator, so it bundles cleanly into a
  function (no native binaries to worry about, unlike `better-sqlite3`,
  which is why that's not used here).

## Deploy it

Functions need Netlify to run `npm install` and bundle them, so a plain
drag-and-drop of the folder into Netlify's upload box **will not** deploy
the backend — you need one of:

**Option A — Netlify CLI (fastest for a one-off deploy)**
```bash
npm install -g netlify-cli
cd technova-tmg
netlify deploy --prod
```
Follow the prompts to link/create a site. It reads `netlify.toml`
automatically and deploys both the site and the functions.

**Option B — Connect a Git repo (recommended if you'll keep editing it)**
Push this folder to a GitHub repo, then in Netlify: **Add new site → Import
an existing project**, pick the repo. Netlify reads `netlify.toml` and
builds it automatically on every push.

### After the first deploy: set your admin key

In the Netlify dashboard → **Site configuration → Environment variables**,
add:
```
ADMIN_KEY = choose-a-strong-key-here
```
Then **trigger a redeploy** (env vars only take effect on the next
build/deploy). This key gates `/admin.html`, `/api/admin-list`,
`/api/admin-export`, and `/api/check-in/:id`. Until you set it, it
defaults to `changeme` — don't leave it that way on a live site.

## How the QR badge flow works end to end

1. Someone fills in the form; the badge preview on the right fills in live.
2. On submit, the frontend calls `POST /api/register`.
3. The function validates the entry, saves it to Netlify Blobs under a
   unique ID (`TN26-…`), generates a QR code encoding that ID plus the
   name and chosen events, and returns it as a base64 PNG.
4. The badge flips to "Confirmed" with the real QR, downloadable as a PNG
   — this is what the participant shows at check-in.
5. At the gate, staff scan the QR with any scanner app (it just reads out
   the JSON payload), or you look the ID up via `/api/verify/:id`, and
   mark them in with `/api/check-in/:id` from the admin dashboard tooling.

## Customize content

- **Symposium name, fee rules, and the full events list** (including which
  icon each one gets) — one place: the `CONFIG` object at the top of
  `frontend/script.js`.
- **College name, hero copy, about/info cards** — in `frontend/index.html`.
- **Colors and type** — CSS variables at the top of `frontend/styles.css`
  (`--cyan`, `--magenta`, `--amber`, `--violet`, plus the two font families).
- Add your real `assets/rulebook.pdf` and a `favicon.ico` under
  `frontend/assets/` (the rulebook link currently points to a file that
  doesn't exist yet — drop yours in and update the `href` in `index.html`).

## Local testing before you deploy

```bash
npm install -g netlify-cli
cd technova-tmg
netlify dev
```
This runs the whole site — static frontend plus functions plus a local
emulation of Blobs — at `http://localhost:8888`, matching production
behavior closely enough to catch most issues before you deploy.

## Security notes before going live

- Change `ADMIN_KEY` — never leave it as `changeme` on a public deploy.
- There's no rate limiting on `/api/register` yet; if you expect abuse,
  add `express-rate-limit`-style throttling via Netlify's built-in rate
  limiting (Site configuration → Rate limiting) or a simple IP check.
- Netlify serves everything over HTTPS by default — nothing to configure.
