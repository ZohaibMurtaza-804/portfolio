"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
}

const inputClass =
  "w-full rounded-xl border border-line bg-fg/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-accent";

/** Only rendered when NEXT_PUBLIC_FORM_ENDPOINT is configured. */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const honeypot = (
      e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null
    )?.value;

    setStatus("submitting");
    try {
      const res = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _gotcha: honeypot ?? "" }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="glass rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" aria-hidden />
        <p className="mt-3 font-semibold">Message sent. Thank you!</p>
        <p className="mt-1 text-sm text-muted">I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-accent underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-2xl p-6 sm:p-8">
      <div>
        <label htmlFor="cf-name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={inputClass}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="cf-name-error" className="mt-1.5 text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="cf-email-error" className="mt-1.5 text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={inputClass}
          placeholder="Tell me about your idea or opportunity"
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-1.5 text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field: hidden from people, tempting for bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div aria-live="polite">
        {status === "error" && (
          <p className="flex items-start gap-2 text-sm text-red-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Your message could not be sent. Please try again, or reach out on GitHub.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5b5bf0] to-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden /> Send message
          </>
        )}
      </button>
    </form>
  );
}
