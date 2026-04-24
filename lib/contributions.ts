import type {
  ContributionDay,
  ContributionWeek,
  GitHubUserStats,
  GitHubContributionWeek,
} from "@/types";

export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export const LEVEL_OPACITIES = [0.05, 0.22, 0.48, 0.72, 1.0];

export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export function getTotalContributions(weeks: ContributionWeek[]): number {
  return weeks.flat().reduce((sum, day) => sum + day.count, 0);
}

export interface MonthLabel {
  label: string;
  weekIndex: number;
}

export function getMonthLabels(weeks: ContributionWeek[]): MonthLabel[] {
  const positions: MonthLabel[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const month = week[0]?.month ?? -1;
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month] ?? "", weekIndex: wi });
      lastMonth = month;
    }
  });
  return positions;
}

export function transformGitHubWeeks(
  apiWeeks: GitHubContributionWeek[]
): ContributionWeek[] {
  return apiWeeks.map((week) =>
    week.contributionDays.map((day, dayIndex): ContributionDay => {
      const d = new Date(day.date);
      return {
        day: dayIndex,
        count: day.contributionCount,
        date: day.date,
        month: d.getMonth(),
      };
    })
  );
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(privacy: PUBLIC, first: 1) {
        totalCount
      }
      pullRequests(states: MERGED, first: 1) {
        totalCount
      }
      issues(states: CLOSED, first: 1) {
        totalCount
      }
    }
  }
`;

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
      };
      repositories: { totalCount: number };
      pullRequests: { totalCount: number };
      issues: { totalCount: number };
    } | null;
  };
  errors?: { message: string }[];
}

export async function fetchGitHubContributions(
  username: string
): Promise<GitHubUserStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is not set. Add it to your .env.local file.\n" +
      "Get a token at: https://github.com/settings/tokens\n" +
      "Required scope: read:user"
    );
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-app",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { username },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}: ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse;

  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`);
  }

  const user = json.data?.user;
  if (!user) {
    throw new Error(`GitHub user "${username}" not found.`);
  }

  const calendar = user.contributionsCollection.contributionCalendar;

  return {
    totalContributions: calendar.totalContributions,
    weeks: transformGitHubWeeks(calendar.weeks),
    repositories: user.repositories.totalCount,
    pullRequests: user.pullRequests.totalCount,
    issuesClosed: user.issues.totalCount,
  };
}


export function generateMockContributions(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - startDate.getDay() - 51 * 7);

  for (let w = 0; w < 53; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const isFuture = date > today;
      let count = 0;
      if (!isFuture) {
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const rand = Math.random();
        if (rand > 0.35) {
          count = Math.floor(Math.random() * 12 * (isWeekend ? 0.3 : 1)) + 1;
          if (rand > 0.88) count = Math.floor(Math.random() * 20) + 8;
        }
      }
      week.push({
        day: d,
        count,
        date: date.toISOString().split("T")[0],
        month: date.getMonth(),
      });
    }
    weeks.push(week);
  }
  return weeks;
}
