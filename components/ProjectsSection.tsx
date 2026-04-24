"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/types";

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

function ProjectRow({ project, index, parentVisible }: { project: Project; index: number; parentVisible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative py-8 border-b border-white/8 cursor-default"
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2.5 flex-wrap">
            <span className="font-mono text-[9px] text-white/20">{project.id}</span>
            <h3
              className="font-display font-bold text-xl text-white transition-opacity duration-200"
              style={{ opacity: hovered ? 1 : 0.85 }}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span className="font-mono text-[8px] tracking-[0.15em] px-2 py-0.5 border border-white/18 text-white/35 uppercase">
                Featured
              </span>
            )}
          </div>
          <p className="font-body text-sm text-white/35 leading-relaxed max-w-md mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] text-white/28 px-2.5 py-1 bg-white/[0.04] border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end gap-4 shrink-0">
          <span className="font-mono text-[9px] text-white/20">{project.year}</span>
          <div className="flex gap-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] text-white/30 hover:text-white/70 transition-colors underline underline-offset-4"
            >
              GitHub
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] text-white/30 hover:text-white/70 transition-colors underline underline-offset-4"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref, visible } = useVisible(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="projects" className="py-28">
      <div className="container">
        <div
          className="mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase mb-3">
                Projects
              </p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
                Selected Work
              </h2>
            </div>
            <a
              href="https://github.com/purvjoshi04/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] text-white/28 hover:text-white/60 transition-colors underline underline-offset-4 mb-1"
            >
              All on GitHub ↗
            </a>
          </div>
        </div>

        <div className="border-t border-white/8" />
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} parentVisible={visible} />
        ))}
      </div>
    </section>
  );
}
