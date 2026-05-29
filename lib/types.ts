// Core Types for SpyfordSecureOps Platform

export type InvestigationStatus = "active" | "pending" | "closed" | "archived";
export type CaseStatus = "open" | "in-progress" | "review" | "closed";
export type CasePriority = "critical" | "high" | "medium" | "low";
export type EvidenceType = "document" | "image" | "video" | "audio" | "digital" | "physical";
export type EntityType = "person" | "organization" | "location" | "vehicle" | "device" | "account";
export type ThreatLevel = "critical" | "high" | "medium" | "low" | "info";

export interface Investigation {
  id: string;
  title: string;
  description: string;
  status: InvestigationStatus;
  leadAnalyst: string;
  team: string[];
  createdAt: string;
  updatedAt: string;
  caseCount: number;
  evidenceCount: number;
  tags: string[];
}

export interface Case {
  id: string;
  investigationId: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  evidenceIds: string[];
  entityIds: string[];
  notes: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  name: string;
  type: EvidenceType;
  description: string;
  source: string;
  hash?: string;
  fileSize?: number;
  mimeType?: string;
  uploadedBy: string;
  uploadedAt: string;
  chainOfCustody: CustodyEntry[];
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface CustodyEntry {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  notes?: string;
}

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  aliases: string[];
  description: string;
  attributes: Record<string, unknown>;
  relationships: EntityRelationship[];
  linkedCases: string[];
  linkedEvidence: string[];
  createdAt: string;
  updatedAt: string;
  riskScore?: number;
  tags: string[];
}

export interface EntityRelationship {
  id: string;
  targetEntityId: string;
  relationshipType: string;
  description?: string;
  confidence: number;
  source: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: "investigation" | "case" | "evidence" | "entity" | "intelligence" | "system";
  severity?: ThreatLevel;
  relatedIds: {
    investigationId?: string;
    caseId?: string;
    evidenceId?: string;
    entityId?: string;
  };
  actor?: string;
  metadata?: Record<string, unknown>;
}

export interface IntelligenceFeed {
  id: string;
  name: string;
  type: "threat" | "vulnerability" | "indicator" | "report";
  source: string;
  severity: ThreatLevel;
  title: string;
  summary: string;
  indicators: string[];
  publishedAt: string;
  tags: string[];
}

export interface DashboardStats {
  activeInvestigations: number;
  openCases: number;
  pendingEvidence: number;
  criticalAlerts: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  actor: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "investigator" | "viewer";
  avatar?: string;
  department?: string;
  lastActive?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  subscription: "enterprise" | "professional" | "team";
  memberCount: number;
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  twoFactorRequired: boolean;
  sessionTimeout: number;
  dataRetentionDays: number;
  allowedDomains: string[];
  auditLogRetention: number;
}
