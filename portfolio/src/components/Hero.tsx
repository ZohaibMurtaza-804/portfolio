"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import ButtonLink from "./ui/ButtonLink";

type Kind = "k" | "n" | "s" | "p" | "v";
type Token = [text: string, kind: Kind];

const tokenClass: Record<Kind, string> = {
  k: "text-violet-700 dark:text-violet-300",
  n: "text-sky-700 dark:text-sky-300",
  s: "text-emerald-700 dark:text-emerald-300",
  p: "text-muted",
  v: "text-fg",
};

// Built only from details you provided (see src/config/site.ts).
const codeLines: Token[][] = [
  [["const ", "k"], ["zohaib", "v"], [" = {", "p"]],
  [["  role", "n"], [": ", "p"], ['"IT Student & Developer"', "s"], [",", "p"]],
  [["  education", "n"], [": ", "p"], [`"${siteConfig.education}"`, "s"], [",", "p"]],
  [["  location", "n"], [": ", "p"], [`"${siteConfig.location}"`, "s"], [",", "p"]],
  [["  interests", "n"], [": [", "p"]],
  ...siteConfig.interests.map((interest): Token[] => [
    [`    "${interest}"`, "s"],
    [",", "p"],
  ]),
  [["  ],", "p"]],
  [["  github", "n"], [": ", "p"], [`"${siteConfig.github.username}"`, "s"], [",", "p"]],
  [["};", "p"]],
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-28 pb-20"
    >
      {/* Lightweight background: grid + two soft gradients (pure CSS) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-[90%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 left-1/2 h-[360px] w-[360px] translate-x-[10%] rounded-full bg-accent2/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center rounded-full px-4 py-1.5 font-mono text-xs text-muted"
          >
            Information Technology student · {siteConfig.location}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Building Ideas Into{" "}
            <span className="text-gradient">Digital Experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m {siteConfig.name}, an Information Technology student passionate
            about technology, software development, and building practical digital
            solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#projects">
              Explore My Projects <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={siteConfig.github.url} variant="secondary" external>
              <Github className="h-4 w-4" aria-hidden /> Visit My GitHub
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="min-w-0"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass overflow-hidden rounded-2xl shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-green-400/70" aria-hidden />
              <span className="ml-3 font-mono text-xs text-muted">profile.ts</span>
            </div>
            <pre
              className="overflow-x-auto p-5 font-mono text-xs leading-6 sm:text-[13px]"
              aria-label="Profile summary shown as code"
            >
              <code>
                {codeLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block whitespace-pre"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                  >
                    {line.map(([text, kind], j) => (
                      <span key={j} className={tokenClass[kind]}>
                        {text}
                      </span>
                    ))}
                  </motion.span>
                ))}
              </code>
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
