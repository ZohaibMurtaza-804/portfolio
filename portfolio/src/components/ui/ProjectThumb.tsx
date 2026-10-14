function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * A generated abstract visual (not a fake screenshot). Colors are derived from
 * the repository name, so every project gets a stable, distinct thumbnail.
 */
export default function ProjectThumb({ name }: { name: string }) {
  const h = hash(name);
  const hue1 = 225 + (h % 40);
  const hue2 = hue1 + 40;
  const initials = name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();

  return (
    <div
      aria-hidden
      className="relative h-40 overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(135deg, hsl(${hue1} 70% 24%), hsl(${hue2} 65% 14%))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-semibold tracking-widest text-white/90">
        {initials}
      </span>
      <span className="absolute bottom-3 left-4 max-w-[85%] truncate font-mono text-[11px] text-white/60">
        {"</>"} {name}
      </span>
    </div>
  );
}
