export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  liveUrl?: string;
  repoUrl: string;
  featured: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "sent" | "error";


export interface ContributionDay {
  day: number;
  count: number;
  date: string;
  month: number;
}

export type ContributionWeek = ContributionDay[];

export interface GitHubStat {
  label: string;
  value: string;
}

export interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubUserStats {
  totalContributions: number;
  weeks: ContributionWeek[];
  repositories: number;
  pullRequests: number;
  issuesClosed: number;
}

export interface GitHubApiError {
  error: string;
}
