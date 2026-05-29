"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Database,
  Key,
  Globe,
  Moon,
  Sun,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  Users,
  Building,
  CreditCard,
  Download,
  Trash2,
  ChevronRight,
  Check,
  AlertTriangle,
  Phone,
  Headphones,
} from "lucide-react";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "profile"
  | "security"
  | "notifications"
  | "integrations"
  | "organization"
  | "appearance"
  | "support";

const HELPLINE_NUMBER = "+1 (302) 824-6398";
const HELPLINE_TEL = "tel:+13028246398";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "integrations" as const, label: "Integrations", icon: Database },
    { id: "organization" as const, label: "Organization", icon: Building },
    { id: "appearance" as const, label: "Appearance", icon: Monitor },
    { id: "support" as const, label: "Support", icon: Headphones },
  ];

  const integrations = [
    {
      name: "Threat Intelligence Platform",
      description: "Connect to external threat intelligence feeds",
      connected: true,
      icon: Shield,
    },
    {
      name: "SIEM Integration",
      description: "Sync alerts and events with your SIEM",
      connected: true,
      icon: Database,
    },
    {
      name: "Slack",
      description: "Receive notifications in Slack channels",
      connected: false,
      icon: Bell,
    },
    {
      name: "Email Gateway",
      description: "Analyze email artifacts automatically",
      connected: true,
      icon: Mail,
    },
    {
      name: "Cloud Storage",
      description: "Store evidence in cloud storage",
      connected: false,
      icon: Database,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 lg:p-6">
        <h1 className="text-xl font-semibold text-white font-heading mb-6">
          Settings
        </h1>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Profile Settings
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-semibold">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                  Change Avatar
                </button>
                <p className="text-xs text-zinc-500 mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.department}
                    className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Role
                  </label>
                  <select className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500">
                    <option value="analyst">Analyst</option>
                    <option value="senior_analyst">Senior Analyst</option>
                    <option value="lead">Investigation Lead</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Security Settings
            </h2>

            <div className="space-y-6">
              {/* Password */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-zinc-800">
                      <Key className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Password</h3>
                      <p className="text-zinc-400 text-sm mt-1">
                        Last changed 30 days ago
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Two Factor */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-zinc-800">
                      <Smartphone className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      twoFactorEnabled ? "bg-emerald-600" : "bg-zinc-700"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Monitor className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Active Sessions</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Manage your active sessions across devices
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-14">
                  <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-4 h-4 text-zinc-400" />
                      <div>
                        <div className="text-sm text-white">
                          Chrome on macOS
                        </div>
                        <div className="text-xs text-zinc-500">
                          San Francisco, CA - Current session
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-zinc-400" />
                      <div>
                        <div className="text-sm text-white">
                          Safari on iPhone
                        </div>
                        <div className="text-xs text-zinc-500">
                          San Francisco, CA - 2 hours ago
                        </div>
                      </div>
                    </div>
                    <button className="text-xs text-red-400 hover:text-red-300">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-red-400 font-medium">Danger Zone</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Notification Preferences
            </h2>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-zinc-800">
                      <Mail className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        Email Notifications
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        Receive updates via email
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      emailNotifications ? "bg-emerald-600" : "bg-zinc-700"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        emailNotifications ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="space-y-3 ml-14">
                  {[
                    "Investigation updates",
                    "Case assignments",
                    "Evidence uploads",
                    "Critical alerts",
                    "Weekly digest",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-zinc-300">{item}</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-zinc-800">
                      <Bell className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        Push Notifications
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        Receive real-time push notifications
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      pushNotifications ? "bg-emerald-600" : "bg-zinc-700"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        pushNotifications ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Integrations
            </h2>

            <div className="space-y-4">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={integration.name}
                    className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-zinc-800">
                          <Icon className="w-5 h-5 text-zinc-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">
                            {integration.name}
                          </h3>
                          <p className="text-zinc-400 text-sm">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
                            <Check className="w-4 h-4" />
                            Connected
                          </span>
                          <button className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 text-sm hover:text-white transition-colors">
                            Configure
                          </button>
                        </div>
                      ) : (
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-medium transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "organization" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Organization Settings
            </h2>

            <div className="space-y-6">
              {/* Organization Info */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-white font-medium mb-4">
                  Organization Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      defaultValue="SpyfordSecureOps Inc."
                      className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Organization ID
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value="org_spyford_001"
                        readOnly
                        className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 font-mono text-sm"
                      />
                      <button className="px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Team Members</h3>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-medium transition-colors">
                    Invite Member
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Alex Morgan", role: "Admin", email: "alex@spyford.io" },
                    { name: "Sarah Chen", role: "Analyst", email: "sarah@spyford.io" },
                    { name: "Marcus Webb", role: "Analyst", email: "marcus@spyford.io" },
                    { name: "Priya Sharma", role: "Analyst", email: "priya@spyford.io" },
                  ].map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-medium">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="text-sm text-white">{member.name}</div>
                          <div className="text-xs text-zinc-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-400">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Data */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Download className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Export Data</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Download all organization data in JSON format
                    </p>
                    <button className="mt-4 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                      Request Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">Appearance</h2>

            <div className="space-y-6">
              {/* Theme */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-white font-medium mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "light", label: "Light", icon: Sun },
                    { id: "system", label: "System", icon: Monitor },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          setTheme(option.id as "dark" | "light" | "system")
                        }
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 rounded-lg border transition-colors",
                          theme === option.id
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                            : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Density */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-white font-medium mb-4">Display Density</h3>
                <div className="space-y-3">
                  {["Comfortable", "Compact", "Spacious"].map((density) => (
                    <label
                      key={density}
                      className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg cursor-pointer hover:bg-zinc-900 transition-colors"
                    >
                      <input
                        type="radio"
                        name="density"
                        defaultChecked={density === "Comfortable"}
                        className="w-4 h-4 border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                      />
                      <span className="text-sm text-zinc-300">{density}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Collapsed Sidebar</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Start with sidebar collapsed by default
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-white mb-6">
              Support & Help
            </h2>

            <div className="space-y-6">
              {/* 24/7 Helpline */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-emerald-400 font-semibold text-lg">
                      24/7 Support Helpline
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1 mb-4">
                      Our security operations team is available around the clock
                      for urgent investigations and critical incident support.
                    </p>
                    <a
                      href={HELPLINE_TEL}
                      className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-semibold transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {HELPLINE_NUMBER}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Support */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">Email Support</h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      For non-urgent inquiries and general support requests
                    </p>
                    <a
                      href="mailto:support@spyfordsecureops.io"
                      className="inline-block mt-3 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
                    >
                      support@spyfordsecureops.io
                    </a>
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Globe className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">
                      Documentation & Resources
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Access guides, API documentation, and knowledge base
                      articles
                    </p>
                    <button className="mt-3 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                      View Documentation
                    </button>
                  </div>
                </div>
              </div>

              {/* Enterprise Support */}
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Headphones className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">
                      Enterprise Support
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Dedicated account management and priority support for
                      enterprise customers
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                        Active Plan
                      </span>
                      <button className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Contact Account Manager
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
