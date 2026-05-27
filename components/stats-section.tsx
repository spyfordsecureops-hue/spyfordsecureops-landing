"use client";

import { useEffect, useState, useRef } from "react";

function useCountUp(end: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref, suffix };
}

export function StatsSection() {
  const stat1 = useCountUp(99.99, 2000);
  const stat2 = useCountUp(500, 2000);
  const stat3 = useCountUp(10, 2000);
  const stat4 = useCountUp(24, 2000);

  const stats = [
    { ...stat1, label: "Uptime SLA", suffix: "%" },
    { ...stat2, label: "Enterprise Clients", suffix: "+" },
    { ...stat3, label: "Threats Blocked Daily", suffix: "M+" },
    { ...stat4, label: "Security Monitoring", suffix: "/7" },
  ];

  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} ref={stat.ref} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">
                {stat.count}
                {stat.suffix}
              </div>
              <div className="text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
