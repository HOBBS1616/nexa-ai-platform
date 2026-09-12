# NEXA AI - Contact Centre Intelligence Platform

## 🚀 Overview

NEXA AI is an enterprise-grade, AI-powered contact centre intelligence platform designed specifically for African financial institutions. Built following the comprehensive NEXA business plan, this platform transforms Nigerian bank contact centres from reactive operations into intelligent, AI-augmented customer service engines.

## ✨ Key Features

### 1. **Unified Operator Dashboard** (`/calls`)
The core interface that contact centre agents use during active calls:

- **Real-Time Multilingual Translation**
  - Yoruba, Igbo, Hausa, Pidgin, and English support
  - Sub-1 second translation latency
  - Side-by-side original and translated text display

- **AI-Powered Intent Detection**
  - Automatic conversation understanding within 30 seconds
  - Confidence scores (90%+ accuracy target)
  - Intent categories: Card disputes, reversals, BVN issues, account inquiries, etc.

- **Predictive Action Buttons**
  - One-click executable actions
  - Block Card, Reverse Transaction, Reset PIN, Update BVN, etc.
  - CBN/NDPR consent validation before execution

- **Customer 360 View**
  - Complete customer profile with BVN verification
  - Real-time account balance
  - Recent transactions (last 5)
  - Active products (cards, accounts, loans)
  - Open tickets and support history
  - Recent call history

- **Voice Biometrics** 
  - Real-time identity verification
  - Fraud risk scoring
  - 98%+ match confidence

- **Compliance Monitor**
  - Live CBN/NDPR compliance tracking
  - Automatic consent logging
  - Immutable audit trail
  - 100% call recording

- **Call Controls**
  - Hold, Mute, Transfer, End Call
  - Live call duration tracking
  - Queue status monitoring

### 2. **Main Dashboard** (`/dashboard`)
Executive and supervisor overview:

- **Real-Time KPIs**
  - Average Handle Time (AHT): Target 7 minutes (28.3% improvement)
  - First Call Resolution (FCR): Target 80% (12.5% improvement)
  - Compliance Score: 98% audit ready
  - Active calls and queue status

- **Agent Performance Table**
  - Live agent status (Active, On Call, Break)
  - Individual KPIs per agent
  - Customer satisfaction scores
  - Compliance scores

- **System Health Monitoring**
  - Translation engine status
  - Intent detection uptime
  - Voice biometrics status
  - Compliance logger health

- **Recent Alerts Feed**
  - High queue time warnings
  - Compliance audit notifications
  - Translation confidence alerts

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Windows PowerShell (current environment)

### Steps

1. **Navigate to the project directory**:
   ```powershell
   cd nexa-ai-platform
   ```

2. **Install dependencies** (you may need to run this with increased timeout):
   ```powershell
   npm install --legacy-peer-deps
   ```

   **If npm install times out**, try these alternatives:

   **Option A - Install with increased network timeout**:
   ```powershell
   npm install --legacy-peer-deps --fetch-timeout=600000
   ```

   **Option B - Use a different registry (if in Nigeria)**:
   ```powershell
   npm config set registry https://registry.npmjs.org/
   npm install --legacy-peer-deps
   ```

   **Option C - Install dependencies in batches**:
   ```powershell
   # Core dependencies first
   npm install next@15.1.4 react@19.0.0 react-dom@19.0.0

   # UI dependencies
   npm install lucide-react@0.468.0 clsx@2.1.1 tailwind-merge@2.7.0 date-fns@4.1.0

   # Dev dependencies
   npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next tailwindcss postcss autoprefixer
   ```

3. **Run the development server**:
   ```powershell
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Default Routes

- **`/`** - Redirects to dashboard
- **`/dashboard`** - Main dashboard with KPIs and agent performance
- **`/calls`** - Operator interface for active calls (primary feature)
- **`/customers`** - Customer management (to be implemented)
- **`/analytics`** - Advanced analytics (to be implemented)
- **`/compliance`** - Compliance reports (to be implemented)
- **`/reports`** - Executive reports (to be implemented)
- **`/settings`** - Platform settings (to be implemented)

### Mock Data

The current build uses mock data to demonstrate functionality:
- Mock customer: Chukwuemeka Okonkwo (Premium tier)
- Mock call with Igbo language translation
- Mock agent performance metrics
- Mock transactions and products

In production, these will connect to:
- Banking core APIs (Finacle, Flexcube, T24)
- CRM systems (Salesforce, Dynamics)
- Real-time translation engines
- Voice biometric services

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0284c7) - Trust, banking, professionalism
- **Success**: Green (#22c55e) - Positive actions, verification
- **Warning**: Amber (#f59e0b) - Caution, pending states
- **Danger**: Red (#ef4444) - Critical alerts, errors
- **Neutral**: Gray scale - Content, backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- Professional, clean, highly readable
- Optimized for financial data display

### Components
All components follow enterprise design principles:
- Accessible (WCAG compliant structure)
- Responsive (mobile-first approach)
- Professional animations
- Consistent spacing and sizing

## 📐 Project Structure

```
nexa-ai-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home (redirects to dashboard)
│   ├── globals.css              # Global styles
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   └── page.tsx            # Main dashboard
│   └── calls/
│       └── page.tsx            # Operator interface (active calls)
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Badge.tsx
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Header.tsx          # Top header bar
│   │   └── StatsCard.tsx       # KPI stat cards
│   └── calls/                   # Call interface components
│       ├── CallTranscript.tsx  # Live transcript display
│       ├── IntentDetection.tsx # Intent & action prediction
│       └── Customer360.tsx     # Customer profile view
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── constants.ts             # Platform constants
├── types/
│   └── index.ts                 # TypeScript type definitions
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
└── package.json                 # Dependencies
```

## 🔐 Business Plan Alignment

This frontend is built according to the NEXA Business Plan specifications:

### Section 4: Platform Architecture
✅ AI Processing Layer (UI representation)
✅ Integration Layer visualization
✅ Operator Dashboard (unified interface)
✅ Execution Layer (action buttons)
✅ Compliance & audit logging display

### Section 5: Languages Supported
✅ English (en)
✅ Yoruba (yo)
✅ Igbo (ig)
✅ Hausa (ha)
✅ Pidgin (pcm)

### Section 6: Intent Categories
✅ Card Dispute
✅ Transaction Reversal
✅ BVN Issue
✅ Account Inquiry
✅ Card Block
✅ PIN Reset
✅ Balance Check
✅ Loan Inquiry
✅ Complaint
✅ General Inquiry

### Section 7: Executable Actions
✅ Block Card (requires consent)
✅ Reverse Transaction (requires consent)
✅ Reset PIN (requires consent)
✅ Update BVN (requires consent)
✅ Activate Card (requires consent)
✅ Generate Statement
✅ Check Balance
✅ Create Ticket

### Section 10: Banking Systems
Designed to integrate with:
✅ Finacle (Infosys)
✅ Flexcube (Oracle)
✅ T24/Transact (Temenos)
✅ Basis
✅ BankWorld (CR2)

### Section 12: KPI Targets
✅ AHT: 7 minutes (from 12-14)
✅ FCR: 80%+ (from 58-65%)
✅ Compliance: 100% (from 30-40%)
✅ Translation Error: <5%
✅ Action Execution: <30 seconds

## 🚧 Next Steps (Backend Integration)

To make this production-ready, you'll need:

1. **API Development**
   - REST/GraphQL APIs for all data endpoints
   - WebSocket connections for real-time updates
   - Banking core system integrations

2. **AI/ML Services**
   - Translation engine integration (Meta NLLB-200, Google Translate)
   - Intent detection models (GPT-4, Gemini)
   - Sentiment analysis pipeline
   - Voice biometrics service

3. **Authentication**
   - User login/logout
   - Role-based access control
   - Session management
   - JWT or OAuth2

4. **Database**
   - Customer data storage
   - Call logs and transcripts
   - Compliance audit trails
   - Agent performance metrics

5. **Compliance Systems**
   - CBN audit trail storage
   - NDPR consent management
   - Encryption at rest and in transit
   - Immutable logging (blockchain or HDFS)

6. **Real-Time Communication**
   - WebSocket server for live updates
   - Voice call integration (Twilio, Avaya, Genesys)
   - WhatsApp Business API

## 📝 Environment Variables (To Be Configured)

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Authentication
NEXT_PUBLIC_AUTH_PROVIDER=jwt
AUTH_SECRET=your-secret-key

# AI Services
OPENAI_API_KEY=your-openai-key
GOOGLE_TRANSLATE_API_KEY=your-google-key

# Banking APIs
FINACLE_API_URL=
FINACLE_API_KEY=

# Monitoring
SENTRY_DSN=
DATADOG_API_KEY=
```

## 🎓 Training & Documentation

For Access Bank pilot (as per business plan):
1. Agent training materials needed (2-hour session)
2. Supervisor monitoring guide
3. Compliance officer documentation
4. IT integration guide

## 📊 Success Metrics (Pilot KPIs)

Track these during the Access Bank pilot:

| KPI | Baseline | Target | Measurement |
|-----|----------|--------|-------------|
| AHT | 10-14 min | 6-9 min | Contact centre ACD |
| FCR Rate | 58-65% | 75-82% | CRM ticket re-open |
| Agent Satisfaction | TBD | +20% | Post-pilot survey |
| Audit Trail | 30-40% | 100% | NEXA log completeness |
| Translation Error | N/A | <5% | QA review of 100 calls |
| Action Speed | 3-5 min | <30 sec | NEXA timestamps |

## 🤝 Contributing

This is a proprietary platform for NEXA INNOVATIONS. For internal development:

1. Follow TypeScript strict mode
2. Use Tailwind CSS classes (no inline styles)
3. Maintain component documentation
4. Write accessibility-compliant code
5. Test on Chrome, Safari, Edge

## 📄 License

Copyright © 2026 NEXA INNOVATIONS. All rights reserved.

Confidential - Not for external distribution.

## 👥 Team

- **Founder/CEO**: Anjola Ishola
- **Technical Lead**: Mr Moshood
- **Project Coordinator**: Mr Gbade

For questions or support, contact: anjola@nexainnovations.com

---

**Built with ❤️ for African Banking Excellence**

*Transforming contact centres across Nigeria and Africa*
