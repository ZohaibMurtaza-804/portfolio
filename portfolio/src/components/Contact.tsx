import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

export default function Contact() {
  const links = [
    {
      icon: Github,
      label: "GitHub",
      value: `@${siteConfig.github.username}`,
      href: siteConfig.github.url,
    },
    ...(siteConfig.email
      ? [
          {
            icon: Mail,
            label: "Email",
            value: siteConfig.email,
            href: `mailto:${siteConfig.email}`,
          },
        ]
      : []),
    ...(siteConfig.linkedin
      ? [
          {
            icon: Linkedin,
            label: "LinkedIn",
            value: "View profile",
            href: siteConfig.linkedin,
          },
        ]
      : []),
  ];

  const hasForm = Boolean(siteConfig.contactEndpoint);

  return (
    <Section
      id="contact"
      eyebrow="06 / Contact"
      title="Let's build something together."
      description="I'm open to collaborating on projects, learning opportunities, and conversations about technology."
    >
      <div className={hasForm ? "grid gap-8 lg:grid-cols-2" : "max-w-xl"}>
        <Reveal>
          <ul className="space-y-4">
            {links.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block break-words font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {hasForm && (
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
