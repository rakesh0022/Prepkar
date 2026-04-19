# PrepKar: Dual Practice Systems Design

**Date:** 2026-04-19  
**Status:** Approved

---

## Overview

Two distinct practice systems coexist in the app:

- **System 1 — AI Practice** (`/interview`): Gemini-powered conversational practice for interview simulation, essay writing, and mains answer writing.
- **System 2 — Static Quiz** (`/quiz`): Static MCQ question bank with subject-based and exam mock-test modes.

Additionally, the bottom navigation is updated to reflect these two systems clearly.

---

## Section 1: Data Layer (Question Bank)

### Schema

Every question in all 9 subject JSON files gets an `"exams"` array field:

```json
{
  "id": "pol-001",
  "question": "Who appoints the Chief Justice of India?",
  "options": ["Prime Minister", "President", "Law Minister", "Parliament"],
  "correct": 1,
  "explanation": "Under Article 124...",
  "difficulty": "easy",
  "topic": "Judiciary",
  "exams": ["upsc-prelims", "ssc-cgl", "state-psc"]
}
```

### Exam Tag Vocabulary

| Tag | Meaning |
|-----|---------|
| `upsc-prelims` | UPSC Civil Services Prelims GS Paper I |
| `ssc-cgl` | SSC CGL Tier I General Awareness |
| `sbi-po` | SBI PO / IBPS PO General Awareness |
| `ibps-po` | IBPS PO (same pool as sbi-po for GK) |
| `rrb-ntpc` | RRB NTPC General Awareness |
| `state-psc` | State PSC Prelims |

### Question Expansion

Four subjects currently at 20 questions must reach 30+:

| Subject | Current | Target |
|---------|---------|--------|
| current-affairs | 20 | 30 |
| english | 20 | 30 |
| quantitative-aptitude | 20 | 30 |
| reasoning | 20 | 30 |

Subjects already at 30 (polity, economy, geography, history, science) only need exam tags added — no new questions required.

### Exam → Subject Mapping

Which subjects contribute questions to each exam mock test:

| Exam | Subjects drawn from |
|------|---------------------|
| UPSC Prelims | polity, history, geography, economy, science, current-affairs |
| SSC CGL | polity, history, geography, economy, science, reasoning, english |
| SBI PO | economy, polity, current-affairs, reasoning, english, quantitative-aptitude |
| IBPS PO | economy, polity, current-affairs, reasoning, english, quantitative-aptitude |
| RRB NTPC | science, history, geography, reasoning, quantitative-aptitude |
| State PSC | polity, history, geography, economy, science, current-affairs |

---

## Section 2: System 2 — Static Quiz (`/quiz`)

### Landing Page

Two tabs: **"By Subject"** (existing) and **"Exam Mock Test"** (new).

#### By Subject (unchanged)
Existing flow — pick subject → difficulty → question count → quiz.

#### Exam Mock Test (new)

**Selection flow:**
1. Pick exam from: UPSC Prelims, SSC CGL, SBI PO, IBPS PO, RRB NTPC, State PSC
2. Pick question count: 25 / 50 / 100
3. System assembles question set:
   - Fetches all JSON files for subjects mapped to chosen exam
   - Filters to questions tagged with that exam's tag
   - Shuffles and selects `numQuestions` questions
   - Subjects are naturally mixed (no artificial balancing needed)
4. Starts quiz with whole-test countdown timer

**Timer:**
- Total time = `numQuestions × 72` seconds (≈ real exam pace)
- Timer displayed in header throughout the quiz
- When time reaches zero: auto-submit whatever has been answered
- Timer does NOT auto-advance individual questions

**Quiz UI:** Identical to existing quiz-taking screen. Header label shows exam name (e.g., "UPSC Prelims Mock") instead of subject name. Results screen shows same scorecard.

**Data loading:** Exam mock test fetches multiple subject JSON files in parallel via `Promise.all`, merges, filters by exam tag, then shuffles.

### Files to modify

- `src/app/quiz/page.tsx` — add tab UI + exam mock selection
- `src/app/quiz/[subject]/page.tsx` — extend to handle multi-subject exam mode (pass exam config via localStorage, same pattern as existing `quizSettings`)
- `src/data/quizzes/*.json` — add `exams` field + expand 4 subjects to 30 questions

---

## Section 3: System 1 — AI Practice (`/interview`)

### Landing Screen Redesign

Replace the current "Choose Your Exam" card grid with three prominent mode cards:

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  🎤 Interview    │  │  ✍️ Essay Writing │  │  📝 Mains Answer │
│     Panel        │  │                  │  │    Writing       │
│                  │  │  AI gives topic, │  │                  │
│ AI interviews    │  │  you write       │  │  AI gives Q,     │
│ you for UPSC,    │  │  500–1000 words, │  │  you write 250w, │
│ SBI PO, etc.     │  │  AI evaluates    │  │  AI grades it    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

Selecting a mode takes the user to a second screen to pick exam context, then starts the chat.

### Mode A: Interview Panel

- Flow: same as existing exam + stage selection
- No functional change — purely UI reorganization under the new mode structure
- Stage types: MCQ Prelims, Interview, SSB Interview

### Mode B: Essay Writing

- Exam context options: UPSC Mains, Bank PO Descriptive
- AI gives one writing topic (philosophical, social, economic, or abstract for UPSC; banking/economy/letter for Bank PO)
- User writes 500–1000 words in a large textarea (not the chat input — a dedicated writing area)
- On submit, AI evaluates and scores: Content (10), Language (10), Structure (10), Argument Quality (10), Overall (10)
- Final scorecard same format as existing

### Mode C: Mains Answer Writing

- Exam context options: UPSC Mains GS, Bank PO Descriptive
- AI gives a question with a word-limit instruction ("Answer in ~250 words")
- User writes in the same dedicated textarea
- On submit, AI scores: Accuracy (10), Structure (10), Word Limit Adherence (10), Overall (10)
- After 2 questions (or 1 essay), final scorecard appears

### API Changes

No new API route. The existing `/api/interview` route handles everything via stage identifiers.

New stage IDs to add to the allowlist in `route.ts`:
- `essay_writing` — maps to Essay Writing mode
- `mains_answer` — maps to Mains Answer Writing mode

New system prompts added in `getSystemPrompt()` for these two stage IDs.

### UI Input for Essay/Mains Modes

Instead of the chat-style textarea + send button, show:
- A large writing area (min 200px height, resizable)
- Word count display (live)
- "Submit for Evaluation" button (disabled if < 50 words)

The chat history still scrolls above the writing area to show AI prompts and feedback.

### Files to modify

- `src/app/interview/page.tsx` — add mode selection screen, dedicated writing area for essay/mains modes
- `src/app/api/interview/route.ts` — add `essay_writing` and `mains_answer` to valid stages, add system prompts

---

## Section 4: Navigation

### Bottom Nav (5 items, replacing current 5)

| Position | Icon | Label | Route |
|----------|------|-------|-------|
| 1 | 🏠 | Home | `/` |
| 2 | 📚 | Quiz | `/quiz` |
| 3 | 🤖 | AI Practice | `/interview` |
| 4 | ⚖️ | Compare | `/compare` |
| 5 | 👤 | Profile | `/dashboard` |

**Removed from bottom nav:** Cutoffs, Exam Calendar, Stories, Jobs, Current Affairs.

Cutoffs and Calendar remain accessible via home page cards — they are not deleted, just demoted from primary nav.

### Files to modify

- `src/components/BottomNav.tsx` — update nav items

---

## Build Order

1. **Data layer** — expand question counts, add exam tags to all JSON files
2. **BottomNav** — simple, isolated change
3. **System 2: Exam Mock Test** — tab on quiz landing + timer logic + multi-file loading
4. **System 1: AI Practice** — mode landing screen + essay/mains UI + new API prompts

---

## Out of Scope

- No new database tables or Supabase schema changes
- No changes to scoring persistence (scores API unchanged)
- No changes to auth or subscription logic
- No new API routes
- No `"year"` field on questions (can be added later)
