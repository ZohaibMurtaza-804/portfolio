import Image from "next/image";
import { GraduationCap, Github, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

export default function About() {
  const facts = [
    { icon: GraduationCap, label: "Education", value: siteConfig.education },
    { icon: MapPin, label: "Location", value: siteConfig.location },
    {
      icon: Github,
      label: "GitHub",
      value: `@${siteConfig.github.username}`,
      href: siteConfig.github.url,
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="01 / About"
      title="A student who learns by building."
    >
      <div className="grid items-start gap-12 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="glass rounded-2xl p-6">
            {/* Your photo if siteConfig.profileImage is set, otherwise initials. */}
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#5b5bf0] to-[#7c3aed] p-[2px]">
              {siteConfig.profileImage ? (
                <div className="relative h-full w-full overflow-hidden rounded-full bg-bg">
                  <Image
                    src={siteConfig.profileImage}
                    alt={`Photo of ${siteConfig.name}`}
                    fill
                    sizes="128px"
                    priority
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden
                  className="flex h-full w-full items-center justify-center rounded-full bg-bg font-mono text-3xl font-semibold"
                >
                  <span className="text-gradient">{siteConfig.shortName}</span>
                </div>
              )}
            </div>
            <p className="mt-5 text-center text-lg font-semibold">
              {siteConfig.name}
            </p>
            <p className="text-center text-sm text-muted">
              IT student &amp; developer
            </p>

            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {facts.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-xs text-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words hover:text-accent"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="break-words">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I&apos;m an Information Technology student from {siteConfig.location},
            working toward a {siteConfig.education}. I like understanding how
            software works, breaking a problem into small steps, and turning an
            idea into something people can actually use.
          </p>
          <p>
            My interests include web development, software development, cloud
            computing, and AI-related projects. I&apos;m still early in my
            journey, so I focus on learning in public:
            this site pulls its project list straight from my GitHub, so what you
            see here is what I&apos;ve really built.
          </p>
          <p>
            If you&apos;d like to collaborate, review my work, or just talk
            technology, I&apos;d be glad to hear from you.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}