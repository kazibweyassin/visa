# Ailes Global: 8-Week Sprint Calendar

## 📅 Implementation Timeline

### WEEK 1-2: AUTHENTICATION PHASE
**Goal:** Users can sign up, verify email, and log in

```
MONDAY - WEDNESDAY: Setup & Configuration
├─ Create Supabase project
├─ Configure PostgreSQL connection
├─ Add environment variables
├─ Set up Prisma connection
└─ Create auth utility functions

THURSDAY - FRIDAY: Sign Up & Login
├─ Build /auth/signup page
│  ├─ Email field validation
│  ├─ Password strength check
│  ├─ Form submission
│  └─ Error handling
├─ Build /auth/login page
│  ├─ Email/password form
│  ├─ Remember me checkbox
│  ├─ Redirect to dashboard
│  └─ Session handling
└─ Deploy to preview

WEEKEND: Testing & Polish
├─ Test sign up flow
├─ Test login flow
├─ Fix any bugs
└─ Code review
```

**Deliverables:**
- ✅ 10+ users can sign up
- ✅ Email verification working
- ✅ Login functional
- ✅ Sessions persist

**Definition of Done:**
```
□ User signs up with email
□ Verification email received
□ Can click link to verify
□ Can log in with verified email
□ Dashboard only accessible when logged in
□ Logout clears session
```

---

### WEEK 2-3: EMAIL & PROFILE PHASE
**Goal:** Users can complete their profile and receive emails

```
MONDAY - TUESDAY: Email Verification & Reset
├─ Build /auth/verify-email page
│  ├─ Token validation
│  ├─ Success/error states
│  └─ Resend option
├─ Build /auth/reset-password page
│  ├─ Email submission
│  ├─ Reset token validation
│  ├─ Password change
│  └─ Email confirmation
└─ Test email flows

WEDNESDAY - THURSDAY: User Profile
├─ Build /auth/onboarding page
│  ├─ Full name field
│  ├─ Phone number
│  ├─ Country selection
│  ├─ Profile photo upload
│  └─ Submit/Skip buttons
├─ Build /dashboard/profile page
│  ├─ View current profile
│  ├─ Edit any field
│  ├─ Change password
│  └─ Delete account option
└─ Update database schema

FRIDAY: Integration & Testing
├─ Connect profile to auth user
├─ Test all profile flows
├─ Test email sending
└─ Deploy to preview
```

**Deliverables:**
- ✅ Email verification required before access
- ✅ Password reset functional
- ✅ User profile complete and editable
- ✅ All confirmation emails sent

**Definition of Done:**
```
□ Must verify email to access dashboard
□ Can change password after reset
□ Can edit profile information
□ Emails delivered to inbox
□ Profile photo persists across sessions
```

---

### WEEK 3-4: DASHBOARD & APPLICATIONS PHASE
**Goal:** Users can create and view applications

```
MONDAY: Dashboard Layout
├─ Create /dashboard layout
│  ├─ Sidebar navigation
│  ├─ Top header bar
│  ├─ Main content area
│  └─ Footer
├─ Add navigation links
├─ Add user menu/profile dropdown
└─ Make responsive

TUESDAY - WEDNESDAY: Dashboard Home
├─ Build /dashboard home page
│  ├─ Welcome message
│  ├─ Application cards grid
│  ├─ Quick stats (total apps, pending)
│  ├─ Recent activity timeline
│  └─ "New Application" button
├─ Create application card component
├─ Add empty state
└─ Test layout

THURSDAY: Create Application
├─ Build /dashboard/applications/new
│  ├─ Step 1: Select destination
│  ├─ Step 2: Select visa type
│  ├─ Step 3: Select purpose
│  ├─ Step 4: Travel dates
│  ├─ Step 5: Review
│  └─ Submit to database
├─ Add validation
├─ Add "Save as Draft" option
└─ Redirect to application detail

FRIDAY: Testing & Refinement
├─ Test application creation
├─ Test data persistence
├─ Test validation errors
├─ Deploy to preview
```

**Deliverables:**
- ✅ Dashboard home page showing applications
- ✅ Can create new application
- ✅ Applications saved to database
- ✅ Can view application details

**Definition of Done:**
```
□ Dashboard loads with auth
□ Can create new application
□ Application appears in list
□ Can view application details
□ Can edit application
□ Draft status working
□ Mobile responsive
```

---

### WEEK 4-5: DOCUMENT MANAGEMENT PHASE
**Goal:** Users can upload and manage documents

```
MONDAY: Document Requirements Setup
├─ Seed document requirements
│  ├─ Passport documents
│  ├─ Financial documents
│  ├─ Accommodation documents
│  ├─ Travel documents
│  └─ Miscellaneous documents
├─ Create document checklist display
├─ Show required vs optional
└─ Test seed data

TUESDAY - WEDNESDAY: Upload System
├─ Set up Supabase Storage bucket
├─ Build upload widget
│  ├─ Drag-drop zone
│  ├─ Click to browse
│  ├─ File validation
│  ├─ Progress bar
│  └─ Success/error messages
├─ Build document list view
│  ├─ Table with columns
│  ├─ Download links
│  ├─ Delete with confirmation
│  └─ Reupload option
└─ Connect to API endpoint

THURSDAY: Document Status Tracking
├─ Add document status field
│  ├─ Pending review
│  ├─ Approved
│  ├─ Request info
│  ├─ Rejected
│  └─ Status badges
├─ Track upload date
├─ Store file URL
└─ Email on status change

FRIDAY: Testing & Polish
├─ Test upload functionality
├─ Test file size limits
├─ Test file type validation
├─ Test download/delete
├─ Deploy to preview
```

**Deliverables:**
- ✅ Users can upload documents
- ✅ Documents stored in cloud
- ✅ Document checklist visible
- ✅ Status tracking working

**Definition of Done:**
```
□ Can drag-drop file
□ Can select file to upload
□ File validates (type, size)
□ Progress bar shows
□ Can download uploaded file
□ Can delete document
□ Can reupload if rejected
□ List shows all documents
```

---

### WEEK 5-6: PAYMENT INTEGRATION PHASE
**Goal:** Users can pay for services

```
MONDAY: Flutterwave Setup
├─ Create Flutterwave account
├─ Get API keys
├─ Add to environment variables
├─ Test account connection
└─ Review API documentation

TUESDAY: Checkout Flow
├─ Build /dashboard/applications/[id]/payment
│  ├─ Display pricing
│  ├─ Show breakdown
│  ├─ User email confirmation
│  ├─ Terms agreement
│  └─ "Pay Now" button
├─ Form validation
├─ Error handling
└─ Loading states

WEDNESDAY: Payment Processing
├─ Create payment initiation endpoint
│  ├─ Validate application
│  ├─ Calculate amount
│  ├─ Create payment record
│  ├─ Call Flutterwave API
│  └─ Return payment link
├─ Redirect to Flutterwave
├─ Handle payment success
└─ Handle payment failure

THURSDAY: Webhook & Verification
├─ Create webhook endpoint
│  ├─ Verify webhook signature
│  ├─ Validate amount
│  ├─ Update payment status
│  ├─ Update application status
│  └─ Send confirmation email
├─ Error handling
├─ Logging
└─ Test webhook

FRIDAY: Payment History
├─ Build invoice page
├─ Generate PDF invoice
├─ Show payment history
├─ Test full flow
├─ Deploy to preview
```

**Deliverables:**
- ✅ Users can pay via Flutterwave
- ✅ Payment confirmation received
- ✅ Invoice generated
- ✅ Application status updated

**Definition of Done:**
```
□ Can click "Pay Now"
□ Redirects to Flutterwave checkout
□ Can complete test payment
□ Webhook confirms payment
□ Application status updated
□ Invoice email received
□ Can download invoice
```

---

### WEEK 6-7: NOTIFICATIONS PHASE
**Goal:** Users receive automated notifications

```
MONDAY: Email Templates
├─ Create template designs
│  ├─ Welcome email
│  ├─ Verification email
│  ├─ Document uploaded
│  ├─ Document approved/rejected
│  ├─ Payment receipt
│  └─ Application status updates
├─ Integrate Resend
├─ Test email delivery
└─ Add unsubscribe links

TUESDAY - WEDNESDAY: Notification System
├─ Build notification center
│  ├─ List all notifications
│  ├─ Mark as read/unread
│  ├─ Delete notifications
│  ├─ Filter by type
│  └─ Timestamps
├─ Create notification bell badge
├─ Add unread count
└─ Make responsive

THURSDAY: Automated Emails
├─ Send on sign up
├─ Send on email verify
├─ Send on application submit
├─ Send on document upload
├─ Send on payment received
├─ Send on document status change
└─ Test all flows

FRIDAY: Polish & Testing
├─ Test notification delivery
├─ Test notification display
├─ Test email preferences
├─ Deploy to preview
└─ Monitor delivery rates
```

**Deliverables:**
- ✅ Users receive email notifications
- ✅ Notification center in app
- ✅ Can manage preferences
- ✅ All important events trigger emails

**Definition of Done:**
```
□ Sign up triggers welcome email
□ Document upload triggers notification
□ Document approval sends email
□ Payment confirmed by email
□ Notification bell shows unread count
□ Can mark notification as read
□ Can manage email preferences
```

---

### WEEK 7-8: ADMIN PANEL & TESTING
**Goal:** Staff can review and manage applications

```
MONDAY - TUESDAY: Admin Dashboard
├─ Create /admin/layout
│  ├─ Admin-only access
│  ├─ Admin sidebar
│  ├─ Admin header
│  └─ Role-based routing
├─ Build /admin home
│  ├─ Overview stats
│  ├─ Applications this month
│  ├─ Pending reviews
│  ├─ Recent payments
│  └─ System health
├─ Create user list page
└─ Create settings page

WEDNESDAY: Application Review
├─ Build /admin/applications queue
│  ├─ List all applications
│  ├─ Sort & filter
│  ├─ Search functionality
│  └─ Pagination
├─ Build review interface
│  ├─ View all documents
│  ├─ Document preview
│  ├─ Leave comments
│  ├─ Approve/reject buttons
│  └─ Request more info
├─ Update application status
└─ Send notifications

THURSDAY: Testing & Documentation
├─ Test admin access control
├─ Test all admin functions
├─ Test email notifications from admin actions
├─ Document admin workflows
├─ Create admin user guide
└─ Fix any bugs

FRIDAY: Final Testing & Deployment
├─ Full system testing
│  ├─ Auth flow
│  ├─ Application flow
│  ├─ Payment flow
│  ├─ Admin flow
│  ├─ Email notifications
│  └─ Error handling
├─ Performance testing
├─ Security audit
├─ Deploy to production
└─ Monitor for issues
```

**Deliverables:**
- ✅ Admin panel operational
- ✅ Can review applications
- ✅ Can manage documents
- ✅ System ready for launch

**Definition of Done:**
```
□ Admin can access admin panel
□ Can see all applications
□ Can view documents
□ Can approve/reject documents
□ Can request more info
□ User gets notified of actions
□ Can manage users
□ Can view analytics
□ Entire system tested
```

---

## 🎯 Daily Standup Template

Use this for weekly check-ins:

```
WEEK 3 REPORT (Dashboard Phase)
===================================
✅ COMPLETED
- Dashboard layout built and responsive
- Navigation sidebar working
- Home page with stats displaying
- Application creation form (3/5 steps)

⚠️ IN PROGRESS
- Application form steps 4-5
- Data persistence to database
- Application detail page

❌ BLOCKED
- None

🐛 BUGS
- Mobile sidebar hamburger menu has overlap (will fix Friday)
- Form validation message unclear (update copy)

📊 METRICS
- Code committed: 2,400 lines
- Tests written: 45
- Components created: 8
- API endpoints: 4

📅 NEXT WEEK PLAN
- Complete application form
- Build document management
- Test file uploads

🏁 ESTIMATED % COMPLETE
- Phase 1: 100%
- Phase 2: 75%
```

---

## 📈 Velocity Tracking

Copy this and update weekly:

```
WEEK 1: 12 hours spent
- Supabase setup: 4 hours
- Auth endpoints: 5 hours
- UI components: 3 hours
- Estimated velocity: 32 hours/week

WEEK 2: 14 hours spent
- Signup/login pages: 6 hours
- Email verification: 4 hours
- Testing: 4 hours
- Estimated velocity: 32 hours/week

WEEK 3: __ hours spent
- Estimated velocity: __ hours/week
```

---

## 🚦 Risk Tracking

Monitor these risks throughout:

```
WEEK 1-2
□ Supabase connection issues
□ Email service setup delays
□ Authentication edge cases

WEEK 3-4
□ Database schema issues
□ Form validation complexity
□ Responsive design problems

WEEK 5-6
□ Payment API integration
□ Webhook timeout issues
□ Currency conversion issues

WEEK 7-8
□ Performance under load
□ Security vulnerabilities
□ Last-minute bugs
```

---

## 💪 Motivation Milestones

Celebrate these wins:

```
✅ WEEK 2: First user signs up
   "The system accepts real users!"

✅ WEEK 3: First application created
   "The core feature works!"

✅ WEEK 4: First document uploaded
   "Files are in the cloud!"

✅ WEEK 5: First payment processed
   "Money is coming in!"

✅ WEEK 6: First admin review
   "The staff can work!"

✅ WEEK 7: First complete user journey
   "End-to-end flow is live!"

✅ WEEK 8: LAUNCH DAY 🚀
   "Ailes Global is LIVE!"
```

---

## 📱 Deployment Schedule

```
WEEK 2: Deploy to staging
- Test authentication
- Verify email delivery
- Check performance

WEEK 4: Deploy to staging
- Test applications
- Verify database
- Check response times

WEEK 6: Deploy to staging
- Test payments
- Verify webhooks
- Check error handling

WEEK 8: DEPLOY TO PRODUCTION
- Final verification
- Monitor metrics
- Support standby
```

---

## 🎓 Learning Checkpoints

Ensure you understand:

```
WEEK 1-2: Authentication
□ How Supabase auth works
□ JWT tokens & sessions
□ Middleware in Next.js
□ Email verification flows
□ Password security

WEEK 3-4: Data Management
□ Prisma ORM basics
□ Database relationships
□ API route handlers
□ Form validation with Zod
□ Error handling

WEEK 5-6: Payments & Integration
□ REST APIs (Flutterwave)
□ Webhook security
□ Transaction handling
□ Error recovery
□ Retry logic

WEEK 7-8: System Design
□ Multi-user concurrency
□ File handling at scale
□ Email queue systems
□ Admin permissions
□ Performance monitoring
```

---

**This calendar is a guideline, not a mandate.** Adjust based on your pace and priorities. The key is consistent weekly progress toward the goal.

**Start your sprint: WEEK 1 begins Monday!** 🚀

---

**Last Updated:** May 4, 2026  
**Duration:** 8 weeks  
**Status:** Ready to execute
