import { journey } from "@/config/site";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

export default function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="05 / Journey"
      title="Development journey."
      description="A simple timeline. Items marked as placeholders are waiting for real dates and details."
    >
      <ol className="relative ml-3 border-l border-line">
        {journey.map((item, i) => (
          <li key={`${item.title}-${i}`} className="mb-10 ml-8 last:mb-0">
            <span
              aria-hidden
              className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${
                item.placeholder
                  ? "bg-muted/60"
                  : "bg-gradient-to-br from-[#5b5bf0] to-[#7c3aed]"
              }`}
            />
            <Reveal delay={i * 0.06}>
              <div
                className={`rounded-2xl p-5 ${
                  item.placeholder
                    ? "border border-dashed border-line"
                    : "glass"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <time className="font-mono text-xs text-accent">{item.date}</time>
                  {item.placeholder && (
                    <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                      Editable placeholder
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
