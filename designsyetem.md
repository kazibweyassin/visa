# AILES Global — Design System

> **Version 1.0** · Next.js + Tailwind CSS + Framer Motion  
> A warm, airy, editorially-informed design language for a premium Africa-first visa & study abroad platform.

---

## 1. Design Philosophy

AILES Global sits at the intersection of **trust** and **aspiration**. The people using this product are making one of the most important decisions of their lives — crossing borders, pursuing education, building futures. The interface must feel:

- **Calm and confident** — never busy or alarming
- **Premium without being cold** — warmth over sterility
- **Honest and clear** — no dark patterns, no confusion
- **Africa-first** — built for Kampala, Lagos, Nairobi; not a translated European product

The aesthetic direction is **warm editorial minimalism**: generous white space, serif display type, emerald accents, and motion that feels deliberate rather than decorative.

---

## 2. Color Palette

### Core Colors

| Token | Tailwind Class | Hex | Usage |
|---|---|---|---|
| `surface` | `bg-[#faf9f7]` | `#faf9f7` | Page backgrounds |
| `white` | `bg-white` | `#ffffff` | Cards, inputs, panels |
| `ink` | `text-stone-900` | `#1c1917` | Primary text, headings |
| `muted` | `text-stone-500` | `#78716c` | Body copy, descriptions |
| `subtle` | `text-stone-400` | `#a8a29e` | Labels, captions, placeholders |
| `border` | `border-stone-200` | `#e7e5e4` | Default borders |
| `border-light` | `border-stone-100` | `#f5f5f4` | Internal dividers |

### Brand Accent — Emerald

| Token | Tailwind Class | Hex | Usage |
|---|---|---|---|
| `brand` | `bg-emerald-500` | `#10b981` | Primary CTA, active states |
| `brand-dark` | `bg-emerald-600` | `#059669` | Hover state of primary CTA |
| `brand-light` | `bg-emerald-50` | `#ecfdf5` | Success backgrounds, tinted cards |
| `brand-border` | `border-emerald-100` | `#d1fae5` | Accent card borders |
| `brand-text` | `text-emerald-600` | `#059669` | Links, labels, active nav |
| `brand-icon` | `text-emerald-500` | `#10b981` | Icon accents |

### Semantic Colors

| Intent | Background | Border | Text | Usage |
|---|---|---|---|---|
| Success | `bg-emerald-50` | `border-emerald-100` | `text-emerald-700` | Approvals, confirmations |
| Warning | `bg-amber-50` | `border-amber-100` | `text-amber-800` | Embassy notes, advisories |
| Error | `bg-rose-50` | `border-rose-100` | `text-rose-600` | Validation errors |
| Info | `bg-blue-50` | `border-blue-100` | `text-blue-800` | Visa type banners |

### Dark Surface (Hero only)

The hero section uses a dark editorial palette. Do not apply these tokens to light page sections.

| Token | Value | Usage |
|---|---|---|
| `hero-bg` | `#080808` | Hero background |
| `hero-card` | `#0d0d0d` / `bg-white/[0.03]` | Frosted form card |
| `hero-border` | `border-white/10` | Card borders on dark |
| `hero-accent` | `#C8F04A` | Lime-green CTA on dark surfaces |
| `hero-text-muted` | `text-white/45` | Body copy on dark |

---

## 3. Typography

### Font Stack

```css
/* Display / Headings */
font-family: 'Georgia', 'Times New Roman', serif;

/* Body / UI */
font-family: system-ui, -apple-system, sans-serif; /* Tailwind default */
```

> **Rule:** Georgia serif is used exclusively for display headings, hero text, price figures, and reference numbers. All UI chrome (labels, buttons, nav, body copy) uses the system sans stack.

### Scale

| Role | Tailwind | Size | Weight | Font | Usage |
|---|---|---|---|---|---|
| Hero XL | `text-[clamp(3.5rem,8vw,7rem)]` | 56–112px | `font-black` | Serif | Hero headline |
| H1 | `text-4xl` / `text-5xl` | 36–48px | `font-bold` | Serif | Page titles |
| H2 | `text-3xl` / `text-4xl` | 30–36px | `font-bold` | Serif | Section headings |
| H3 | `text-2xl` | 24px | `font-bold` | Serif | Card headings |
| H4 | `text-xl` | 20px | `font-bold` | Serif | Sub-headings |
| Body L | `text-lg` | 18px | `font-normal` | Sans | Lead paragraphs |
| Body | `text-base` / `text-sm` | 14–16px | `font-normal` | Sans | Default body |
| Label | `text-[11px]` | 11px | `font-semibold` | Sans | Form labels (ALL CAPS + tracking) |
| Caption | `text-xs` | 12px | `font-medium` | Sans | Metadata, badges |
| Micro | `text-[10px]` | 10px | `font-bold` | Sans | Overlines (ALL CAPS + wide tracking) |

### Label Convention

All form labels and section overlines follow this pattern:

```tsx
<label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
  Field name
</label>
```

Overline badges (above section headings):

```tsx
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
  Section name
</span>
```

---

## 4. Spacing & Layout

### Base Unit

All spacing follows Tailwind's 4px base unit. Prefer multiples of 4.

### Page Layout

```
max-width: 5xl  (1024px)  — forms, checkers
max-width: 6xl  (1152px)  — standard sections
max-width: 7xl  (1280px)  — full-width hero, nav
```

Horizontal padding:

```
px-5 sm:px-8        — standard sections
px-4 sm:px-6 lg:px-8 — full-page layouts
```

### Section Rhythm

```
py-24 sm:py-32      — major page sections
py-16 sm:py-20      — tighter sections
mb-14               — section header to content gap
mt-8                — heading to form gap
space-y-5           — form field gap
gap-3 / gap-4       — card grid gaps
```

### Card Internal Padding

```
p-8 sm:p-10         — large cards (apply form, hero form)
p-6 sm:p-8          — standard cards
p-5                 — plan cards, stat cards
p-4                 — compact cards, info notes
px-4 py-3           — input fields
px-3 py-2.5         — small info chips
```

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-xl` | 12px | Inputs, selects, small cards |
| `rounded-2xl` | 16px | Standard cards, banners, buttons |
| `rounded-3xl` | 24px | Large feature cards |
| `rounded-full` | 9999px | Pills (nav links, CTA buttons, badges) |
| `rounded-lg` | 8px | Logo marks, icon containers |
| `rounded-md` | 6px | Checkboxes |

> **Rule:** Forms use `rounded-xl`. Feature cards use `rounded-2xl` or `rounded-3xl`. Pill buttons use `rounded-full`. Never mix these within the same card.

---

## 6. Shadows

| Name | Tailwind | Usage |
|---|---|---|
| Card default | `shadow-sm` | Light card lift |
| Card elevated | `shadow-xl shadow-stone-900/5` | Primary feature cards |
| Card hero | `shadow-2xl shadow-black/10` | Dark hero form card |
| CTA primary | `shadow-md shadow-stone-900/20` | Dark CTA button |
| CTA brand | `shadow-md shadow-emerald-500/25` | Emerald submit button |
| Logo mark | `shadow-md shadow-emerald-200` | Brand icon glow |
| Nav scrolled | `shadow-[0_1px_0_0_#e5e7eb,0_4px_24px_-4px_rgba(0,0,0,0.08)]` | Sticky nav |

---

## 7. Components

### 7.1 Buttons

#### Primary (Dark)
Used for "Continue" and navigation progression.

```tsx
<button className="group relative flex items-center gap-2 overflow-hidden rounded-full
  bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white
  shadow-md shadow-stone-900/15 hover:bg-stone-800 transition-colors">
  Label
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  {/* Shine sweep */}
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
    transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10
    to-transparent skew-x-12" />
</button>
```

#### Primary (Brand / Emerald)
Used for final submit, "Apply now", result CTAs.

```tsx
<button className="group flex items-center gap-2 rounded-full
  bg-emerald-500 px-7 py-2.5 text-sm font-bold text-white
  shadow-md shadow-emerald-500/25 hover:bg-emerald-600 transition-all">
  Submit application
  <CheckCircle2 className="h-4 w-4" />
</button>
```

#### Secondary (Outlined)
Used for "Back", secondary actions.

```tsx
<button className="flex items-center gap-2 rounded-full border border-stone-200
  bg-white px-5 py-2.5 text-sm font-medium text-stone-600
  hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50 transition-all">
  <ArrowLeft className="h-4 w-4" />
  Back
</button>
```

#### Ghost
Used in nav, secondary text links.

```tsx
<button className="px-4 py-2 text-sm text-stone-500 hover:text-stone-900
  hover:bg-gray-50 rounded-xl transition-colors">
  Link
</button>
```

#### CTA on Dark (Hero)
Used only on dark hero backgrounds.

```tsx
<button className="group flex items-center gap-3 px-8 py-4
  bg-[#C8F04A] text-black font-bold rounded-full text-sm tracking-wide
  hover:bg-white transition-colors">
  Start application
  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
</button>
```

---

### 7.2 Form Inputs

#### Text Input

```tsx
<input className="w-full rounded-xl border border-stone-200 bg-white
  px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition
  placeholder:text-stone-300
  focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50
  hover:border-stone-300" />
```

#### Select

```tsx
<div className="relative">
  <select className="w-full appearance-none rounded-xl border border-stone-200
    bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition
    focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50
    hover:border-stone-300 pr-9">
    ...
  </select>
  <ChevronDown className="pointer-events-none absolute right-3 top-1/2
    -translate-y-1/2 h-4 w-4 text-stone-400" />
</div>
```

#### Field Wrapper

```tsx
<div className="flex flex-col gap-1.5">
  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
    Field Label
  </label>
  {/* input or select */}
</div>
```

#### Focus Ring
All interactive form controls use this focus style — **never** the default browser ring:

```
focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none
```

---

### 7.3 Cards

#### Standard Card

```tsx
<div className="rounded-3xl border border-stone-200 bg-white
  shadow-xl shadow-stone-900/5 overflow-hidden">
```

#### Stat / Info Card

```tsx
<div className="flex flex-col gap-2 rounded-2xl p-4 bg-stone-50 border border-stone-100">
  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-stone-100">
    <Icon className="h-4 w-4 text-stone-400" />
  </div>
  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">Label</p>
  <p className="text-sm font-bold text-stone-800">Value</p>
</div>
```

Accent variant (emerald tint):

```tsx
<div className="bg-emerald-50 border border-emerald-100">
  <div className="bg-emerald-100"><Icon className="text-emerald-600" /></div>
  <p className="text-stone-400">Label</p>
  <p className="text-emerald-700">Value</p>
</div>
```

#### Plan Selection Card

```tsx
<button className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all duration-200
  ${selected
    ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
    : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
  }`}>
```

#### Info / Alert Banners

```tsx
{/* Warning */}
<div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3">
  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
  <p className="text-xs leading-relaxed text-amber-800">...</p>
</div>

{/* Error */}
<p className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 text-xs font-medium text-rose-600">
  ...
</p>

{/* Info */}
<div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
  <p className="text-sm font-semibold text-blue-800">Visa required</p>
  <p className="text-xs text-blue-600">Type C Schengen</p>
</div>
```

---

### 7.4 Badges & Pills

#### Eyebrow Badge (section label)

```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-white
  border border-stone-200 px-4 py-1.5 text-xs font-semibold
  tracking-widest uppercase text-emerald-600 shadow-sm">
  <Stamp className="h-3.5 w-3.5" />
  Section name
</span>
```

#### Live Indicator (pulsing dot)

```tsx
<span className="flex h-2 w-2 relative">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
</span>
```

#### Trust/Feature Chip

```tsx
<span className="flex items-center gap-1.5 text-xs text-stone-400">
  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
  No credit card
</span>
```

---

### 7.5 Navigation

#### Nav Link (active)

```tsx
<Link className="relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg
  text-gray-900 bg-gray-100">
  {/* Active dot */}
  <motion.span layoutId="active-dot"
    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
</Link>
```

#### Nav Link (default)

```tsx
<Link className="px-3.5 py-2 text-[13.5px] font-medium rounded-lg
  text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150">
```

---

### 7.6 Logo Mark

```tsx
<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500
  flex items-center justify-center shadow-md shadow-emerald-200
  transition-all group-hover:shadow-lg group-hover:scale-105">
  <Globe className="w-4 h-4 text-white" strokeWidth={2.5} />
</div>
```

Paired with wordmark:

```tsx
<div className="flex flex-col leading-none">
  <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">AILES</span>
  <span className="text-[10px] font-medium text-emerald-600 tracking-[0.12em] uppercase">Global</span>
</div>
```

---

## 8. Motion & Animation

All motion uses **Framer Motion**. Follow these principles:

### Entry Animations

```tsx
// Fade + slide up (standard section reveal)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Fade + slide right (form step transition — forward)
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.25 }}

// Hero headline (dramatic reveal)
initial={{ y: "100%" }}
animate={{ y: 0 }}
transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}

// Page load slide down (nav)
initial={{ y: -10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

### Stagger Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
```

### Interactive States

```tsx
// Button press
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Card lift
whileHover={{ y: -2 }}

// Nav logo
className="transition-transform group-hover:scale-105"
```

### Shine Sweep (buttons)

```tsx
<span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
  transition-transform duration-500 bg-gradient-to-r from-transparent
  via-white/10 to-transparent skew-x-12" />
```

### AnimatePresence Usage

Always wrap conditional elements:

```tsx
<AnimatePresence mode="wait">
  {condition && (
    <motion.div
      key="unique-key"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      ...
    </motion.div>
  )}
</AnimatePresence>
```

### Step Progress Pills

```tsx
{steps.map((s) => (
  <motion.div
    key={s}
    animate={{ width: currentStep >= s ? 24 : 8 }}
    className={`h-1.5 rounded-full transition-all duration-300
      ${currentStep >= s ? "bg-emerald-500" : "bg-stone-200"}`}
  />
))}
```

### Timing Reference

| Duration | Use |
|---|---|
| `150ms` | Icon swaps, micro states |
| `200–250ms` | Form step transitions |
| `300ms` | Modal/panel reveals |
| `500ms` | Shine sweeps |
| `600ms` | Standard section entry |
| `900ms` | Hero reveals |

---

## 9. Background Treatments

### Light Page Background

```tsx
{/* Base */}
<div className="bg-[#faf9f7]" />

{/* Dot grid overlay */}
<div className="pointer-events-none absolute inset-0 opacity-[0.35]"
  style={{
    backgroundImage: `radial-gradient(circle, #d6d3ce 1px, transparent 1px)`,
    backgroundSize: "28px 28px"
  }} />

{/* Warm glow bloom */}
<div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px]
  -translate-x-1/2 rounded-full bg-emerald-100/40 blur-[120px]" />
```

### Hero Dark Background

```tsx
{/* Base */}
<div className="bg-[#080808]" />

{/* Grain texture */}
<div className="pointer-events-none absolute inset-0 opacity-[0.035]"
  style={{ backgroundImage: "url('data:image/svg+xml,...')", backgroundSize: "200px" }} />

{/* Glow blobs */}
<div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
  rounded-full bg-[#C8F04A]/5 blur-[140px]" />
<div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px]
  rounded-full bg-[#3b82f6]/6 blur-[120px]" />
```

---

## 10. Icons

Use **Lucide React** exclusively. Standard sizes:

| Context | Size class |
|---|---|
| Nav / inline text | `h-4 w-4` |
| Form field prefix | `h-4 w-4` |
| Card icon | `h-5 w-5` |
| Section hero icon | `h-7 w-7` or `h-8 w-8` |
| Logo mark | `h-4 w-4` (strokeWidth 2.5) |
| Small badge | `h-3.5 w-3.5` |

---

## 11. Tailwind Configuration Notes

Add these custom values to `tailwind.config.js` if not already present:

```js
theme: {
  extend: {
    colors: {
      surface: "#faf9f7",
      hero: {
        bg: "#080808",
        accent: "#C8F04A",
      }
    },
    fontFamily: {
      serif: ["Georgia", "Times New Roman", "serif"],
    },
    backgroundSize: {
      "dot-sm": "28px 28px",
    },
    animation: {
      ticker: "ticker 30s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    },
    keyframes: {
      ticker: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-33.333%)" },
      },
    },
  }
}
```

---

## 12. Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| `sm` | 640px | Stack → 2-col grids, tighter padding |
| `md` | 768px | Mobile menu hidden |
| `lg` | 1024px | Sidebar layouts, full nav |
| `xl` | 1280px | Floating decorative elements visible |

### Mobile Patterns

- Single-column forms, stacked with `gap-5`
- Nav collapses to hamburger at `< lg`
- Mobile menu: slide-down panel (not drawer) for light pages
- Hero CTA duplicated at bottom for mobile with `lg:hidden`
- Stat grids: `grid-cols-1 sm:grid-cols-2`

---

## 13. Accessibility

- All interactive elements have visible focus states (`focus:ring-4 focus:ring-emerald-50`)
- Form labels are always visible (never placeholder-only)
- ARIA labels on icon-only buttons (`aria-label`)
- `aria-expanded` on mobile menu toggle
- `motion.div` animations use `mode="wait"` for proper exit sequencing
- Color is never the sole means of conveying information (icons accompany color states)

---

## 14. Do & Don't

### ✅ Do
- Use Georgia serif for display headings, prices, and reference numbers
- Apply `rounded-full` to pill buttons, `rounded-2xl` to cards
- Use `text-stone-*` for all neutral text (not `gray-*` or `slate-*` on light surfaces)
- Keep the emerald accent as the single dominant brand color
- Add the dot grid + glow bloom to every light-background section
- Wrap all conditional UI in `<AnimatePresence>`
- Use `shadow-sm` on inputs and `shadow-xl shadow-stone-900/5` on feature cards

### ❌ Don't
- Mix `gray-*` and `stone-*` on the same surface
- Use purple, indigo, or pink as accent colors
- Apply the dark hero palette to interior pages
- Use `font-medium` on CTA buttons (use `font-semibold` or `font-bold`)
- Add `outline` or default browser focus rings — always override with `outline-none`
- Use more than 2 type sizes within a single card
- Animate background colors (use opacity/shadow transitions instead)

---

*AILES Global Design System · Maintained alongside the component library · Update this document when new patterns are established.*