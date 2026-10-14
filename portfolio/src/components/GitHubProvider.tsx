"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loadGitHubData,
  type GitHubData,
  type GitHubRepo,
  type GitHubUser,
} from "@/lib/github-shared";

export type GitHubState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; user: GitHubUser; repos: GitHubRepo[] };

interface GitHubContextValue {
  state: GitHubState;
  retry: () => void;
}

const GitHubContext = createContext<GitHubContextValue | null>(null);

/**
 * Receives the server-fetched (cached) GitHub data. If the server fetch failed
 * (for example rate limiting at build time), it quietly retries in the browser.
 */
export default function GitHubProvider({
  initial,
  children,
}: {
  initial: GitHubData;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<GitHubState>(initial);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    loadGitHubData({
      headers: { Accept: "application/vnd.github+json" },
    }).then(setState);
  }, []);

  useEffect(() => {
    if (initial.status === "error") retry();
  }, [initial.status, retry]);

  const value = useMemo(() => ({ state, retry }), [state, retry]);

  return (
    <GitHubContext.Provider value={value}>{children}</GitHubContext.Provider>
  );
}

export function useGitHub(): GitHubContextValue {
  const ctx = useContext(GitHubContext);
  if (!ctx) throw new Error("useGitHub must be used inside <GitHubProvider>");
  return ctx;
}
