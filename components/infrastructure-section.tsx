"use client";

import { useEffect, useRef } from "react";

export function InfrastructureSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.6)";
        ctx.fill();
      });

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="py-24 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="infrastructure-card relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 md:p-12 border border-zinc-700">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-30"
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Global Security Infrastructure
            </h2>
            <p className="text-zinc-400 max-w-2xl mb-8">
              Our distributed network of security nodes provides comprehensive coverage
              across all major regions, ensuring your data is protected no matter where
              your operations are based.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-500">50+</div>
                <div className="text-zinc-400">Global Data Centers</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-500">&lt;10ms</div>
                <div className="text-zinc-400">Average Latency</div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-500">99.999%</div>
                <div className="text-zinc-400">Network Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
