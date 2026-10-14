import { loadGitHubData, type GitHubData } from "./github-shared";

/**
 * Server-side GitHub fetch. Responses are cached by Next.js for one hour.
 * GITHUB_TOKEN is optional and stays on the server (never sent to the browser).
 */
export async function getGitHubData(): Promise<GitHubData> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return loadGitHubData({ headers, next: { revalidate: 3600 } });
}
