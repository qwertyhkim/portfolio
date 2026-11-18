# Yonghui Kim â€” Portfolio

Personal portfolio site for Yonghui Kim, digital analyst (University of Minnesota MSBA).

Built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**, deployed on **Vercel**.

## Features
- Client consulting and selected analytics projects, each with a detail page (context, approach, results)
- Canvas hero animation: scattered points gather into an upward trend (`public/hero-motion.js`)
- Custom event tracking through Google Tag Manager â†’ GA4 â†’ BigQuery

## Project structure
| Path | Purpose |
|---|---|
| `lib/content.ts` | All site copy, project data, and links |
| `app/` | Pages (home, project detail) and global styles |
| `components/` | UI components and tracking helpers |
| `public/hero-motion.js` | Hero canvas animation |

## Analytics events
GTM loads only when `NEXT_PUBLIC_GTM_ID` is set. Events are pushed to `dataLayer`:

| Event | Parameters | Fires when |
|---|---|---|
| `project_open` | `project_name`, `location` | A project card is opened |
| `project_link_click` | `project_name`, `link_type` | A GitHub / slides / Tableau link is clicked |
| `contact_click` | `channel`, `location` | An email or LinkedIn link is clicked |
| `section_view` | `section_name` | A section is at least 40% visible (once per page) |

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```
