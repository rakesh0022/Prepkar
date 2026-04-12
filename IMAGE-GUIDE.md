# NaukriYatra — Complete Image Guide

> Drop each image into the specified path and the site auto-switches from emoji fallback to real image. No code changes needed.

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
- **Size:** 1200 × 800px (will be CSS background, compressed)
- **What:** An aspirational scene. Young Indian student sitting in a simple room, studying on phone/laptop, with a dream bubble showing government buildings / officer life. Warm golden study lamp light.
- **Style:** Illustrated, NOT photorealistic. Soft watercolor or flat vector style. Muted warm tones (deep navy, warm amber, soft teal).
- **Copilot prompt:** `Flat illustration, Indian student studying at night with phone and books on a simple wooden desk, warm lamp light, dream bubble above showing Indian government building and officer silhouette, navy blue and warm amber color palette, minimal clean style, no text`
- **Leonardo prompt:** `Flat vector illustration of young Indian student studying at small desk with mobile phone, warm desk lamp, books scattered, dreamy soft light, background shows faint silhouette of Parliament House and Ashoka Pillar, color palette navy blue warm gold and teal, clean minimal style, no text, 16:9 aspect ratio`

### 2. OG / Social Share Card — `branding/og-image.png`
- **Size:** 1200 × 630px (exact OG standard)
- **What:** Brand card for WhatsApp/Twitter/LinkedIn shares. NaukriYatra logo + tagline "Sapne se Selection Tak" + 3-4 feature icons.
- **Style:** Dark navy gradient background (#1E3A5F → #0F2440), white text, teal accent (#5EEAD4). Professional, not cluttered.
- **Copilot prompt:** `Professional social media card design, dark navy blue gradient background, text "NaukriYatra" in bold white and "Sapne se Selection Tak" in teal, small icons for AI practice, government jobs, exam prep, clean modern layout, 1200x630 pixels, no mockup`
- **Note:** You can also keep the auto-generated OG from `opengraph-image.tsx` — it already works. This is for a polished custom version.

### 3. Logo — `branding/logo.png` + `branding/logo-dark.png`
- **Size:** 400 × 100px (horizontal) + 200 × 200px (square version)
- **What:** "NaukriYatra" wordmark. "Naukri" in dark/white, "Yatra" in brand teal (#2563EB or #5EEAD4).
- **Style:** Use Outfit font (already loaded on the site). Bold, clean.
- **Best tool:** Canva (free) — type it out with the exact font, export as PNG with transparent background.
- **Note:** Don't overthink this. A clean wordmark in Outfit Bold works perfectly.

---

## PRIORITY 2 — Story Avatars (Makes the Site Feel Human)

All story avatars: **200 × 200px, PNG, illustrated portrait style**

Use ONE consistent style for all 13 — this is crucial. If you use Copilot for one, use it for all. The style should be: **soft illustrated portrait, Indian features, warm background, slightly stylized (not photorealistic), friendly expression.**

### Shared prompt template:
```
Soft illustrated portrait of [DESCRIPTION], Indian features, warm friendly expression, 
simple solid color background [COLOR], clean digital illustration style, 
head and shoulders only, slightly stylized not photorealistic, 200x200 square
```

| File | Character | Prompt Description | Background Color |
|------|-----------|-------------------|-----------------|
| `stories/priya-s.png` | Young woman, 25 | `young Indian woman age 25, confident smile, simple kurta` | `light coral` |
| `stories/arun-k.png` | Young man, 24 | `young Indian man age 24, determined look, simple shirt collar` | `soft green` |
| `stories/vikram-r.png` | Man, 30 | `Indian man age 30, slight beard, glasses, wise expression` | `warm amber` |
| `stories/tina-dabi.png` | Woman, 28, professional | `young Indian woman age 28, professional look, blazer` | `light purple` |
| `stories/arunraj-k.png` | Young man, 24, formal | `young Indian man age 24, formal shirt, bank employee look` | `soft teal` |
| `stories/priya-sharma.png` | Woman, 26 | `Indian woman age 26, slightly tired but proud expression, simple top` | `light blue` |
| `stories/rohit-meena.png` | Man, 25, uniform hint | `Indian man age 25, railway uniform collar hint, proud smile` | `soft red` |
| `stories/kavita-yadav.png` | Woman, 27 | `Indian woman age 27, warm village look, bindi, confident` | `soft green` |
| `stories/deepak-nagar.png` | Man, 22, fit | `young Indian man age 22, fit athletic build, crew cut, police look` | `dark teal` |
| `stories/sunil-sharma.png` | Man, 21, simple | `very young Indian man age 21, simple look, humble expression, thin` | `light blue` |
| `stories/anurag-yadav.png` | Man, 27, glasses | `Indian man age 27, glasses, intelligent look, formal collar` | `warm orange` |
| `stories/meera-r.png` | Woman, 24, army | `young Indian woman age 24, short hair, confident strong expression, army feel` | `olive green` |
| `stories/manish-tiwari.png` | Man, 28, banker | `Indian man age 28, clean shaven, bank professional look, tie hint` | `soft teal` |

---

## PRIORITY 3 — Job Card Images (17 thumbnails)

All job images: **600 × 400px, PNG, illustrated scene style**

These appear on job cards and job detail sheets. They should show the WORKPLACE or LIFESTYLE of that job — what the user is dreaming about.

### Shared prompt template:
```
Flat illustration of [SCENE], Indian context, clean minimal vector style, 
[PRIMARY COLOR] and white color palette, no text, no people's faces, 
professional and aspirational, 3:2 aspect ratio
```

| File | Job | Scene Description | Primary Color |
|------|-----|-------------------|--------------|
| `jobs/sbi-po.png` | SBI PO | `modern Indian bank branch interior, SBI logo colors, computer screens, clean office` | Green #0C7C59 |
| `jobs/ssc-cgl.png` | SSC CGL | `Indian government office with files, computer desk, official nameplate, tea cup` | Blue #2563EB |
| `jobs/rrb-ntpc.png` | RRB NTPC | `Indian railway station platform, train approaching, station master cabin` | Red #DC2626 |
| `jobs/upsc-cse.png` | UPSC CSE | `Indian Parliament building silhouette with Ashoka pillar, official car, bungalow gate` | Purple #7C3AED |
| `jobs/ibps-clerk.png` | IBPS Clerk | `small town bank branch counter, passbook, customer window, simple clean interior` | Teal #0D9488 |
| `jobs/rbi-grade-b.png` | RBI Grade B | `Reserve Bank of India building facade, official seal, modern interior with charts` | Navy #0F4C81 |
| `jobs/lic-aao.png` | LIC AAO | `LIC branch office, insurance papers on desk, family photo frame on wall, professional` | Blue #1D4ED8 |
| `jobs/nda.png` | NDA | `Indian Military Academy Dehradun building, parade ground, cadets marching silhouette` | Olive #134E4A |
| `jobs/ssc-chsl.png` | SSC CHSL | `government postal office or court clerk desk, typewriter/computer, stamp pad, files` | Blue #2563EB |
| `jobs/uppsc.png` | UPPSC | `SDM office in Indian small town, desk with Indian flag, official seal, ceiling fan` | Orange #EA580C |
| `jobs/delhi-police.png` | Delhi Police | `Delhi police station exterior, police jeep, India Gate in background, badge close-up` | Teal #0D9488 |
| `jobs/rrb-group-d.png` | RRB Group D | `railway track maintenance scene, tools, Indian railway workshop, simple dignified` | Red #DC2626 |
| `jobs/ibps-po.png` | IBPS PO | `Indian nationalized bank branch, professional desk, loan documents, warm interior` | Green #0C7C59 |
| `jobs/ssc-mts.png` | SSC MTS | `central government ministry corridor, file room, simple desk, humble but dignified` | Blue #2563EB |
| `jobs/cds.png` | CDS | `Indian army officer mess, formal dining, medals display, regimental flags` | Olive #134E4A |
| `jobs/rrb-alp.png` | RRB ALP | `train locomotive cabin interior, controls dashboard, railway track ahead, sunrise` | Red #DC2626 |
| `jobs/ssc-gd.png` | SSC GD | `CRPF/BSF border post, Indian flag, watchtower, mountain backdrop, dignified` | Blue #2563EB |

---

## PRIORITY 4 — Section Illustrations

| File | Section | Size | Description | Prompt |
|------|---------|------|-------------|--------|
| `sections/mentorship.png` | Mentorship Banner | 600 × 300px | Two people talking — a mentor (in formal clothes) and a student (casual, notebook). Indian context. | `Flat illustration, Indian mentor in formal clothes talking to young student with notebook, warm friendly scene, golden yellow and white palette, minimal clean, no text` |
| `sections/govt-vs-private.png` | Govt vs Private | 600 × 300px | Split scene: left = government building + stable life icons, right = corporate tower + fast-paced icons. | `Split illustration, left side Indian government building with tree and pension symbol, right side modern glass corporate tower with clock, versus comparison, blue and gray palette, flat minimal` |
| `sections/daily-challenge.png` | Daily Quiz | 400 × 200px | A hand holding a phone showing an MCQ question, brain/lightbulb icon. | `Flat illustration, hand holding smartphone showing quiz question with options A B C D, lightbulb above, blue and teal palette, minimal clean, Indian style` |

---

## PRIORITY 5 — Page Headers

| File | Page | Size | Description | Prompt |
|------|------|------|-------------|--------|
| `pages/about-header.png` | About Us | 800 × 300px | India map silhouette with dots showing students across the country connecting to NaukriYatra. | `Flat illustration, India map outline with glowing dots in small towns connected by lines to a central education platform icon, navy and teal, minimal, no text` |
| `pages/pricing-header.png` | Pricing | 800 × 300px | Ascending steps/tiers showing Free → Pro → Lifetime with student climbing. | `Flat illustration, three ascending platforms labeled with trophy icons, small student figure climbing steps, blue gradient, aspirational, clean minimal` |
| `pages/prepare-header.png` | Prepare | 800 × 300px | An open study planner/calendar with books, coffee, and a roadmap path. | `Flat illustration, open study planner on desk with coffee cup, stack of books, winding road path showing progress, warm amber and blue, minimal clean` |
| `pages/login-illustration.png` | Login | 400 × 400px | A door opening with light coming through, showing a government building on the other side. | `Flat illustration, door opening with warm light streaming through, silhouette of Indian government building visible through doorway, blue and gold, aspirational, square format` |

---

## PRIORITY 6 — PWA & Branding

| File | Purpose | Size | Description |
|------|---------|------|-------------|
| `branding/favicon.ico` | Browser tab | 32 × 32px | "NY" monogram in brand blue (#2563EB) |
| `branding/icon-192.png` | PWA icon | 192 × 192px | NaukriYatra logo mark on white background |
| `branding/icon-512.png` | PWA splash | 512 × 512px | Same as above, larger |

**Best approach:** Use Canva to create the logo mark, then export at all 3 sizes.

---

## Recommended Tools (Free → Paid)

| Tool | Cost | Best For | Style |
|------|------|----------|-------|
| **Microsoft Copilot** (copilot.microsoft.com) | Free | Quick illustrations, avatars | Varies, DALL-E 3 |
| **Leonardo.ai** | Free (150/day) | Consistent style across sets | Control over style seeds |
| **Canva** | Free tier | Logo, OG card, branding assets | Templates, export control |
| **Midjourney** | $10/month | Premium illustrations, hero image | Best quality, consistent |
| **Ideogram** | Free tier | Text-in-image (good for OG) | Clean, handles text well |

### Pro Tips:
1. **Do ALL avatars in ONE session** on the same tool — keeps the style consistent
2. **Use Leonardo's "style reference"** feature: generate one avatar you like, then use it as reference for the rest
3. **For job thumbnails:** same approach — pick one style, generate all 17 in a batch
4. **Export as PNG** with transparent background where possible (avatars, logo)
5. **Compress everything** through tinypng.com before adding to the repo — keeps the site fast

---

## How to Add Images

1. Generate images using any tool above
2. Rename them exactly as listed in this guide
3. Drop them into `public/images/[folder]/`
4. Commit and push — the site auto-switches from emoji to image

**No code changes needed.** The `onError` fallback ensures emojis show if any image is missing.

---

## Image Optimization Checklist

Before pushing to production:

- [ ] All PNGs compressed via tinypng.com (saves 60-80% file size)
- [ ] Avatars are exactly square (200×200)
- [ ] Job thumbnails are 3:2 ratio (600×400)
- [ ] OG image is exactly 1200×630
- [ ] No image exceeds 200KB after compression
- [ ] Test on mobile — images should load fast on 4G
- [ ] Check WhatsApp share preview with the new OG image

---

## What NOT to Do

- **Don't use real photographs of real people** for success stories — these are fictional characters
- **Don't use copyrighted logos** (SBI, UPSC, Railway logos) directly — illustrate the workplace instead
- **Don't mix styles** — if avatars are watercolor, ALL should be watercolor
- **Don't skip compression** — uncompressed PNGs will kill mobile load times
- **Don't use Midjourney's photorealistic mode** — illustrated style ages better and avoids uncanny valley
