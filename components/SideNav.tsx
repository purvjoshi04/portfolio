"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "Home"    },
  { id: "skills",   label: "Skills"  },
  { id: "projects", label: "Projects"},
  { id: "github",   label: "GitHub"  },
  { id: "contact",  label: "Contact" },
] as const;

export default function SideNav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = id === "hero"
        ? document.querySelector<HTMLElement>("section")
        : document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={id === "hero" ? "#" : `#${id}`}
            title={label}
            aria-label={label}
            className="group flex items-center gap-2 justify-end"
          >
            <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase opacity-0 group-hover:opacity-25 transition-opacity duration-200">
              {label}
            </span>
            <div
              className={`rounded-full bg-white transition-all duration-250 ${
                isActive ? "w-2 h-2 opacity-80" : "w-1.5 h-1.5 opacity-15 group-hover:opacity-40"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
