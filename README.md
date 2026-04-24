# Portfolio — Next.js + Bun

A minimal, high-performance developer portfolio built with **Next.js 14** and **Bun** as the runtime and package manager. Pure black & white design — no navbar, no color clutter.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Runtime / PM | Bun |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Syne · JetBrains Mono · DM Sans |

## Sections

- **Hero** — Typewriter animation, available-for-work badge, CTA buttons
- **Skills** — Category-based badge groups (Languages, Frontend, Backend, Databases, Cloud, DevOps, Tools)
- **Projects** — Featured project list with tags and links
- **GitHub** — Animated contribution graph with tooltip
- **Contact** — Form wired to `/api/contact` route + social links

---

## Getting Started

### 1. Install Bun

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

Verify:
```bash
bun --version  # should be ≥ 1.1.0
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run dev server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
bun run build
bun start
```

---

## Customisation

### Personal info
Edit **`lib/data.ts`** — all your content lives here:

```ts
export const personalInfo = {
  name: "Your Name",
  initials: "YN",
  title: "Full-Stack Developer",
  roles: ["Full-Stack Developer", "UI Engineer", ...],
  bio: "Your bio here.",
  available: true,
  email: "you@example.com",
  githubUsername: "yourhandle",
};
```

### Skills
Add or remove items from the `skillCategories` array in `lib/data.ts`.

### Projects
Edit the `projects` array in `lib/data.ts`.

### Social links
Edit the `socialLinks` array in `lib/data.ts`.

---

## Contact Form

The form posts to `/app/api/contact/route.ts`. By default it simulates a send. To wire it to a real email provider:

### Option A — Resend

```bash
bun add resend
```

```ts
// app/api/contact/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Portfolio <noreply@yourdomain.com>",
  to: process.env.CONTACT_EMAIL!,
  subject: `New message from ${name}`,
  text: `From: ${name} <${email}>\n\n${message}`,
});
```

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=you@example.com
```

### Option B — Nodemailer

```bash
bun add nodemailer
bun add -d @types/nodemailer
```

---

## GitHub Contribution Graph

The graph in `components/GithubSection.tsx` uses generated mock data.  
To use your real GitHub data, replace `generateContributions()` in `lib/contributions.ts` with a GitHub GraphQL API call:

```ts
const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query, variables: { username: "yourhandle" } }),
});
```

Add to `.env.local`:
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

---

## Deployment

### Vercel (recommended)

```bash
bunx vercel
```

Or connect your GitHub repo in the Vercel dashboard — it auto-detects Next.js.

### Self-hosted

```bash
bun run build
bun start          # runs on port 3000
```

---

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # Contact form API (Bun-compatible)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── HeroSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── GithubSection.tsx
│   ├── ContactSection.tsx
│   └── SideNav.tsx
├── lib/
│   ├── contributions.ts       # GitHub graph utilities
│   ├── data.ts                # All portfolio content
│   └── utils.ts               # Helper functions
├── types/
│   └── index.ts               # Shared TypeScript types
├── bunfig.toml                # Bun configuration
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## License

MIT
