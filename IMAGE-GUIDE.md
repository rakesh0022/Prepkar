# NaukriYatra — Complete Image Guide

> Drop each image into the specified path and the site auto-switches from emoji fallback to real image. No code changes needed.

---

## Do I Need Separate Mobile & Desktop Images?

**Short answer: No.** Your site is a single-column responsive layout. The same image file serves both screens — CSS `object-fit: cover` handles the cropping automatically.

**What actually matters is COMPOSITION.** A wide desktop banner gets cropped into a narrower rectangle on mobile. If the subject is at the edge, mobile users lose it. So every prompt below follows the **"center-weighted safe zone"** rule:

```
┌─────────────────────────────────────────┐
│         DESKTOP sees full width         │
│    ┌───────────────────────────┐        │
│    │   MOBILE crops to here    │        │
│    │                           │        │
│    │   ★ SUBJECT IN CENTER ★   │        │
│    │                           │        │
│    └───────────────────────────┘        │
│      ← background / atmosphere →        │
└─────────────────────────────────────────┘
```

**Rules baked into every prompt below:**
- Main subject always **centered** (not left/right aligned)
- Important details within the **middle 60%** of the frame
- Left and right edges are atmospheric only (gradients, blur, patterns)
- Vertical composition stays compact — nothing critical at very top/bottom

This means one image, works everywhere. No double work.

---

## Folder Structure

```
public/images/
├── hero/
│   └── hero-bg.png              ← Homepage hero background
├── jobs/                        ← 17 job card thumbnails
│   ├── sbi-po.png
│   ├── ssc-cgl.png
│   ├── rrb-ntpc.png
│   ├── upsc-cse.png
│   ├── ibps-clerk.png
│   ├── rbi-grade-b.png
│   ├── lic-aao.png
│   ├── nda.png
│   ├── ssc-chsl.png
│   ├── uppsc.png
│   ├── delhi-police.png
│   ├── rrb-group-d.png
│   ├── ibps-po.png
│   ├── ssc-mts.png
│   ├── cds.png
│   ├── rrb-alp.png
│   └── ssc-gd.png
├── stories/                     ← 13 avatar portraits (10 stories + 3 hero)
│   ├── priya-s.png
│   ├── arun-k.png
│   ├── vikram-r.png
│   ├── tina-dabi.png
│   ├── arunraj-k.png
│   ├── priya-sharma.png
│   ├── rohit-meena.png
│   ├── kavita-yadav.png
│   ├── deepak-nagar.png
│   ├── sunil-sharma.png
│   ├── anurag-yadav.png
│   ├── meera-r.png
│   └── manish-tiwari.png
├── sections/                    ← Section illustrations
│   ├── mentorship.png
│   ├── govt-vs-private.png
│   └── daily-challenge.png
├── pages/                       ← Page-level header images
│   ├── about-header.png
│   ├── pricing-header.png
│   ├── prepare-header.png
│   └── login-illustration.png
└── branding/
    ├── logo.png                 ← Logo (transparent bg)
    ├── logo-dark.png            ← Logo for dark backgrounds
    ├── og-image.png             ← WhatsApp/social share card
    ├── favicon.ico              ← Browser tab icon
    ├── icon-192.png             ← PWA icon
    └── icon-512.png             ← PWA splash icon
```

---

## PRIORITY 1 — Highest Impact (Do These First)

### 1. Hero Background — `hero/hero-bg.png`
- **Size:** 1200 × 800px
- **Responsive note:** On mobile this crops to roughly 560×800 (portrait feel). On desktop it's 960×800 (landscape). So the **student + desk must be dead center.** The dream bubble / building silhouettes can spread wider — they're atmosphere, not essential.
- **What:** Young Indian student sitting in a simple room, studying on phone/laptop, dream bubble showing government buildings. Warm golden lamp light.
- **Style:** Illustrated, NOT photorealistic. Soft watercolor or flat vector. Muted warm tones (navy, amber, teal).

**Copilot prompt:**
```
Flat illustration, Indian student studying at night with phone and books on a simple wooden desk, warm lamp light, dream bubble above showing Indian government building and officer silhouette, navy blue and warm amber color palette, minimal clean style, no text, subject perfectly centered in the frame, atmospheric details only at the left and right edges, main subject occupies center 60 percent of the image
```

**Leonardo prompt:**
```
Flat vector illustration of young Indian student studying at small desk with mobile phone, warm desk lamp, books scattered, dreamy soft light, background shows faint silhouette of Parliament House and Ashoka Pillar spread at edges, student centered in the middle of the composition, color palette navy blue warm gold and teal, clean minimal style, no text, 3:2 aspect ratio
```

**Midjourney prompt:**
```
flat illustration, Indian student studying at wooden desk with phone and books, warm lamp glow, dream bubble with government building silhouette, navy and amber palette, subject dead center, atmospheric edges, minimal clean style, no text --ar 3:2 --style raw
```

---

### 2. OG / Social Share Card — `branding/og-image.png`
- **Size:** 1200 × 630px (exact OG standard — this one is fixed, no cropping)
- **Responsive note:** Not applicable — OG images have a fixed display size on WhatsApp/Twitter/LinkedIn.
- **What:** Brand card. NaukriYatra logo + tagline + feature icons.
- **Style:** Dark navy gradient background, white text, teal accent.

**Copilot prompt:**
```
Professional social media card design, dark navy blue gradient background, text "NaukriYatra" in bold white centered at top and "Sapne se Selection Tak" in teal below it, four small icons in a row at bottom for AI practice government jobs exam prep and salary info, clean modern layout, 1200x630 pixels, no mockup, no border
```

**Canva approach (recommended):** Open Canva → Custom size 1200×630 → Dark navy gradient → Type "NaukriYatra" in Outfit Bold white → "Sapne se Selection Tak" in teal → Add 4 icon circles → Export PNG.

---

### 3. Logo — `branding/logo.png` + `branding/logo-dark.png`
- **Size:** 400 × 100px (horizontal) + 200 × 200px (square version)
- **Responsive note:** Logo is text-based, scales fine everywhere.
- **What:** "NaukriYatra" wordmark. "Naukri" in dark/white, "Yatra" in brand blue (#2563EB).
- **Best tool:** Canva (free) — type it in Outfit Bold, export PNG with transparent bg.

---

## PRIORITY 2 — Story Avatars (Makes the Site Feel Human)

**Size:** 200 × 200px, PNG
**Responsive note:** Avatars are always displayed as small circles/squares (38px–48px). Since they're square and centered on a face, they crop perfectly at any size. **No responsive concern at all.**

Use ONE consistent style for all 13. Do them all in one session.

### Shared prompt template:
```
Soft illustrated portrait of [DESCRIPTION], Indian features, warm friendly expression, 
simple solid color background [COLOR], clean digital illustration style, 
face and shoulders perfectly centered, slightly stylized not photorealistic, 
square format 1:1 aspect ratio
```

| # | File | Character | Prompt add-on | Background |
|---|------|-----------|---------------|------------|
| 1 | `stories/priya-s.png` | Woman, 25 | `young Indian woman age 25, confident smile, simple kurta, hair tied back` | light coral |
| 2 | `stories/arun-k.png` | Man, 24 | `young Indian man age 24, determined look, simple shirt collar, slight stubble` | soft green |
| 3 | `stories/vikram-r.png` | Man, 30 | `Indian man age 30, slight beard, round glasses, wise calm expression` | warm amber |
| 4 | `stories/tina-dabi.png` | Woman, 28 | `young Indian woman age 28, professional blazer, confident, straight hair` | light purple |
| 5 | `stories/arunraj-k.png` | Man, 24 | `young Indian man age 24, formal white shirt, bank employee look, neat hair` | soft teal |
| 6 | `stories/priya-sharma.png` | Woman, 26 | `Indian woman age 26, slightly tired but proud expression, simple top, earrings` | light blue |
| 7 | `stories/rohit-meena.png` | Man, 25 | `Indian man age 25, railway uniform collar hint, proud wide smile, mustache` | soft red |
| 8 | `stories/kavita-yadav.png` | Woman, 27 | `Indian woman age 27, warm village look, bindi, dupatta on shoulder, confident smile` | soft green |
| 9 | `stories/deepak-nagar.png` | Man, 22 | `young Indian man age 22, fit athletic build, crew cut hair, strong jawline` | dark teal |
| 10 | `stories/sunil-sharma.png` | Man, 21 | `very young Indian man age 21, thin build, humble gentle expression, simple shirt` | light blue |
| 11 | `stories/anurag-yadav.png` | Man, 27 | `Indian man age 27, rectangular glasses, intelligent look, formal collar, neat part` | warm orange |
| 12 | `stories/meera-r.png` | Woman, 24 | `young Indian woman age 24, short hair, confident strong expression, army-green collar` | olive green |
| 13 | `stories/manish-tiwari.png` | Man, 28 | `Indian man age 28, clean shaven, professional look, subtle tie, kind eyes` | soft teal |

**Midjourney batch prompt (do all 13 with same style):**
```
soft illustrated portrait of [DESCRIPTION], Indian features, warm friendly expression, 
simple solid [COLOR] background, clean digital art style, face centered, 
head and shoulders only, stylized not photorealistic --ar 1:1 --style raw
```

---

## PRIORITY 3 — Job Card Images (17 thumbnails)

**Size:** 600 × 400px, PNG
**Responsive note:** On mobile, these render at ~560×100px (cropped shorter). On desktop, at ~450×100px per card (in 2-column grid). The card uses `object-fit: cover` with a fixed 100px height — so the image is heavily cropped vertically. This means:
- **Subject must be in the CENTER both horizontally and vertically**
- **No important details at top/bottom** — only the middle band shows on cards
- **Wide scene compositions work best** — think panoramic/landscape feel
- The full image shows in the job detail sheet, so it should still look complete

### Shared prompt template:
```
Flat illustration of [SCENE], Indian context, clean minimal vector style, 
[PRIMARY COLOR] and white color palette, no text, no people faces, 
professional and aspirational, main subject centered in middle of frame, 
important elements within center 60 percent, atmospheric edges, 
wide landscape composition, 3:2 aspect ratio
```

| # | File | Job | Scene (centered composition) | Color |
|---|------|-----|------------------------------|-------|
| 1 | `jobs/sbi-po.png` | SBI PO | `modern Indian bank branch interior, centered desk with computer screens, SBI green tones, clean office, bookshelves at edges` | #0C7C59 |
| 2 | `jobs/ssc-cgl.png` | SSC CGL | `Indian government office, centered desk with files and nameplate, computer, tea cup, corridor fading at edges` | #2563EB |
| 3 | `jobs/rrb-ntpc.png` | RRB NTPC | `Indian railway station, centered platform with train approaching, station master cabin visible, tracks extending to edges` | #DC2626 |
| 4 | `jobs/upsc-cse.png` | UPSC CSE | `Indian Parliament building centered in frame, Ashoka pillar, official car at base, trees at edges` | #7C3AED |
| 5 | `jobs/ibps-clerk.png` | IBPS Clerk | `small town bank branch counter centered, passbook and pen, customer window, simple clean interior` | #0D9488 |
| 6 | `jobs/rbi-grade-b.png` | RBI Grade B | `RBI building facade centered, official seal, modern glass door, pillars spreading to edges` | #0F4C81 |
| 7 | `jobs/lic-aao.png` | LIC AAO | `LIC branch office centered, desk with insurance papers, family photo frame, calm professional atmosphere` | #1D4ED8 |
| 8 | `jobs/nda.png` | NDA | `Indian Military Academy building centered, parade ground, cadet silhouettes marching, mountains at edges` | #134E4A |
| 9 | `jobs/ssc-chsl.png` | SSC CHSL | `government office clerk desk centered, computer and stamp pad, file shelves, corridor at edges` | #2563EB |
| 10 | `jobs/uppsc.png` | UPPSC | `SDM office desk centered, Indian tricolor flag, official seal, ceiling fan above, windows at edges` | #EA580C |
| 11 | `jobs/delhi-police.png` | Delhi Police | `police station centered, Delhi police jeep, India Gate faintly in background, trees at edges` | #0D9488 |
| 12 | `jobs/rrb-group-d.png` | RRB Group D | `railway workshop centered, tools on workbench, train wheels, tracks stretching to edges` | #DC2626 |
| 13 | `jobs/ibps-po.png` | IBPS PO | `bank branch centered, professional desk with loan papers, warm interior lighting, plants at edges` | #0C7C59 |
| 14 | `jobs/ssc-mts.png` | SSC MTS | `government ministry file room centered, simple desk with papers, long corridor fading at edges` | #2563EB |
| 15 | `jobs/cds.png` | CDS | `army officer mess centered, formal dining table, medals and regimental flags, windows at edges` | #134E4A |
| 16 | `jobs/rrb-alp.png` | RRB ALP | `train locomotive cabin centered, controls dashboard, railway track ahead through windshield, sunrise at edges` | #DC2626 |
| 17 | `jobs/ssc-gd.png` | SSC GD | `border outpost centered, Indian flag on pole, watchtower, mountains and fence spreading to edges` | #2563EB |

**Midjourney batch prompt:**
```
flat illustration of [SCENE], Indian context, clean minimal vector style, 
[COLOR] and white palette, no text, no faces, subject dead center, 
atmospheric details at edges, wide landscape --ar 3:2 --style raw
```

---

## PRIORITY 4 — Section Illustrations

**Responsive note:** These are banner-style (2:1 ratio). On mobile they render full-width at ~560×280. On desktop ~960×300. The horizontal crop is mild, so centering the subject is enough.

| # | File | Size | Scene | Prompt |
|---|------|------|-------|--------|
| 1 | `sections/mentorship.png` | 600×300 | Mentor + student talking | **Copilot:** `Flat illustration, Indian mentor in formal clothes and young student with notebook sitting face to face, both centered in frame, warm friendly scene, golden yellow and white palette, minimal clean, no text, 2:1 aspect ratio` |
| 2 | `sections/govt-vs-private.png` | 600×300 | Split comparison | **Copilot:** `Split flat illustration, left side Indian government building with tree and stability symbols, right side glass corporate tower with speed symbols, centered split line, blue and gray palette, minimal clean, no text, 2:1 ratio` |
| 3 | `sections/daily-challenge.png` | 400×200 | Phone quiz | **Copilot:** `Flat illustration, smartphone centered in frame showing quiz question with A B C D options, lightbulb icon above phone, blue and teal palette, minimal clean, no text, 2:1 ratio` |

---

## PRIORITY 5 — Page Headers

**Responsive note:** Page headers are displayed full-width. On mobile ~560px wide, desktop ~960px. Same centering rule — subject in the middle, atmosphere at edges.

| # | File | Size | Scene | Prompt |
|---|------|------|-------|--------|
| 1 | `pages/about-header.png` | 800×300 | India map with dots | **Copilot:** `Flat illustration, India map outline centered, glowing dots in small towns connected by thin lines to a central platform icon in the middle, navy and teal, atmospheric gradient edges, minimal, no text` |
| 2 | `pages/pricing-header.png` | 800×300 | Ascending tiers | **Copilot:** `Flat illustration, three ascending step platforms centered with trophy icons, small student figure climbing stairs in the middle, blue gradient, edges fade to soft color, aspirational clean minimal, no text` |
| 3 | `pages/prepare-header.png` | 800×300 | Study roadmap | **Copilot:** `Flat illustration, open study planner centered on desk with coffee cup, stack of books, winding road path showing progress in center, warm amber and blue, soft edges, minimal clean, no text` |
| 4 | `pages/login-illustration.png` | 400×400 | Door to opportunity | **Copilot:** `Flat illustration, door opening centered in frame with warm light streaming through, Indian government building silhouette visible through doorway in the center, blue and gold, aspirational, square format, no text` |

---

## PRIORITY 6 — PWA & Branding

| File | Purpose | Size | Notes |
|------|---------|------|-------|
| `branding/favicon.ico` | Browser tab | 32×32px | "NY" monogram in #2563EB. Use Canva or realfavicongenerator.net |
| `branding/icon-192.png` | PWA icon | 192×192px | Logo mark centered on white, with padding |
| `branding/icon-512.png` | PWA splash | 512×512px | Same as 192, just bigger |

These are fixed-size icons — no responsive concern.

---

## Recommended Tools (Free → Paid)

| Tool | Cost | Best For | Notes |
|------|------|----------|-------|
| **Microsoft Copilot** (copilot.microsoft.com) | Free | Quick illustrations, all categories | Uses DALL-E 3. Good for one-offs |
| **Leonardo.ai** | Free (150/day) | Consistent batch work (all 13 avatars, all 17 jobs) | Use "style reference" to keep same look |
| **Canva** | Free | Logo, OG card, favicons, branding | Best for text + layout based assets |
| **Midjourney** | $10/mo | Premium quality hero + job illustrations | Best consistency with `--style raw` |
| **Ideogram** | Free | OG card (handles text well) | Good alternative for social cards |

### Workflow — Do It in This Order:
1. **Avatars first** (13 images) — do ALL in one Leonardo/Copilot session for style consistency
2. **Job thumbnails** (17 images) — same tool, same session, same style
3. **Hero image** (1 image) — spend more time on this one, try multiple tools
4. **Section illustrations** (3 images) — quick wins
5. **Branding** (logo, OG, favicons) — Canva, 30 minutes
6. **Page headers** (4 images) — last priority, only if time permits

---

## How to Add Images

1. Generate images using any tool above
2. Rename them **exactly** as listed (case-sensitive)
3. Drop into `public/images/[folder]/`
4. Run `tinypng.com` on all files (compress 60-80%)
5. `git add -A && git commit -m "add images" && git push origin main`
6. Done — site auto-switches from emoji to real images

**No code changes needed.** The `onError` fallback keeps emojis until images exist.

---

## Image Optimization Checklist

- [ ] All PNGs compressed via tinypng.com
- [ ] Avatars are exactly square (200×200)
- [ ] Job thumbnails are 3:2 ratio (600×400)
- [ ] OG image is exactly 1200×630
- [ ] Hero image is 1200×800
- [ ] No single image exceeds 200KB after compression
- [ ] Subject centered in every image (mobile crop test)
- [ ] All 13 avatars have the same illustration style
- [ ] All 17 job thumbnails have the same illustration style
- [ ] Test WhatsApp share preview with new OG image

---

## What NOT to Do

- **Don't make separate mobile/desktop images** — one centered image handles both
- **Don't put important details at edges** — mobile crops the sides
- **Don't use real photographs of real people** for stories — these are fictional
- **Don't use copyrighted logos** (SBI, UPSC, Railway) directly — illustrate the workplace
- **Don't mix styles** — if avatars are watercolor, ALL must be watercolor
- **Don't skip compression** — uncompressed PNGs kill mobile load times
- **Don't use photorealistic AI images** — illustrated style ages better, no uncanny valley
