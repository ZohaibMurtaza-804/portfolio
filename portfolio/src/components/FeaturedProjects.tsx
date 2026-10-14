"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, RefreshCw, Star, GitFork } from "lucide-react";
import { featuredRepos, projectOverrides, siteConfig } from "@/config/site";
import {
  formatMonthYear,
  ownRepos,
  type GitHubRepo,
} from "@/lib/github-shared";
import { useGitHub } from "./GitHubProvider";
import ProjectThumb from "./ui/ProjectThumb";
import Section from "./ui/Section";

function demoUrl(repo: GitHubRepo): string | null {
  const raw = projectOverrides[repo.name]?.demo || repo.homepage;
  if (!raw) return null;
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const override = projectOverrides[repo.name];
  const description =
    override?.description ?? repo.description ?? "No description added yet.";
  const demo = demoUrl(repo);

  // Only technologies that can be verified: GitHub language, GitHub topics,
  // and tags you added yourself in src/config/site.ts.
  const tags = Array.from(
    new Set([
      ...(override?.tags ?? []),
      ...(repo.language ? [repo.language] : []),
      ...repo.topics,
    ])
  ).slice(0, 6);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass flex flex-col rounded-2xl p-4 transition-colors hover:border-accent/40"
    >
      <ProjectThumb name={repo.name} />

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <h3 className="break-words text-lg font-semibold tracking-tight">
          {repo.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-fg/[0.04] px-2.5 py-1 font-mono text-[11px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" aria-hidden /> {repo.stargazers_count}
              <span className="sr-only"> stars</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" aria-hidden /> {repo.forks_count}
              <span className="sr-only"> forks</span>
            </span>
            <span>Updated {formatMonthYear(repo.pushed_at)}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm transition hover:border-accent/50 hover:text-accent"
            >
              <Github className="h-4 w-4" aria-hidden /> Code
              <span className="sr-only"> for {repo.name}</span>
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5b5bf0] to-[#7c3aed] px-3 py-1.5 text-sm text-white"
              >
                <ExternalLink className="h-4 w-4" aria-hidden /> Live demo
                <span className="sr-only"> for {repo.name}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects() {
  const { state, retry } = useGitHub();
  const [filter, setFilter] = useState("All");

  const projects = useMemo<GitHubRepo[]>(() => {
    if (state.status !== "ok") return [];
    const own = ownRepos(state.repos);
    const ordered =
      featuredRepos.length > 0
        ? featuredRepos
            .map((name) => own.find((r) => r.name === name))
            .filter((r): r is GitHubRepo => Boolean(r))
        : own;
    return ordered.slice(0, 6);
  }, [state]);

  // Filters only appear when the data supports them (2+ different languages).
  const languages = useMemo(
    () =>
      Array.from(
        new Set(projects.map((p) => p.language).filter((l): l is string => !!l))
      ),
    [projects]
  );
  const activeFilter = languages.includes(filter) ? filter : "All";
  const visible =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.language === activeFilter);

  return (
    <Section
      id="projects"
      eyebrow="03 / Projects"
      title="Featured projects."
      description="Pulled live from my public GitHub repositories. Descriptions and links are real, nothing is staged."
    >
      <div aria-live="polite">
        {state.status === "loading" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading projects">
            {[0, 1, 2].map((n) => (
              <div key={n} className="glass h-80 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="font-medium">Couldn&apos;t load projects from GitHub.</p>
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
                <Github className="h-4 w-4" aria-hidden /> View on GitHub
              </a>
            </div>
          </div>
        )}

        {state.status === "ok" && projects.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="font-medium">No public repositories to show yet.</p>
            <p className="mt-2 text-sm text-muted">
              New projects will appear here automatically after they&apos;re
              pushed to GitHub.
            </p>
          </div>
        )}

        {state.status === "ok" && projects.length > 0 && (
          <>
            {languages.length >= 2 && (
              <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by language">
                {["All", ...languages].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFilter(lang)}
                    aria-pressed={activeFilter === lang}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${
                      activeFilter === lang
                        ? "border-transparent bg-fg text-bg"
                        : "border-line text-muted hover:text-fg"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
