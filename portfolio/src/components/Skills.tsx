"use client";

import { Cloud, Code2, Globe, Sparkles } from "lucide-react";
import { skillGroups } from "@/config/site";
import { languageStats } from "@/lib/github-shared";
import { useGitHub } from "./GitHubProvider";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

const areas = [
  {
    icon: Globe,
    title: "Web development",
    text: "Learning to build responsive, accessible websites and web apps.",
  },
  {
    icon: Code2,
    title: "Software development",
    text: "Writing software that solves practical, real-world problems.",
  },
  {
    icon: Cloud,
    title: "Cloud computing",
    text: "Exploring how applications are built, deployed, and run in the cloud.",
  },
  {
    icon: Sparkles,
    title: "AI-related projects",
    text: "Exploring where AI ideas can fit into useful projects.",
  },
];

export default function Skills() {
  const { state } = useGitHub();
  const languages = state.status === "ok" ? languageStats(state.repos) : [];

  return (
    <Section
      id="skills"
      eyebrow="02 / Skills"
      title="What I'm exploring and using."
      description="No made-up percentages. Languages below come straight from my GitHub repositories, so the list grows as my work does."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.07}>
            <div className="glass h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-accent/40">
              <Icon className="h-6 w-6 text-accent" aria-hidden />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="font-semibold">Languages on GitHub</h3>
          <p className="mt-1 text-sm text-muted">
            Primary language of each public repository, as detected by GitHub.
          </p>

          <div className="mt-5" aria-live="polite">
            {state.status === "loading" && (
              <div className="flex flex-wrap gap-2" aria-label="Loading languages">
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="h-9 w-24 animate-pulse rounded-full bg-fg/10"
                  />
                ))}
              </div>
            )}

            {state.status === "error" && (
              <p className="text-sm text-muted">
                Couldn&apos;t load languages from GitHub right now.
              </p>
            )}

            {state.status === "ok" && languages.length === 0 && (
              <p className="text-sm text-muted">
                No languages detected yet. GitHub fills this in automatically once
                a repository contains code.
              </p>
            )}

            {state.status === "ok" && languages.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="rounded-full border border-line bg-fg/[0.04] px-4 py-2 text-sm"
                  >
                    {lang.name}
                    <span className="ml-2 text-xs text-muted">
                      {lang.count} {lang.count === 1 ? "repo" : "repos"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>

      {skillGroups.length > 0 && (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-fg/[0.04] px-3 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
