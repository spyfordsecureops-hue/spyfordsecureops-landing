"use client";

export function TrustedSection() {
  const companies = [
    "TechCorp",
    "SecureNet",
    "DataFlow",
    "CloudFirst",
    "CyberShield",
    "NetGuard",
    "InfoSec Pro",
    "SafeData",
  ];

  return (
    <section className="py-16 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <p className="text-center text-zinc-500 text-sm mb-8 tracking-wider uppercase">
          Trusted by security teams worldwide
        </p>
        <div className="ticker-wrapper overflow-hidden">
          <div className="ticker flex gap-12 animate-ticker">
            {[...companies, ...companies].map((company, i) => (
              <span
                key={i}
                className="text-zinc-600 text-lg font-medium whitespace-nowrap hover:text-zinc-400 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
