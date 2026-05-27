export function ArchitectureSection() {
  const layers = [
    {
      name: "Application Layer",
      color: "from-emerald-500/20 to-emerald-500/5",
      items: ["Web Apps", "Mobile Apps", "APIs", "Microservices"],
    },
    {
      name: "Security Layer",
      color: "from-blue-500/20 to-blue-500/5",
      items: ["WAF", "DDoS Protection", "Bot Management", "API Security"],
    },
    {
      name: "Network Layer",
      color: "from-purple-500/20 to-purple-500/5",
      items: ["Load Balancing", "CDN", "DNS Security", "TLS/SSL"],
    },
    {
      name: "Infrastructure Layer",
      color: "from-orange-500/20 to-orange-500/5",
      items: ["Cloud Security", "Container Security", "Serverless", "Edge Computing"],
    },
  ];

  return (
    <section className="py-24 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Multi-Layer Security Architecture
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Defense in depth approach with multiple security layers working together
            to protect your entire stack.
          </p>
        </div>
        <div className="architecture-stack space-y-4 max-w-4xl mx-auto">
          {layers.map((layer, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${layer.color} border border-zinc-700 rounded-xl p-6 transform hover:scale-[1.02] transition-transform duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">{layer.name}</h3>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-zinc-800/50 rounded-full text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
