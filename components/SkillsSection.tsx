"use client";

import { useEffect, useRef, useState } from "react";
import { skillCategories, heroStats } from "@/lib/data";
import type { SkillCategory } from "@/types";

function useVisible(threshold = 0.1) {
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

function CategoryRow({ cat, index, visible }: { cat: SkillCategory; index: number; visible: boolean }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase w-5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] text-white/45 tracking-[0.2em] uppercase">
          {cat.label}
        </span>
        <div className="flex-1 h-px bg-white/8" />
      </div>
      <div className="flex flex-wrap gap-2 pl-8">
        {cat.items.map((item, i) => (
          <span
            key={item}
            className="font-mono text-[11px] text-white/60 px-3 py-1.5 border border-white/10 hover:border-white/35 hover:text-white/90 transition-all duration-200 cursor-default"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${index * 0.06 + i * 0.025 + 0.15}s`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, visible } = useVisible(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="skills" className="py-28">
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
            Skills
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            What I work with
          </h2>
        </div>
        <div className="space-y-9">
          {skillCategories.map((cat, i) => (
            <CategoryRow key={cat.id} cat={cat} index={i} visible={visible} />
          ))}
        </div>
        <div
          className="mt-20 pt-10 border-t border-white/8 grid grid-cols-3 gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          {heroStats.map(({ num, label }) => (
            <div key={label}>
              <p className="font-display font-bold text-3xl md:text-4xl text-white">{num}</p>
              <p className="font-mono text-[9px] tracking-[0.2em] text-white/28 uppercase mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
