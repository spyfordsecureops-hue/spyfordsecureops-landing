import { cases, investigations, evidence, entities } from "@/lib/mock-data";
import { formatDate, formatRelativeTime, getStatusColor, getPriorityColor } from "@/lib/utils";
import {
  ArrowLeft,
  Users,
  FileBox,
  Clock,
  Edit,
  Plus,
  Calendar,
  Activity,
  Tag,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle,
  Circle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseItem = cases.find((c) => c.id === id);

  if (!caseItem) {
    notFound();
  }

  const investigation = investigations.find(
    (i) => i.id === caseItem.investigationId
  );
  const caseEvidence = evidence.filter((e) => e.caseId === id);
  const caseEntities = entities.filter((e) =>
    caseItem.entityIds.includes(e.id)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "closed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "in-progress":
        return <Activity className="h-4 w-4 text-violet-500" />;
      case "review":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Circle className="h-4 w-4 text-blue" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        href="/cases"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cases
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            {getStatusIcon(caseItem.status)}
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {caseItem.title}
            </h1>
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${getPriorityColor(
                caseItem.priority
              )}`}
            >
              {caseItem.priority}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(
                caseItem.status
              )}`}
            >
              {caseItem.status}
            </span>
          </div>
          <p className="mb-3 text-muted">{caseItem.description}</p>
          {investigation && (
            <Link
              href={`/investigations/${investigation.id}`}
              className="inline-flex items-center gap-2 text-sm text-blue hover:underline"
            >
              <LinkIcon className="h-4 w-4" />
              {investigation.title}
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-all hover:border-blue/30">
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-medium text-white transition-all hover:bg-blue-light">
            <Plus className="h-4 w-4" />
            Add Evidence
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Case Progress</span>
          <span className="text-sm text-muted">
            {caseItem.status === "closed"
              ? "100%"
              : caseItem.status === "review"
              ? "75%"
              : caseItem.status === "in-progress"
              ? "50%"
              : "25%"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
          <div
            className={`h-full rounded-full transition-all ${
              caseItem.status === "closed"
                ? "w-full bg-emerald-500"
                : caseItem.status === "review"
                ? "w-3/4 bg-orange-500"
                : caseItem.status === "in-progress"
                ? "w-1/2 bg-violet-500"
                : "w-1/4 bg-blue"
            }`}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-muted">
          <span className={caseItem.status !== "closed" && caseItem.status !== "review" && caseItem.status !== "in-progress" ? "text-blue font-medium" : ""}>Open</span>
          <span className={caseItem.status === "in-progress" ? "text-violet-500 font-medium" : ""}>In Progress</span>
          <span className={caseItem.status === "review" ? "text-orange-500 font-medium" : ""}>Review</span>
          <span className={caseItem.status === "closed" ? "text-emerald-500 font-medium" : ""}>Closed</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Evidence */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Evidence ({caseEvidence.length})
              </h2>
              <button className="flex items-center gap-1 text-sm text-blue hover:underline">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
            {caseEvidence.length > 0 ? (
              <div className="space-y-3">
                {caseEvidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10">
                      <FileBox className="h-6 w-6 text-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{ev.name}</div>
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <span>{ev.type}</span>
                        <span>&middot;</span>
                        <span>{ev.source}</span>
                        <span>&middot;</span>
                        <span>{formatRelativeTime(ev.uploadedAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {ev.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted">
                No evidence attached to this case yet.
              </div>
            )}
          </div>

          {/* Linked Entities */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Linked Entities ({caseEntities.length})
              </h2>
              <Link href="/entities" className="text-sm text-blue hover:underline">
                View all
              </Link>
            </div>
            {caseEntities.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {caseEntities.map((entity) => (
                  <Link
                    key={entity.id}
                    href={`/entities/${entity.id}`}
                    className="rounded-xl border border-border bg-background p-4 transition-all hover:border-blue/30"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-lg bg-blue/10 px-2 py-1 text-xs font-medium text-blue">
                        {entity.type}
                      </span>
                      {entity.riskScore && entity.riskScore >= 80 && (
                        <span className="rounded-lg bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500">
                          High Risk
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-foreground">{entity.name}</div>
                    {entity.aliases.length > 0 && (
                      <div className="text-sm text-muted">
                        AKA: {entity.aliases.slice(0, 2).join(", ")}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted">
                No entities linked to this case yet.
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Notes
              </h2>
              <button className="text-sm text-blue hover:underline">
                Edit
              </button>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-foreground whitespace-pre-wrap">
                {caseItem.notes || "No notes added yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Details
            </h2>
            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Assignee
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue/10 text-sm font-semibold text-blue">
                    {caseItem.assignee.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="font-medium text-foreground">
                    {caseItem.assignee}
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Due Date
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-muted" />
                  {caseItem.dueDate
                    ? formatDate(caseItem.dueDate)
                    : "No due date set"}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Created
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4 text-muted" />
                  {formatDate(caseItem.createdAt)}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Last Updated
                </div>
                <div className="text-foreground">
                  {formatRelativeTime(caseItem.updatedAt)}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                  Case ID
                </div>
                <div className="font-mono text-sm text-foreground">
                  {caseItem.id}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-blue/30">
                <MessageSquare className="h-4 w-4 text-muted" />
                Add Comment
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-blue/30">
                <Users className="h-4 w-4 text-muted" />
                Reassign Case
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-blue/30">
                <Tag className="h-4 w-4 text-muted" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
