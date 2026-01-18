import type { Project } from './types';
import { ProjectStatus } from "./types";

export const projects: Project[] = [
    {
        id: 1,
        title: "SharedInk",
        description: "SharedInk is a collaborative canvas where users can draw shapes like squares, circles, arrows, and also use a freehand pencil tool.",
        imageUrl: "/sharedink.png",
        status: ProjectStatus.Building,
        repo: {
            type: "monorepo",
            url: "https://github.com/purvjoshi04/SharedInk.git"
        },
        tags: [
            "Turborepo",
            "NextJS",
            "TypeScript",
            "TailwindCSS",
            "NodeJS",
            "ExpressJS",
            "Prisma",
            "Zod",
            "PostgresSQL",
            "JWT",
        ],
    },
    {
        id: 2,
        title: "Smartsage",
        description: "Smartsage is an AI Software as a Service (SaaS) application that provides text, image, video, code, and music generation.",
        imageUrl: "/smartsage.png",
        status: ProjectStatus.Maintenance,
        repo: {
            type: "monorepo",
            url: "https://github.com/purvjoshi04/SharedInk.git"
        },
        demoUrl: "https://resplendent-sprite-029831.netlify.app/",
        tags: [
            "NextJS",
            "TypeScript",
            "TailwindCSS",
            "Clerk",
            "Shadcn/ui",
            "NodeJS",
            "ExpressJS",
            "Prisma",
            "Zod",
            "Supabase",
            "Crisp"
        ],
    },
    {
        id: 3,
        title: "second-brain",
        description: "Second Brain is a simple tool to save and keep important links from X (Twitter), YouTube videos, and blog posts in one place so you can easily find them later.",
        imageUrl: "/secondbrain.png",
        status: ProjectStatus.Building,
        repo: {
            type: "monorepo",
            url: "https://github.com/purvjoshi04/second-brain.git"
        },
        tags: [
            "ReactJS",
            "TypeScript",
            "TailwindCSS",
            "NodeJS",
            "ExpressJS",
            "Zod",
        ],
    },
];