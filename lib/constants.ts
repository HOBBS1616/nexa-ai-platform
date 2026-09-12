/**
 * NEXA AI Platform Constants
 * Based on NEXA Business Plan Specifications
 */

// Supported Nigerian Languages
export const SUPPORTED_LANGUAGES = {
  EN: { code: 'en', name: 'English', flag: '🇬🇧' },
  YO: { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
  IG: { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  HA: { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  PIDGIN: { code: 'pcm', name: 'Pidgin', flag: '🇳🇬' },
} as const;

// Call Intent Categories
export const INTENT_CATEGORIES = {
  CARD_DISPUTE: { id: 'card_dispute', label: 'Card Dispute', color: 'danger' },
  TRANSACTION_REVERSAL: { id: 'transaction_reversal', label: 'Transaction Reversal', color: 'warning' },
  BVN_ISSUE: { id: 'bvn_issue', label: 'BVN Issue', color: 'primary' },
  ACCOUNT_INQUIRY: { id: 'account_inquiry', label: 'Account Inquiry', color: 'primary' },
  CARD_BLOCK: { id: 'card_block', label: 'Card Block', color: 'danger' },
  PIN_RESET: { id: 'pin_reset', label: 'PIN Reset', color: 'warning' },
  BALANCE_CHECK: { id: 'balance_check', label: 'Balance Check', color: 'success' },
  LOAN_INQUIRY: { id: 'loan_inquiry', label: 'Loan Inquiry', color: 'primary' },
  COMPLAINT: { id: 'complaint', label: 'Complaint', color: 'danger' },
  GENERAL_INQUIRY: { id: 'general_inquiry', label: 'General Inquiry', color: 'neutral' },
} as const;

// Sentiment Analysis
export const SENTIMENT_LEVELS = {
  VERY_NEGATIVE: { id: 1, label: 'Very Negative', color: 'danger', emoji: '😡' },
  NEGATIVE: { id: 2, label: 'Negative', color: 'warning', emoji: '😟' },
  NEUTRAL: { id: 3, label: 'Neutral', color: 'neutral', emoji: '😐' },
  POSITIVE: { id: 4, label: 'Positive', color: 'success', emoji: '😊' },
  VERY_POSITIVE: { id: 5, label: 'Very Positive', color: 'success', emoji: '😄' },
} as const;

// Confidence Threshold
export const CONFIDENCE_THRESHOLD = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 90,
} as const;

// Call Status
export const CALL_STATUS = {
  INCOMING: { id: 'incoming', label: 'Incoming', color: 'warning' },
  ACTIVE: { id: 'active', label: 'Active', color: 'success' },
  ON_HOLD: { id: 'on_hold', label: 'On Hold', color: 'warning' },
  TRANSFERRED: { id: 'transferred', label: 'Transferred', color: 'primary' },
  COMPLETED: { id: 'completed', label: 'Completed', color: 'neutral' },
  ESCALATED: { id: 'escalated', label: 'Escalated', color: 'danger' },
} as const;

// Executable Actions
export const EXECUTABLE_ACTIONS = {
  BLOCK_CARD: { id: 'block_card', label: 'Block Card', icon: '🔒', requiresConsent: true },
  REVERSE_TRANSACTION: { id: 'reverse_transaction', label: 'Reverse Transaction', icon: '↩️', requiresConsent: true },
  RESET_PIN: { id: 'reset_pin', label: 'Reset PIN', icon: '🔑', requiresConsent: true },
  UPDATE_BVN: { id: 'update_bvn', label: 'Update BVN', icon: '👤', requiresConsent: true },
  ACTIVATE_CARD: { id: 'activate_card', label: 'Activate Card', icon: '✅', requiresConsent: true },
  GENERATE_STATEMENT: { id: 'generate_statement', label: 'Generate Statement', icon: '📄', requiresConsent: false },
  CHECK_BALANCE: { id: 'check_balance', label: 'Check Balance', icon: '💰', requiresConsent: false },
  CREATE_TICKET: { id: 'create_ticket', label: 'Create Ticket', icon: '🎫', requiresConsent: false },
} as const;

// User Roles
export const USER_ROLES = {
  AGENT: { id: 'agent', label: 'Agent', permissions: ['view_calls', 'handle_calls', 'execute_actions'] },
  SUPERVISOR: { id: 'supervisor', label: 'Supervisor', permissions: ['view_calls', 'handle_calls', 'execute_actions', 'view_analytics', 'monitor_agents'] },
  MANAGER: { id: 'manager', label: 'Manager', permissions: ['view_calls', 'view_analytics', 'monitor_agents', 'manage_team', 'view_reports'] },
  ADMIN: { id: 'admin', label: 'Admin', permissions: ['all'] },
} as const;

// Compliance Standards
export const COMPLIANCE_STANDARDS = {
  CBN: { id: 'cbn', label: 'CBN (Central Bank of Nigeria)', required: true },
  NDPR: { id: 'ndpr', label: 'NDPR (Nigeria Data Protection Regulation)', required: true },
} as const;

// Banking Systems Supported
export const BANKING_SYSTEMS = {
  FINACLE: { id: 'finacle', label: 'Finacle', vendor: 'Infosys' },
  FLEXCUBE: { id: 'flexcube', label: 'Flexcube', vendor: 'Oracle' },
  T24: { id: 't24', label: 'T24 (Transact)', vendor: 'Temenos' },
  BASIS: { id: 'basis', label: 'Basis', vendor: 'Basis Technologies' },
  BANKWORLD: { id: 'bankworld', label: 'BankWorld', vendor: 'CR2' },
} as const;

// KPIs
export const KPI_TARGETS = {
  AHT: { baseline: 12, target: 7, unit: 'minutes', label: 'Average Handle Time' },
  FCR: { baseline: 62, target: 80, unit: '%', label: 'First Call Resolution' },
  COMPLIANCE: { baseline: 35, target: 100, unit: '%', label: 'Audit Trail Completeness' },
  TRANSLATION_ERROR: { baseline: 0, target: 5, unit: '%', label: 'Translation Error Rate' },
  ACTION_EXECUTION: { baseline: 4, target: 0.5, unit: 'minutes', label: 'Action Execution Speed' },
} as const;

// Time Formats
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = 'dd MMM yyyy';
export const DATETIME_FORMAT = 'dd MMM yyyy, HH:mm';

// API Endpoints (to be configured)
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  CALLS: '/calls',
  INTENTS: '/intents',
  TRANSLATIONS: '/translations',
  CUSTOMERS: '/customers',
  ACTIONS: '/actions',
  COMPLIANCE: '/compliance',
  ANALYTICS: '/analytics',
  AUTH: '/auth',
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CALL_INCOMING: 'call:incoming',
  CALL_ACTIVE: 'call:active',
  CALL_ENDED: 'call:ended',
  TRANSLATION_UPDATE: 'translation:update',
  INTENT_DETECTED: 'intent:detected',
  SENTIMENT_UPDATE: 'sentiment:update',
  ACTION_EXECUTED: 'action:executed',
  COMPLIANCE_ALERT: 'compliance:alert',
} as const;

// Platform Pricing Tiers (from Business Plan)
export const PRICING_TIERS = {
  STARTER: {
    id: 'starter',
    name: 'Starter',
    monthlyPerSeat: 50000,
    annualPerSeat: 600000,
    features: ['Core AI Overlay', 'Translation', 'Intent Detection', 'Dashboard'],
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    monthlyPerSeat: 80000,
    annualPerSeat: 960000,
    features: ['Starter Features', 'CRM Intelligence', 'Voice Biometrics', 'Advanced Analytics'],
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPerSeat: 120000,
    annualPerSeat: 1440000,
    features: ['Professional Features', 'Compliance Engine', 'Agentic AI', 'Custom Integrations'],
  },
} as const;
