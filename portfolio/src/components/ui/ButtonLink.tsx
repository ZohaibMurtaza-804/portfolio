import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#5b5bf0] to-[#7c3aed] text-white shadow-lg shadow-[#5b5bf0]/20 hover:shadow-[#5b5bf0]/35"
      : "glass text-fg hover:border-accent/50";

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
