"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  Shield,
  Database,
  Link2,
  ChevronDown,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { mockTimelineEvents, mockInvestigations } from "@/lib/mock-data";
import { cn, formatDate, formatTime } from "@/lib/utils";

type TimelineView = "list" | "graph";

export default function TimelinePage() {
  const [view, setView] = useState<TimelineView>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const eventTypes = [
    { id: "evidence", label: "Evidence", icon: FileText },
    { id: "entity", label: "Entity", icon: User },
    { id: "alert", label: "Alert", icon: AlertTriangle },
    { id: "action", label: "Action", icon: Shield },
  ];

  const filteredEvents = mockTimelineEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(event.type);
    return matchesSearch && matchesType;
  });

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((t) => t !== typeId)
        : [...prev, typeId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "evidence":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "entity":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "alert":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "action":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "evidence":
        return FileText;
      case "entity":
        return User;
      case "alert":
        return AlertTriangle;
      case "action":
        return Shield;
      default:
        return Database;
    }
  };

  // Group events by date
  const groupedEvents = filteredEvents.reduce(
    (groups, event) => {
      const date = formatDate(event.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {} as Record<string, typeof filteredEvents>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-zinc-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white font-heading">
              Timeline
            </h1>
            <p className="text-zinc-400 mt-1">
              Chronological view of all investigation activity
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
              <button
                onClick={() => setView("list")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  view === "list"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                List
              </button>
              <button
                onClick={() => setView("graph")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  view === "graph"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Graph
              </button>
            </div>

            {/* Zoom Controls (Graph View) */}
            {view === "graph" && (
              <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-sm text-zinc-400">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mt-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {eventTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedTypes.includes(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                    isSelected
                      ? getTypeColor(type.id)
                      : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {view === "list" ? (
          /* List View */
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-medium text-white">
                      {date}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-xs text-zinc-500">
                    {events.length} events
                  </span>
                </div>

                {/* Events */}
                <div className="relative pl-8">
                  {/* Timeline Line */}
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800" />

                  <div className="space-y-4">
                    {events.map((event) => {
                      const Icon = getTypeIcon(event.type);
                      return (
                        <div key={event.id} className="relative group">
                          {/* Timeline Dot */}
                          <div
                            className={cn(
                              "absolute -left-5 top-3 w-3 h-3 rounded-full border-2 bg-zinc-900",
                              event.type === "alert"
                                ? "border-red-500"
                                : event.type === "evidence"
                                  ? "border-blue-500"
                                  : event.type === "entity"
                                    ? "border-purple-500"
                                    : "border-emerald-500"
                            )}
                          />

                          {/* Event Card */}
                          <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                            <div className="flex items-start gap-4">
                              <div
                                className={cn(
                                  "p-2 rounded-lg",
                                  getTypeColor(event.type)
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h3 className="text-white font-medium">
                                      {event.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm mt-1">
                                      {event.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-zinc-500 flex-shrink-0">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(event.timestamp)}
                                  </div>
                                </div>

                                {/* Event Metadata */}
                                <div className="flex items-center gap-4 mt-3 text-xs">
                                  {event.investigationId && (
                                    <div className="flex items-center gap-1.5 text-zinc-500">
                                      <Link2 className="w-3 h-3" />
                                      <span>
                                        {
                                          mockInvestigations.find(
                                            (i) => i.id === event.investigationId
                                          )?.title
                                        }
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 text-zinc-500">
                                    <User className="w-3 h-3" />
                                    <span>{event.actor}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No events found
                </h3>
                <p className="text-zinc-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Graph View */
          <div
            className="h-full overflow-auto"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
          >
            <div className="min-w-[800px] p-4">
              {/* Graph Header - Time Scale */}
              <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
                {Object.keys(groupedEvents).map((date, index) => (
                  <div
                    key={date}
                    className="flex-1 text-center"
                    style={{ minWidth: "200px" }}
                  >
                    <div className="text-sm font-medium text-white">{date}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {groupedEvents[date].length} events
                    </div>
                  </div>
                ))}
              </div>

              {/* Graph Lanes */}
              <div className="space-y-6">
                {eventTypes.map((type) => {
                  const Icon = type.icon;
                  const typeEvents = filteredEvents.filter(
                    (e) => e.type === type.id
                  );

                  return (
                    <div key={type.id} className="flex items-start gap-4">
                      {/* Lane Label */}
                      <div className="w-24 flex-shrink-0 flex items-center gap-2 py-2">
                        <Icon className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-400">
                          {type.label}
                        </span>
                      </div>

                      {/* Lane Content */}
                      <div className="flex-1 relative h-16 bg-zinc-800/20 rounded-lg border border-zinc-800">
                        {typeEvents.map((event, index) => (
                          <div
                            key={event.id}
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:scale-105 transition-transform",
                              getTypeColor(event.type)
                            )}
                            style={{
                              left: `${(index / Math.max(typeEvents.length, 1)) * 80 + 5}%`,
                            }}
                            title={event.title}
                          >
                            {event.title.slice(0, 20)}
                            {event.title.length > 20 && "..."}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
