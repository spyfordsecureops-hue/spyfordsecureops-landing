import { investigations, cases, evidence, entities, timelineEvents } from "@/lib/mock-data";
import { formatDate, formatRelativeTime, getStatusColor, getPriorityColor } from "@/lib/utils";
import {
  ArrowLeft,
  Users,
  FolderOpen,
  FileBox,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Calendar,
  Activity,
  Link as LinkIcon,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function InvestigationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investigation = investigations.find((i) => i.id === id);

  if (!investigation) {
    notFound();
  }

  const investigationCases = cases.filter((c) => c.investigationId === id);
  const investigationEvidence = evidence.filter((e) =>
    investigationCases.some((c) => c.id === e.caseId)
  );
  const investigationEvents = timelineEvents.filter(
    (e) => e.relatedIds.investigationId === id
  );

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        href="/investigations"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Investigations
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {investigation.title}
            </h1>
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(
                investigation.status
              )}`}
            >
              {investigation.status}
            </span>
          </div>
          <p className="mb-4 text-muted">{investigation.description}</p>
          <div className="flex flex-wrap gap-2">
            {investigation.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-lg bg-foreground/5 px-2.5 py-1 text-sm text-muted"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all hover:border-blue/30">
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-medium text-white transition-all hover:bg-blue-light">
            <Plus className="h-4 w-4" />
            Add Case
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1 flex items-center gap-2 text-muted">
            <FolderOpen className="h-4 w-4" />
            <span className="text-sm">Cases</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {investigation.caseCount}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1 flex items-center gap-2 text-muted">
            <FileBox className="h-4 w-4" />
            <span className="text-sm">Evidence</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {investigation.evidenceCount}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1 flex items-center gap-2 text-muted">
            <Users className="h-4 w-4" />
            <span className="text-sm">Team Members</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {investigation.team.length + 1}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1 flex items-center gap-2 text-muted">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Created</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {formatDate(investigation.createdAt)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cases */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Cases
              </h2>
              <button className="text-sm text-blue hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {investigationCases.length > 0 ? (
                investigationCases.map((caseItem) => (
                  <Link
                    key={caseItem.id}
                    href={`/cases/${caseItem.id}`}
                    className="block rounded-xl border border-border bg-background p-4 transition-all hover:border-blue/30"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium text-foreground">
                        {caseItem.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityColor(
                          caseItem.priority
                        )}`}
                      >
                        {caseItem.priority}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted line-clamp-1">
                      {caseItem.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {caseItem.assignee}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 ${getStatusColor(
                          caseItem.status
                        )}`}
                      >
                        {caseItem.status}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-muted">
                  No cases yet. Create the first case for this investigation.
                </div>
              )}
            </div>
          </div>

          {/* Recent Evidence */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Recent Evidence
              </h2>
              <Link href="/evidence" className="text-sm text-blue hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {investigationEvidence.slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                    <FileBox className="h-5 w-5 text-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {ev.name}
                    </div>
                    <div className="text-xs text-muted">
                      {ev.source} &middot; {formatRelativeTime(ev.uploadedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Team
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue/10 text-sm font-semibold text-blue">
                  {investigation.leadAnalyst.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {investigation.leadAnalyst}
                  </div>
                  <div className="text-xs text-muted">Lead Analyst</div>
                </div>
              </div>
              {investigation.team.map((member) => (
                <div key={member} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-sm font-semibold text-muted">
                    {member.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{member}</div>
                    <div className="text-xs text-muted">Analyst</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {investigationEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue/10">
                    <Activity className="h-4 w-4 text-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{event.title}</p>
                    <p className="text-xs text-muted">
                      {formatRelativeTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {investigationEvents.length === 0 && (
                <p className="text-sm text-muted">No recent activity</p>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">ID</span>
                <span className="font-mono text-foreground">{investigation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Created</span>
                <span className="text-foreground">
                  {formatDate(investigation.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Last Updated</span>
                <span className="text-foreground">
                  {formatRelativeTime(investigation.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
