# Salary Calculator Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the basic salary form at `/salary-calculator` with a 3-step Dark Hero wizard featuring an animated salary reveal, govt-vs-private comparison widget, 30-year growth chart, and a shareable portrait salary card.

**Architecture:** Three wizard steps (job → city → experience) feed into a results page that computes salary on the fly from pure functions in `src/lib/salary.ts`. All new UI lives under `src/components/salary/`; the existing page.tsx metadata is kept and only its JSX import changes.

**Tech Stack:** Next.js 16 (App Router, "use client" boundary at SalaryWizard), React 19, Tailwind CSS v4, TypeScript strict, Recharts (donut + line charts), html2canvas (share card capture), Vitest (unit tests for calculation logic).

---

## File Map

| Path | Status | Responsibility |
|---|---|---|
| `src/lib/salary.ts` | **Create** | Pure calculation functions + all exported types |
| `src/lib/salary.test.ts` | **Create** | Vitest unit tests for salary.ts |
| `vitest.config.ts` | **Create** | Vitest config with `@/` alias |
| `src/components/salary/SalaryWizard.tsx` | **Create** | Root "use client" orchestrator — step state machine |
| `src/components/salary/WizardProgress.tsx` | **Create** | Sticky step-dots bar + back chevron |
| `src/components/salary/steps/JobStep.tsx` | **Create** | Step 1 — full-width job cards with salary teaser |
| `src/components/salary/steps/CityStep.tsx` | **Create** | Step 2 — X/Y/Z city tap cards |
| `src/components/salary/steps/ExperienceStep.tsx` | **Create** | Step 3 — milestone snap slider + CTA |
| `src/components/salary/reveal/SalaryRevealHero.tsx` | **Create** | Hero banner: count-up number + mini Recharts donut |
| `src/components/salary/reveal/SalaryBreakdown.tsx` | **Create** | Color-coded add/deduct rows + net total |
| `src/components/salary/reveal/SalaryComparison.tsx` | **Create** | Govt vs private two-column widget |
| `src/components/salary/reveal/GrowthChart.tsx` | **Create** | 30-year Recharts LineChart, responsive |
| `src/components/salary/share/ShareCard.tsx` | **Create** | Off-screen portrait card (captured by html2canvas) |
| `src/components/salary/share/ShareButton.tsx` | **Create** | Triggers capture → navigator.share() or download |
| `src/app/salary-calculator/page.tsx` | **Modify** | Swap `<SalaryCalculator>` → `<SalaryWizard>` |

---

## Task 1: Install Dependencies + Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install runtime deps**

```bash
cd E:/Rakesh/prepkar
npm install recharts html2canvas
```

Expected: both packages appear in `node_modules/`. No errors.

- [ ] **Step 2: Install vitest**

```bash
npm install --save-dev vitest @vitejs/plugin-react
```

- [ ] **Step 3: Create vitest.config.ts**

```typescript
// vitest.config.ts  (project root)
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: { environment: 'node' },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
});
```

- [ ] **Step 4: Add test script to package.json**

Open `package.json`. Add `"test": "vitest run"` inside `"scripts"`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run"
}
```

- [ ] **Step 5: Smoke-test the setup**

Create a throwaway test to confirm vitest resolves `@/`:

```typescript
// src/lib/smoke.test.ts
import { describe, it, expect } from 'vitest';
import salaryData from '@/data/salary-data.json';

describe('vitest setup', () => {
  it('resolves @/ alias', () => {
    expect(salaryData.posts.length).toBeGreaterThan(0);
  });
});
```

Run: `npm test`
Expected: `1 passed`

- [ ] **Step 6: Delete the throwaway test**

```bash
rm src/lib/smoke.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "chore: add recharts, html2canvas, vitest"
```

---

## Task 2: Calculation Library (`salary.ts`)

**Files:**
- Create: `src/lib/salary.ts`
- Create: `src/lib/salary.test.ts`

- [ ] **Step 1: Write the failing tests first**

```typescript
// src/lib/salary.test.ts
import { describe, it, expect } from 'vitest';
import {
  getBasicPay,
  calculateSalary,
  calculateComparison,
  calculateGrowthData,
} from './salary';
import salaryData from '@/data/salary-data.json';

const IAS = salaryData.posts.find((p) => p.id === 'ias-officer')!;
const SBI = salaryData.posts.find((p) => p.id === 'sbi-po')!;
const { allowances, deductions } = salaryData;

describe('getBasicPay', () => {
  it('returns entry pay at 0 years', () => {
    expect(getBasicPay(IAS, 0)).toBe(56100);
  });
  it('returns 3-year increment', () => {
    expect(getBasicPay(IAS, 3)).toBe(67700);
  });
  it('falls back to highest available key when exact key missing', () => {
    // SBI PO has no 30years key — should return 20years value
    expect(getBasicPay(SBI, 30)).toBe(63840);
  });
});

describe('calculateSalary — IAS, X city, 0 years', () => {
  const r = calculateSalary(IAS, 'xCity', 0, allowances, deductions);
  it('basic pay', () => expect(r.basicPay).toBe(56100));
  it('DA at 50%', () => expect(r.da).toBe(28050));
  it('HRA at 30%', () => expect(r.hra).toBe(16830));
  it('TA metro', () => expect(r.ta).toBe(3600));
  it('gross', () => expect(r.gross).toBe(104580));
  it('NPS 10% of basic only', () => expect(r.npsDeduction).toBe(5610));
  it('professional tax flat 200', () => expect(r.professionalTax).toBe(200));
  it('net in-hand', () => expect(r.netInHand).toBe(98770));
});

describe('calculateSalary — Z city uses lower HRA + non-metro TA', () => {
  const r = calculateSalary(IAS, 'zCity', 0, allowances, deductions);
  it('HRA 10%', () => expect(r.hra).toBe(5610));
  it('TA non-metro', () => expect(r.ta).toBe(1800));
});

describe('calculateComparison', () => {
  const salary = calculateSalary(IAS, 'xCity', 0, allowances, deductions);
  const cmp = calculateComparison(IAS, salary);
  it('perks = housing + 1500 + 1200 + 2000', () =>
    expect(cmp.perksMonthly).toBe(50000 + 1500 + 1200 + 2000));
  it('privateCTCEquiv is a positive number in LPA', () =>
    expect(cmp.privateCTCEquiv).toBeGreaterThan(10));
});

describe('calculateGrowthData', () => {
  const salary = calculateSalary(IAS, 'xCity', 0, allowances, deductions);
  const cmp = calculateComparison(IAS, salary);
  const data = calculateGrowthData(IAS, 'xCity', allowances, deductions, cmp.privateCTCEquiv);
  it('returns 6 milestone points', () => expect(data).toHaveLength(6));
  it('govt salary at year 0 matches fresh in-hand', () =>
    expect(data[0].govt).toBe(Math.round(salary.netInHand)));
  it('govt salary grows over time', () =>
    expect(data[5].govt).toBeGreaterThan(data[0].govt));
  it('private salary grows at ~8% pa', () =>
    expect(data[1].private).toBeGreaterThan(data[0].private));
});
```

- [ ] **Step 2: Run — confirm all tests FAIL**

```bash
npm test
```

Expected: multiple errors like `Cannot find module './salary'`.

- [ ] **Step 3: Create salary.ts**

```typescript
// src/lib/salary.ts
import salaryData from '@/data/salary-data.json';

export type CityType = 'xCity' | 'yCity' | 'zCity';
export type ExperienceYear = 0 | 3 | 7 | 14 | 20 | 30;

export type Post = (typeof salaryData.posts)[number];
export type Allowances = typeof salaryData.allowances;
export type Deductions = typeof salaryData.deductions;

export interface SalaryResult {
  basicPay: number;
  da: number;
  hra: number;
  ta: number;
  gross: number;
  npsDeduction: number;
  professionalTax: number;
  totalDeductions: number;
  netInHand: number;
}

export interface ComparisonResult extends SalaryResult {
  perksMonthly: number;
  totalEquivalentMonthly: number;
  privateCTCEquiv: number;
}

export interface GrowthDataPoint {
  year: number;
  govt: number;
  private: number;
}

const MILESTONES_DESC = [30, 20, 14, 7, 3] as const;

export function getBasicPay(post: Post, experience: ExperienceYear): number {
  if (experience === 0) return post.basicPay.entry;
  for (const m of MILESTONES_DESC) {
    if (experience >= m) {
      const val = (post.basicPay.afterIncrements as Record<string, number>)[`${m}years`];
      if (val !== undefined) return val;
    }
  }
  return post.basicPay.entry;
}

export function calculateSalary(
  post: Post,
  cityType: CityType,
  experience: ExperienceYear,
  allowances: Allowances,
  deductions: Deductions,
): SalaryResult {
  const basicPay = getBasicPay(post, experience);
  const da = Math.round((basicPay * allowances.da) / 100);
  const hra = Math.round((basicPay * (allowances.hra as Record<string, number>)[cityType]) / 100);
  const ta = cityType === 'xCity' ? allowances.ta.metro : allowances.ta.nonMetro;
  const gross = basicPay + da + hra + ta;
  const npsDeduction = Math.round((basicPay * deductions.nps) / 100);
  const professionalTax = deductions.professionalTax;
  const totalDeductions = npsDeduction + professionalTax;
  const netInHand = gross - totalDeductions;
  return { basicPay, da, hra, ta, gross, npsDeduction, professionalTax, totalDeductions, netInHand };
}

const PERKS_FIXED = { cghs: 1500, pension: 1200, jobSecurity: 2000 } as const;

export function calculateComparison(post: Post, salary: SalaryResult): ComparisonResult {
  const housingValue = (post.perks as Record<string, unknown>).housingValue as number ?? 0;
  const perksMonthly = housingValue + PERKS_FIXED.cghs + PERKS_FIXED.pension + PERKS_FIXED.jobSecurity;
  const totalEquivalentMonthly = salary.netInHand + perksMonthly;
  const privateCTCEquiv = parseFloat(((totalEquivalentMonthly * 12) / 100000 / 0.7).toFixed(1));
  return { ...salary, perksMonthly, totalEquivalentMonthly, privateCTCEquiv };
}

export const EXPERIENCE_MILESTONES: ExperienceYear[] = [0, 3, 7, 14, 20, 30];

export function calculateGrowthData(
  post: Post,
  cityType: CityType,
  allowances: Allowances,
  deductions: Deductions,
  privateStartCTCLPA: number,
): GrowthDataPoint[] {
  const privateStartMonthly = (privateStartCTCLPA * 100000 * 0.7) / 12;
  return EXPERIENCE_MILESTONES.map((year) => {
    const result = calculateSalary(post, cityType, year, allowances, deductions);
    const privateGrowth = privateStartMonthly * Math.pow(1.08, year);
    return { year, govt: Math.round(result.netInHand), private: Math.round(privateGrowth) };
  });
}

export function getPensionEstimate(post: Post): number {
  const lastBasicKey = '30years';
  const lastBasic =
    (post.basicPay.afterIncrements as Record<string, number>)[lastBasicKey] ??
    (post.basicPay.afterIncrements as Record<string, number>)['20years'] ??
    post.basicPay.entry;
  return Math.round(lastBasic * 0.5);
}
```

- [ ] **Step 4: Run tests — confirm all pass**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/salary.ts src/lib/salary.test.ts
git commit -m "feat: add salary calculation library with tests"
```

---

## Task 3: WizardProgress Component

**Files:**
- Create: `src/components/salary/WizardProgress.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/WizardProgress.tsx
interface WizardProgressProps {
  currentStep: 0 | 1 | 2;
  onBack: () => void;
}

export default function WizardProgress({ currentStep, onBack }: WizardProgressProps) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(6,13,26,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '12px 20px 14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {currentStep > 0 && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '4px 8px 4px 0',
              fontSize: 18,
              lineHeight: 1,
            }}
            aria-label="Go back"
          >
            ‹
          </button>
        )}
        <div style={{ flex: 1, display: 'flex', gap: 8, justifyContent: 'center' }}>
          {([0, 1, 2] as const).map((step) => (
            <div
              key={step}
              style={{
                height: 6,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                background:
                  step < currentStep ? '#34D399' :
                  step === currentStep ? '#2563EB' :
                  'rgba(255,255,255,0.12)',
                width:
                  step < currentStep ? 28 :
                  step === currentStep ? 40 :
                  18,
              }}
            />
          ))}
        </div>
        {currentStep > 0 && <div style={{ width: 32 }} />}
      </div>
      <div style={{
        textAlign: 'center',
        color: '#64748B',
        fontSize: 11,
        marginTop: 7,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        {currentStep === 0 && 'Step 1 of 3 — Choose Your Dream Job'}
        {currentStep === 1 && 'Step 2 of 3 — Where Will You Be Posted?'}
        {currentStep === 2 && 'Step 3 of 3 — Years of Experience'}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/WizardProgress.tsx
git commit -m "feat: add WizardProgress step indicator"
```

---

## Task 4: JobStep (Step 1)

**Files:**
- Create: `src/components/salary/steps/JobStep.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/steps/JobStep.tsx
import type { Post } from '@/lib/salary';

const JOB_ICONS: Record<string, string> = {
  'ias-officer': '🏛️',
  'sbi-po': '🏦',
  'rbi-grade-b': '📈',
  'ssc-cgl-income-tax': '📊',
  'ssc-cgl-auditor': '📋',
  'ssc-chsl': '📄',
  'rrb-ntpc': '🚂',
  'nda': '🛡️',
  'delhi-police': '👮',
  'ibps-po': '🏧',
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  UPSC:    { bg: 'rgba(109,40,217,0.25)', text: '#C4B5FD' },
  Banking: { bg: 'rgba(13,148,136,0.25)',  text: '#5EEAD4' },
  SSC:     { bg: 'rgba(217,119,6,0.25)',   text: '#FCD34D' },
  Railway: { bg: 'rgba(220,38,38,0.25)',   text: '#FCA5A5' },
  Defence: { bg: 'rgba(37,99,235,0.25)',   text: '#93C5FD' },
};

interface JobStepProps {
  posts: Post[];
  onSelect: (postId: string) => void;
}

export default function JobStep({ posts, onSelect }: JobStepProps) {
  return (
    <div style={{ padding: '20px 16px 32px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2 }}>
          Choose Your Dream Job
        </div>
        <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
          {posts.length} government posts to explore
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map((post) => {
          const cat = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.SSC;
          return (
            <button
              key={post.id}
              onClick={() => onSelect(post.id)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>
                  {JOB_ICONS[post.id] ?? '🏢'}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#E0E7FF' }}>
                      {post.name}
                    </span>
                    <span style={{
                      background: cat.bg,
                      color: cat.text,
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    {'payLevel' in post ? `Pay Level ${post.payLevel}` : post.payScale ?? ''}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#34D399' }}>
                  ₹{(post.basicPay.entry / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 1 }}>basic/mo</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/steps/JobStep.tsx
git commit -m "feat: add JobStep wizard card list"
```

---

## Task 5: CityStep (Step 2)

**Files:**
- Create: `src/components/salary/steps/CityStep.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/steps/CityStep.tsx
import type { CityType } from '@/lib/salary';

const CITIES: { type: CityType; icon: string; label: string; hra: string; examples: string }[] = [
  { type: 'xCity', icon: '🌆', label: 'X City', hra: '30%', examples: 'Delhi, Mumbai, Chennai, Kolkata, Hyderabad, Bangalore' },
  { type: 'yCity', icon: '🏙️', label: 'Y City', hra: '20%', examples: 'Pune, Jaipur, Lucknow, Surat, Patna, Kochi' },
  { type: 'zCity', icon: '🏘️', label: 'Z City', hra: '10%', examples: 'All other cities & towns' },
];

interface CityStepProps {
  onSelect: (cityType: CityType) => void;
}

export default function CityStep({ onSelect }: CityStepProps) {
  return (
    <div style={{ padding: '20px 16px 32px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2 }}>
          Where will you<br />be posted?
        </div>
        <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
          HRA depends on city classification
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {CITIES.map(({ type, icon, label, hra, examples }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '16px 10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.1)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.35)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            <span style={{ fontSize: 28 }}>{icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E0E7FF' }}>{label}</span>
            <span style={{ fontSize: 10, color: '#64748B', lineHeight: 1.4 }}>
              {examples.split(', ').slice(0, 2).join(', ')}
            </span>
            <span style={{
              marginTop: 6,
              background: 'rgba(52,211,153,0.1)',
              color: '#34D399',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 10,
            }}>
              {hra} HRA
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: '#475569', textAlign: 'center' }}>
        HRA = House Rent Allowance · % of Basic Pay
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/steps/CityStep.tsx
git commit -m "feat: add CityStep X/Y/Z city cards"
```

---

## Task 6: ExperienceStep (Step 3)

**Files:**
- Create: `src/components/salary/steps/ExperienceStep.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/steps/ExperienceStep.tsx
'use client';

import { useState } from 'react';
import { EXPERIENCE_MILESTONES, getBasicPay } from '@/lib/salary';
import type { ExperienceYear, Post } from '@/lib/salary';

const MILESTONE_LABELS: Record<number, string> = {
  0: 'Fresh',
  3: '3 yrs',
  7: '7 yrs',
  14: '14 yrs',
  20: '20 yrs',
  30: '30 yrs',
};

interface ExperienceStepProps {
  post: Post;
  onConfirm: (experience: ExperienceYear) => void;
}

export default function ExperienceStep({ post, onConfirm }: ExperienceStepProps) {
  const [milestoneIndex, setMilestoneIndex] = useState(0);
  const experience = EXPERIENCE_MILESTONES[milestoneIndex];
  const basicPay = getBasicPay(post, experience);
  const pct = (milestoneIndex / (EXPERIENCE_MILESTONES.length - 1)) * 100;

  return (
    <div style={{ padding: '20px 16px 32px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2 }}>
          Years of Experience
        </div>
        <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
          Salary grows with annual increments
        </div>
      </div>

      {/* Milestone labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        {EXPERIENCE_MILESTONES.map((yr, i) => (
          <div key={yr} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setMilestoneIndex(i)}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              margin: '0 auto 4px',
              background: i === milestoneIndex ? '#2563EB' : i < milestoneIndex ? '#34D399' : 'rgba(255,255,255,0.12)',
              boxShadow: i === milestoneIndex ? '0 0 0 3px rgba(37,99,235,0.25)' : 'none',
              transition: 'all 0.2s',
            }} />
            <div style={{
              fontSize: 9,
              color: i === milestoneIndex ? '#93C5FD' : '#64748B',
              fontWeight: i === milestoneIndex ? 700 : 400,
            }}>
              {MILESTONE_LABELS[yr]}
            </div>
          </div>
        ))}
      </div>

      {/* Slider */}
      <div style={{ position: 'relative', margin: '0 0 8px' }}>
        <div style={{
          height: 4,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'visible',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #2563EB, #34D399)',
            borderRadius: 2,
            transition: 'width 0.2s',
          }} />
        </div>
        <input
          type="range"
          min={0}
          max={EXPERIENCE_MILESTONES.length - 1}
          step={1}
          value={milestoneIndex}
          onChange={(e) => setMilestoneIndex(Number(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            opacity: 0,
            cursor: 'pointer',
            height: 24,
            top: -10,
          }}
        />
      </div>

      {/* Live basic pay preview */}
      <div style={{ textAlign: 'center', margin: '16px 0 24px' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(37,99,235,0.1)',
          border: '1px solid rgba(37,99,235,0.2)',
          borderRadius: 10,
          padding: '10px 20px',
        }}>
          <span style={{ fontSize: 12, color: '#64748B' }}>Basic pay at this level: </span>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#93C5FD' }}>
            ₹{basicPay.toLocaleString('en-IN')}/mo
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onConfirm(experience)}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
          color: '#fff',
          fontSize: 16,
          fontWeight: 700,
          border: 'none',
          borderRadius: 14,
          padding: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
        }}
      >
        Calculate My Salary →
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/steps/ExperienceStep.tsx
git commit -m "feat: add ExperienceStep milestone snap slider"
```

---

## Task 7: SalaryRevealHero

**Files:**
- Create: `src/components/salary/reveal/SalaryRevealHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/reveal/SalaryRevealHero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { CityType, ExperienceYear, Post, SalaryResult } from '@/lib/salary';
import { EXPERIENCE_MILESTONES } from '@/lib/salary';

const CITY_LABEL: Record<CityType, string> = { xCity: 'X City', yCity: 'Y City', zCity: 'Z City' };
const JOB_ICONS: Record<string, string> = {
  'ias-officer': '🏛️', 'sbi-po': '🏦', 'rbi-grade-b': '📈',
  'ssc-cgl-income-tax': '📊', 'ssc-cgl-auditor': '📋', 'ssc-chsl': '📄',
  'rrb-ntpc': '🚂', 'nda': '🛡️', 'delhi-police': '👮', 'ibps-po': '🏧',
};

function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const step = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return value;
}

const SLICE_COLORS = ['#3B82F6', '#34D399', '#F59E0B', '#8B5CF6'];

interface SalaryRevealHeroProps {
  result: SalaryResult;
  post: Post;
  cityType: CityType;
  experience: ExperienceYear;
}

export default function SalaryRevealHero({ result, post, cityType, experience }: SalaryRevealHeroProps) {
  const displayedInHand = useCountUp(result.netInHand);

  const donutData = [
    { name: 'Basic Pay', value: result.basicPay },
    { name: 'DA', value: result.da },
    { name: 'HRA', value: result.hra },
    { name: 'TA', value: result.ta },
  ];

  const expLabel = experience === 0
    ? 'Fresh Joiner'
    : `${experience} ${experience === 1 ? 'year' : 'years'} exp`;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F2440 0%, #162D50 100%)',
      padding: '20px 20px 0',
    }}>
      {/* Job + location row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(37,99,235,0.2)',
          border: '1px solid rgba(37,99,235,0.35)',
          borderRadius: 20,
          padding: '4px 12px 4px 8px',
        }}>
          <span style={{ fontSize: 14 }}>{JOB_ICONS[post.id] ?? '🏢'}</span>
          <span style={{ fontSize: 11, color: '#93C5FD', fontWeight: 700 }}>
            {post.name} · {expLabel}
          </span>
        </div>
        <span style={{ fontSize: 11, color: '#475569' }}>
          📍 {CITY_LABEL[cityType]}
        </span>
      </div>

      {/* Big number + donut */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            In-Hand / Month
          </div>
          <div style={{ fontSize: 42, fontWeight: 900, color: '#34D399', letterSpacing: -2, lineHeight: 1 }}>
            ₹{displayedInHand.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
            After NPS &amp; deductions
          </div>
        </div>

        <div style={{ width: 80, height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={24}
                outerRadius={38}
                dataKey="value"
                animationBegin={400}
                animationDuration={1000}
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={SLICE_COLORS[i]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }}
                formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/reveal/SalaryRevealHero.tsx
git commit -m "feat: add SalaryRevealHero with count-up and donut"
```

---

## Task 8: SalaryBreakdown

**Files:**
- Create: `src/components/salary/reveal/SalaryBreakdown.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/reveal/SalaryBreakdown.tsx
import type { SalaryResult } from '@/lib/salary';
import salaryData from '@/data/salary-data.json';

function Row({ label, value, variant }: { label: string; value: string; variant: 'add' | 'deduct' | 'gross' | 'net' }) {
  const styles: Record<string, React.CSSProperties> = {
    add:    { background: 'rgba(52,211,153,0.06)' },
    deduct: { background: 'rgba(239,68,68,0.06)' },
    gross:  { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' },
    net:    { background: 'rgba(52,211,153,0.12)', border: '1.5px solid rgba(52,211,153,0.25)' },
  };
  const valueColors: Record<string, string> = {
    add: '#34D399', deduct: '#F87171', gross: '#E0E7FF', net: '#34D399',
  };
  const labelColors: Record<string, string> = {
    add: '#94A3B8', deduct: '#94A3B8', gross: '#CBD5E1', net: '#34D399',
  };
  const isBold = variant === 'gross' || variant === 'net';
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 14px',
      borderRadius: 10,
      fontSize: variant === 'net' ? 15 : 13,
      fontWeight: isBold ? 700 : 400,
      ...styles[variant],
    }}>
      <span style={{ color: labelColors[variant] }}>{label}</span>
      <span style={{ color: valueColors[variant] }}>{value}</span>
    </div>
  );
}

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

interface SalaryBreakdownProps {
  result: SalaryResult;
  cityType: string;
}

export default function SalaryBreakdown({ result, cityType }: SalaryBreakdownProps) {
  const hraRate = (salaryData.allowances.hra as Record<string, number>)[cityType];
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
        Salary Components
      </div>
      <Row label="Basic Pay" value={fmt(result.basicPay)} variant="add" />
      <Row label={`Dearness Allowance (${salaryData.allowances.da}%)`} value={`+${fmt(result.da)}`} variant="add" />
      <Row label={`HRA — ${cityType === 'xCity' ? 'X' : cityType === 'yCity' ? 'Y' : 'Z'} City (${hraRate}%)`} value={`+${fmt(result.hra)}`} variant="add" />
      <Row label="Transport Allowance" value={`+${fmt(result.ta)}`} variant="add" />
      <Row label="Gross Salary" value={fmt(result.gross)} variant="gross" />

      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, margin: '4px 0 2px' }}>
        Deductions
      </div>
      <Row label={`NPS Contribution (${salaryData.deductions.nps}% of Basic)`} value={`−${fmt(result.npsDeduction)}`} variant="deduct" />
      <Row label="Professional Tax" value={`−${fmt(result.professionalTax)}`} variant="deduct" />
      <Row label="NET IN-HAND" value={fmt(result.netInHand)} variant="net" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/reveal/SalaryBreakdown.tsx
git commit -m "feat: add SalaryBreakdown component"
```

---

## Task 9: SalaryComparison Widget

**Files:**
- Create: `src/components/salary/reveal/SalaryComparison.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/reveal/SalaryComparison.tsx
import type { ComparisonResult } from '@/lib/salary';

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

interface SalaryComparisonProps {
  comparison: ComparisonResult;
}

export default function SalaryComparison({ comparison }: SalaryComparisonProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16,
      margin: '0 16px',
      padding: 16,
    }}>
      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14, textAlign: 'center' }}>
        Govt vs Private Sector
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div style={{
          background: 'rgba(37,99,235,0.1)',
          border: '1px solid rgba(37,99,235,0.2)',
          borderRadius: 12,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
            Govt In-Hand
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#34D399' }}>
            {fmt(comparison.netInHand)}
          </div>
          <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>per month</div>
        </div>

        <div style={{
          background: 'rgba(109,40,217,0.1)',
          border: '1px solid rgba(109,40,217,0.2)',
          borderRadius: 12,
          padding: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
            Equiv. Private CTC
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#A78BFA' }}>
            {comparison.privateCTCEquiv} LPA
          </div>
          <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>to match perks</div>
        </div>
      </div>

      <div style={{
        background: 'rgba(52,211,153,0.06)',
        border: '1px solid rgba(52,211,153,0.15)',
        borderRadius: 10,
        padding: '10px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, color: '#64748B' }}>
          Hidden perks (housing, CGHS, pension, security)
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#34D399', flexShrink: 0, marginLeft: 8 }}>
          +{fmt(comparison.perksMonthly)}/mo
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: 12, color: '#64748B' }}>
        Private sector needs{' '}
        <strong style={{ color: '#93C5FD' }}>
          ₹{(comparison.privateCTCEquiv * 1.2).toFixed(1)} LPA CTC
        </strong>{' '}
        to truly match
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/reveal/SalaryComparison.tsx
git commit -m "feat: add SalaryComparison govt vs private widget"
```

---

## Task 10: GrowthChart (30-Year)

**Files:**
- Create: `src/components/salary/reveal/GrowthChart.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/reveal/GrowthChart.tsx
'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import type { GrowthDataPoint } from '@/lib/salary';

function fmtY(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  return `₹${(v / 1000).toFixed(0)}K`;
}

interface GrowthChartProps {
  data: GrowthDataPoint[];
  pensionEstimate: number;
}

export default function GrowthChart({ data, pensionEstimate }: GrowthChartProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16,
      margin: '16px',
      padding: '16px 8px 16px 0',
    }}>
      <div style={{ fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, textAlign: 'center' }}>
        Salary Growth Over 30 Years
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `${v}yr`}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmtY}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip
            contentStyle={{
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(l) => `Year ${l}`}
            formatter={(v: number, name: string) => [
              `₹${v.toLocaleString('en-IN')}/mo`,
              name === 'govt' ? 'Govt' : 'Private',
            ]}
          />
          <Legend
            formatter={(v) => (
              <span style={{ color: '#94A3B8', fontSize: 11 }}>
                {v === 'govt' ? 'Govt (guaranteed)' : 'Private (8% growth)'}
              </span>
            )}
          />
          <ReferenceLine
            y={pensionEstimate}
            stroke="#34D399"
            strokeDasharray="4 4"
            label={{ value: 'Pension est.', fill: '#34D399', fontSize: 10, position: 'insideTopRight' }}
          />
          <Line
            type="monotone"
            dataKey="govt"
            stroke="#2563EB"
            strokeWidth={2.5}
            dot={{ fill: '#2563EB', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="private"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            strokeDasharray="5 3"
            dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#334155', marginTop: 6, padding: '0 16px' }}>
        Private estimate assumes 8% annual growth from equivalent starting CTC.
        Pension is an NPS approximation — actual may vary.
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/reveal/GrowthChart.tsx
git commit -m "feat: add 30-year GrowthChart with Recharts"
```

---

## Task 11: ShareCard + ShareButton

**Files:**
- Create: `src/components/salary/share/ShareCard.tsx`
- Create: `src/components/salary/share/ShareButton.tsx`

- [ ] **Step 1: Create ShareCard**

```tsx
// src/components/salary/share/ShareCard.tsx
import { forwardRef } from 'react';
import type { CityType, ExperienceYear, Post, ComparisonResult } from '@/lib/salary';

const CITY_LABEL: Record<CityType, string> = { xCity: 'X City', yCity: 'Y City', zCity: 'Z City' };
const JOB_ICONS: Record<string, string> = {
  'ias-officer': '🏛️', 'sbi-po': '🏦', 'rbi-grade-b': '📈',
  'ssc-cgl-income-tax': '📊', 'ssc-cgl-auditor': '📋', 'ssc-chsl': '📄',
  'rrb-ntpc': '🚂', 'nda': '🛡️', 'delhi-police': '👮', 'ibps-po': '🏧',
};

interface ShareCardProps {
  post: Post;
  cityType: CityType;
  experience: ExperienceYear;
  comparison: ComparisonResult;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ post, cityType, experience, comparison }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          left: -9999,
          top: -9999,
          width: 360,
          minHeight: 540,
          background: 'linear-gradient(135deg, #0F2440 0%, #162D50 60%, #0B1120 100%)',
          borderRadius: 20,
          padding: 28,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          color: '#E2E8F0',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 10, color: '#475569', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>
          NAUKRI YATRA · SALARY CALCULATOR
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#F1F5F9', marginBottom: 4 }}>
          {JOB_ICONS[post.id] ?? '🏢'} {post.name}
        </div>
        <div style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
          {CITY_LABEL[cityType]} · {experience === 0 ? 'Fresh Joiner' : `${experience} years exp`}
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#34D399', letterSpacing: -2, lineHeight: 1 }}>
          ₹{comparison.netInHand.toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: 13, color: '#475569', marginBottom: 28 }}>in-hand per month</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
          {[
            { val: `₹${(comparison.gross / 100000).toFixed(2)}L`, lbl: 'Gross' },
            { val: `${comparison.privateCTCEquiv} LPA`, lbl: 'Equiv. CTC' },
            { val: '50% DA', lbl: 'Current Rate' },
          ].map(({ val, lbl }) => (
            <div key={lbl} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              padding: '10px 8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#CBD5E1' }}>{val}</div>
              <div style={{ fontSize: 9, color: '#475569', marginTop: 3 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#334155', textAlign: 'center' }}>
          prepkar.vercel.app/salary-calculator
        </div>
      </div>
    );
  }
);
ShareCard.displayName = 'ShareCard';
export default ShareCard;
```

- [ ] **Step 2: Create ShareButton**

```tsx
// src/components/salary/share/ShareButton.tsx
'use client';

import { useRef, useState } from 'react';
import ShareCard from './ShareCard';
import type { CityType, ExperienceYear, Post, ComparisonResult } from '@/lib/salary';

interface ShareButtonProps {
  post: Post;
  cityType: CityType;
  experience: ExperienceYear;
  comparison: ComparisonResult;
}

export default function ShareButton({ post, cityType, experience, comparison }: ShareButtonProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleShare() {
    if (!cardRef.current) return;
    setLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'salary-card.png', { type: 'image/png' });
        if (
          typeof navigator !== 'undefined' &&
          navigator.share &&
          navigator.canShare({ files: [file] })
        ) {
          await navigator.share({ files: [file], title: 'My Government Salary' });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'salary-card.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ShareCard
        ref={cardRef}
        post={post}
        cityType={cityType}
        experience={experience}
        comparison={comparison}
      />
      <div style={{ padding: '0 16px 32px' }}>
        <button
          onClick={handleShare}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? 'rgba(37,99,235,0.4)' : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            borderRadius: 14,
            padding: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {loading ? '⏳ Generating…' : '📤 Share My Salary Card'}
        </button>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/salary/share/
git commit -m "feat: add ShareCard and ShareButton with html2canvas"
```

---

## Task 12: SalaryWizard (Root Orchestrator)

**Files:**
- Create: `src/components/salary/SalaryWizard.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/salary/SalaryWizard.tsx
'use client';

import { useState } from 'react';
import salaryData from '@/data/salary-data.json';
import {
  calculateSalary, calculateComparison, calculateGrowthData, getPensionEstimate,
} from '@/lib/salary';
import type { CityType, ExperienceYear } from '@/lib/salary';

import WizardProgress from './WizardProgress';
import JobStep from './steps/JobStep';
import CityStep from './steps/CityStep';
import ExperienceStep from './steps/ExperienceStep';
import SalaryRevealHero from './reveal/SalaryRevealHero';
import SalaryBreakdown from './reveal/SalaryBreakdown';
import SalaryComparison from './reveal/SalaryComparison';
import GrowthChart from './reveal/GrowthChart';
import ShareButton from './share/ShareButton';

type WizardStep = 0 | 1 | 2 | 'reveal';

export default function SalaryWizard() {
  const [step, setStep] = useState<WizardStep>(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityType | null>(null);
  const [selectedExp, setSelectedExp] = useState<ExperienceYear | null>(null);

  const posts = salaryData.posts;
  const { allowances, deductions } = salaryData;

  function handleBack() {
    if (step === 1) setStep(0);
    else if (step === 2) setStep(1);
    else if (step === 'reveal') setStep(2);
  }

  const isReveal = step === 'reveal';
  const progressStep: 0 | 1 | 2 = isReveal ? 2 : (step as 0 | 1 | 2);

  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;

  let result = null;
  let comparison = null;
  let growthData = null;
  let pensionEstimate = 0;

  if (isReveal && selectedPost && selectedCity && selectedExp !== null) {
    result = calculateSalary(selectedPost, selectedCity, selectedExp, allowances, deductions);
    comparison = calculateComparison(selectedPost, result);
    growthData = calculateGrowthData(selectedPost, selectedCity, allowances, deductions, comparison.privateCTCEquiv);
    pensionEstimate = getPensionEstimate(selectedPost);
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#060D1A',
      color: '#E2E8F0',
      paddingBottom: 80,
    }}>
      {!isReveal && (
        <WizardProgress currentStep={progressStep} onBack={handleBack} />
      )}

      {step === 0 && (
        <JobStep
          posts={posts}
          onSelect={(id) => { setSelectedPostId(id); setStep(1); }}
        />
      )}

      {step === 1 && (
        <CityStep
          onSelect={(city) => { setSelectedCity(city); setStep(2); }}
        />
      )}

      {step === 2 && selectedPost && (
        <ExperienceStep
          post={selectedPost}
          onConfirm={(exp) => { setSelectedExp(exp); setStep('reveal'); }}
        />
      )}

      {isReveal && result && comparison && growthData && selectedPost && selectedCity && selectedExp !== null && (
        <>
          <SalaryRevealHero
            result={result}
            post={selectedPost}
            cityType={selectedCity}
            experience={selectedExp}
          />
          <SalaryBreakdown result={result} cityType={selectedCity} />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 16px' }} />
          <SalaryComparison comparison={comparison} />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 16px 0' }} />
          <GrowthChart data={growthData} pensionEstimate={pensionEstimate} />
          <ShareButton
            post={selectedPost}
            cityType={selectedCity}
            experience={selectedExp}
            comparison={comparison}
          />
          <div style={{ textAlign: 'center', paddingBottom: 8 }}>
            <button
              onClick={() => { setStep(0); setSelectedPostId(null); setSelectedCity(null); setSelectedExp(null); }}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#64748B',
                fontSize: 13,
                padding: '8px 20px',
                borderRadius: 10,
                cursor: 'pointer',
              }}
            >
              ← Calculate for a different job
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/salary/SalaryWizard.tsx
git commit -m "feat: add SalaryWizard root orchestrator"
```

---

## Task 13: Wire Up page.tsx + Verify

**Files:**
- Modify: `src/app/salary-calculator/page.tsx`

- [ ] **Step 1: Update the page**

Open `src/app/salary-calculator/page.tsx`. Replace the entire JSX in `SalaryCalculatorPage` (keep metadata unchanged):

```tsx
import type { Metadata } from "next";
import SalaryWizard from "@/components/salary/SalaryWizard";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
  description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs. Includes DA, HRA, perks based on 7th Pay Commission.',
  keywords: 'government salary calculator, IAS salary, SBI PO salary, 7th pay commission, in-hand salary',
  openGraph: {
    title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
    description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs. Includes DA, HRA, perks based on 7th Pay Commission.',
    url: 'https://prepkar.vercel.app/salary-calculator',
    siteName: 'NaukriYatra',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://prepkar.vercel.app/images/branding/og-image.png', width: 1200, height: 630, alt: 'Government Job Salary Calculator — NaukriYatra' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
    description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs.',
    images: ['https://prepkar.vercel.app/images/branding/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <SalaryWizard />
      <BottomNav />
    </>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd E:/Rakesh/prepkar
npx tsc --noEmit
```

Expected: no errors. If errors appear, fix them before proceeding.

- [ ] **Step 3: Run dev server and manually test**

```bash
npm run dev
```

Open `http://localhost:3000/salary-calculator` and verify:
1. Step 1 — 10 job cards appear, tapping any one advances to Step 2
2. Step 2 — 3 city cards, tapping one advances to Step 3
3. Step 3 — milestone slider moves, basic pay preview updates, CTA button works
4. Reveal — hero number counts up, donut chart animates, breakdown rows show, comparison widget shows, 30-year chart renders, share button triggers download/share
5. "Calculate for a different job" resets to Step 1

- [ ] **Step 4: Run tests one final time**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Final commit**

```bash
git add src/app/salary-calculator/page.tsx
git commit -m "feat: wire up SalaryWizard to salary calculator page

Replaces basic form with Dark Hero 3-step wizard:
- Job selection cards with salary teaser
- X/Y/Z city cards
- Milestone snap slider for experience
- Animated salary reveal (count-up + donut)
- Govt vs private comparison widget
- 30-year growth chart
- Shareable portrait card via html2canvas"
```

---

## Self-Review Checklist

Spec sections vs tasks:

| Spec Requirement | Task |
|---|---|
| 3-step wizard | Tasks 3–6, 12 |
| Job cards, large with salary teaser | Task 4 |
| X/Y/Z city cards | Task 5 |
| Milestone slider | Task 6 |
| Animated salary reveal hero | Task 7 |
| Donut chart with Recharts | Task 7 |
| Line-by-line breakdown | Task 8 |
| Comparison widget | Task 9 |
| 30-year growth chart | Task 10 |
| Share card + button | Task 11 |
| SalaryWizard orchestrator | Task 12 |
| Page.tsx wired up | Task 13 |
| Pure calculation functions | Task 2 |
| Vitest unit tests | Tasks 1–2 |
| Recharts + html2canvas installed | Task 1 |
| TA: metro vs non-metro correct | Task 2 (tested) |
| NPS on basic only | Task 2 (tested) |
| Fallback for missing 30yr key | Task 2 (tested) |
