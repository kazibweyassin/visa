# Ailes Global: Landing Page → Platform Transition Analysis

**Current Date:** May 4, 2026  
**Project:** Ailes Global - African Visa Automation Platform  
**Status:** Early-stage landing page with foundational platform architecture

---

## 1. CURRENT STATE ASSESSMENT

### What Exists ✅
- **Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL ready
- **Landing Page:** Fully functional with hero, trust bar, visa checker, testimonials, floating WhatsApp
- **Database Schema:** Complete Prisma models for Users, Applications, Documents, Checklists
- **API Routes:** Document upload and application management endpoints (partial)
- **Intake Form:** Multi-step visa application form (apply-form.tsx) with 612 lines of logic
- **Informational Pages:** FAQ, Pricing, Study Abroad, Visa Requirements, Uganda Tourism
- **UI Components:** Modular components using Lucide icons and Framer Motion

### What's Missing ❌
- **Authentication System** - No login/registration, no auth middleware
- **User Dashboard** - No authenticated user area
- **Document Management UI** - Upload and tracking interface incomplete
- **Payment Integration** - No Flutterwave/Paystack implementation
- **AI Document Auditor** - Mentioned but not implemented
- **PDF Generator** - Not implemented
- **Application Tracking** - No status updates or notifications
- **Admin Panel** - No staff/support tools
- **Email/Notifications** - No transactional emails
- **File Storage** - Hardcoded placeholder (storage.example.com)

---

## 2. ARCHITECTURE OVERVIEW

### Database Schema (Ready) 📊
```
Users
  ├── Applications (one-to-many)
  │   ├── UploadedDocuments
  │   └── ChecklistProgress
  ├── UploadedDocuments
  └── DocumentReviews

DocumentRequirements
  ├── UploadedDocuments
  └── ChecklistProgress
```

### Current Routes
```
/ ...................... Landing page
/apply .................. Intake form (unprotected)
/faq .................... FAQ page
/pricing ................ Pricing page
/prepare ................ Preparation guide
/study-abroad ........... Study abroad info
/visa-requirements ...... Requirements explorer
/uganda ................. Uganda tourism (empty)

/api/documents/upload .... Document upload (incomplete)
/api/applications/[id] ... Application CRUD (incomplete)
```

---

## 3. TRANSITION ROADMAP: LANDING PAGE → PLATFORM

### Phase 1: Core Auth & User Management (WEEK 1-2)
**Goal:** Enable users to create accounts and access protected areas

#### 1.1 Authentication System
- [ ] Implement NextAuth.js or Supabase Auth
- [ ] Create `/auth/login` and `/auth/signup` routes
- [ ] Add email verification flow
- [ ] Implement "remember me" and password reset
- [ ] Add auth middleware for protected routes

**Files to Create:**
```
app/auth/login/page.tsx
app/auth/signup/page.tsx
app/auth/verify-email/page.tsx
app/auth/reset-password/page.tsx
lib/auth.ts
middleware.ts
```

#### 1.2 User Profile Management
- [ ] Create `/dashboard/profile` route
- [ ] Build profile edit form (name, phone, country, passport)
- [ ] Add avatar upload
- [ ] Implement email change with verification

**Files to Create:**
```
app/dashboard/profile/page.tsx
components/modules/profile-form.tsx
components/modules/avatar-upload.tsx
```

---

### Phase 2: Dashboard & Application Management (WEEK 2-3)
**Goal:** Give users a home base to manage their visa applications

#### 2.1 Main Dashboard
- [ ] Create `/dashboard` home with application cards
- [ ] Show application status (Draft, Documents Ready, Submitted, Under Review, Approved, Rejected)
- [ ] Add quick actions (New Application, View Documents, Track Status)
- [ ] Display progress percentages

**Files to Create:**
```
app/dashboard/page.tsx
app/dashboard/layout.tsx
components/modules/application-card.tsx
components/modules/dashboard-stats.tsx
```

#### 2.2 Application Detail View
- [ ] Create `/dashboard/applications/[id]` route
- [ ] Show full application details
- [ ] Display document checklist with upload status
- [ ] Add timeline of status changes

**Files to Create:**
```
app/dashboard/applications/[id]/page.tsx
components/modules/application-timeline.tsx
components/modules/document-checklist-form.tsx
```

#### 2.3 Update Apply Flow
- [ ] Move `/apply` to `/dashboard/applications/new`
- [ ] Make form multi-route with state persistence
- [ ] Add "Save Draft" functionality
- [ ] Integrate with user session

---

### Phase 3: Document Management (WEEK 3-4)
**Goal:** Full document handling from upload to AI review

#### 3.1 Document Upload System
- [ ] Implement file storage (AWS S3 or Supabase Storage)
- [ ] Create upload progress UI with drag-drop
- [ ] Add file validation (type, size, format)
- [ ] Build document list view

**Files to Create:**
```
app/dashboard/applications/[id]/documents/page.tsx
components/modules/document-upload-widget.tsx
lib/storage.ts
```

#### 3.2 Document Review Status
- [ ] Create UI for document review states (Pending, Approved, Rejected, Needs Info)
- [ ] Add reviewer comments display
- [ ] Show what's missing for rejected documents

**Components Update:**
```
components/modules/document-item.tsx
components/modules/review-comments.tsx
```

#### 3.3 AI Document Auditor (Advanced)
- [ ] Integrate OpenAI or Claude API
- [ ] Create async document validation pipeline
- [ ] Check document completeness, quality, validity
- [ ] Return structured feedback

**Files to Create:**
```
lib/ai/document-auditor.ts
app/api/ai/audit-document/route.ts
```

---

### Phase 4: Payment Integration (WEEK 4-5)
**Goal:** Enable users to pay for visa services

#### 4.1 Payment Setup
- [ ] Integrate Flutterwave or Paystack
- [ ] Create payment plans CRUD
- [ ] Build checkout flow
- [ ] Implement payment webhook handlers

**Files to Create:**
```
app/dashboard/applications/[id]/payment/page.tsx
lib/payment.ts
app/api/webhooks/flutterwave/route.ts
app/api/webhooks/paystack/route.ts
components/modules/payment-form.tsx
```

#### 4.2 Invoice & Receipts
- [ ] Generate PDF invoices
- [ ] Send payment confirmation emails
- [ ] Create invoice history view

---

### Phase 5: Notifications & Communications (WEEK 5)
**Goal:** Keep users informed about their applications

#### 5.1 Email System
- [ ] Integrate SendGrid or Resend
- [ ] Create email templates for:
  - Welcome/Registration
  - Document uploaded
  - Document approved/rejected
  - Application submitted
  - Application status updates
  - Payment confirmation

**Files to Create:**
```
lib/email.ts
lib/email-templates/
app/api/emails/send/route.ts
```

#### 5.2 In-App Notifications
- [ ] Create notification center UI
- [ ] Add notification preferences page
- [ ] Implement notification types (success, warning, error, info)

**Files to Create:**
```
app/dashboard/notifications/page.tsx
components/modules/notification-center.tsx
lib/notifications.ts
```

---

### Phase 6: Admin Panel (WEEK 6)
**Goal:** Enable staff to review applications and manage the platform

#### 6.1 Admin Dashboard
- [ ] Create `/admin` routes (role-based access)
- [ ] Build application queue view
- [ ] Add document review interface

**Files to Create:**
```
app/admin/layout.tsx
app/admin/page.tsx
app/admin/applications/page.tsx
app/admin/applications/[id]/review/page.tsx
app/admin/users/page.tsx
```

#### 6.2 Admin Tools
- [ ] Application status management
- [ ] Document approval workflow
- [ ] User management
- [ ] Analytics dashboard

---

### Phase 7: Advanced Features (WEEK 7+)
- [ ] PDF generation for applications
- [ ] Multi-visa application tracking
- [ ] Client communication (messaging system)
- [ ] Export application to PDF
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)

---

## 4. CRITICAL DEPENDENCIES & DECISIONS

### Must Decide Before Starting:

1. **Authentication Provider**
   - Option A: NextAuth.js (free, self-hosted, flexible)
   - Option B: Supabase Auth (managed, PostgreSQL-integrated)
   - Option C: Clerk (modern, but paid)
   - **Recommendation:** Supabase Auth (best for your PostgreSQL + rapid development)

2. **File Storage**
   - Option A: AWS S3
   - Option B: Supabase Storage
   - Option C: Cloudinary
   - **Recommendation:** Supabase Storage (already using Supabase ecosystem)


   Legal Notice: Ailes global is a private travel consultancy and logistics firm. We are NOT affiliated with any government, embassy. We provide travel facilitation, educational benchmarking, and logistics support only. Visa issuance and approval are at the sole discretion of the respective embassies. We do not guarantee visa approval, entry, or financial returns from business travel.
                    ``
3. **Email Service**
   - Option A: SendGrid
   - Option B: Resend
   - Option C: Mailgun
   - **Recommendation:** Resend (React-friendly, easier setup)

4. **Payment Provider**
   - Keep Flutterwave & Paystack ready (African focus)
   - **Recommendation:** Flutterwave (better API, more stable)

5. **AI Integration**
   - Option A: OpenAI GPT-4
   - Option B: Claude (Anthropic)
   - Option C: Local ML models
   - **Recommendation:** Claude API (cost-effective, good for document analysis)

---

## 5. FEATURE PRIORITY MATRIX

```
HIGH IMPACT + QUICK WIN (Do First)
├── Authentication system
├── User dashboard
├── Application CRUD
└── Document upload basic

HIGH IMPACT + TIME INVESTMENT (Do Next)
├── Document management UI
├── Payment integration
├── Email notifications
└── Status tracking

MEDIUM IMPACT + QUICK WIN
├── Application timeline
├── Document checklist UI
└── User profile page

MEDIUM IMPACT + TIME (Do Later)
├── Admin panel
├── AI document auditor
├── Advanced notifications
└── Analytics

LOW IMPACT (Nice to Have)
├── PDF export
├── Mobile app
├── Messaging system
└── Advanced reporting
```

---

## 6. ESTIMATED EFFORT & TIMELINE

| Phase | Focus | Effort | Duration |
|-------|-------|--------|----------|
| 1 | Auth + User Profile | 40 hrs | 1-2 weeks |
| 2 | Dashboard + Application Mgmt | 60 hrs | 2-3 weeks |
| 3 | Document Management | 50 hrs | 2-3 weeks |
| 4 | Payments | 40 hrs | 1-2 weeks |
| 5 | Notifications | 30 hrs | 1 week |
| 6 | Admin Panel | 50 hrs | 2 weeks |
| **TOTAL** | **Production Platform** | **~270 hrs** | **8-12 weeks** |

---

## 7. TECHNICAL DEBT & CLEANUP NEEDED

### Current Issues
- [ ] Document upload endpoint uses hardcoded `storage.example.com`
- [ ] No environment variables validated in `.env.example`
- [ ] Apply form not connected to database
- [ ] API endpoints missing error handling
- [ ] No request validation/rate limiting
- [ ] Missing TypeScript strict mode in some files
- [ ] Email templates not prepared
- [ ] No tests written

### Recommended Cleanups
```
Priority 1:
├── Set up proper .env configuration
├── Add request validation with zod
├── Implement proper error handling
└── Set up Prisma seed data

Priority 2:
├── Add unit tests (Jest)
├── Add integration tests
├── Set up CI/CD pipeline
└── Add API documentation

Priority 3:
├── Performance optimization
├── SEO improvements
├── Mobile responsiveness audit
└── Accessibility audit
```

---

## 8. SUCCESS METRICS

**By End of Phase 3 (Week 4):**
- Users can register and log in
- Users can submit applications with documents
- Documents can be uploaded and listed
- ~20% of platform features complete

**By End of Phase 5 (Week 5):**
- Users can pay for services
- Users receive email notifications
- ~50% of platform features complete
- Ready for private beta

**By End of Phase 6 (Week 6):**
- Staff can review applications
- ~75% of platform features complete
- Ready for public alpha

**By End of Phase 7:**
- Full platform operational
- 95%+ feature complete
- Ready for launch

---

## 9. NEXT IMMEDIATE STEPS

### This Week:
1. [ ] Decide on Supabase vs Auth0 vs NextAuth
2. [ ] Set up PostgreSQL database connection
3. [ ] Configure environment variables
4. [ ] Create auth routes and middleware
5. [ ] Build login/signup pages

### Then:
6. [ ] Create dashboard layout
7. [ ] Build application list view
8. [ ] Connect apply form to database
9. [ ] Implement document upload

---

## 10. RESOURCE LINKS

- Next.js App Router: https://nextjs.org/docs/app
- Supabase: https://supabase.com/docs
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Owner:** Ailes Global Team  
**Last Updated:** May 4, 2026  
**Status:** Ready for Phase 1 Implementation
