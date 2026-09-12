'use client';

import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CallTranscript from '@/components/calls/CallTranscript';
import IntentDetection from '@/components/calls/IntentDetection';
import Customer360 from '@/components/calls/Customer360';
import {
  Call,
  CustomerContext,
  TranscriptEntry,
  Intent,
  Action,
  Customer,
  Transaction,
  Product,
  Ticket,
} from '@/types';
import {
  Phone,
  PhoneOff,
  Pause,
  Play,
  Volume2,
  VolumeX,
  UserPlus,
  Clock,
} from 'lucide-react';
import { formatDuration } from '@/lib/utils';

// Mock data for demonstration
const mockCustomer: Customer = {
  id: 'CUST-001',
  accountNumber: '1234567890',
  bvn: '12345678901',
  name: 'Chukwuemeka Okonkwo',
  phoneNumber: '+234 803 456 7890',
  email: 'chukwuemeka@example.com',
  tier: 'premium',
  accountStatus: 'active',
  accountBalance: 2450000,
  preferredLanguage: 'ig',
  riskScore: 25,
  voiceBiometricId: 'VB-001',
  registrationDate: new Date('2020-05-15'),
  lastContactDate: new Date('2026-08-20'),
};

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    accountNumber: '1234567890',
    type: 'debit',
    amount: 50000,
    currency: 'NGN',
    description: 'POS Purchase - Shoprite',
    status: 'completed',
    timestamp: new Date('2026-09-10T14:30:00'),
    channel: 'POS',
    reference: 'REF123456',
  },
  {
    id: 'TXN-002',
    accountNumber: '1234567890',
    type: 'credit',
    amount: 500000,
    currency: 'NGN',
    description: 'Salary Payment',
    status: 'completed',
    timestamp: new Date('2026-09-08T08:00:00'),
    channel: 'Transfer',
    reference: 'REF123457',
  },
];

const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    type: 'card',
    name: 'Premium Debit Card',
    cardNumber: '**** 4567',
    status: 'active',
    expiryDate: new Date('2028-12-31'),
  },
  {
    id: 'PROD-002',
    type: 'savings',
    name: 'Savings Account',
    accountNumber: '1234567890',
    status: 'active',
    balance: 2450000,
  },
];

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    customerId: 'CUST-001',
    subject: 'Card declined at POS',
    description: 'Customer reports card was declined despite sufficient balance',
    status: 'in_progress',
    priority: 'high',
    category: 'card_issue',
    createdAt: new Date('2026-09-09T10:15:00'),
    assignedTo: 'AGENT-005',
  },
];

const mockCustomerContext: CustomerContext = {
  customer: mockCustomer,
  recentCalls: [],
  recentTransactions: mockTransactions,
  activeProducts: mockProducts,
  tickets: mockTickets,
  notes: [],
  complianceFlags: [],
};

const mockTranscript: TranscriptEntry[] = [
  {
    id: 'TRANS-001',
    callId: 'CALL-001',
    speaker: 'customer',
    text: 'Nnọọ, achọrọ m ka m gbochie kaadị m',
    language: 'ig',
    timestamp: new Date('2026-09-11T15:30:15'),
    translation: 'Hello, I want to block my card',
    sentiment: {
      score: 2,
      label: 'Negative',
      confidence: 85,
      detectedAt: new Date('2026-09-11T15:30:15'),
    },
  },
  {
    id: 'TRANS-002',
    callId: 'CALL-001',
    speaker: 'agent',
    text: 'Good afternoon. I can help you with that. May I know the reason?',
    language: 'en',
    timestamp: new Date('2026-09-11T15:30:25'),
  },
  {
    id: 'TRANS-003',
    callId: 'CALL-001',
    speaker: 'customer',
    text: 'Atụfuru m kaadị ahụ. Anọghị m hụ ya ebe ọ bụla',
    language: 'ig',
    timestamp: new Date('2026-09-11T15:30:40'),
    translation: 'I lost the card. I cannot find it anywhere',
    sentiment: {
      score: 2,
      label: 'Negative',
      confidence: 88,
      detectedAt: new Date('2026-09-11T15:30:40'),
      triggers: ['lost', 'cannot find'],
    },
  },
];

const mockIntent: Intent = {
  id: 'INTENT-001',
  category: 'card_block',
  label: 'Card Block Request - Lost Card',
  confidence: 94,
  detectedAt: new Date('2026-09-11T15:30:45'),
  suggestedActions: ['block_card', 'create_ticket', 'generate_statement'],
  parameters: {
    reason: 'lost',
    cardType: 'debit',
    urgency: 'high',
  },
};

const mockActions: Action[] = [
  {
    id: 'ACTION-001',
    type: 'block_card',
    label: 'Block Card',
    icon: '🔒',
    requiresConsent: true,
    status: 'pending',
  },
  {
    id: 'ACTION-002',
    type: 'create_ticket',
    label: 'Create Support Ticket',
    icon: '🎫',
    requiresConsent: false,
    status: 'pending',
  },
];

export default function CallsPage() {
  const [callActive, setCallActive] = useState(true);
  const [onHold, setOnHold] = useState(false);
  const [muted, setMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(245); // in seconds

  const handleExecuteAction = (action: Action) => {
    console.log('Executing action:', action);
    // In a real implementation, this would call an API
    alert(`Executing: ${action.label}\n\nIn production, this would:\n1. Request customer consent if needed\n2. Execute through banking API\n3. Log to compliance system`);
  };

  const handleEndCall = () => {
    if (confirm('Are you sure you want to end this call?')) {
      setCallActive(false);
      alert('Call ended. Compliance logs saved automatically.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Call Controls */}
      <Card variant="elevated" padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-success-600 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Active Call</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="success" size="sm">
                  <span className="w-2 h-2 rounded-full bg-success-500 mr-1.5 pulse-indicator" />
                  Live
                </Badge>
                <span className="text-sm text-neutral-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(callDuration)}
                </span>
                <Badge variant="primary" size="sm">
                  Inbound
                </Badge>
              </div>
            </div>
          </div>

          {/* Call Control Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={onHold ? 'warning' : 'secondary'}
              size="md"
              onClick={() => setOnHold(!onHold)}
              leftIcon={onHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            >
              {onHold ? 'Resume' : 'Hold'}
            </Button>
            <Button
              variant={muted ? 'warning' : 'secondary'}
              size="md"
              onClick={() => setMuted(!muted)}
              leftIcon={muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            >
              {muted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Transfer
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleEndCall}
              leftIcon={<PhoneOff className="w-4 h-4" />}
            >
              End Call
            </Button>
          </div>
        </div>

        {onHold && (
          <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <p className="text-sm text-warning-800 font-medium">
              ⏸️ Call on hold - Customer is waiting
            </p>
          </div>
        )}
      </Card>

      {/* Main Call Interface - 3 Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Call Transcript */}
        <div className="col-span-5 h-[calc(100vh-280px)]">
          <CallTranscript transcript={mockTranscript} showTranslation={true} />
        </div>

        {/* Middle Column - Intent Detection & Actions */}
        <div className="col-span-3 space-y-4">
          <IntentDetection
            intent={mockIntent}
            suggestedActions={mockActions}
            onExecuteAction={handleExecuteAction}
          />

          {/* Voice Biometrics */}
          <Card variant="elevated" padding="md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-base">Voice Biometrics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-3 rounded-lg bg-success-50 border border-success-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-success-900">
                    ✓ Identity Verified
                  </span>
                  <Badge variant="success" size="sm">
                    98% Match
                  </Badge>
                </div>
                <p className="text-xs text-success-700">
                  Voice biometric authentication successful
                </p>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-neutral-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600">Fraud Risk</span>
                  <Badge variant="success" size="sm">
                    Low
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Monitor */}
          <Card variant="elevated" padding="md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-base">Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-success-50">
                <span className="text-xs font-medium text-success-900">
                  ✓ Consent Collected
                </span>
                <Badge variant="success" size="sm">
                  NDPR
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-success-50">
                <span className="text-xs font-medium text-success-900">
                  ✓ Audit Trail Active
                </span>
                <Badge variant="success" size="sm">
                  CBN
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-success-50">
                <span className="text-xs font-medium text-success-900">
                  ✓ Recording Active
                </span>
                <Badge variant="primary" size="sm">
                  100%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Customer 360 */}
        <div className="col-span-4 h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
          <Customer360 context={mockCustomerContext} />
        </div>
      </div>
    </div>
  );
}
