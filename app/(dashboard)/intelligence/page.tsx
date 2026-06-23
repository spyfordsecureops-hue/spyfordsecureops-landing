"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Globe,
  Shield,
  Clock,
  ExternalLink,
  ChevronDown,
  Bookmark,
  Share2,
  TrendingUp,
  Zap,
  RefreshCw,
} from "lucide-react";
import { intelligenceFeeds } from "@/lib/mock-data";
import { cn, formatRelativeTime } from "@/lib/utils";

type FeedType = "all" | "report" | "vulnerability" | "indicator";
type SeverityFilter = "all" | "critical" | "high" | "medium" | "low";

export default function IntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedType, setFeedType] = useState<FeedType>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const filteredFeeds = intelligenceFeeds.filter((feed) => {
    const matchesSearch =
      feed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = feedType === "all" || feed.type === feedType;
    const matchesSeverity =
      severityFilter === "all" || feed.severity === severityFilter;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "report":
        return FileText;
      case "vulnerability":
        return AlertTriangle;
      case "indicator":
        return Shield;
      default:
        return Globe;
    }
  };

  const toggleSaved = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const stats = [
    {
      label: "Critical Alerts",
      value: intelligenceFeeds.filter((f) => f.severity === "critical").length,
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      label: "New Reports",
      value: intelligenceFeeds.filter((f) => f.type === "report").length,
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active IOCs",
      value: intelligenceFeeds.reduce((acc, f) => acc + f.indicators.length, 0),
      icon: Shield,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Sources",
      value: new Set(intelligenceFeeds.map((f) => f.source)).size,
      icon: Globe,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-zinc-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white font-heading">
              Intelligence
            </h1>
            <p className="text-zinc-400 mt-1">
              Threat intelligence feeds and security reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh Feeds
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-colors">
              <Zap className="w-4 h-4" />
              Configure Sources
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "p-4 rounded-lg border border-zinc-800",
                  stat.bgColor
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-5 h-5", stat.color)} />
                  <div>
                    <div className="text-2xl font-semibold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 p-4 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Type:</span>
            <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
              {(["all", "report", "vulnerability", "indicator"] as FeedType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setFeedType(type)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                      feedType === type
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Severity:</span>
            <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
              {(
                ["all", "critical", "high", "medium", "low"] as SeverityFilter[]
              ).map((severity) => (
                <button
                  key={severity}
                  onClick={() => setSeverityFilter(severity)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                    severityFilter === severity
                      ? "bg-zinc-700 text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredFeeds.map((feed) => {
            const Icon = getTypeIcon(feed.type);
            const isSaved = savedItems.includes(feed.id);

            return (
              <div
                key={feed.id}
                className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium border",
                              getSeverityColor(feed.severity)
                            )}
                          >
                            {feed.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-zinc-500 capitalize">
                            {feed.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-white">
                          {feed.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mt-1">
                          {feed.summary}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleSaved(feed.id)}
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            isSaved
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-zinc-800/50 text-zinc-400 hover:text-white"
                          )}
                        >
                          <Bookmark
                            className="w-4 h-4"
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </button>
                        <button className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Indicators */}
                    {feed.indicators.length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs text-zinc-500 mb-2">
                          Indicators ({feed.indicators.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {feed.indicators.slice(0, 5).map((indicator, idx) => (
                            <code
                              key={idx}
                              className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-300 font-mono"
                            >
                              {indicator}
                            </code>
                          ))}
                          {feed.indicators.length > 5 && (
                            <span className="px-2 py-1 text-xs text-zinc-500">
                              +{feed.indicators.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        {feed.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500 ml-auto">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {feed.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(feed.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredFeeds.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No intelligence found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
