# Zubair Enterprises Ltd — Website

A four-page marketing site (Home, About, Our Approach, Book an Appointment) with a
real, working appointment-booking system, built with React + Vite and Netlify Functions.

## Project structure

```
src/
  components/     Navbar, Footer, WaveBackground, Button, Reveal, AnimatedNumber
  pages/          Home, About, Approach, Book, Admin, NotFound
  lib/            small hooks (scroll-reveal, animated counters, document title)
netlify/
  functions/
    availability.js   GET  /api/availability?date=YYYY-MM-DD
    book.js            POST /api/book
    admin-slots.js     GET/POST /api/admin-slots  (password protected)
    _lib.js            shared slot list + storage helpers
```

Routing is handled client-side with React Router; `netlify.toml` redirects all
non-file requests to `index.html` so deep links (e.g. `/about`) work after deploy,
and redirects `/api/*` to the serverless functions.

## How the appointment system works

- The business is available in twelve fixed two-hour blocks, every day (00:00–02:00
  through 22:00–24:00).
- Availability is stored in **Netlify Blobs** (Netlify's built-in key/value store —
  no external database sign-up required). Each date gets one record; a slot with no
  entry is `AVAILABLE` by default, and only overrides (`TAKEN`) are stored.
- When someone submits the form, the `book` function re-checks the slot on the
  server before saving it — a slot that's already `TAKEN` is rejected with a clear
  message even if the visitor's screen hadn't refreshed yet.
- Every booking is saved as its own appointment record (name, email, phone, reason,
  notes, timestamp) so the owner can see who requested what.

**Double-booking protection — honest limitation:** the current check is
read-then-write, which closes the overwhelming majority of accidental clashes but
is not a fully atomic transaction. Two requests for the exact same slot arriving
within milliseconds of each other could theoretically both succeed. For a
low-to-moderate volume appointment page this is a reasonable trade-off. If you
expect high concurrent demand for the same slots, swap the availability store for
a database with real conditional/transactional writes (Supabase, DynamoDB with a
conditional `PutItem`, or FaunaDB), keeping the same function signatures — only
`_lib.js`'s storage functions would need to change.

## Managing availability (no redesign needed)

Go to `/admin` on the deployed site (it isn't linked from the navigation) and sign
in with the password you set in `ADMIN_PASSWORD`. From there you can:

- Pick any date and see all twelve slots with their current status.
- See the contact details attached to any booked slot.
- Toggle a slot between **Available** and **Taken** — for example, to block out a
  day, or to release a slot after handling an enquiry.

## Environment variables

| Variable         | Required | Purpose                                  |
|------------------|----------|-------------------------------------------|
| `ADMIN_PASSWORD` | Yes      | Gate for `/admin` and the admin functions. Without it, admin access is denied by default (fail closed) rather than left open. |

Set it in Netlify: **Site configuration → Environment variables**. For local
development, copy `.env.example` to `.env` and fill in your own value.

## Local development

```bash
npm install
npm run dev          # frontend only, http://localhost:5173 — /api calls will fail here
```

To exercise the booking API locally, install the Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev           # serves the frontend AND the functions together
```

## Deploying to Netlify

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, and pick the repo.
3. Build settings are already defined in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Before the first deploy (or right after), add the `ADMIN_PASSWORD` environment
   variable under **Site configuration → Environment variables**, then redeploy so
   the functions pick it up.
5. Once deployed, visit `/book-appointment` to confirm slots load and a test
   booking goes through, and `/admin` to confirm you can sign in and toggle a slot.

No other configuration is required — Netlify Blobs is available automatically on
every Netlify site and needs no separate database setup.

## After deployment — things to configure

- Set a real `ADMIN_PASSWORD` (not the placeholder in `.env.example`).
- Update `sitemap.xml` and the Open Graph URL in `index.html` if your final Netlify
  domain (or a custom domain) differs from `zubairenterprises.netlify.app`.
- Decide how you want to be notified of new bookings — right now the confirmation
  is stored and visible via `/admin`; if you'd like an email alert per booking as
  well, that's a small addition to `book.js` using an email API (e.g. Resend or
  Postmark) with its own API key stored as an environment variable.

## Content honesty

Only the confirmed facts you provided are used anywhere on the site: Amazon FBA
business, 400+ items sold, built alongside a full-time job, 24/7 appointment
availability, and the phone/email above. No revenue, profit, customer counts,
awards, certifications, testimonials or partnerships have been invented.
