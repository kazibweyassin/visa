# Ailes Global: Feature Checklist & Roadmap

## Overview

This document breaks down every feature needed to transform from landing page to platform, with detailed checklists for implementation.

---

## PHASE 1: AUTHENTICATION & ONBOARDING

### 1.1 Sign Up Flow
- [ ] Sign up page with email & password
- [ ] Form validation (email format, password strength)
- [ ] Password confirmation field
- [ ] Terms & conditions checkbox
- [ ] ReCAPTCHA for bot prevention
- [ ] Create user in Supabase Auth
- [ ] Create user profile in database
- [ ] Send verification email
- [ ] Error handling (email exists, etc.)
- [ ] Loading states

**Time Estimate:** 6-8 hours  
**Dependencies:** Supabase auth configured

### 1.2 Email Verification
- [ ] Verify email page
- [ ] Verification link sent to email
- [ ] Click link to verify
- [ ] Error if link expired (resend option)
- [ ] Success page redirects to login
- [ ] Resend verification email

**Time Estimate:** 3-4 hours  
**Dependencies:** Resend or similar email service

### 1.3 Login Flow
- [ ] Login page with email & password
- [ ] "Remember me" checkbox
- [ ] Show/hide password toggle
- [ ] Error messages (invalid credentials)
- [ ] Loading state
- [ ] Redirect to dashboard on success
- [ ] Sessions persist on refresh

**Time Estimate:** 4-6 hours  
**Dependencies:** Supabase auth

### 1.4 Password Reset
- [ ] "Forgot password" link
- [ ] Email form
- [ ] Check if email exists
- [ ] Send reset link
- [ ] Reset page with new password form
- [ ] Validate new password
- [ ] Clear old sessions
- [ ] Success confirmation

**Time Estimate:** 4-6 hours  
**Dependencies:** Supabase auth

### 1.5 User Profile Setup
- [ ] Onboarding wizard after sign up
- [ ] Full name field
- [ ] Phone number field
- [ ] Country of residence dropdown
- [ ] Profile photo upload
- [ ] Save preferences
- [ ] Validation on each step
- [ ] Skip option (fill later)

**Time Estimate:** 6-8 hours  
**Dependencies:** Auth working

### 1.6 Middleware & Route Protection
- [ ] Auth middleware created
- [ ] Protected routes redirect to login
- [ ] Public routes accessible
- [ ] Admin routes check role
- [ ] User context available in components
- [ ] Session refresh on page load
- [ ] Logout clears session

**Time Estimate:** 4-6 hours  
**Dependencies:** Supabase auth

---

## PHASE 2: DASHBOARD & APPLICATION MANAGEMENT

### 2.1 Dashboard Home Page
- [ ] Welcome message with user's name
- [ ] Application cards overview
- [ ] Quick stats (total applications, documents, pending)
- [ ] Recent activity timeline
- [ ] Quick action buttons (New Application, View Documents)
- [ ] Empty state if no applications
- [ ] Responsive grid layout
- [ ] Animations on load

**Time Estimate:** 8-10 hours  
**Dependencies:** Auth + Database

### 2.2 Sidebar Navigation
- [ ] Logo and branding
- [ ] Navigation menu items
- [ ] Collapse/expand toggle
- [ ] Active page highlighting
- [ ] User profile dropdown
- [ ] Settings link
- [ ] Logout button
- [ ] Responsive (hamburger on mobile)
- [ ] Icons for each section

**Time Estimate:** 4-6 hours  
**Dependencies:** Reusable component

### 2.3 Header/Topbar
- [ ] Logo/breadcrumb
- [ ] Search bar (optional)
- [ ] Notifications icon with count
- [ ] User menu
- [ ] Dark mode toggle
- [ ] Mobile menu button
- [ ] Sticky positioning

**Time Estimate:** 3-4 hours  
**Dependencies:** Notifications system

### 2.4 Applications List Page
- [ ] Table view of all applications
- [ ] Columns: Destination, Status, Progress, Created, Actions
- [ ] Sort by: Date, Status, Country
- [ ] Filter by: Status, Visa Type, Country
- [ ] Search applications
- [ ] Status badges (Draft, Submitted, etc.)
- [ ] Progress bars
- [ ] View/Edit/Delete action buttons
- [ ] Pagination
- [ ] Empty state

**Time Estimate:** 10-12 hours  
**Dependencies:** Database + API

### 2.5 Create New Application
- [ ] Multi-step form flow
  - [ ] Step 1: Select destination country
  - [ ] Step 2: Select visa type (auto-filtered)
  - [ ] Step 3: Select travel purpose
  - [ ] Step 4: Enter travel dates
  - [ ] Step 5: Review & confirm
- [ ] Validation at each step
- [ ] Back/Next navigation
- [ ] Progress indicator
- [ ] Can save as draft
- [ ] Submit button
- [ ] Success message
- [ ] Redirect to application detail

**Time Estimate:** 12-14 hours  
**Dependencies:** Visa data + form logic

### 2.6 Application Detail Page
- [ ] Full application information
- [ ] Tabs: Overview, Documents, Timeline, Payment
- [ ] Edit basic info
- [ ] Display current status
- [ ] Progress bar
- [ ] Application metadata (created, updated)
- [ ] Support contact info
- [ ] Back to list button

**Time Estimate:** 8-10 hours  
**Dependencies:** Application model

### 2.7 Application Timeline
- [ ] Chronological event list
- [ ] Event types: Created, Status Changed, Document Added, Approved, etc.
- [ ] Timestamps
- [ ] Icons for different event types
- [ ] Notes/comments on events
- [ ] Filter by event type
- [ ] Expandable detail sections

**Time Estimate:** 6-8 hours  
**Dependencies:** Database audit log

---

## PHASE 3: DOCUMENT MANAGEMENT

### 3.1 Document Requirements Checklist
- [ ] Show required documents for visa type
- [ ] Organize by category (Passport, Financial, Accommodation, etc.)
- [ ] Show optional documents
- [ ] Display document descriptions
- [ ] Show required formats
- [ ] Upload status indicator
- [ ] Check/uncheck as uploaded
- [ ] Progress percentage
- [ ] Category collapsible sections

**Time Estimate:** 6-8 hours  
**Dependencies:** Document requirements seed data

### 3.2 Document Upload Widget
- [ ] Drag-and-drop area
- [ ] Click to browse files
- [ ] Show selected file name & size
- [ ] File type validation
- [ ] File size validation (max 10MB)
- [ ] Preview thumbnail (for images)
- [ ] Upload button
- [ ] Progress bar during upload
- [ ] Cancel upload button
- [ ] Success message
- [ ] Error messages with help text

**Time Estimate:** 10-12 hours  
**Dependencies:** File storage configured

### 3.3 Document List View
- [ ] Table of uploaded documents
- [ ] Columns: Name, Type, Size, Uploaded, Status, Actions
- [ ] Download button
- [ ] View/preview button
- [ ] Delete with confirmation
- [ ] Upload date
- [ ] File status badges
- [ ] Reupload option (for rejected)
- [ ] Sort/filter capabilities

**Time Estimate:** 8-10 hours  
**Dependencies:** Upload working

### 3.4 Document Validation
- [ ] File type check (pdf, jpg, png, etc.)
- [ ] File size check (max 10MB)
- [ ] File not empty
- [ ] No duplicates of same requirement
- [ ] Virus scan optional
- [ ] Prevent uploads after submission

**Time Estimate:** 4-6 hours  
**Dependencies:** File upload API

### 3.5 AI Document Audit (Optional but Recommended)
- [ ] Async document analysis
- [ ] Check document quality (clarity, completeness)
- [ ] Validate document type
- [ ] Extract key information
- [ ] Return feedback to user
- [ ] Approval status: Pass/Flag/Fail
- [ ] Actionable recommendations
- [ ] Store audit results

**Time Estimate:** 10-12 hours  
**Dependencies:** Claude API key + setup

### 3.6 Document Status Tracking
- [ ] Pending review
- [ ] Approved
- [ ] Request more info
- [ ] Rejected
- [ ] Show reviewer comments
- [ ] Timestamp of review
- [ ] Option to reupload
- [ ] Email notification on status change

**Time Estimate:** 6-8 hours  
**Dependencies:** Review system in DB

---

## PHASE 4: PAYMENT PROCESSING

### 4.1 Pricing Page
- [ ] Display service fees
- [ ] Per visa type if different
- [ ] Show what's included
- [ ] Clear breakdown: Service fee + payment fee
- [ ] No hidden fees message
- [ ] Comparison table (optional)
- [ ] FAQ section

**Time Estimate:** 4-6 hours  
**Dependencies:** Pricing data structure

### 4.2 Checkout Flow
- [ ] Review selected plan
- [ ] Display total amount
- [ ] User email (auto-filled)
- [ ] Terms & conditions checkbox
- [ ] "Pay Now" button
- [ ] Loading state while processing
- [ ] Error handling

**Time Estimate:** 6-8 hours  
**Dependencies:** Payment provider API

### 4.3 Payment Integration
- [ ] Flutterwave API setup
- [ ] Create payment transaction
- [ ] Generate payment link
- [ ] Redirect to payment gateway
- [ ] Handle payment success
- [ ] Handle payment failure
- [ ] Handle payment cancellation
- [ ] Webhook for async confirmation

**Time Estimate:** 10-12 hours  
**Dependencies:** Flutterwave account + API keys

### 4.4 Payment Verification
- [ ] Webhook endpoint for payment confirmation
- [ ] Verify webhook signature
- [ ] Verify amount matches
- [ ] Verify transaction ID
- [ ] Update payment status in database
- [ ] Update application status
- [ ] Error handling for verification failure
- [ ] Retry logic for failed webhooks

**Time Estimate:** 6-8 hours  
**Dependencies:** Payment integration

### 4.5 Payment History & Invoices
- [ ] List all payments for user
- [ ] Columns: Date, Amount, Status, Invoice
- [ ] Download invoice as PDF
- [ ] Invoice details page
- [ ] Refund request option
- [ ] Transaction ID visible
- [ ] Payment method info

**Time Estimate:** 8-10 hours  
**Dependencies:** Payment model + PDF generation

### 4.6 Invoice Generation
- [ ] Generate PDF invoice
- [ ] Include: Invoice number, date, items, total
- [ ] Company details and logo
- [ ] User details
- [ ] Payment terms
- [ ] Email invoice to user
- [ ] Store PDF in storage
- [ ] Printable format

**Time Estimate:** 6-8 hours  
**Dependencies:** PDF library (jsPDF or similar)

### 4.7 Refund Handling
- [ ] Refund request form
- [ ] Reason field
- [ ] Admin approval workflow
- [ ] Process refund via Flutterwave
- [ ] Email confirmation
- [ ] Status tracking
- [ ] Timeline for refunds

**Time Estimate:** 6-8 hours  
**Dependencies:** Payment provider refund API

---

## PHASE 5: NOTIFICATIONS & COMMUNICATIONS

### 5.1 Email Templates
- [ ] Welcome email (account created)
- [ ] Email verification
- [ ] Password reset
- [ ] Application submitted
- [ ] Document uploaded confirmation
- [ ] Document approved notification
- [ ] Document rejected with reason
- [ ] Document needs more info
- [ ] Payment receipt
- [ ] Application status update
- [ ] Admin contact info
- [ ] Unsubscribe link (all emails)

**Time Estimate:** 8-10 hours  
**Dependencies:** Resend setup

### 5.2 Automated Email Sending
- [ ] Send on signup
- [ ] Send on email verification
- [ ] Send on password reset
- [ ] Send on application submit
- [ ] Send on document upload
- [ ] Send on review status change
- [ ] Send on payment received
- [ ] Scheduled digest emails (optional)
- [ ] Error handling if send fails
- [ ] Retry mechanism

**Time Estimate:** 8-10 hours  
**Dependencies:** Email service + templates

### 5.3 Notification Center
- [ ] In-app notification list
- [ ] Notification types (info, success, warning, error)
- [ ] Timestamps on notifications
- [ ] Mark as read/unread
- [ ] Delete old notifications
- [ ] Filter by type
- [ ] Notification bell with unread count
- [ ] Clear all button
- [ ] Empty state

**Time Estimate:** 8-10 hours  
**Dependencies:** Notification model

### 5.4 Push Notifications (Optional)
- [ ] Install service worker
- [ ] Request browser permission
- [ ] Send on important events
- [ ] Notification click redirects
- [ ] Disable notification option
- [ ] Test on mobile

**Time Estimate:** 6-8 hours  
**Dependencies:** Service worker setup

### 5.5 Email Preferences
- [ ] Notification settings page
- [ ] Toggle for each email type
- [ ] Toggle for in-app notifications
- [ ] Toggle for push notifications
- [ ] Email frequency (daily digest, instant)
- [ ] Timezone setting
- [ ] Save preferences
- [ ] Default to yes for important

**Time Estimate:** 4-6 hours  
**Dependencies:** User preferences model

---

## PHASE 6: ADMIN PANEL

### 6.1 Admin Dashboard
- [ ] Overview stats
  - [ ] Total applications this month
  - [ ] Pending review count
  - [ ] Revenue this month
  - [ ] Conversion rate
- [ ] Recent applications list
- [ ] Recent payments list
- [ ] System health status
- [ ] Quick links to common tasks

**Time Estimate:** 8-10 hours  
**Dependencies:** Analytics data

### 6.2 Application Review Queue
- [ ] All applications list
- [ ] Sort by: Date, Status, Country
- [ ] Filter by: Status (Pending, Approved, etc.), Country, Visa Type
- [ ] Search by application ID or user
- [ ] Batch actions (mark reviewed, etc.)
- [ ] Pagination
- [ ] Click to view details
- [ ] Assign to reviewer (if multi-staff)

**Time Estimate:** 10-12 hours  
**Dependencies:** Admin role + permissions

### 6.3 Application Review Interface
- [ ] Full application details
- [ ] User information
- [ ] All documents with status
- [ ] Document preview (if image)
- [ ] AI audit results
- [ ] Review decision buttons:
  - [ ] Approve application
  - [ ] Request more info
  - [ ] Reject application
- [ ] Comment/note field
- [ ] Save and notify user

**Time Estimate:** 12-14 hours  
**Dependencies:** Document viewing + review model

### 6.4 User Management
- [ ] List all users
- [ ] Sort by: Signup date, email
- [ ] Filter by: Active, inactive, suspended
- [ ] Search by email or name
- [ ] View user profile
- [ ] Edit user info
- [ ] Change user role
- [ ] Suspend/unsuspend user
- [ ] Force logout user
- [ ] View user activity log

**Time Estimate:** 10-12 hours  
**Dependencies:** User model + roles

### 6.5 Document Review Workflow
- [ ] Bulk approve documents
- [ ] Bulk request more info
- [ ] Add generic comments
- [ ] Add specific document comments
- [ ] View all comments on document
- [ ] Mark as priority/flag
- [ ] Assign to team member
- [ ] Track review time

**Time Estimate:** 8-10 hours  
**Dependencies:** Review model

### 6.6 Admin Settings
- [ ] Update pricing
- [ ] Update visa requirements
- [ ] Add new visa types
- [ ] Configure email templates
- [ ] Manage team members (if multi-user)
- [ ] View API keys
- [ ] Logs and activity history
- [ ] Backup options

**Time Estimate:** 10-12 hours  
**Dependencies:** Settings model

### 6.7 Analytics & Reports
- [ ] Total users
- [ ] Applications per month
- [ ] Revenue per month
- [ ] Conversion rate (visitors → applicants)
- [ ] Document approval rate
- [ ] Average processing time
- [ ] Export data as CSV
- [ ] Date range filter
- [ ] Charts (line, bar, pie)

**Time Estimate:** 12-14 hours  
**Dependencies:** Analytics database + charting library

---

## PHASE 7: ADVANCED FEATURES

### 7.1 PDF Export
- [ ] Export full application as PDF
- [ ] Include: User info, application details, documents
- [ ] Professional formatting
- [ ] Logo and branding
- [ ] Digital signature (optional)
- [ ] Timestamp

**Time Estimate:** 6-8 hours  
**Dependencies:** PDF library

### 7.2 Multi-Visa Support
- [ ] Apply for multiple visas simultaneously
- [ ] Track separate applications
- [ ] Share documents across applications
- [ ] Batch operations

**Time Estimate:** 8-10 hours  
**Dependencies:** Application relationships

### 7.3 Client Communication
- [ ] Messaging system
- [ ] Admin sends message
- [ ] User sees notification
- [ ] Archive conversations
- [ ] Attachment support

**Time Estimate:** 12-14 hours  
**Dependencies:** Messaging model

### 7.4 Document Templates
- [ ] Downloadable guides
- [ ] Cover letter templates
- [ ] Document checklists
- [ ] PDF guides for each step

**Time Estimate:** 6-8 hours  
**Dependencies:** File storage

### 7.5 Knowledge Base
- [ ] FAQ page expanded
- [ ] Blog/articles
- [ ] Video tutorials (embedded)
- [ ] Search functionality
- [ ] Categories and tags

**Time Estimate:** 8-10 hours  
**Dependencies:** CMS or database

---

## SUMMARY BY PHASE

| Phase | Features | Estimated Hours | Status |
|-------|----------|-----------------|--------|
| 1 | Auth (6 features) | 30-40 | TODO |
| 2 | Dashboard (7 features) | 50-70 | TODO |
| 3 | Documents (6 features) | 50-70 | TODO |
| 4 | Payments (7 features) | 40-60 | TODO |
| 5 | Notifications (5 features) | 34-50 | TODO |
| 6 | Admin (7 features) | 70-100 | TODO |
| 7 | Advanced (5 features) | 40-60 | TODO |
| **TOTAL** | **43 features** | **314-450 hrs** | **8-12 wks** |

---

## PRIORITY RANKING

### Must Have (Revenue Critical)
1. Sign up / Login
2. Create application
3. Upload documents
4. Process payment
5. Admin review

### High Value
6. Email notifications
7. Application timeline
8. Document status tracking
9. Invoice generation
10. Dashboard overview

### Nice to Have
11. AI document audit
12. PDF export
13. Multi-visa support
14. Messaging system
15. Knowledge base

---

## Completion Tracking

Copy this section and update weekly:

```
WEEK 1:
- [ ] Phase 1.1: Sign up (Done: 8/8)
- [ ] Phase 1.2: Email verification (Done: 3/3)
- [ ] Phase 1.3: Login (Done: 4/6)

WEEK 2:
- [ ] Phase 1.4: Password reset (Done: 0/4)
- [ ] Phase 1.5: Profile setup (Done: 0/8)
- [ ] Phase 1.6: Middleware (Done: 0/6)

WEEK 3:
- [ ] Phase 2.1: Dashboard (Done: 0/8)
- [ ] Phase 2.2: Sidebar (Done: 0/5)
- [ ] Phase 2.3: Header (Done: 0/7)

...etc
```

---

**Last Updated:** May 4, 2026  
**Total Features:** 43  
**Estimated Effort:** 314-450 hours  
**Recommended Timeline:** 8-12 weeks with 1 full-time developer
