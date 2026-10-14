import { siteConfig } from "@/config/site";

/** Types and helpers shared by the server (cached) and the browser (fallback). */

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics: string[];
}

export type GitHubData =
  | { status: "ok"; user: GitHubUser; repos: GitHubRepo[] }
  | { status: "error"; message: string };

const API = "https://api.github.com";

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, init);
  if (!res.ok) {
    if (res.status === 403 || res.status === 429) {
      throw new Error(
        "GitHub's API rate limit was reached. Please try again in a little while."
      );
    }
    if (res.status === 404) throw new Error("GitHub profile was not found.");
    throw new Error(`GitHub API responded with status ${res.status}.`);
  }
  return (await res.json()) as T;
}

/** Fetches the public profile + repositories. Never throws. */
export async function loadGitHubData(init: RequestInit = {}): Promise<GitHubData> {
  const username = siteConfig.github.username;
  try {
    const [user, repos] = await Promise.all([
      request<GitHubUser>(`/users/${username}`, init),
      request<GitHubRepo[]>(
        `/users/${username}/repos?per_page=100&sort=pushed&type=owner`,
        init
      ),
    ]);
    const cleaned: GitHubRepo[] = repos
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? null,
        html_url: r.html_url,
        homepage: r.homepage || null,
        language: r.language ?? null,
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        fork: Boolean(r.fork),
        archived: Boolean(r.archived),
        pushed_at: r.pushed_at,
        topics: Array.isArray(r.topics) ? r.topics : [],
      }))
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
    return { status: "ok", user, repos: cleaned };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Could not load data from GitHub.",
    };
  }
}

/** Own (non-fork) repositories only. */
export function ownRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((r) => !r.fork);
}

/** Count of repositories per primary language (as reported by GitHub). */
export function languageStats(repos: GitHubRepo[]) {
  const counts = new Map<string, number>();
  for (const repo of ownRepos(repos)) {
    if (repo.language) {
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Deterministic date text (same on server and browser, so no hydration mismatch). */
export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
