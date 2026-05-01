import { NextResponse } from "next/server";
import {
  fetchGitHubContributions,
  generateMockContributions,
  getTotalContributions,
} from "@/lib/contributions";
import { personalInfo } from "@/lib/data";
import type { GitHubUserStats } from "@/types";

export const runtime = "nodejs";
export const revalidate = 1200;

export async function GET() {
  const username = personalInfo.githubUsername;
  if (!process.env.GITHUB_TOKEN) {
    const mockWeeks = generateMockContributions();
    const mockStats: GitHubUserStats = {
      totalContributions: getTotalContributions(mockWeeks),
      weeks: mockWeeks,
      repositories: 42,
      pullRequests: 318,
      issuesClosed: 204,
    };
    return NextResponse.json(
      { ...mockStats, _mock: true },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=86400" },
      }
    );
  }

  try {
    const stats = await fetchGitHubContributions(username);
    return NextResponse.json(stats, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=86400" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[GitHub API]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
