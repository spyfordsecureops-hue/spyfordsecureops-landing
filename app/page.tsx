import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DashboardPreview } from "@/components/dashboard-preview";
import { TrustedSection } from "@/components/trusted-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { InfrastructureSection } from "@/components/infrastructure-section";
import { ArchitectureSection } from "@/components/architecture-section";
import { AnalyticsSection } from "@/components/analytics-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { ApiSection } from "@/components/api-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <TrustedSection />
      <FeaturesSection />
      <StatsSection />
      <InfrastructureSection />
      <ArchitectureSection />
      <AnalyticsSection />
      <CapabilitiesSection />
      <ApiSection />
      <Footer />
    </main>
  );
}
