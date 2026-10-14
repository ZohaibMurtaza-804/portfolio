# Zohaib Murtaza | Developer Portfolio

A dark-first personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Lucide icons**. Projects, languages and stats are pulled live from the public GitHub API for [`ZohaibMurtaza-804`](https://github.com/ZohaibMurtaza-804). Nothing about projects is hard-coded or invented.

## Requirements

- Node.js **20.9 or newer** (check with `node -v`)
- npm (comes with Node.js)
- A free [GitHub](https://github.com) account and a free [Vercel](https://vercel.com) account

## 1. Install dependencies

```bash
npm install
```

## 2. Run the development server

```bash
npm run dev
```

Open <http://localhost:3000>. The page reloads when you save a file.

## 3. Edit your content

Almost everything you will want to change lives in one file: **`src/config/site.ts`**.

| What | Where in `site.ts` |
| --- | --- |
| Email shown in Contact | `email` (empty = hidden) |
| LinkedIn link | `linkedin` (empty = hidden) |
| Project description / tags / live demo | `projectOverrides` (key = exact repo name) |
| Which repos to feature, in order | `featuredRepos` |
| Hand-written skill groups | `skillGroups` |
| Timeline items | `journey` |

Rules this project follows: only add technologies you really used, only add a live demo if one exists, and replace the clearly marked placeholders with real dates when you have them.

## 4. Configuration (all optional)

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL (SEO and social previews). Example: `https://your-name.vercel.app` |
| `GITHUB_TOKEN` | Server-side only. Raises the GitHub API rate limit. Create a token with **no scopes** at <https://github.com/settings/tokens>. Never commit it. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | A form backend URL such as a free [Formspree](https://formspree.io) form (`https://formspree.io/f/xxxxxxxx`). If empty, the contact form is hidden and visitors use GitHub or email instead. |

## 5. GitHub integration

- `src/lib/github-shared.ts` has the types, the API calls and small helpers.
- `src/lib/github.ts` fetches on the server and caches for one hour (`revalidate`).
- If the server fetch fails (for example rate limiting), the browser quietly retries once on load, and the UI shows a clear error with a "Try again" button if that also fails.
- A contribution graph is intentionally **not** shown, because the public REST API cannot provide it reliably.

## 6. Build and test the production version

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Open <http://localhost:3000> and click through every section, on desktop width and on a phone-sized window.

## 7. Deploy

1. Push the project to GitHub (see below).
2. Go to <https://vercel.com/new> and import the repository.
3. Keep the detected **Next.js** settings and click **Deploy**.
4. Optional: add `NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN` and `NEXT_PUBLIC_FORM_ENDPOINT` under **Project → Settings → Environment Variables**, then redeploy.

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/ZohaibMurtaza-804/<your-repo-name>.git
git push -u origin main
```

Create the empty repository on GitHub first (no README, no .gitignore), then run the commands above.

## 8. Custom domain (later)

In Vercel: **Project → Settings → Domains → Add**, enter your domain, then add the DNS records Vercel shows at your domain registrar. Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

## Project structure

```
src/
  app/            layout, page, icon, Open Graph image, robots, sitemap
  components/     Navbar, Hero, About, Skills, FeaturedProjects,
                  GitHubSection, Journey, Contact, Footer (+ ui/ helpers)
  config/site.ts  all editable content
  lib/            GitHub API logic (kept separate from the UI)
```
