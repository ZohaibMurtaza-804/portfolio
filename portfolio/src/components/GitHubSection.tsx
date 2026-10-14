"use client";

import Image from "next/image";
import { ArrowUpRight, GitFork, Github, RefreshCw, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  formatMonthYear,
  languageStats,
  ownRepos,
} from "@/lib/github-shared";
import { useGitHub } from "./GitHubProvider";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-fg/[0.03] p-4">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

export default function GitHubSection() {
  const { state, retry } = useGitHub();

  return (
    <Section
      id="github"
      eyebrow="04 / GitHub"
      title="Live from GitHub."
      description="These numbers come from GitHub's public API, refreshed regularly. Nothing here is hard-coded."
    >
      <div aria-live="polite">
        {state.status === "loading" && (
          <div className="glass h-64 animate-pulse rounded-2xl" aria-label="Loading GitHub data" />
        )}

        {state.status === "error" && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="font-medium">GitHub data is unavailable right now.</p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-accent/50"
              >
                <RefreshCw className="h-4 w-4" aria-hidden /> Try again
              </button>
              <a
                href={siteConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-accent/50"
              >
                <Github className="h-4 w-4" aria-hidden /> Open my profile
              </a>
            </div>
          </div>
        )}

        {state.status === "ok" && (
          <GitHubContent state={state} />
        )}
      </div>
    </Section>
  );
}

function GitHubContent({
  state,
}: {
  state: Extract<ReturnType<typeof useGitHub>["state"], { status: "ok" }>;
}) {
  const { user, repos } = state;
  const own = ownRepos(repos);
  const languages = languageStats(repos);
  const totalStars = own.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = own.reduce((sum, r) => sum + r.forks_count, 0);
  const recent = own.slice(0, 5);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Reveal>
        <div className="glass h-full rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <Image
              src={user.avatar_url}
              alt={`GitHub avatar of ${user.login}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border border-line"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold">{user.name ?? user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
              >
                @{user.login} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
          {user.bio && <p className="mt-4 text-sm text-muted">{user.bio}</p>}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Public repositories" value={user.public_repos} />
            <Stat label="Followers" value={user.followers} />
            <Stat label="Total stars" value={totalStars} />
            <Stat label="Total forks" value={totalForks} />
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium">Languages</p>
            {languages.length === 0 ? (
              <p className="mt-2 text-sm text-muted">
                None detected yet. They appear automatically once repositories
                contain code.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {languages.map((lang) => (
                  <li key={lang.name} className="text-sm">
                    <div className="flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-muted">
                        {lang.count} {lang.count === 1 ? "repo" : "repos"}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-fg/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#5b5bf0] to-[#7c3aed]"
                        style={{ width: `${Math.max(lang.percent, 4)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass h-full rounded-2xl p-6">
          <h3 className="font-semibold">Recently updated</h3>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No public repositories yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {recent.map((repo) => (
                <li key={repo.id} className="py-4 first:pt-0 last:pb-0">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="break-words font-medium group-hover:text-accent">
                        {repo.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {repo.description ?? "No description added yet."}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" aria-hidden />
                          {repo.stargazers_count}
                          <span className="sr-only"> stars</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" aria-hidden />
                          {repo.forks_count}
                          <span className="sr-only"> forks</span>
                        </span>
                        <span>Updated {formatMonthYear(repo.pushed_at)}</span>
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted group-hover:text-accent" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
            A contribution graph can&apos;t be fetched reliably from the public
            API, so it isn&apos;t shown here. You can see it on{" "}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent"
            >
              my GitHub profile
            </a>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
