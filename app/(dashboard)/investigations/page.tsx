import { investigations } from "@/lib/mock-data";
import { formatDate, getStatusColor } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  FolderOpen,
  FileBox,
  Users,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

export default function InvestigationsPage() {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search investigations..."
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
          New Investigation
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {investigations.filter((i) => i.status === "active").length}
          </div>
          <div className="text-sm text-muted">Active</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {investigations.filter((i) => i.status === "pending").length}
          </div>
          <div className="text-sm text-muted">Pending</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {investigations.filter((i) => i.status === "closed").length}
          </div>
          <div className="text-sm text-muted">Closed</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {investigations.reduce((acc, i) => acc + i.evidenceCount, 0)}
          </div>
          <div className="text-sm text-muted">Total Evidence</div>
        </div>
      </div>

      {/* Investigations List */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            All Investigations
          </h2>
        </div>
        <div className="divide-y divide-border">
          {investigations.map((investigation) => (
            <Link
              key={investigation.id}
              href={`/investigations/${investigation.id}`}
              className="block px-6 py-5 transition-all hover:bg-foreground/[0.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      {investigation.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        investigation.status
                      )}`}
                    >
                      {investigation.status}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted line-clamp-2">
                    {investigation.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {investigation.leadAnalyst}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FolderOpen className="h-4 w-4" />
                      {investigation.caseCount} cases
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileBox className="h-4 w-4" />
                      {investigation.evidenceCount} evidence
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Updated {formatDate(investigation.updatedAt)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {investigation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
