"use client";

import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { socialLinks, personalInfo } from "@/lib/data";
import { currentYear, padIndex } from "@/lib/utils";
import type { ContactFormData, FormStatus } from "@/types";

const EMPTY: ContactFormData = { name: "", email: "", message: "" };

function useVisible(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ContactSection() {
  const { ref, visible } = useVisible(0.06);
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b text-white font-body text-sm py-2.5 outline-none placeholder:text-white/18 transition-colors duration-150 ${focused === name ? "border-white/35" : "border-white/10"
    }`;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="contact" className="py-28">
      <div className="container">
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase mb-3">
            Contact
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Let&apos;s work together
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            {status === "sent" ? (
              <div className="space-y-4 pt-4">
                <p className="font-display font-bold text-2xl text-white">Message sent ✓</p>
                <p className="font-body text-sm text-white/35">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-[9px] text-white/28 hover:text-white/60 transition-colors underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                <div>
                  <label htmlFor="name" className={`block font-mono text-[9px] tracking-[0.25em] uppercase mb-2 transition-colors ${focused === "name" ? "text-white/45" : "text-white/22"}`}>
                    Name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className={inputClass("name")}
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block font-mono text-[9px] tracking-[0.25em] uppercase mb-2 transition-colors ${focused === "email" ? "text-white/45" : "text-white/22"}`}>
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    placeholder="purvjoshi.dev@gmail.com"
                    className={inputClass("email")}
                    disabled={status === "sending"}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block font-mono text-[9px] tracking-[0.25em] uppercase mb-2 transition-colors ${focused === "message" ? "text-white/45" : "text-white/22"}`}>
                    Message
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project…"
                    className={`${inputClass("message")} resize-none`}
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p className="font-mono text-[9px] text-white/35">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative overflow-hidden inline-flex items-center px-7 py-3 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </span>
                  <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <p className="font-body text-sm text-white/30 leading-relaxed mb-10">
              {personalInfo.contactBio}
            </p>

            <div>
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-t border-white/7 hover:border-white/20 transition-colors duration-200"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.25 + i * 0.06}s`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[8px] text-white/18 w-4">{padIndex(i + 1)}</span>
                    <span className="font-display font-semibold text-sm text-white/75 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-white/22 group-hover:text-white/50 transition-colors">
                      {link.handle}
                    </span>
                    <span className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
              <div className="border-t border-white/7" />
            </div>
          </div>
        </div>
        <div
          className="mt-24 pt-8 border-t border-white/7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <span className="font-display font-bold text-lg text-white/40">
            {personalInfo.initials}.
          </span>
          <span className="font-mono text-[8px] text-white/18 tracking-[0.1em]">
            © {currentYear()} {personalInfo.name}. All rights reserved.
          </span>
          <div className="flex gap-5">
            {socialLinks.slice(0, 3).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[8px] text-white/18 hover:text-white/45 transition-colors tracking-[0.15em] uppercase"
              >
                {s.label.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
