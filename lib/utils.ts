import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    closed: "bg-slate-500/15 text-slate-600 border-slate-500/30",
    archived: "bg-slate-400/15 text-slate-500 border-slate-400/30",
    open: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    "in-progress": "bg-violet-500/15 text-violet-600 border-violet-500/30",
    review: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  };
  return colors[status] || colors.pending;
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    critical: "bg-red-500/15 text-red-600 border-red-500/30",
    high: "bg-orange-500/15 text-orange-600 border-orange-500/30",
    medium: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    low: "bg-slate-500/15 text-slate-600 border-slate-500/30",
  };
  return colors[priority] || colors.medium;
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: "bg-red-500/15 text-red-600 border-red-500/30",
    high: "bg-orange-500/15 text-orange-600 border-orange-500/30",
    medium: "bg-amber-500/15 text-amber-600 border-amber-500/30",
    low: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    info: "bg-slate-500/15 text-slate-600 border-slate-500/30",
  };
  return colors[severity] || colors.info;
}

export function getEntityTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    person: "👤",
    organization: "🏢",
    location: "📍",
    vehicle: "🚗",
    device: "💻",
    account: "🔑",
  };
  return icons[type] || "📄";
}
