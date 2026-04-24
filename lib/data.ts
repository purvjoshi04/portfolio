import type { SkillCategory, Project, SocialLink, Stat, GitHubStat } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Bash"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Redux"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Bun", "Express", "REST APIs", "WebSockets", "Prisma"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "Supabase"],
  },
  {
    id: "cloud",
    label: "Cloud Providers",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify",],
  },
  {
    id: "devops",
    label: "DevOps",
    items: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform", "Nginx", "Linux"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "VS Code", "Postman", "Notion",],
  },
];

export const projects: Project[] = [
  {
    id: "01",
    title: "Smart Sage",
    description:
      "Smartsage is an AI Software as a Service (SaaS) application that provides text, image, video, code, and music generation.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Clerk", "Shadcn/ui", "NodeJS", "EpxressJS", "Prisma", "Zod", "Supabase", "Crisp"],
    year: "2023",
    liveUrl: "https://smartsage.purvjoshi.space/",
    repoUrl: "https://github.com/purvjoshi04/smart-sage",
    featured: true,
  },
  {
    id: "02",
    title: "SharedInk",
    description:
      "SharedInk is a collaborative canvas where users can draw shapes like squares, circles, arrows, and also use a freehand pencil tool.",
    tags: ["Turborepo", "NextJS", "Typescript", "NodeJS", "WebSockets", "ExpressJS", "Primsa", "Zod", "PostgreSQL", "JWT"],
    year: "2026",
    repoUrl: "https://github.com/purvjoshi04/sharedInk",
    featured: true,
  },
  {
    id: "03",
    title: "Second Brain",
    description:
      "Second Brain is a simple tool to save and keep important links from X (Twitter), YouTube videos, and blog posts in one place so you can easily find them later.",
    tags: ["React", "TypeScript", "TailwindCSS", "NodeJS", "EpxressJS", "Zod"],
    year: "2023",
    repoUrl: "https://github.com/purvjoshi04/second-brain",
    featured: false,
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/purvjoshi04/", handle: "@purvjoshi04" },
  { label: "Twitter / X", href: "https://x.com/purv04", handle: "@purv04" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/purvjoshi", handle: "purvjoshi" },
  { label: "Email", href: "mailto:purvjoshi.dev@gmail.com", handle: "purvjoshi.dev@gmail.com" },
];

export const heroStats: Stat[] = [
  { num: "1", label: "Intership Experience" },
  { num: "3+", label: "Projects Shipped" },
  { num: "5+", label: "Happy Clients" },
];

export const githubStats: GitHubStat[] = [
  { label: "Repositories", value: "42" },
  { label: "Pull Requests", value: "318" },
  { label: "Issues Closed", value: "204" },
  { label: "Code Reviews", value: "156" },
];

export const personalInfo = {
  name: "Purv Joshi",
  initials: "PJ",
  roles: ["Full-Stack Developer", "Cloud Enthusiastic", "Problem Solver"],
  bio: "I build fast, accessible, and beautiful digital experiences. Passionate about clean code, and pushing the web forward.",
  contactBio:
    "I'm always open to new opportunities, collaborations, or just a friendly conversation about code and design.",
  available: true,
  email: "purvjoshi.dev@gmail.com",
  githubUsername: "purvjoshi04",
};
