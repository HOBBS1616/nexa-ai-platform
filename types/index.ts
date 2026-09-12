/**
 * NEXA AI Platform TypeScript Types
 */

// Language Types
export type LanguageCode = 'en' | 'yo' | 'ig' | 'ha' | 'pcm';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

// User & Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'supervisor' | 'manager' | 'admin';
  avatar?: string;
  department?: string;
  status: 'active' | 'inactive' | 'on_call' | 'break';
  lastActive?: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Customer Information
export interface Customer {
  id: string;
  accountNumber: string;
  bvn: string;
  name: string;
  phoneNumber: string;
  email?: string;
  tier: 'retail' | 'premium' | 'corporate';
  accountStatus: 'active' | 'dormant' | 'frozen' | 'closed';
  accountBalance: number;
  preferredLanguage: LanguageCode;
  riskScore?: number;
  voiceBiometricId?: string;
  registrationDate: Date;
  lastContactDate?: Date;
}

// Call Information
export interface Call {
  id: string;
  customerId: string;
  customer?: Customer;
  agentId: string;
  agent?: User;
  status: 'incoming' | 'active' | 'on_hold' | 'transferred' | 'completed' | 'escalated';
  channel: 'voice' | 'whatsapp' | 'chat' | 'email';
  direction: 'inbound' | 'outbound';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  language: LanguageCode;
  recordingUrl?: string;
  queueTime?: number;
  transferCount?: number;
}

// Intent Detection
export interface Intent {
  id: string;
  category: string;
  label: string;
  confidence: number;
  detectedAt: Date;
  suggestedActions: string[];
  parameters?: Record<string, any>;
}

// Sentiment Analysis
export interface Sentiment {
  score: 1 | 2 | 3 | 4 | 5;
  label: 'Very Negative' | 'Negative' | 'Neutral' | 'Positive' | 'Very Positive';
  confidence: number;
  detectedAt: Date;
  triggers?: string[];
}

// Translation
export interface Translation {
  id: string;
  callId: string;
  speaker: 'customer' | 'agent';
  originalText: string;
  originalLanguage: LanguageCode;
  translatedText: string;
  translatedLanguage: LanguageCode;
  timestamp: Date;
  confidence: number;
}

// Transcript
export interface TranscriptEntry {
  id: string;
  callId: string;
  speaker: 'customer' | 'agent';
  text: string;
  language: LanguageCode;
  timestamp: Date;
  translation?: string;
  sentiment?: Sentiment;
}

// Action Execution
export interface Action {
  id: string;
  type: string;
  label: string;
  icon: string;
  requiresConsent: boolean;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  executedBy?: string;
  executedAt?: Date;
  parameters?: Record<string, any>;
  result?: any;
  error?: string;
}

// Compliance & Audit
export interface ComplianceLog {
  id: string;
  callId: string;
  timestamp: Date;
  eventType: string;
  description: string;
  actorId: string;
  actorType: 'agent' | 'system' | 'customer';
  dataAccessed?: string[];
  consentGiven: boolean;
  consentTimestamp?: Date;
  regulatoryStandard: 'cbn' | 'ndpr' | 'both';
  cryptographicHash: string;
}

export interface ComplianceScore {
  callId: string;
  overallScore: number;
  cbnCompliance: number;
  ndprCompliance: number;
  issues: ComplianceIssue[];
  auditReady: boolean;
}

export interface ComplianceIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  detectedAt: Date;
  resolved: boolean;
}

// Customer 360 View
export interface CustomerContext {
  customer: Customer;
  recentCalls: Call[];
  recentTransactions: Transaction[];
  activeProducts: Product[];
  tickets: Ticket[];
  notes: Note[];
  complianceFlags: string[];
}

export interface Transaction {
  id: string;
  accountNumber: string;
  type: 'debit' | 'credit';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  timestamp: Date;
  channel: string;
  reference: string;
}

export interface Product {
  id: string;
  type: 'savings' | 'current' | 'loan' | 'card' | 'investment';
  name: string;
  accountNumber?: string;
  cardNumber?: string;
  status: 'active' | 'inactive' | 'blocked' | 'expired';
  balance?: number;
  expiryDate?: Date;
}

export interface Ticket {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  resolvedAt?: Date;
  assignedTo?: string;
}

export interface Note {
  id: string;
  customerId: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  category: 'general' | 'warning' | 'important' | 'confidential';
}

// Analytics & KPIs
export interface KPIMetric {
  name: string;
  current: number;
  target: number;
  baseline: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  callsHandled: number;
  averageHandleTime: number;
  firstCallResolution: number;
  customerSatisfaction: number;
  complianceScore: number;
  status: 'active' | 'inactive' | 'on_call' | 'break';
}

export interface DashboardStats {
  activeCalls: number;
  queuedCalls: number;
  totalCallsToday: number;
  averageHandleTime: number;
  firstCallResolution: number;
  complianceScore: number;
  activeAgents: number;
  totalAgents: number;
}

// Voice Biometrics
export interface VoiceBiometric {
  id: string;
  customerId: string;
  voiceprint: string;
  confidence: number;
  verified: boolean;
  verifiedAt?: Date;
  riskScore: number;
  fraudAlert: boolean;
}

// System Integration
export interface BankingSystem {
  id: string;
  type: 'finacle' | 'flexcube' | 't24' | 'basis' | 'bankworld';
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  apiVersion?: string;
}

// Notifications
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// WebSocket Message Types
export interface WebSocketMessage {
  event: string;
  data: any;
  timestamp: Date;
}
