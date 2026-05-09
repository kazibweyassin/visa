# Responsive Design Patterns & Standards

This document outlines the responsive design patterns now used throughout Ailes Global for consistent mobile optimization.

## Pattern 1: Responsive Horizontal Padding

```tsx
// Standard responsive padding pattern
className="px-4 sm:px-5 lg:px-8"

// Breakdown:
// Mobile (< 640px):     px-4  = 16px (1rem * 4)
// Tablet (640-1023px):  px-5  = 20px (1rem * 5)
// Desktop (≥ 1024px):   px-8  = 32px (1rem * 8)
```

**Used in:**
- Page containers
- Section padding
- Form containers
- Card containers
- Dashboard sections

## Pattern 2: Responsive Vertical Padding

```tsx
// Progressive vertical spacing
className="py-6 sm:py-8 lg:py-12"

// Breakdown:
// Mobile:   py-6  = 24px
// Tablet:   py-8  = 32px
// Desktop:  py-12 = 48px
```

**Used in:**
- Page sections
- Card padding
- Header spacing
- Footer sections

## Pattern 3: Responsive Grid Gaps

```tsx
// Consistent gap scaling
className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// Gap breakdown:
// Mobile:   gap-4  = 16px (cards stack)
// Tablet:   gap-5  = 20px (2 columns)
// Desktop:  gap-6  = 24px (3 columns)
```

**Used in:**
- Card grids
- Dashboard metrics
- Feature lists
- Pricing cards

## Pattern 4: Responsive Typography

```tsx
// Text size progression
className="text-[13px] sm:text-[14px] lg:text-base"

// Breakdown:
// Mobile:   text-[13px] = 13px (relative to 14px base)
// Tablet:   text-[14px] = 14px (relative to 15px base)
// Desktop:  text-base   = 16px (relative to 16px base)
```

**Standard sizes:**
- Headings: `text-2xl sm:text-3xl lg:text-4xl`
- Body: `text-sm sm:text-base` (inherits responsive base font)
- Small: `text-[11px] sm:text-xs`
- Captions: `text-[9px] sm:text-[10px]`

## Pattern 5: Touch-Friendly Targets

```tsx
// Minimum 44px × 44px for all interactive elements
className="flex items-center justify-center min-h-[44px] px-4 py-3 rounded-lg"

// Applied to:
// - Buttons
// - Menu items
// - Form fields
// - Icon buttons
// - Link areas
```

## Pattern 6: Responsive Grid Columns

```tsx
// Mobile-first grid pattern
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4"

// Breakdown:
// < 640px:     1 column (full width)
// 640-1023px:  2 columns (tablet)
// 1024px+:     3-4 columns (desktop)
```

## Pattern 7: Responsive Navigation

```tsx
// Header/menu responsive pattern
className="flex gap-4 sm:gap-6 lg:gap-8 items-center"

// Combined with text scaling:
className="text-[13px] sm:text-[14px] lg:text-base font-medium"

// And touch targets:
className="px-4 py-3.5 rounded-lg min-h-[44px]"
```

## Pattern 8: Responsive Cards

```tsx
// Card responsive pattern
className="rounded-2xl border p-6 sm:p-8 shadow-sm hover:shadow-md transition"

// Often combined with:
className="grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-3"

// Interior spacing:
className="mb-4 sm:mb-6" // Responsive margins between sections
```

## Global Typography Scaling

The base font size now scales with viewport:

```css
html {
  font-size: 14px;      /* Mobile: < 640px */
}

@media (min-width: 640px) {
  html { font-size: 15px; }  /* Tablet */
}

@media (min-width: 1024px) {
  html { font-size: 16px; }  /* Desktop */
}
```

This means all relative units (`rem`, `em`) scale proportionally:
- `text-base` = 14px on mobile, 15px on tablet, 16px on desktop
- `text-lg` = 15.4px on mobile, 16.5px on tablet, 18px on desktop
- `text-xl` = 17.5px on mobile, 18.75px on tablet, 20px on desktop

## Implementation Checklist

When building new features, apply these patterns:

- [ ] Use responsive padding: `px-4 sm:px-5 lg:px-8`
- [ ] Use responsive gaps: `gap-4 sm:gap-5 lg:gap-6`
- [ ] Use responsive text sizes (inherit from base or explicit)
- [ ] Ensure touch targets ≥ 44px: `min-h-[44px]`
- [ ] Stack grids on mobile: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] Use responsive sections: `py-6 sm:py-8 lg:py-12`
- [ ] Test on 375px (mobile), 640px (tablet), 1024px (desktop)

## Common Anti-Patterns (Avoid)

❌ **Fixed padding everywhere**
```tsx
className="p-8 px-6" // Same on all devices
```

✅ **Responsive padding**
```tsx
className="p-6 sm:p-8 lg:p-10" // Scales with device
```

---

❌ **Large gaps on mobile**
```tsx
className="grid gap-6 grid-cols-3" // Cramped on mobile
```

✅ **Responsive gaps**
```tsx
className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

---

❌ **Fixed text sizes**
```tsx
className="text-lg" // Could be 18px on all devices
```

✅ **Responsive text**
```tsx
className="text-sm sm:text-base lg:text-lg"
```

---

❌ **Small touch targets**
```tsx
className="h-8 px-2" // Only 32px, hard to tap
```

✅ **Accessible touch targets**
```tsx
className="h-10 px-4 min-h-[44px]" // 44px minimum
```

## Testing Responsive Breakpoints

### Mobile (375px - iPhone SE)
- Padding: 16px (px-4)
- Gaps: 16px (gap-4)
- Font size base: 14px
- Grid columns: 1

### Tablet (640px - iPad Mini)
- Padding: 20px (px-5)
- Gaps: 20px (gap-5)
- Font size base: 15px
- Grid columns: 2

### Desktop (1024px+ - Desktop/Large Tablet)
- Padding: 32px (px-8)
- Gaps: 24px (gap-6)
- Font size base: 16px
- Grid columns: 3-4

## Performance Notes

- All patterns use Tailwind CSS utilities (no custom CSS)
- No JavaScript required for responsive behavior
- Media queries are CSS-only (Tailwind-generated)
- No performance overhead
- Built-in Turbopack optimization

---

**Reference**: Apply these patterns to all new features for consistent mobile experience across Ailes Global.
