"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export default function HeroSection() {
  const { roles, name, bio, available } = personalInfo;
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timer.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timer.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timer.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [displayed, deleting, roleIndex, roles]);

  const [firstName, lastName] = name.split(" ");

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-20 items-center pt-24 md:pt-0">

        {/* Image */}
        <div className="flex justify-center items-center animate-fade-up" style={{ animationDelay: "0.05s", opacity: 0 }}>
          <div className="relative w-[240px] h-[300px] md:w-[340px] md:h-[420px]">
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border border-white/[0.07]" />
            {["top-0 left-0", "top-0 right-0 -scale-x-100", "bottom-0 left-0 -scale-y-100", "bottom-0 right-0 scale-[-1]"].map((pos, i) => (
              <span key={i} className={`absolute ${pos} w-[18px] h-[18px] z-10 before:absolute before:inset-0 before:border-t before:border-l before:border-white/50`} />
            ))}
            <div className="relative z-[2] w-full h-full overflow-hidden">
              <Image
                src="/profile.svg"
                alt="Purv Joshi"
                fill
                className="object-cover grayscale-[10%]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {available && (
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white opacity-60" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Open to opportunities
              </span>
            </div>
          )}

          <h1
            className="font-display font-extrabold leading-[0.95] tracking-tight mb-6 animate-fade-up"
            style={{ fontSize: "clamp(38px, 7vw, 88px)", animationDelay: "0.2s", opacity: 0 }}
          >
            <span className="block">{firstName}</span>
            <span className="block md:pl-[0.35em]">{lastName}</span>
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-1 mb-6 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <span className="font-mono text-sm text-white/50">{displayed}</span>
            <span className="inline-block w-[2px] h-4 bg-white/50 animate-blink" aria-hidden="true" />
          </div>

          <div className="w-12 h-px bg-white/20 mb-6 animate-fade-up mx-auto md:mx-0" style={{ animationDelay: "0.4s", opacity: 0 }} />

          <p className="font-body text-sm text-white/40 max-w-lg leading-relaxed mb-10 animate-fade-up mx-auto md:mx-0" style={{ animationDelay: "0.5s", opacity: 0 }}>
            {bio}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <a href="#projects" className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
              <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 border border-white/15 text-white/60 font-mono text-xs tracking-[0.15em] uppercase hover:border-white/35 hover:text-white/90 transition-all duration-200">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
        <div className="w-px h-10 bg-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white scroll-line" />
        </div>
      </div>
    </section>
  );
}