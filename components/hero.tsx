export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[140px] pb-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(47,91,255,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-[18px] py-2 text-xs font-semibold text-blue tracking-[0.5px] uppercase mb-8 shadow-[var(--shadow)] animate-fadeUp z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-blue animate-blink" />
        Enterprise Intelligence Platform
      </div>

      {/* Headline */}
      <h1 className="font-heading text-[clamp(42px,8vw,88px)] font-extrabold leading-[1.02] tracking-[-2px] text-foreground max-w-[900px] animate-fadeUp-delay-1 mb-6 z-10">
        Cyber Intelligence
        <br />
        <span className="text-blue">Reimagined.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-[clamp(16px,2vw,19px)] text-muted max-w-[520px] leading-[1.7] animate-fadeUp-delay-2 mb-11 z-10">
        Advanced{" "}
        <span className="text-blue font-semibold">threat intelligence</span> and{" "}
        <span className="text-blue font-semibold">digital investigation</span>{" "}
        infrastructure — built for enterprise security teams who demand
        precision at scale.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3.5 animate-fadeUp-delay-3 flex-wrap justify-center z-10 max-[480px]:flex-col max-[480px]:w-full">
        <a
          href="#"
          className="inline-flex items-center gap-2.5 bg-blue text-white font-body text-[15px] font-semibold px-[34px] py-4 rounded-2xl shadow-[0_8px_32px_rgba(47,91,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(47,91,255,0.45)] transition-all animate-pulse-glow max-[480px]:w-full max-[480px]:justify-center"
        >
          Launch Investigation
        </a>
        <a
          href="#platform"
          className="inline-flex items-center gap-2 bg-card text-foreground font-body text-[15px] font-medium px-7 py-4 rounded-2xl border border-border shadow-[var(--shadow)] hover:-translate-y-0.5 hover:shadow-lg transition-all max-[480px]:w-full max-[480px]:justify-center"
        >
          {"View Platform ->"}
        </a>
      </div>
    </section>
  );
}
