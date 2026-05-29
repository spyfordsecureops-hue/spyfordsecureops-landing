"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  FolderOpen,
  FileBox,
  Users,
  Clock,
  Shield,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  Building2,
  Sparkles,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/lib/mock-data";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Investigations", href: "/investigations", icon: Search },
  { name: "Cases", href: "/cases", icon: FolderOpen },
  { name: "Evidence", href: "/evidence", icon: FileBox },
  { name: "Entities", href: "/entities", icon: Users },
  { name: "Timeline", href: "/timeline", icon: Clock },
  { name: "Intelligence", href: "/intelligence", icon: Shield },
];

const bottomNavigation = [
  { name: "Support", href: "/settings?tab=support", icon: Headphones },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue text-white">
          <Shield className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-sm font-semibold text-foreground">
            SpyfordSecureOps
          </span>
          <span className="text-xs text-muted">Intelligence Platform</span>
        </div>
      </div>

      {/* AI Copilot Button */}
      <div className="px-4 py-4">
        <Link
          href="/dashboard/copilot"
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue/10 to-violet-500/10 px-4 py-3 transition-all hover:from-blue/15 hover:to-violet-500/15"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-violet-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              AI Copilot
            </span>
            <span className="text-xs text-muted">Ask anything</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue/10 text-blue"
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-4 py-4">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue/10 text-blue"
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-foreground/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue/10 text-blue">
              <span className="text-sm font-semibold">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex flex-1 flex-col text-left">
              <span className="text-sm font-medium text-foreground">
                {currentUser.name}
              </span>
              <span className="text-xs text-muted capitalize">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted transition-transform",
                userMenuOpen && "rotate-180"
              )}
            />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-border bg-card p-2 shadow-lg">
              <Link
                href="/settings/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-foreground/5 hover:text-foreground"
              >
                <Users className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/settings/organization"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted hover:bg-foreground/5 hover:text-foreground"
              >
                <Building2 className="h-4 w-4" />
                Organization
              </Link>
              <hr className="my-2 border-border" />
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/5">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export function Header() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <h1 className="font-heading text-xl font-semibold text-foreground">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm text-muted transition-all hover:border-blue/30 hover:text-foreground">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-4 hidden rounded bg-foreground/5 px-2 py-0.5 text-xs font-medium lg:inline">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:border-blue/30">
          <Bell className="h-5 w-5 text-muted" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
