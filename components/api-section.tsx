export function ApiSection() {
  const codeSnippet = `// Initialize SpyfordSecureOps client
import { SpyfordClient } from '@spyford/sdk';

const client = new SpyfordClient({
  apiKey: process.env.SPYFORD_API_KEY,
  region: 'us-east-1'
});

// Scan for threats
const scan = await client.threats.scan({
  target: 'https://example.com',
  depth: 'comprehensive'
});

console.log(scan.results);`;

  return (
    <section id="developers" className="py-24 border-b border-zinc-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-zinc-500 text-sm">threat-scan.ts</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-zinc-300">
                  {codeSnippet.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-zinc-600 w-8 flex-shrink-0 select-none">
                        {i + 1}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(
                              /(\/\/.*)/g,
                              '<span class="text-zinc-500">$1</span>'
                            )
                            .replace(
                              /('.*?')/g,
                              '<span class="text-emerald-400">$1</span>'
                            )
                            .replace(
                              /\b(import|from|const|await|new)\b/g,
                              '<span class="text-purple-400">$1</span>'
                            )
                            .replace(
                              /\b(client|scan|SpyfordClient)\b/g,
                              '<span class="text-blue-400">$1</span>'
                            ),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Developer-First API
            </h2>
            <p className="text-zinc-400 mb-6">
              Integrate security into your workflow with our comprehensive API and SDKs.
              Built by developers, for developers.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "RESTful API with GraphQL support",
                "SDKs for all major languages",
                "Webhook integrations",
                "Comprehensive documentation",
                "Interactive API playground",
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
            <a
              href="#"
              className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              View Documentation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
