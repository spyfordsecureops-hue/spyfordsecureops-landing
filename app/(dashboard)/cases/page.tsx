import { cases, investigations } from "@/lib/mock-data";
import { formatDate, getStatusColor, getPriorityColor } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  Users,
  Clock,
  Calendar,
  MoreHorizontal,
  FolderOpen,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function CasesPage() {
  const getInvestigationTitle = (investigationId: string) => {
    const investigation = investigations.find((i) => i.id === investigationId);
    return investigation?.title || "Unknown Investigation";
  };

  const criticalCases = cases.filter((c) => c.priority === "critical");
  const highCases = cases.filter((c) => c.priority === "high");

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search cases..."
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
          New Case
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">{cases.length}</div>
          <div className="text-sm text-muted">Total Cases</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {cases.filter((c) => c.status === "open").length}
          </div>
          <div className="text-sm text-muted">Open</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {cases.filter((c) => c.status === "in-progress").length}
          </div>
          <div className="text-sm text-muted">In Progress</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {cases.filter((c) => c.status === "review").length}
          </div>
          <div className="text-sm text-muted">In Review</div>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="text-2xl font-bold text-red-500">{criticalCases.length}</div>
          <div className="text-sm text-red-500/80">Critical</div>
        </div>
      </div>

      {/* Priority Alert */}
      {criticalCases.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div className="flex-1">
            <div className="font-medium text-red-600">
              {criticalCases.length} critical case{criticalCases.length > 1 ? "s" : ""} requiring immediate attention
            </div>
            <div className="text-sm text-red-500/80">
              Review and assign priority cases as soon as possible
            </div>
          </div>
        </div>
      )}

      {/* Cases Table */}
      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            All Cases
          </h2>
        </div>
        
        {/* Table Header */}
        <div className="hidden border-b border-border bg-foreground/[0.02] px-6 py-3 lg:grid lg:grid-cols-12 lg:gap-4">
          <div className="col-span-4 text-xs font-medium uppercase tracking-wider text-muted">
            Case
          </div>
          <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted">
            Investigation
          </div>
          <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted">
            Assignee
          </div>
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted">
            Priority
          </div>
          <div className="col-span-1 text-xs font-medium uppercase tracking-wider text-muted">
            Status
          </div>
          <div className="col-span-2 text-xs font-medium uppercase tracking-wider text-muted">
            Due Date
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/cases/${caseItem.id}`}
              className="block px-6 py-4 transition-all hover:bg-foreground/[0.02] lg:grid lg:grid-cols-12 lg:items-center lg:gap-4"
            >
              {/* Case Info */}
              <div className="col-span-4 mb-2 lg:mb-0">
                <div className="font-medium text-foreground">{caseItem.title}</div>
                <div className="mt-1 text-sm text-muted line-clamp-1 lg:hidden">
                  {getInvestigationTitle(caseItem.investigationId)}
                </div>
              </div>

              {/* Investigation */}
              <div className="col-span-2 hidden lg:block">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <FolderOpen className="h-4 w-4" />
                  <span className="truncate">
                    {getInvestigationTitle(caseItem.investigationId)}
                  </span>
                </div>
              </div>

              {/* Assignee */}
              <div className="col-span-2 mb-2 lg:mb-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue/10 text-xs font-semibold text-blue">
                    {caseItem.assignee.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-sm text-foreground">{caseItem.assignee}</span>
                </div>
              </div>

              {/* Priority */}
              <div className="col-span-1 inline-flex lg:flex">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                    caseItem.priority
                  )}`}
                >
                  {caseItem.priority}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1 ml-2 inline-flex lg:ml-0 lg:flex">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                    caseItem.status
                  )}`}
                >
                  {caseItem.status}
                </span>
              </div>

              {/* Due Date */}
              <div className="col-span-2 mt-2 flex items-center justify-between lg:mt-0">
                <div className="flex items-center gap-1 text-sm text-muted">
                  <Calendar className="h-4 w-4" />
                  {caseItem.dueDate ? formatDate(caseItem.dueDate) : "No due date"}
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
