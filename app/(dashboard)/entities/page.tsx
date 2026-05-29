import { entities } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  User,
  Building2,
  MapPin,
  Car,
  Monitor,
  KeyRound,
  Network,
  AlertTriangle,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const getEntityIcon = (type: string) => {
  const icons: Record<string, typeof User> = {
    person: User,
    organization: Building2,
    location: MapPin,
    vehicle: Car,
    device: Monitor,
    account: KeyRound,
  };
  return icons[type] || User;
};

const getEntityColor = (type: string) => {
  const colors: Record<string, string> = {
    person: "bg-blue/10 text-blue border-blue/30",
    organization: "bg-violet-500/10 text-violet-500 border-violet-500/30",
    location: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    vehicle: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    device: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    account: "bg-rose-500/10 text-rose-500 border-rose-500/30",
  };
  return colors[type] || "bg-slate-500/10 text-slate-500 border-slate-500/30";
};

const getRiskColor = (score: number) => {
  if (score >= 80) return "bg-red-500/10 text-red-500 border-red-500/30";
  if (score >= 60) return "bg-orange-500/10 text-orange-500 border-orange-500/30";
  if (score >= 40) return "bg-amber-500/10 text-amber-500 border-amber-500/30";
  return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
};

export default function EntitiesPage() {
  const entityByType = entities.reduce((acc, entity) => {
    acc[entity.type] = (acc[entity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const highRiskEntities = entities.filter(
    (e) => e.riskScore && e.riskScore >= 80
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search entities..."
              className="h-10 w-64 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-blue/50 focus:outline-none focus:ring-2 focus:ring-blue/20"
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm text-muted transition-all hover:border-blue/30 hover:text-foreground">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-medium text-white transition-all hover:bg-blue-light">
          <Plus className="h-4 w-4" />
          Add Entity
        </button>
      </div>

      {/* Entity Type Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {["person", "organization", "location", "vehicle", "device", "account"].map(
          (type) => {
            const Icon = getEntityIcon(type);
            const color = getEntityColor(type);
            return (
              <div
                key={type}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className={`mb-2 inline-flex rounded-lg border p-2 ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {entityByType[type] || 0}
                </div>
                <div className="text-sm capitalize text-muted">{type}s</div>
              </div>
            );
          }
        )}
      </div>

      {/* High Risk Alert */}
      {highRiskEntities.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <div className="flex-1">
            <div className="font-medium text-red-600">
              {highRiskEntities.length} high-risk entit
              {highRiskEntities.length === 1 ? "y" : "ies"} identified
            </div>
            <div className="text-sm text-red-500/80">
              Review entities with risk scores above 80 for potential threats
            </div>
          </div>
          <Link
            href="#high-risk"
            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:underline"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Entity Network Visualization Placeholder */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Entity Relationship Network
          </h2>
          <button className="text-sm text-blue hover:underline">
            Open Full View
          </button>
        </div>
        <div className="relative flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-foreground/[0.02]">
          <div className="text-center">
            <Network className="mx-auto mb-2 h-12 w-12 text-muted" />
            <div className="text-sm text-muted">
              Interactive network graph visualization
            </div>
            <div className="text-xs text-muted">
              {entities.length} entities &middot;{" "}
              {entities.reduce((acc, e) => acc + e.relationships.length, 0)}{" "}
              relationships
            </div>
          </div>
        </div>
      </div>

      {/* Entities List */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            All Entities
          </h2>
        </div>
        <div className="divide-y divide-border">
          {entities.map((entity) => {
            const Icon = getEntityIcon(entity.type);
            const typeColor = getEntityColor(entity.type);
            return (
              <Link
                key={entity.id}
                href={`/entities/${entity.id}`}
                className="block px-6 py-5 transition-all hover:bg-foreground/[0.02]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${typeColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-heading font-semibold text-foreground">
                          {entity.name}
                        </h3>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${typeColor}`}
                        >
                          {entity.type}
                        </span>
                        {entity.riskScore && (
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getRiskColor(
                              entity.riskScore
                            )}`}
                          >
                            Risk: {entity.riskScore}
                          </span>
                        )}
                      </div>
                      {entity.aliases.length > 0 && (
                        <div className="mb-2 text-sm text-muted">
                          Also known as: {entity.aliases.join(", ")}
                        </div>
                      )}
                      <p className="mb-3 text-sm text-muted line-clamp-1">
                        {entity.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                        <span>
                          {entity.relationships.length} relationship
                          {entity.relationships.length !== 1 ? "s" : ""}
                        </span>
                        <span>
                          {entity.linkedCases.length} linked case
                          {entity.linkedCases.length !== 1 ? "s" : ""}
                        </span>
                        <span>
                          Updated {formatRelativeTime(entity.updatedAt)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {entity.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
