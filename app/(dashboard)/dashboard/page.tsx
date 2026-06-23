import { dashboardStats, investigations, cases, intelligenceFeeds } from "@/lib/mock-data";
import { formatRelativeTime, getStatusColor, getPriorityColor, getSeverityColor } from "@/lib/utils";
import {
  Search,
  FolderOpen,
  FileBox,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const activeInvestigations = investigations.filter((i) => i.status === "active");
  const recentCases = cases.slice(0, 4);
  const criticalFeeds = intelligenceFeeds.filter((f) => f.severity === "critical" || f.severity === "high");

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Investigations"
          value={dashboardStats.activeInvestigations}
          icon={Search}
          trend="+2 this week"
          trendUp
          href="/investigations"
        />
        <StatCard
          title="Open Cases"
          value={dashboardStats.openCases}
          icon={FolderOpen}
          trend="+5 this week"
          trendUp
          href="/cases"
        />
        <StatCard
          title="Pending Evidence"
          value={dashboardStats.pendingEvidence}
          icon={FileBox}
          trend="12 awaiting review"
          href="/evidence"
        />
        <StatCard
          title="Critical Alerts"
          value={dashboardStats.criticalAlerts}
          icon={AlertTriangle}
          trend="Requires attention"
          urgent
          href="/intelligence"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Investigations */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Active Investigations
              </h2>
              <Link
                href="/investigations"
                className="flex items-center gap-1 text-sm text-blue hover:underline"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {activeInvestigations.map((investigation) => (
                <Link
                  key={investigation.id}
                  href={`/investigations/${investigation.id}`}
                  className="block rounded-xl border border-border bg-background p-4 transition-all hover:border-blue/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {investigation.title}
                        </h3>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(
                            investigation.status
                          )}`}
                        >
                          {investigation.status}
                        </span>
                      </div>
                      <p className="mb-3 line-clamp-1 text-sm text-muted">
                        {investigation.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <FolderOpen className="h-3.5 w-3.5" />
                          {investigation.caseCount} cases
                        </span>
                        <span className="flex items-center gap-1">
                          <FileBox className="h-3.5 w-3.5" />
                          {investigation.evidenceCount} evidence
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Updated {formatRelativeTime(investigation.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <Link
              href="/timeline"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardStats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue/10">
                  <Activity className="h-4 w-4 text-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">
                    {activity.message}
                  </p>
                  <p className="text-xs text-muted">
                    {activity.actor} &middot; {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cases and Intelligence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Priority Cases */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Priority Cases
            </h2>
            <Link
              href="/cases"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentCases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/cases/${caseItem.id}`}
                className="block rounded-xl border border-border bg-background p-4 transition-all hover:border-blue/30"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-foreground line-clamp-1">
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
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{caseItem.assignee}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 ${getStatusColor(
                      caseItem.status
                    )}`}
                  >
                    {caseItem.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Threat Intelligence */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Threat Intelligence
            </h2>
            <Link
              href="/intelligence"
              className="flex items-center gap-1 text-sm text-blue hover:underline"
            >
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {criticalFeeds.map((feed) => (
              <div
                key={feed.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue" />
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getSeverityColor(
                      feed.severity
                    )}`}
                  >
                    {feed.severity}
                  </span>
                  <span className="text-xs text-muted">{feed.source}</span>
                </div>
                <h3 className="mb-1 font-medium text-foreground line-clamp-1">
                  {feed.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2">{feed.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  urgent,
  href,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  trendUp?: boolean;
  urgent?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue/30 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            urgent ? "bg-red-500/10" : "bg-blue/10"
          }`}
        >
          <Icon className={`h-6 w-6 ${urgent ? "text-red-500" : "text-blue"}`} />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted opacity-0 transition-all group-hover:opacity-100" />
      </div>
      <div className="font-heading text-3xl font-bold text-foreground">
        {value}
      </div>
      <div className="text-sm text-muted">{title}</div>
      <div
        className={`mt-2 flex items-center gap-1 text-xs ${
          urgent ? "text-red-500" : trendUp ? "text-emerald-500" : "text-muted"
        }`}
      >
        {trendUp && <TrendingUp className="h-3 w-3" />}
        {trend}
      </div>
    </Link>
  );
}
