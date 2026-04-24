"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  getMonthLabels,
  getContributionLevel,
  LEVEL_OPACITIES,
  DAY_LABELS,
} from "@/lib/contributions";
import type { GitHubUserStats, ContributionWeek } from "@/types";

interface TooltipState { date: string; count: number; x: number; y: number; }

interface FetchState {
  data: GitHubUserStats | null;
  loading: boolean;
  error: string | null;
  isMock: boolean;
}

function useVisible(threshold = 0.06) {
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

function GraphSkeleton() {
  return (
    <div className="animate-pulse space-y-1.5">
      <div className="flex gap-[3px] pl-[28px]">
        {Array.from({ length: 53 }).map((_, i) => (
          <div key={i} className="w-[11px] h-[8px] bg-white/5 rounded-[1px] shrink-0" />
        ))}
      </div>
      {Array.from({ length: 7 }).map((_, row) => (
        <div key={row} className="flex gap-[3px] pl-[28px]">
          {Array.from({ length: 53 }).map((_, col) => (
            <div key={col} className="w-[11px] h-[11px] bg-white/5 rounded-[2px] shrink-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

function ContributionGraph({ weeks, animated }: { weeks: ContributionWeek[]; animated: boolean }) {
  const graphRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  const CELL = 11; const GAP = 3;

  function handleEnter(e: React.MouseEvent<HTMLDivElement>, date: string, count: number) {
    if (!graphRef.current) return;
    const c = e.currentTarget.getBoundingClientRect();
    const p = graphRef.current.getBoundingClientRect();
    setTooltip({ date, count, x: c.left - p.left + CELL / 2, y: c.top - p.top - 40 });
  }

  return (
    <div ref={graphRef} className="relative overflow-x-auto pb-2">
      <div className="inline-block min-w-max">
        <div className="flex mb-1.5" style={{ paddingLeft: 28, gap: GAP }}>
          {weeks.map((_, wi) => {
            const ml = monthLabels.find((m) => m.weekIndex === wi);
            return (
              <div key={wi} className="font-mono text-[8px] text-white/20" style={{ width: CELL, flexShrink: 0 }}>
                {ml?.label ?? ""}
              </div>
            );
          })}
        </div>

        <div className="flex">
          <div className="flex flex-col shrink-0" style={{ gap: GAP, marginRight: GAP, width: 24 }}>
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="font-mono text-[8px] text-white/18 flex items-center justify-end" style={{ height: CELL, flexShrink: 0 }}>
                {label}
              </div>
            ))}
          </div>
          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day) => {
                  const level = getContributionLevel(day.count);
                  const delay = (wi * 7 + day.day) * 2;
                  return (
                    <div
                      key={day.date}
                      className="rounded-[2px] bg-white cursor-pointer hover:ring-1 hover:ring-white/40 transition-shadow"
                      style={{
                        width: CELL, height: CELL, flexShrink: 0,
                        opacity: animated ? LEVEL_OPACITIES[level] : 0,
                        transition: `opacity 0.3s ease ${delay}ms`,
                      }}
                      onMouseEnter={(e) => handleEnter(e, day.date, day.count)}
                      onMouseLeave={() => setTooltip(null)}
                      aria-label={`${day.count} contributions on ${day.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3 pl-[28px]">
          <span className="font-mono text-[8px] text-white/18 mr-0.5">Less</span>
          {LEVEL_OPACITIES.map((op, i) => (
            <div key={i} className="rounded-[2px] bg-white" style={{ width: CELL, height: CELL, opacity: op, flexShrink: 0 }} />
          ))}
          <span className="font-mono text-[8px] text-white/18 ml-0.5">More</span>
        </div>
      </div>

      {tooltip && (
        <div
          className="absolute z-20 bg-white text-black font-mono text-[9px] px-2.5 py-1.5 rounded-sm pointer-events-none whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translateX(-50%)" }}
        >
          <strong>{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</strong> on {tooltip.date}
        </div>
      )}
    </div>
  );
}

export default function GithubSection() {
  const { ref, visible } = useVisible(0.06);
  const [animated, setAnimated] = useState(false);
  const [state, setState] = useState<FetchState>({ data: null, loading: true, error: null, isMock: false });

  useEffect(() => {
    if (visible) setTimeout(() => setAnimated(true), 400);
  }, [visible]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          const j = (await res.json()) as { error?: string };
          throw new Error(j.error ?? `HTTP ${res.status}`);
        }
        const j = (await res.json()) as GitHubUserStats & { _mock?: boolean };
        setState({ data: j, loading: false, error: null, isMock: j._mock === true });
      } catch (err) {
        setState((s) => ({ ...s, loading: false, error: err instanceof Error ? err.message : "Failed to load" }));
      }
    }
    void load();
  }, []);

  const stats = state.data
    ? [
        { label: "Repositories", value: state.data.repositories.toLocaleString() },
        { label: "Pull Requests", value: state.data.pullRequests.toLocaleString() },
        { label: "Issues Closed", value: state.data.issuesClosed.toLocaleString() },
        { label: "Contributions", value: state.data.totalContributions.toLocaleString() },
      ]
    : [];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="github" className="py-28">
      <div className="container">
        <div
          className="mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase mb-3">Activity</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              GitHub Contributions
            </h2>
            {!state.loading && state.data && (
              <div className="mb-1 text-right">
                <p className="font-display font-bold text-3xl text-white">
                  {state.data.totalContributions.toLocaleString()}
                </p>
                <p className="font-mono text-[8px] tracking-[0.2em] text-white/25 uppercase mt-0.5">
                  this year
                </p>
              </div>
            )}
          </div>

          {state.isMock && (
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase">
                Demo data — set GITHUB_TOKEN in .env.local for real graph
              </span>
            </div>
          )}

          {state.error && (
            <p className="mt-4 font-mono text-[10px] text-white/30">⚠ {state.error}</p>
          )}
        </div>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {state.loading ? <GraphSkeleton /> : state.data ? (
            <ContributionGraph weeks={state.data.weeks} animated={animated} />
          ) : null}
        </div>
        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.45s",
          }}
        >
          {state.loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-black px-6 py-5">
                  <div className="w-10 h-5 bg-white/5 rounded animate-pulse mb-2" />
                  <div className="w-16 h-2 bg-white/5 rounded animate-pulse" />
                </div>
              ))
            : stats.map(({ label, value }) => (
                <div key={label} className="bg-black px-6 py-5">
                  <p className="font-display font-bold text-2xl text-white">{value}</p>
                  <p className="font-mono text-[8px] tracking-[0.18em] text-white/25 uppercase mt-1.5">{label}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
