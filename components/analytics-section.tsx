"use client";

import { useEffect, useRef, useState } from "react";

export function AnalyticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const dataPoints = [
    { x: 0, y: 70 },
    { x: 50, y: 45 },
    { x: 100, y: 60 },
    { x: 150, y: 30 },
    { x: 200, y: 50 },
    { x: 250, y: 25 },
    { x: 300, y: 40 },
    { x: 350, y: 15 },
    { x: 400, y: 35 },
    { x: 450, y: 20 },
    { x: 500, y: 10 },
  ];

  const pathD = dataPoints
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <section ref={sectionRef} id="analytics" className="py-24 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real-Time Security Analytics
            </h2>
            <p className="text-zinc-400 mb-6">
              Monitor your security posture with comprehensive dashboards and real-time
              threat visualization. Our analytics engine processes millions of events
              per second to give you actionable insights.
            </p>
            <ul className="space-y-3">
              {[
                "Live threat monitoring dashboard",
                "Customizable alert thresholds",
                "Historical trend analysis",
                "Compliance reporting",
                "Executive summary reports",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <svg
                    className="w-5 h-5 text-emerald-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="analytics-viz bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Threat Detection Rate</h3>
              <span className="text-emerald-500 text-sm">-47% threats blocked</span>
            </div>
            <svg viewBox="0 0 500 100" className="w-full h-48">
              <defs>
                <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${pathD} L 500 100 L 0 100 Z`}
                fill="url(#graphGradient)"
                className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              />
              <path
                d={pathD}
                fill="none"
                stroke="rgb(16, 185, 129)"
                strokeWidth="2"
                className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isVisible ? 0 : 1000,
                  transition: "stroke-dashoffset 2s ease-out",
                }}
              />
              {dataPoints.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="rgb(16, 185, 129)"
                  className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </svg>
            <div className="flex justify-between text-zinc-500 text-sm mt-2">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
