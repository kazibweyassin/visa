# Ailes Global: Platform Architecture

## Current State (Landing Page Only)

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC FACING                             │
├─────────────────────────────────────────────────────────────┤
│ Landing Page (/) │ Apply (/apply) │ Pricing │ FAQ │ Guides │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (Stub)                           │
├─────────────────────────────────────────────────────────────┤
│ /api/documents/upload (no storage)                          │
│ /api/applications/[id] (schema only)                        │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│            Database (PostgreSQL via Prisma)                 │
├─────────────────────────────────────────────────────────────┤
│ ✅ Users, Applications, Documents, Checklists              │
│ ❌ No real data (no auth to create it)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Target State (Full Platform)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACES                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  PUBLIC ZONE          │      AUTHENTICATED ZONE     │   ADMIN ZONE  │
│  ├─ Landing           │      ├─ Dashboard           │   ├─ Auth     │
│  ├─ Pricing           │      ├─ Profile             │   ├─ Users    │
│  ├─ FAQ               │      ├─ New Application      │   ├─ Queue    │
│  ├─ Learn             │      ├─ View Application    │   ├─ Review   │
│  ├─ Contact           │      ├─ Upload Documents    │   └─ Analytics│
│  └─ Blog              │      ├─ Track Status        │               │
│                       │      ├─ Make Payment        │               │
│                       │      ├─ View Invoices       │               │
│                       │      └─ Notifications       │               │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                              │
├──────────────────────────────────────────────────────────────────────┤
│                      (Supabase Auth)                                 │
│ ├─ User sessions   ├─ Email verification   ├─ Password reset       │
│ └─ Role-based access (user, admin, support)                        │
└──────────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    APPLICATION API LAYER                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  AUTH ENDPOINTS              │  BUSINESS LOGIC ENDPOINTS            │
│  ├─ POST /api/auth/signup    │  ├─ POST /api/applications          │
│  ├─ POST /api/auth/login     │  ├─ GET  /api/applications/[id]     │
│  ├─ POST /api/auth/logout    │  ├─ PATCH /api/applications/[id]    │
│  ├─ POST /api/auth/refresh   │  ├─ POST /api/documents/upload      │
│  ├─ GET  /api/auth/user      │  ├─ GET  /api/documents/[id]        │
│  └─ PUT  /api/auth/password  │  ├─ DELETE /api/documents/[id]      │
│                              │  ├─ GET  /api/payments/[id]         │
│  PAYMENT ENDPOINTS           │  ├─ POST /api/payments/[id]         │
│  ├─ POST /api/payments/init  │  ├─ POST /api/notifications/[id]    │
│  ├─ GET  /api/payments       │  └─ GET  /api/admin/applications    │
│  └─ POST /api/payments/verify│                                      │
│                              │  EXTERNAL SERVICE ENDPOINTS         │
│  AI ENDPOINTS                │  ├─ POST /api/ai/audit-document     │
│  ├─ POST /api/ai/audit       │  ├─ POST /api/export/pdf            │
│  └─ POST /api/ai/review      │  └─ POST /api/email/send            │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   EXTERNAL INTEGRATIONS                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  STORAGE              PAYMENTS          COMMUNICATIONS              │
│  ├─ Supabase Storage  ├─ Flutterwave    ├─ Resend (Email)         │
│  └─ AWS S3            ├─ Paystack       ├─ Twilio SMS             │
│                       └─ Stripe         └─ Slack notifications     │
│                                                                       │
│  AI & DOCUMENTS       MONITORING        DATABASES                   │
│  ├─ Claude/OpenAI     ├─ Sentry         ├─ PostgreSQL             │
│  ├─ PDF Generation    ├─ LogRocket      ├─ Redis (cache)          │
│  └─ Document OCR      └─ Vercel         └─ Prisma ORM             │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                      │
├──────────────────────────────────────────────────────────────────────┤
│                     PostgreSQL Database                              │
│                                                                       │
│  Core Tables          │  Transaction Tables    │  Content Tables   │
│  ├─ users             │  ├─ payments           │  ├─ visa_types   │
│  ├─ applications      │  ├─ invoices           │  ├─ requirements │
│  ├─ documents         │  ├─ audit_logs         │  └─ pricing      │
│  ├─ checklists        │  └─ notifications      │                   │
│  └─ reviews           │                        │                   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: Submit Application

```
User Interface
    │
    ├─► /dashboard/applications/new
    │
    ▼
Multi-Step Form
    │
    ├─► Step 1: Travel details
    ├─► Step 2: Personal info  
    ├─► Step 3: Choose plan
    │
    ▼
POST /api/applications
    │
    ├─► Validate input (Zod)
    ├─► Check auth (session)
    ├─► Create application in DB
    │
    ▼
Prisma ORM
    │
    ├─► INSERT INTO applications (...)
    ├─► INSERT INTO checklist_progress (...)
    │
    ▼
PostgreSQL
    │
    ├─► Store application record
    ├─► Create document checklist
    │
    ▼
Response to User
    │
    ├─► Redirect to /dashboard/applications/[id]
    ├─► Show success toast
    ├─► Pre-fill document upload form
    │
    ▼
Background Jobs
    │
    ├─► Send confirmation email (Resend)
    ├─► Log to analytics
    ├─► Notify admin queue
```

---

## Document Processing Flow

```
User Uploads Document
    │
    ▼
/api/documents/upload
    │
    ├─► Validate file (type, size)
    ├─► Generate unique filename
    │
    ▼
Supabase Storage
    │
    ├─► Upload file (s3://bucket/userId/applicationId/...)
    ├─► Generate signed URL
    │
    ▼
Prisma
    │
    ├─► INSERT INTO uploaded_documents (...)
    │
    ▼
Background Job Queue
    │
    ├─► POST /api/ai/audit-document
    │
    ▼
Claude API
    │
    ├─► Analyze document quality
    ├─► Check completeness
    ├─► Extract key data
    │
    ▼
Update Document Status
    │
    ├─► UPDATE uploaded_documents SET status = 'PENDING_REVIEW'
    ├─► Store AI feedback
    │
    ▼
Email Notification
    │
    ├─► Send "Document uploaded" email
    │
    ▼
User Sees
    │
    ├─► Document in list with "Pending Review" status
    ├─► AI feedback visible (if any issues)
```

---

## Authentication Flow

```
Public User
    │
    ├─► /auth/signup
    │   │
    │   ▼
    │   Supabase Auth
    │   │
    │   ├─► Create user account
    │   ├─► Send verification email
    │   │
    │   ▼
    │   User clicks email link
    │   │
    │   ▼
    │   INSERT INTO users (email, name, country, ...)
    │   │
    │   ▼
    │   Session created
    │
    └─► /auth/login
        │
        ▼
        Supabase Auth
        │
        ├─► Verify credentials
        ├─► Create session token
        │
        ▼
        Middleware checks
        │
        ├─► Validates session on protected routes
        ├─► Injects user data into context
        │
        ▼
        User can access /dashboard/*
        │
        ├─► All API calls include auth header
        ├─► Backend verifies token on every request
```

---

## Payment Processing Flow

```
User in Application
    │
    ├─► Click "Proceed to Payment"
    │
    ▼
/dashboard/applications/[id]/payment
    │
    ├─► Show pricing plan
    ├─► Show total amount
    │
    ▼
POST /api/payments/init
    │
    ├─► Validate plan exists
    ├─► Calculate total
    ├─► Create payment record (PENDING)
    │
    ▼
Flutterwave
    │
    ├─► Generate payment link
    ├─► Redirect user to checkout
    │
    ▼
User Completes Payment
    │
    ├─► Flutterwave confirms transaction
    ├─► Webhook call: POST /api/webhooks/flutterwave
    │
    ▼
Verify Transaction
    │
    ├─► Check signature
    ├─► Confirm amount
    ├─► Update payment status (PAID)
    │
    ▼
PostgreSQL
    │
    ├─► UPDATE payments SET status = 'COMPLETED'
    ├─► UPDATE applications SET status = 'DOCUMENTS_READY'
    │
    ▼
Send Emails
    │
    ├─► Receipt to user
    ├─► Confirmation to admin
    │
    ▼
User Redirected
    │
    ├─► Show success page
    ├─► Redirect to document upload
```

---

## Admin Review Flow

```
Admin Dashboard
    │
    ├─► /admin/applications
    │
    ▼
View Application Queue
    │
    ├─► Sort by: Newest, Pending, Flagged
    ├─► Filter by: Country, Visa Type, Status
    │
    ▼
Click Application
    │
    ├─► /admin/applications/[id]/review
    │
    ▼
Review Interface
    │
    ├─► View all documents
    ├─► Check AI audit results
    ├─► Read document comments
    │
    ▼
Admin Actions
    │
    ├─► APPROVE document
    ├─► REQUEST MORE INFO
    ├─► REJECT with reason
    │
    ▼
PATCH /api/admin/documents/[id]
    │
    ├─► Update document_review status
    ├─► Store comments
    │
    ▼
PostgreSQL
    │
    ├─► UPDATE document_reviews SET status = 'APPROVED'
    ├─► INSERT INTO comments (...)
    │
    ▼
Email User
    │
    ├─► "Your document was approved"
    │   OR
    │   "Please provide: X, Y, Z"
    │
    ▼
User Gets Notification
    │
    ├─► In-app notification
    ├─► Email with details
    ├─► Can reupload or respond
```

---

## Technology Stack Details

### Frontend
- **Framework:** Next.js 16 App Router
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (in package.json ready)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Tables:** TanStack Query (in package.json ready)
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js (via Next.js API routes)
- **ORM:** Prisma 7.8
- **Database:** PostgreSQL
- **Auth:** Supabase Auth
- **Validation:** Zod

### Infrastructure
- **Hosting:** Vercel (Next.js native)
- **Database:** PostgreSQL (managed via Supabase)
- **Storage:** Supabase Storage (or AWS S3)
- **Email:** Resend
- **Payments:** Flutterwave / Paystack
- **AI:** Claude API / OpenAI

### Monitoring & Analytics
- **Error Tracking:** Sentry
- **Analytics:** PostHog or Mixpanel
- **Logging:** Vercel Analytics

---

## Current vs Target: Feature Comparison

| Feature | Current | Target |
|---------|---------|--------|
| Public Landing Page | ✅ Complete | ✅ Keep |
| User Authentication | ❌ None | ✅ Supabase Auth |
| User Dashboard | ❌ None | ✅ Full dashboard |
| Application CRUD | 🟡 Stub | ✅ Functional |
| Document Upload | 🟡 Endpoint only | ✅ UI + Storage |
| Document Review | ❌ None | ✅ Admin + AI |
| Payment Processing | ❌ None | ✅ Flutterwave |
| Email Notifications | ❌ None | ✅ Resend templates |
| Admin Panel | ❌ None | ✅ Full panel |
| Application Tracking | ❌ None | ✅ Real-time |
| PDF Export | ❌ None | ✅ Full export |
| Mobile Responsive | ✅ Partial | ✅ Full |
| API Documentation | ❌ None | ✅ OpenAPI spec |
| Tests | ❌ None | 🟡 Integration tests |

---

**Target Launch Date:** 8-12 weeks from start  
**Recommended Start Date:** Immediately with Phase 1 (Auth)  
**Team Size:** 1-2 developers (can be done by 1 full-time dev)
