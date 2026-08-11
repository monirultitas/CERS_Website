# CERS Website

Website for **CERS — Center for Environmental Research & Sustainability**, a Dhaka-based nonprofit. Built around a GIS & remote sensing core, with environmental chemistry (water quality, pollution) as supporting context.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — design tokens in [`app/(site)/globals.css`](app/(site)/globals.css)
- **MapLibre GL JS** (`v5.24.0` — pinned; `v6.x` currently breaks worker loading under Turbopack dev) for the interactive GIS Explorer
- **Sanity.io** (`next-sanity`) — headless CMS for blog posts, projects, team, research areas, publications, and GIS layers

## Project structure

```
app/
  (site)/          → all public pages (shares Header/Footer layout)
    page.tsx        Home
    about/
    research/       research/[slug] for the 4 pillars
    projects/       projects/[slug]
    news/           news/[slug] — blog/news posts
    gis-explorer/   interactive MapLibre map
    contact/
  studio/           Sanity Studio, mounted at /studio (own root layout, no site chrome)
  sitemap.ts, robots.ts, icon.tsx, (site)/opengraph-image.tsx

components/         layout/, home/, about/, gis/, contact/ — grouped by feature
lib/                site-config.ts (nav, org info) + *-content.ts (placeholder content)
lib/sanity/         client.ts, image.ts, queries.ts — ready for when Sanity is connected
sanity/             schemaTypes/ (7 content types), env.ts
public/data/        sample GeoJSON layers for the GIS Explorer
```

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Content: placeholder data vs. Sanity CMS

**Right now, all content is static placeholder data** living in `lib/*-content.ts` (news posts, projects, research pillar detail, team members). This was necessary because connecting the real CMS requires a Sanity account, which only you can create — so the site ships fully populated and functional, but not yet editable by staff.

To make it editable:

1. Create a free project at [sanity.io](https://sanity.io) (`npx sanity init` from this folder is the fastest path, or do it via the web dashboard).
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-token   # only needed for write operations from the app itself
   ```
3. Restart the dev server. `/studio` will now load the real content studio (it currently shows a friendly "not configured" message instead of crashing).
4. Enter content for each of the 7 schema types (Post, Project, Team Member, Research Area, Publication, GIS Layer, Site Settings) — including uploading `.geojson` files directly through the **GIS Layer** document type, which is how non-developers can add new map layers.
5. Swap each page from placeholder data to a live query. The GROQ queries are already written in `lib/sanity/queries.ts` — for example, `app/(site)/news/page.tsx` currently imports `latestNews` from `lib/news-content.ts`; replace that with `sanityClient.fetch(allPostsQuery)`. The data shapes were designed to match, so this is a page-by-page swap, not a rewrite.

## The GIS Explorer

`/gis-explorer` uses MapLibre GL JS with a free CARTO Positron basemap (no API key required) and loads GeoJSON from `public/data/*.geojson`. **These layers are illustrative sample data**, not real monitoring output — swap them for real data by either replacing the files in `public/data/` or, once Sanity is connected, uploading real GeoJSON through the **GIS Layer** content type and pointing `components/gis/gis-layers-config.ts` at the Sanity-hosted file URLs instead.

## Contact form

The form on `/contact` currently builds a `mailto:` link (zero setup, always works). For a proper backend-delivered form, add an email API route once you have a provider (e.g. [Resend](https://resend.com)) — the form component is isolated in `components/contact/ContactForm.tsx` and easy to repoint at a `/api/contact` route handler.

## Deployment

The site is a standard Next.js app — deploys cleanly to [Vercel](https://vercel.com) (recommended, zero-config):

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the Sanity env vars from `.env.local` to the Vercel project's Environment Variables.
4. Deploy.

Update `siteConfig.url` in `lib/site-config.ts` if the production domain differs from `cersbd.org` — it feeds the sitemap, robots.txt, and Open Graph tags.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint
```
