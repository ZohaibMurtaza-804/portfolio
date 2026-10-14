"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { websites, type WebsiteItem } from "@/config/site";
import ProjectThumb from "./ui/ProjectThumb";
import Section from "./ui/Section";

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function WebsiteCard({ site, index }: { site: WebsiteItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass flex flex-col rounded-2xl p-4 transition-colors hover:border-accent/40"
    >
      {site.image ? (
        <div className="relative h-40 overflow-hidden rounded-xl border border-line">
          <Image
            src={site.image}
            alt={`Screenshot of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <ProjectThumb name={site.name} />
      )}

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        {site.label && (
          <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
            {site.label}
          </p>
        )}
        <h3 className="mt-1 break-words text-lg font-semibold tracking-tight">
          {site.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {site.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="min-w-0 truncate font-mono text-xs text-muted">
            {hostname(site.url)}
          </span>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5b5bf0] to-[#7c3aed] px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            Visit website <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only"> {site.name}</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Websites() {
  if (websites.length === 0) return null;

  return (
    <Section
      id="websites"
      eyebrow="03b / Websites"
      title="Websites you can visit."
      description="Live websites I've worked on. Open any of them to see the real thing."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {websites.map((site, i) => (
          <WebsiteCard key={site.url} site={site} index={i} />
        ))}
      </div>
    </Section>
  );
}