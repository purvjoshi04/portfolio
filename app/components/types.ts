export enum ProjectStatus {
    Live = "Live",
    Building = "Building",
    Maintenance = "Maintenance",
    Concept = "Concept",
}

export type RepoConfig =
    | { type: "monorepo"; url: string }
    | { type: "separate"; frontend: string; backend: string };

export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    status: ProjectStatus;
    repo?: RepoConfig;
    demoUrl?: string;
    tags: string[];
}