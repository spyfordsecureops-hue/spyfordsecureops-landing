"use client";

import { useEffect, useRef } from "react";

const sidebarItems = [
  { icon: "◎", label: "Overview", active: true },
  { icon: "⊡", label: "Identities" },
  { icon: "⚠", label: "Threats" },
  { icon: "◈", label: "Network" },
  { icon: "⊞", label: "Correlations" },
  { icon: "↗", label: "Exports" },
];

const widgets = [
  {
    label: "Threats Found",
    value: "247",
    badge: "+12 today",
    badgeClass: "bg-amber-500/10 text-amber-700",
  },
  {
    label: "Risk Score",
    value: "8.4",
    badge: "Critical",
    badgeClass: "bg-red-500/10 text-red-600",
  },
  {
    label: "Modules Run",
    value: "61",
    badge: "Active",
    badgeClass: "bg-blue-soft text-blue",
  },
];

const chartBars = [35, 55, 42, 70, 60, 88, 72, 65, 80, 95, 78, 85, 90, 100];

const feedItems = [
  {
    color: "bg-red-500",
    text: "Credential breach detected — dark web source",
    time: "00:04",
  },
  {
    color: "bg-blue",
    text: "Domain correlation match found (94% confidence)",
    time: "00:12",
  },
  {
    color: "bg-orange-500",
    text: "IP linked to 3 known threat actor clusters",
    time: "00:21",
  },
  {
    color: "bg-green-500",
    text: "Identity cross-reference complete — 8 aliases",
    time: "00:38",
  },
];

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 pt-10 pb-24 flex justify-center" id="platform">
      <div
        ref={ref}
        className="fade-up w-full max-w-[1000px] bg-card border border-border rounded-[40px] shadow-lg overflow-hidden relative animate-fadeUp-delay-4"
      >
        {/* Scanline overlay */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue/40 to-transparent animate-scanline pointer-events-none z-10" />

        {/* Header */}
        <div className="bg-[#F5F5F5]/80 border-b border-border px-6 py-4 flex items-center gap-3.5">
          <div className="flex gap-[7px]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-white border border-border rounded-[10px] px-4 py-2 flex items-center gap-2 font-mono text-xs text-muted max-w-[400px] mx-auto">
            <span className="text-blue text-sm">&#x2315;</span>
            <span>
              Investigate target: 192.168.45.12
              <span className="animate-blink-fast text-blue">_</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-[220px_1fr] gap-4 min-h-[380px] max-md:grid-cols-1">
          {/* Sidebar */}
          <div className="flex flex-col gap-2 max-md:hidden">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer transition-colors ${
                  item.active
                    ? "bg-blue-soft text-blue font-semibold"
                    : "text-muted hover:bg-blue-soft hover:text-blue"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
            <div className="mt-auto">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-muted cursor-pointer hover:bg-blue-soft hover:text-blue transition-colors">
                <span className="text-base">⊙</span>
                Settings
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex flex-col gap-3.5">
            {/* Widgets row */}
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-[480px]:grid-cols-1">
              {widgets.map((w) => (
                <div
                  key={w.label}
                  className="bg-[#F9F9FB] border border-border rounded-2xl p-4"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-light mb-2">
                    {w.label}
                  </div>
                  <div className="font-heading text-[26px] font-extrabold text-foreground leading-none">
                    {w.value}
                  </div>
                  <div
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${w.badgeClass}`}
                  >
                    {w.badge}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-[#F9F9FB] border border-border rounded-2xl p-4 relative overflow-hidden">
              <div className="text-xs font-semibold text-muted mb-3">
                Intelligence Activity — Last 14 days
              </div>
              <div className="flex items-end gap-[5px] h-[60px]">
                {chartBars.map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all hover:opacity-70 ${
                      height >= 88 ? "bg-blue" : "bg-blue-soft"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Feed */}
            <div className="bg-[#F9F9FB] border border-border rounded-2xl p-4">
              <div className="text-xs font-semibold text-muted mb-2.5">
                Live Intelligence Feed
              </div>
              {feedItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 py-[7px] text-xs ${
                    i < feedItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`}
                  />
                  <div className="flex-1 text-muted">{item.text}</div>
                  <div className="text-muted-light text-[11px] font-mono">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
