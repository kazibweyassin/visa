# Ailes Global: Implementation Quick Start

## 🎯 START HERE

This is your 8-week sprint to transform Ailes Global from a landing page into a full visa processing platform.

---

## 📋 PHASE 1: Authentication (Week 1-2) - START HERE

### Decision: Which Auth Provider?

**RECOMMENDED: Supabase Auth** ✅
- Free tier covers your needs
- Built-in PostgreSQL (you already have Prisma for it)
- Email templates included
- Row-level security available
- No additional database needed

**Alternatives:**
- NextAuth.js (more control, steeper setup)
- Clerk (slick UX, but paid after free tier)

### What You'll Build

```
📁 app/auth/
├── login/
│   ├── page.tsx          (Login form)
│   └── layout.tsx
├── signup/
│   ├── page.tsx          (Sign up form)
│   └── layout.tsx
├── verify-email/
│   ├── page.tsx          (Email verification)
│   └── layout.tsx
└── reset-password/
    ├── page.tsx          (Password reset)
    └── layout.tsx

📁 lib/
├── auth.ts               (Auth utilities)
├── supabase.ts           (Supabase client)
└── middleware.ts         (Protected routes)

📄 middleware.ts          (Root level - auth checks)
```

### Critical Files to Update

1. **`.env.local`** - Add Supabase keys
```env
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

2. **`prisma/schema.prisma`** - Add auth user sync
```prisma
model AuthUser {
  id        String   @id @default(cuid())
  supabaseId String   @unique
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User?
  
  @@map("auth_users")
}
```

3. **`middleware.ts`** - Protect routes
```typescript
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { supabase } = createMiddlewareClient({ req: request, res: NextResponse.next() });
  const { data: { session } } = await supabase.auth.getSession();

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

### This Week's Deliverables
- [ ] Supabase project created and configured
- [ ] Auth middleware in place
- [ ] Login page functional
- [ ] Sign up page functional
- [ ] Email verification working
- [ ] Password reset flow working
- [ ] User data synced to Prisma

### Testing Checklist
```
□ Can sign up with email
□ Verify email works
□ Can login after verification
□ Cannot access /dashboard without login
□ Can reset password
□ Session persists on page refresh
□ Logout clears session
```

---

## 📊 PHASE 2: Dashboard & Applications (Week 2-3)

### What You'll Build

```
📁 app/dashboard/
├── layout.tsx            (Dashboard wrapper)
├── page.tsx              (Home - application list)
├── profile/
│   └── page.tsx          (User profile edit)
└── applications/
    ├── page.tsx          (All applications)
    ├── new/
    │   ├── page.tsx      (Redirect from /apply)
    │   └── layout.tsx
    └── [id]/
        ├── page.tsx      (View application)
        ├── layout.tsx
        └── documents/
            └── page.tsx  (Document management)

📁 components/
├── dashboard/
│   ├── sidebar.tsx       (Navigation)
│   ├── header.tsx        (Top bar)
│   ├── application-card.tsx
│   └── dashboard-stats.tsx
```

### Database Updates

```prisma
// Add to User model
profile User extends previous + {
  lastLoginAt DateTime?
  role String @default("user") // user, admin, support
}

// New model
model DashboardPreferences {
  id String @id @default(cuid())
  userId String @unique
  user User @relation(fields: [userId], references: [id])
  theme String @default("light")
  emailNotifications Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### API Endpoints Needed

```
GET    /api/applications          (List user's applications)
POST   /api/applications          (Create new application)
GET    /api/applications/[id]     (Get details)
PATCH  /api/applications/[id]     (Update)
DELETE /api/applications/[id]     (Soft delete)
GET    /api/user/profile          (Get current user)
PATCH  /api/user/profile          (Update profile)
```

### This Week's Deliverables
- [ ] Dashboard layout with sidebar
- [ ] Application list view
- [ ] Create new application flow
- [ ] View application details
- [ ] User profile page (edit name, phone, etc.)
- [ ] Application status badges working
- [ ] Progress indicators showing

### Testing Checklist
```
□ Dashboard loads only when authenticated
□ Can see empty state when no applications
□ Can create new application
□ Application appears in list
□ Can view application details
□ Can edit profile information
□ Status changes reflect in UI
□ Responsive on mobile
```

---

## 📄 PHASE 3: Documents (Week 3-4)

### What You'll Build

```
📁 app/dashboard/applications/[id]/
├── documents/
│   ├── page.tsx          (Document list & upload)
│   └── [docId]/
│       └── page.tsx      (Document details)

📁 components/modules/
├── document-upload-widget.tsx    (Drag-drop upload)
├── document-list.tsx
├── document-item.tsx
└── upload-progress.tsx

📁 lib/
├── storage.ts            (Supabase Storage client)
└── document-validator.ts (File validation)
```

### Setup Supabase Storage

```bash
# Create bucket in Supabase dashboard
- Name: visa-documents
- Public: false
- Authentication: Private
```

### Storage Path Structure
```
visa-documents/
├── [userId]/
│   ├── [applicationId]/
│   │   ├── [requirementId]/
│   │   │   ├── document-v1.pdf
│   │   │   └── document-v2.pdf (reupload)
```

### Document Requirements Data

```typescript
// lib/document-requirements.ts
export const documentRequirements = {
  schengen: [
    {
      id: "passport",
      category: "passport",
      name: "Valid Passport",
      description: "Must be valid for at least 3 months",
      required: true,
      acceptedFormats: ["pdf", "jpg", "png"],
    },
    {
      id: "financial",
      category: "financial",
      name: "Proof of Financial Means",
      description: "Bank statements for last 3 months",
      required: true,
      acceptedFormats: ["pdf"],
    },
    // ... more documents
  ],
};
```

### API Endpoints

```
POST   /api/documents/upload         (Upload file)
GET    /api/documents/[id]           (Get document details)
DELETE /api/documents/[id]           (Delete document)
POST   /api/ai/audit-document        (Trigger AI review)
GET    /api/requirements              (Get requirement checklist)
```

### Database Updates

```prisma
model UploadedDocument {
  // ... existing fields
  storageUrl String          // s3://bucket/path
  fileSize Int               // bytes
  uploadedAt DateTime @default(now())
  auditStatus String @default("PENDING") // PENDING, APPROVED, NEEDS_INFO, REJECTED
  auditFeedback String?
  auditedAt DateTime?
}
```

### This Week's Deliverables
- [ ] Drag-drop upload widget working
- [ ] File validation (size, type)
- [ ] Storage integration with Supabase
- [ ] Document list with status indicators
- [ ] Download/preview functionality
- [ ] Delete document with confirmation
- [ ] Upload progress showing

### Testing Checklist
```
□ Can drag-drop file
□ Can click to select file
□ Shows progress bar during upload
□ Validates file type
□ Validates file size (e.g., max 10MB)
□ Rejects invalid files with message
□ Shows success after upload
□ Can see uploaded documents in list
□ Can delete document
□ Cannot upload duplicate requirements
```

---

## 💳 PHASE 4: Payments (Week 4-5)

### Decision: Flutterwave vs Paystack

**RECOMMENDED: Flutterwave** ✅
- Better API documentation
- More reliable
- Good support
- Works across all African countries

### What You'll Build

```
📁 app/dashboard/applications/[id]/
└── payment/
    ├── page.tsx          (Payment page)
    └── success/          (Success page)

📁 lib/
└── payment.ts            (Flutterwave client)

📁 app/api/
├── payments/
│   ├── init/route.ts     (Create payment)
│   └── verify/route.ts   (Verify payment)
└── webhooks/
    └── flutterwave/route.ts (Webhook handler)
```

### Setup Flutterwave Account

1. Go to https://dashboard.flutterwave.com
2. Sign up / Login
3. Create API keys
4. Add to `.env.local`:
```env
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=pk_test_xxx
FLUTTERWAVE_SECRET_KEY=sk_test_xxx
FLUTTERWAVE_WEBHOOK_SECRET=whsec_xxx
```

### Payment Flow Implementation

```typescript
// lib/payment.ts
import axios from "axios";

export const initiatePayment = async (
  applicationId: string,
  amount: number,
  userEmail: string,
  userName: string
) => {
  const response = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    {
      tx_ref: `APP-${applicationId}-${Date.now()}`,
      amount,
      currency: "USD", // or your currency
      customer: {
        email: userEmail,
        name: userName,
      },
      customizations: {
        title: "Ailes Global - Visa Service",
        description: "Visa application processing fee",
        logo: "https://ailesglobal.com/logo.png",
      },
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}/payment/success`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  return response.data.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  return response.data.data;
};
```

### Webhook Handler

```typescript
// app/api/webhooks/flutterwave/route.ts
import { verifyPayment } from "@/lib/payment";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  
  // Verify webhook signature
  const hash = crypto
    .createHmac("sha256", process.env.FLUTTERWAVE_WEBHOOK_SECRET!)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash !== request.headers.get("verif-hash")) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { event, data } = body;

  if (event === "charge.completed") {
    const transaction = await verifyPayment(data.id);

    if (transaction.status === "successful") {
      // Find application by tx_ref
      const [appId] = transaction.tx_ref.split("-");

      await prisma.application.update({
        where: { id: appId },
        data: { status: "DOCUMENTS_READY" },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          applicationId: appId,
          amount: transaction.amount,
          currency: transaction.currency,
          status: "COMPLETED",
          transactionId: transaction.id,
          reference: transaction.tx_ref,
        },
      });

      // Send confirmation email
      // TODO: Call email service
    }
  }

  return Response.json({ success: true });
}
```

### Database Updates

```prisma
model Payment {
  id String @id @default(cuid())
  applicationId String
  application Application @relation(fields: [applicationId], references: [id])
  
  amount Float
  currency String @default("USD")
  status String @default("PENDING") // PENDING, COMPLETED, FAILED, REFUNDED
  
  transactionId String @unique
  reference String // tx_ref from Flutterwave
  
  createdAt DateTime @default(now())
  completedAt DateTime?
  
  @@index([applicationId])
  @@map("payments")
}

model Invoice {
  id String @id @default(cuid())
  paymentId String @unique
  payment Payment @relation(fields: [paymentId], references: [id])
  
  invoiceNumber String @unique
  url String // PDF URL
  
  createdAt DateTime @default(now())
  
  @@map("invoices")
}
```

### This Week's Deliverables
- [ ] Flutterwave account created
- [ ] Environment variables configured
- [ ] Payment initiation endpoint working
- [ ] Payment verification endpoint working
- [ ] Webhook handler processing payments
- [ ] Payment page showing amount
- [ ] Success page after payment
- [ ] Invoice generation basic

### Testing Checklist
```
□ Can click "Pay Now"
□ Redirects to Flutterwave checkout
□ Can complete test payment
□ Webhook receives callback
□ Application status updated to DOCUMENTS_READY
□ User sees success message
□ Can download invoice
□ Failed payment shows error
```

---

## 📧 PHASE 5: Notifications (Week 5)

### Setup Resend

1. Go to https://resend.com
2. Sign up
3. Create API key
4. Add to `.env.local`:
```env
RESEND_API_KEY=re_xxx
```

### Email Templates

```typescript
// lib/email-templates.ts
export const templates = {
  welcomeEmail: (name: string, email: string) => ({
    to: email,
    subject: "Welcome to Ailes Global!",
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Your visa journey starts here.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">
        Go to Dashboard
      </a>
    `,
  }),

  documentUploaded: (applicationId: string, documentName: string) => ({
    subject: `Document Uploaded: ${documentName}`,
    html: `
      <p>Your document "${documentName}" has been uploaded successfully.</p>
      <p>Status: Under Review</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}">
        View Application
      </a>
    `,
  }),

  documentApproved: (applicationId: string, documentName: string) => ({
    subject: `Document Approved: ${documentName}`,
    html: `
      <p>Great news! Your "${documentName}" has been approved.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}">
        View Application
      </a>
    `,
  }),

  paymentConfirmation: (invoiceUrl: string, amount: number) => ({
    subject: "Payment Confirmed",
    html: `
      <p>Thank you for your payment of $${amount}.</p>
      <a href="${invoiceUrl}">Download Invoice</a>
    `,
  }),

  applicationSubmitted: (applicationId: string) => ({
    subject: "Application Submitted",
    html: `
      <p>Your visa application has been submitted successfully.</p>
      <p>We'll review it and notify you of any updates.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}">
        Track Status
      </a>
    `,
  }),
};
```

### Email Service

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const result = await resend.emails.send({
      from: "noreply@ailesglobal.com",
      to,
      subject,
      html,
    });

    return result;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};
```

### Notification Center

```typescript
// lib/notifications.ts
import { prisma } from "./prisma";

export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  link?: string
) => {
  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      link,
      read: false,
    },
  });
};
```

### Database Updates

```prisma
model Notification {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type String // document_approved, payment_received, etc.
  title String
  message String
  link String?
  
  read Boolean @default(false)
  readAt DateTime?
  
  createdAt DateTime @default(now())
  
  @@index([userId, read])
  @@map("notifications")
}
```

### This Week's Deliverables
- [ ] Resend API integrated
- [ ] Welcome email sent on sign up
- [ ] Document upload confirmation sent
- [ ] Document approval email sent
- [ ] Payment confirmation with invoice
- [ ] Notifications table created
- [ ] Notification center page built
- [ ] Unread count badge showing

### Testing Checklist
```
□ Sign up triggers welcome email
□ Upload document triggers notification email
□ Mark notification as read
□ See notification center with history
□ Filter notifications by type
□ Delete old notifications
```

---

## 👥 PHASE 6: Admin Panel (Week 6)

### Admin Features

```
/admin/
├── page.tsx              (Dashboard)
├── applications/
│   ├── page.tsx          (Queue)
│   └── [id]/
│       ├── page.tsx      (Details)
│       └── review/
│           └── page.tsx  (Review interface)
├── users/
│   ├── page.tsx          (User list)
│   └── [id]/
│       └── page.tsx      (User details)
└── settings/
    └── page.tsx          (Admin settings)
```

### Admin Middleware

```typescript
// lib/admin-middleware.ts
import { prisma } from "./prisma";

export const requireAdmin = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return user;
};
```

### This Week's Deliverables
- [ ] Admin layout with navigation
- [ ] Application queue view
- [ ] Search and filter applications
- [ ] Document review interface
- [ ] Approve/reject documents
- [ ] Add reviewer comments
- [ ] User management table
- [ ] Analytics dashboard basic

### Testing Checklist
```
□ Only admins can access /admin
□ Can see all applications in queue
□ Can filter by status/country
□ Can view documents
□ Can approve document
□ Can request more info
□ Can reject with comments
□ User gets notified of actions
```

---

## 🚀 SUCCESS METRICS BY WEEK

| Week | Target | Metric |
|------|--------|--------|
| 2 | Auth Complete | 5+ users can sign up |
| 3 | Dashboard Live | Users can create applications |
| 4 | Documents Working | Documents upload to storage |
| 5 | Payments Live | Test payment succeeds |
| 5 | Emails Sending | Notifications received |
| 6 | Admin Ready | Admin can review applications |

---

## 📚 USEFUL RESOURCES

### Supabase
- https://supabase.com/docs/guides/auth/auth-helpers/nextjs
- https://supabase.com/docs/guides/storage

### Flutterwave
- https://developer.flutterwave.com/docs/integration-guides/web
- https://developer.flutterwave.com/reference

### Resend
- https://resend.com/docs

### Next.js
- https://nextjs.org/docs/app/building-your-application/authentication
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## ⚠️ COMMON PITFALLS TO AVOID

1. **Don't commit API keys** - Use `.env.local` and `.gitignore`
2. **Don't trust client data** - Always validate on backend
3. **Don't forget CORS** - Configure if frontend ≠ backend
4. **Don't hardcode URLs** - Use environment variables
5. **Don't skip database migrations** - Test schema changes
6. **Don't forget error handling** - Try-catch on all API calls
7. **Don't make payments synchronous** - Use webhooks

---

**Ready to start? Begin with Phase 1 this week!** 🚀
