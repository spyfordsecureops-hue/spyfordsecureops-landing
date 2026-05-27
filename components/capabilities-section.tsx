export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Threat Intelligence",
      description: "Access to global threat feeds and intelligence sharing networks.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Incident Response",
      description: "24/7 expert incident response team ready to assist.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Compliance",
      description: "Meet regulatory requirements with automated compliance tools.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Vulnerability Management",
      description: "Continuous scanning and prioritized remediation guidance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete Security Capabilities
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Everything you need to protect, detect, and respond to security threats.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-zinc-400 text-sm">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
