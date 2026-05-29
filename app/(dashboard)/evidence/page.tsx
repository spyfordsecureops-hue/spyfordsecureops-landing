import { evidence, cases } from "@/lib/mock-data";
import { formatDate, formatFileSize, formatRelativeTime } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  Upload,
  FileText,
  Image,
  Video,
  Music,
  HardDrive,
  Package,
  Grid,
  List,
  Download,
  Eye,
  MoreHorizontal,
  Shield,
} from "lucide-react";
import Link from "next/link";

const getEvidenceIcon = (type: string) => {
  const icons: Record<string, typeof FileText> = {
    document: FileText,
    image: Image,
    video: Video,
    audio: Music,
    digital: HardDrive,
    physical: Package,
  };
  return icons[type] || FileText;
};

const getEvidenceColor = (type: string) => {
  const colors: Record<string, string> = {
    document: "bg-blue/10 text-blue",
    image: "bg-emerald-500/10 text-emerald-500",
    video: "bg-violet-500/10 text-violet-500",
    audio: "bg-amber-500/10 text-amber-500",
    digital: "bg-cyan-500/10 text-cyan-500",
    physical: "bg-slate-500/10 text-slate-500",
  };
  return colors[type] || "bg-blue/10 text-blue";
};

export default function EvidencePage() {
  const getCaseTitle = (caseId: string) => {
    const caseItem = cases.find((c) => c.id === caseId);
    return caseItem?.title || "Unknown Case";
  };

  const evidenceByType = evidence.reduce((acc, ev) => {
    acc[ev.type] = (acc[ev.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search evidence..."
              className="h-10 w-64 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-blue/50 focus:outline-none focus:ring-2 focus:ring-blue/20"
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm text-muted transition-all hover:border-blue/30 hover:text-foreground">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-xl border border-border p-1 sm:flex">
            <button className="rounded-lg bg-foreground/5 p-2 text-foreground">
              <Grid className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-muted hover:text-foreground">
              <List className="h-4 w-4" />
            </button>
          </div>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-medium text-white transition-all hover:bg-blue-light">
            <Upload className="h-4 w-4" />
            Upload Evidence
          </button>
        </div>
      </div>

      {/* Stats by Type */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {["document", "image", "video", "audio", "digital", "physical"].map(
          (type) => {
            const Icon = getEvidenceIcon(type);
            const color = getEvidenceColor(type);
            return (
              <div
                key={type}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className={`mb-2 inline-flex rounded-lg p-2 ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {evidenceByType[type] || 0}
                </div>
                <div className="text-sm capitalize text-muted">{type}</div>
              </div>
            );
          }
        )}
      </div>

      {/* Chain of Custody Notice */}
      <div className="flex items-center gap-3 rounded-xl border border-blue/30 bg-blue/5 p-4">
        <Shield className="h-5 w-5 text-blue" />
        <div className="flex-1">
          <div className="font-medium text-blue">
            Chain of Custody Tracking Active
          </div>
          <div className="text-sm text-blue/80">
            All evidence access and modifications are logged for compliance
          </div>
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Evidence Vault ({evidence.length} items)
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidence.map((ev) => {
            const Icon = getEvidenceIcon(ev.type);
            const color = getEvidenceColor(ev.type);
            return (
              <div
                key={ev.id}
                className="group rounded-xl border border-border bg-background p-4 transition-all hover:border-blue/30 hover:shadow-md"
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className={`rounded-xl p-3 ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-lg p-1.5 text-muted hover:bg-foreground/5 hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-muted hover:bg-foreground/5 hover:text-foreground">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-muted hover:bg-foreground/5 hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-2">
                  <h3 className="font-medium text-foreground truncate">
                    {ev.name}
                  </h3>
                  <p className="text-sm text-muted line-clamp-1">
                    {ev.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                  <span>{ev.source}</span>
                  {ev.fileSize && (
                    <>
                      <span>&middot;</span>
                      <span>{formatFileSize(ev.fileSize)}</span>
                    </>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {ev.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
                  <Link
                    href={`/cases/${ev.caseId}`}
                    className="truncate hover:text-blue hover:underline"
                  >
                    {getCaseTitle(ev.caseId)}
                  </Link>
                  <span>{formatRelativeTime(ev.uploadedAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Recent Chain of Custody Activity
        </h2>
        <div className="space-y-3">
          {evidence
            .flatMap((ev) =>
              ev.chainOfCustody.map((coc) => ({ ...coc, evidenceName: ev.name }))
            )
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            )
            .slice(0, 5)
            .map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                  <Shield className="h-5 w-5 text-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">
                    {entry.action}: {entry.evidenceName}
                  </div>
                  <div className="text-sm text-muted">
                    by {entry.performedBy} &middot;{" "}
                    {formatRelativeTime(entry.timestamp)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
