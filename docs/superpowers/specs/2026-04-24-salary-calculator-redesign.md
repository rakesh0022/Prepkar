# Salary Calculator Redesign — Design Spec
**Date:** 2026-04-24  
**Status:** Approved  
**Page:** `/salary-calculator`

---

## Overview

Full redesign of the salary calculator from a basic form into a premium, mobile-first wizard with animated salary reveal, comparison widget, 30-year growth chart, and a shareable salary card. Dark Hero aesthetic (deep navy, glassy cards, neon-green salary figures).

---

## Design Decisions (Approved)

| Decision | Choice |
|---|---|
| Color theme | Dark Hero — navy `#0F2440` / `#0B1120`, glassy cards, `#34D399` green for salary |
| Job card layout | Large full-width rows: icon + name + category badge + starting basic pay on the right |
| Salary reveal | B's hero banner (big number + mini donut) + A's stacked breakdown below |

---

## Architecture

### File structure

```
src/
  app/salary-calculator/
    page.tsx                  (server component — metadata only, unchanged)
  components/salary/
    SalaryWizard.tsx           (root client component — replaces SalaryCalculator.tsx)
    WizardProgress.tsx         (sticky step dots)
    steps/
      JobStep.tsx              (step 1 — job selection cards)
      CityStep.tsx             (step 2 — X/Y/Z city cards)
      ExperienceStep.tsx       (step 3 — milestone slider)
    reveal/
      SalaryRevealHero.tsx     (hero banner: job badge + big green number + mini donut)
      SalaryBreakdown.tsx      (line-by-line add/deduct rows + net total)
      SalaryComparison.tsx     (govt vs private comparison widget)
      GrowthChart.tsx          (30-year Recharts line chart)
    share/
      ShareButton.tsx          (captures card via html2canvas, opens share sheet)
      ShareCard.tsx            (the portrait card that gets captured)
  lib/
    salary.ts                  (pure calculation functions + types)
  data/
    salary-data.json           (existing — unchanged structure, DA rate confirmed 50%)
```

The existing `SalaryCalculator.tsx` stays in place but is no longer used by the page — `SalaryWizard.tsx` replaces it. `SalaryCalculator.tsx` can be deleted after the new component is confirmed working.

---

## Wizard Flow

Three full-screen steps, one at a time. Forward-only navigation with a "Back" link in the progress bar. No step is skippable.

### Step 1 — "Choose Your Dream Job"

- Sticky progress bar at top: 3 dots (active = wide blue pill, done = wide green pill, future = narrow grey)
- Heading: "Choose Your Dream Job"
- Full-width job cards, vertically stacked, scrollable:
  - Left: large emoji icon (28px) + job name + category badge (color-coded) + exam/pay scale sub-label
  - Right: starting basic pay in `#34D399` + "basic/mo" label
  - Selected state: blue glow border + `rgba(37,99,235,0.15)` background
  - Category badge colors: UPSC=purple, Banking=teal, SSC=amber, Railway=red, Defence=blue
- Tapping a card immediately advances to Step 2 (no separate "Next" button)

**Job list order (10 posts):**
1. 🏛️ IAS Officer — UPSC — Pay Level 10 — ₹56,100
2. 🏦 SBI PO — Banking — JMGS-I — ₹36,000
3. 🏛️ RBI Grade B — Banking — Grade B — ₹55,220
4. 📊 SSC CGL — Income Tax Inspector — SSC — Pay Level 7 — ₹44,900
5. 📋 SSC CGL — Auditor — SSC — Pay Level 6 — ₹35,400
6. 📄 SSC CHSL — SSC — Pay Level 2 — ₹19,900
7. 🚂 RRB NTPC — Railway — Pay Level 5 — ₹19,900
8. 🛡️ NDA — Defence — Pay Level 10 — ₹56,100
9. 👮 Delhi Police Constable — Defence — Pay Level 3 — ₹21,700
10. 🏛️ IBPS PO — Banking — JMGS-I — ₹36,000

### Step 2 — "Where will you be posted?"

- 3 large tap cards in a row grid:
  - X City (🌆): Delhi, Mumbai, Chennai, Kolkata, Hyderabad, Bangalore — **30% HRA**
  - Y City (🏙️): Pune, Jaipur, Lucknow, Surat, Patna, Kochi — **20% HRA**
  - Z City (🏘️): All other cities & towns — **10% HRA**
- Each card: icon + label + example cities (2 lines, small) + HRA badge in green
- Selected card: blue glow border
- Tapping advances to Step 3

### Step 3 — "Years of Experience"

- Milestone row: Fresh → 3 yrs → 7 yrs → 14 yrs → 20 yrs → 30 yrs
  - Each milestone is a dot; active dot = blue with ring glow
- Draggable range slider underneath — snaps to milestone breakpoints from `afterIncrements` keys
- Live preview below slider: "Basic pay at this level: ₹XX,XXX/mo" (updates as slider moves)
- "Calculate My Salary →" CTA button advances to the reveal

---

## Salary Reveal

Animated entry: hero banner fades + slides up, then each breakdown row staggered in.

### Hero Banner (top)

```
┌─────────────────────────────────────────────────┐
│  [🏛️ IAS Officer · Delhi · Fresh]     📍 X City │
│                                                   │
│  In-Hand / Month          [donut chart — tap]    │
│  ₹98,770  ←— count-up animation                 │
│  After NPS & deductions                          │
└─────────────────────────────────────────────────┘
```

- Background: `linear-gradient(135deg, #0F2440, #162D50)`
- Main number animates from 0 → final value over ~1.2s (CSS counter or `requestAnimationFrame`)
- Mini donut (72px): slices animate in sequentially, color-coded to legend

### Salary Breakdown (below hero)

Two sections separated by a label:

**Salary Components:**
- Basic Pay — green row
- DA (50% of basic) — green row
- HRA (30%/20%/10% depending on city) — green row
- Transport Allowance (₹3,600 metro / ₹1,800 non-metro) — green row
- **Gross Salary** — neutral highlighted row (bold)

**Deductions:**
- NPS Contribution (10% of basic) — red row
- Professional Tax (₹200 flat) — red row

**NET IN-HAND** — green bold row, larger font

### Donut Chart

- Rendered with Recharts `PieChart` with `innerRadius`
- Slices: Basic Pay (blue), DA (green), HRA (amber), TA (purple), Deductions (red)
- `animationBegin={0}` + `animationDuration={1200}` for sequential reveal
- Tapping a slice shows a tooltip with label + value
- Legend strip below with colored dots

---

## Salary Comparison Widget

Card below the breakdown, separated by a section label "Govt vs Private Sector":

```
┌───────────────────────────────────┐
│   Govt In-Hand    │  Equiv. CTC   │
│   ₹98,770/mo      │  24.8 LPA     │
├───────────────────────────────────┤
│  Hidden perks value: +₹7,200/mo   │
│  (housing + CGHS + pension)       │
├───────────────────────────────────┤
│  Private needs ₹29.6 LPA to match │
└───────────────────────────────────┘
```

**Perks valuation logic:**
- Housing: use `housingValue` from `salary-data.json` (post-specific)
- CGHS / Medical: fixed ₹1,500/mo (conservative estimate)
- Pension (NPS + gratuity certainty): fixed ₹1,200/mo
- Job security premium: fixed ₹2,000/mo
- Total perks/mo = housing + 1500 + 1200 + 2000

**Private CTC calculation:**
- Monthly take-home equivalent = in-hand + perks/mo
- Annual = × 12
- CTC grossed up: assume 70% of CTC reaches take-home → CTC = annual ÷ 0.70

---

## 30-Year Growth Chart

Recharts `LineChart`, responsive, touch-friendly.

- X-axis: Year 0 → 30 (milestone breakpoints from data)
- Y-axis: Monthly in-hand salary (₹)
- Two lines:
  - **Govt** (blue `#2563EB`): reads directly from `afterIncrements` in salary-data.json, recalculates in-hand at each milestone
  - **Private** (purple `#8B5CF6`): modeled as 8% annual growth from equivalent private starting salary
- Dots at each data point, hover/tap shows tooltip with year + salary
- Post-retirement marker at year 30: pension estimate shown as dashed horizontal line
- `ResponsiveContainer` wraps the chart for mobile

**Pension estimate:** 50% of last drawn basic pay (NPS approximation, labelled as estimate).

---

## Share Feature

### Share Button

```
[📤 Share My Salary Card]
```

Full-width, blue gradient button below the charts.

### Share Card (captured by html2canvas)

Portrait card (360×540px logical), rendered as a hidden off-screen `div`, then captured:

```
┌────────────────────────────────┐
│  NAUKRI YATRA · SALARY CALC    │  ← small label
│                                │
│  🏛️ IAS Officer                │
│  Delhi (X City) · Fresh Joiner │
│                                │
│  ₹98,770                       │  ← large green
│  in-hand per month             │
│                                │
│  ┌────────┬────────┬────────┐  │
│  │₹1.04L  │24.8LPA │  50%  │  │
│  │ Gross  │Eq.CTC  │  DA   │  │
│  └────────┴────────┴────────┘  │
│                                │
│  prepkar.vercel.app/salary-    │
│  calculator                    │
└────────────────────────────────┘
```

Background: `linear-gradient(135deg, #0F2440, #162D50, #0B1120)`  
After capture: `navigator.share()` with the image blob if Web Share API Level 2 is available (Chrome Android, Safari iOS 15+). Falls back to a `<a download="salary-card.png">` programmatic click on desktop or unsupported browsers.

---

## Calculations — 7th CPC Formula

All calculation logic lives in `src/lib/salary.ts` as pure functions.

```typescript
type SalaryResult = {
  basicPay: number;
  da: number;         // 50% of basic
  hra: number;        // 30/20/10% of basic by city
  ta: number;         // 3600 metro / 1800 non-metro
  gross: number;      // basic + da + hra + ta
  npsDeduction: number;     // 10% of basic
  professionalTax: number;  // 200 flat
  totalDeductions: number;
  netInHand: number;  // gross - totalDeductions
  perksMonthly: number;
  privateCTCEquiv: number;  // annual LPA
};
```

**DA rate:** 50% (current rate as of Jan 2026 — hardcoded in `salary-data.json`, easy to update)  
**TA:** ₹3,600 for X-city posts (metro), ₹1,800 for Y/Z-city posts (non-metro). Note: current code uses `xCity → metro`, `yCity/zCity → nonMetro` which is correct.  
**NPS:** 10% of **basic pay only** (not gross) — current code is correct.  
**Professional Tax:** ₹200 flat — correct.  
**CGHS deduction:** Currently not deducted (it's a perk, not a salary deduction) — keep as-is.

---

## Dependencies to Install

```bash
npm install recharts html2canvas
```

(`html2canvas` ships with its own TypeScript types since v1.x — no separate `@types` package needed.)

Framer Motion is **not** used — animations are CSS (`@keyframes`, `transition`) and Recharts' built-in `animationBegin`/`animationDuration`. This avoids a heavy dependency for what amounts to a few transitions.

---

## Mobile Considerations

- Wizard steps are full-screen (min-height: 100dvh minus sticky bar)
- Job cards: `min-height: 64px`, large enough for finger tap
- Slider thumb: `width: 28px; height: 28px` for easy drag on mobile
- Charts: `ResponsiveContainer width="100%"` — never fixed-width
- Share card: portrait orientation (360×540), optimised for WhatsApp crop

---

## What Is NOT in Scope

- Cutoff section redesign (separate feature, separate spec)
- Login / auth changes
- Any changes to other pages
- Saving/history of past calculations
