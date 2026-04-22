'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';

// ─── Static JSON imports — zero network calls ──────────────────────────────────
import polityRaw       from '../../../../public/data/questions/polity.json';
import economyRaw      from '../../../../public/data/questions/economy.json';
import geographyRaw    from '../../../../public/data/questions/geography.json';
import historyRaw      from '../../../../public/data/questions/history.json';
import scienceRaw      from '../../../../public/data/questions/science.json';
import englishRaw      from '../../../../public/data/questions/english.json';
import reasoningRaw    from '../../../../public/data/questions/reasoning.json';
import quantitativeRaw from '../../../../public/data/questions/quantitative.json';
import currentAffairsRaw from '../../../../public/quizzes/current-affairs.json';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
  topic: string;
  // Note: JSON files use either 'exam' or 'tags' — neither is used in UI logic
  exam?: string[];
  tags?: string[];
}

type Subject =
  | 'polity' | 'economy' | 'geography' | 'history' | 'science'
  | 'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

// ─── Question bank — keyed by subject slug ─────────────────────────────────────
const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  'polity':                polityRaw        as unknown as QuizQuestion[],
  'economy':               economyRaw       as unknown as QuizQuestion[],
  'geography':             geographyRaw     as unknown as QuizQuestion[],
  'history':               historyRaw       as unknown as QuizQuestion[],
  'science':               scienceRaw       as unknown as QuizQuestion[],
  'english':               englishRaw       as unknown as QuizQuestion[],
  'reasoning':             reasoningRaw     as unknown as QuizQuestion[],
  'quantitative-aptitude': quantitativeRaw  as unknown as QuizQuestion[],
  'current-affairs':       currentAffairsRaw as unknown as QuizQuestion[],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function selectQuestions(subject: string): { questions: QuizQuestion[]; error: string | null } {
  const bank = QUESTION_BANK[subject];
  if (!bank || bank.length === 0) {
    return { questions: [], error: `No questions found for "${subject}".` };
  }

  let settings = { numQuestions: 10, difficulty: 'all' };
  try {
    const raw = localStorage.getItem('quizSettings');
    if (raw) settings = { ...settings, ...JSON.parse(raw) };
  } catch { /* use defaults */ }

  let pool = bank;
  if (settings.difficulty !== 'all') {
    const filtered = bank.filter((q) => q.difficulty === settings.difficulty);
    if (filtered.length > 0) pool = filtered;
    // else fall back to full bank silently
  }

  const questions = shuffle(pool).slice(0, Math.min(settings.numQuestions, pool.length));
  return { questions, error: null };
}

// ─── Timer hook ────────────────────────────────────────────────────────────────
function useTimer(totalSeconds: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  return { display: `${mm}:${ss}`, remaining };
}

// ─── STAGE 3 — Results ─────────────────────────────────────────────────────────
function ResultsScreen({
  questions,
  answers,
  elapsed,
  subject,
  onRetry,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  elapsed: number;
  subject: string;
  onRetry: () => void;
}) {
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const pct   = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const mm    = Math.floor(elapsed / 60);
  const ss    = elapsed % 60;

  // Persist score once
  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem('quizScores') || '[]');
      prev.push({ date: new Date().toISOString(), subject, score, total: questions.length, time: elapsed });
      localStorage.setItem('quizScores', JSON.stringify(prev.slice(-50)));
    } catch { /* silent */ }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const accent = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  const accentBg = pct >= 70 ? '#d1fae5' : pct >= 50 ? '#fef3c7' : '#fee2e2';

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px' }}>

        {/* Score card */}
        <div style={{
          background: accentBg, border: `2px solid ${accent}`,
          borderRadius: 16, padding: '28px 20px', textAlign: 'center', marginBottom: 24,
        }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: accent, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 8 }}>
            {score} / {questions.length} correct
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
            Time: {mm}m {ss}s
          </div>
          <div style={{ fontSize: 14, color: accent, marginTop: 10, fontWeight: 600 }}>
            {pct >= 70 ? '🎉 Excellent! Keep it up!' : pct >= 50 ? '👍 Good effort! Review mistakes.' : '📚 Keep practicing — you\'ll get there!'}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <button onClick={onRetry} style={{
            padding: '13px', borderRadius: 10, border: '1px solid #e5e7eb',
            background: 'white', color: '#6d28d9', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            🔄 Try Again
          </button>
          <Link href="/quiz" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '13px', borderRadius: 10, background: '#6d28d9',
              color: 'white', fontSize: 14, fontWeight: 600, textAlign: 'center',
            }}>
              ← New Quiz
            </div>
          </Link>
        </div>

        {/* Answer review */}
        <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>📋 Review Answers</h2>
          {questions.map((q, i) => {
            const correct  = answers[i] === q.correct;
            const userAns  = answers[i];
            return (
              <div key={q.id} style={{
                marginBottom: 14, padding: 14, borderRadius: 10,
                background: correct ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${correct ? '#bbf7d0' : '#fecaca'}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                  Q{i + 1}. {q.question}
                </div>
                <div style={{ fontSize: 12, color: correct ? '#16a34a' : '#dc2626', marginBottom: 4 }}>
                  Your answer: {userAns !== null ? q.options[userAns] : 'Not answered'} {correct ? '✅' : '❌'}
                </div>
                {!correct && (
                  <div style={{ fontSize: 12, color: '#16a34a', marginBottom: 4 }}>
                    Correct: {q.options[q.correct]} ✓
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#374151', background: 'rgba(0,0,0,0.03)', padding: '8px 10px', borderRadius: 6 }}>
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// ─── STAGE 2 — Quiz ────────────────────────────────────────────────────────────
function QuizScreen({ subject, questions, onDone }: {
  subject: Subject;
  questions: QuizQuestion[];
  onDone: (answers: (number | null)[], elapsed: number) => void;
}) {
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState<(number | null)[]>(() => new Array(questions.length).fill(null));
  const startRef                = useRef(Date.now());

  const SECONDS_PER_Q = 90; // 1.5 min per question
  const totalTime     = questions.length * SECONDS_PER_Q;

  const submit = (finalAnswers: (number | null)[]) => {
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    onDone(finalAnswers, elapsed);
  };

  const { display: timerDisplay, remaining } = useTimer(totalTime, () => submit(answers));

  const q        = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const timerRed = remaining <= 60;

  if (!q) return null; // safety guard

  const selectAnswer = (idx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 0' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Link href="/quiz" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>← Exit</Link>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#6d28d9', textTransform: 'capitalize' }}>
            {subject.replace(/-/g, ' ')}
          </span>
          {/* Timer */}
          <span style={{
            fontSize: 14, fontWeight: 700, fontFamily: 'monospace',
            color: timerRed ? '#dc2626' : '#374151',
            background: timerRed ? '#fee2e2' : '#f3f4f6',
            padding: '4px 10px', borderRadius: 8,
          }}>
            ⏱ {timerDisplay}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginBottom: 5 }}>
            <span>Q {current + 1} / {questions.length}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#6d28d9', borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{
          background: 'white', borderRadius: 14, padding: '20px 18px',
          border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: 'capitalize',
              background: '#f3f4f6', color: '#6b7280', padding: '3px 8px', borderRadius: 6,
            }}>
              {q.difficulty}
            </span>
            <span style={{ fontSize: 10, color: '#9ca3af' }}>{q.topic}</span>
          </div>

          <p style={{ fontSize: 15, fontWeight: 600, color: '#111827', lineHeight: 1.6, marginBottom: 18 }}>
            {q.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, idx) => {
              const selected = answers[current] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  style={{
                    padding: '12px 14px', borderRadius: 10, textAlign: 'left',
                    border: `2px solid ${selected ? '#6d28d9' : '#e5e7eb'}`,
                    background: selected ? '#ede9fe' : 'white',
                    color: '#111827', fontSize: 14, fontWeight: selected ? 600 : 400,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${selected ? '#6d28d9' : '#d1d5db'}`,
                    background: selected ? '#6d28d9' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: selected ? 'white' : '#9ca3af', fontWeight: 700,
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: '1px solid #e5e7eb',
              background: current === 0 ? '#f9fafb' : 'white',
              color: current === 0 ? '#9ca3af' : '#374151',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Previous
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              style={{
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: 'none', background: '#6d28d9', color: 'white', cursor: 'pointer',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => submit(answers)}
              style={{
                padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: 'none', background: '#10b981', color: 'white', cursor: 'pointer',
              }}
            >
              ✓ Submit Quiz
            </button>
          )}
        </div>

        {/* Quick nav dots */}
        <div style={{ background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            Jump to question
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 30, height: 30, borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 700,
                  cursor: 'pointer',
                  background: current === i ? '#6d28d9' : answers[i] !== null ? '#c4b5fd' : '#f3f4f6',
                  color: current === i ? 'white' : answers[i] !== null ? '#4c1d95' : '#6b7280',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8, display: 'flex', gap: 12 }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#c4b5fd', borderRadius: 2, marginRight: 4 }} />Answered</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#f3f4f6', borderRadius: 2, marginRight: 4 }} />Skipped</span>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Root component — orchestrates all 3 stages ────────────────────────────────
function QuizRoot({ subject }: { subject: Subject }) {
  const { recordAttempt } = useQuizAttempts();

  // Stage: 'quiz' | 'results'
  const [stage, setStage]       = useState<'quiz' | 'results'>('quiz');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers]   = useState<(number | null)[]>([]);
  const [elapsed, setElapsed]   = useState(0);
  const [error, setError]       = useState<string | null>(null);

  // Load questions exactly once on mount — no useCallback, no deps loop
  useEffect(() => {
    const { questions: qs, error: err } = selectQuestions(subject);
    if (err || qs.length === 0) {
      setError(err ?? 'No questions available.');
      return;
    }
    setQuestions(qs);
    recordAttempt();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 16 }}>
        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Couldn&apos;t load questions</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{error}</div>
          <Link href="/quiz" style={{ fontSize: 14, color: '#6d28d9', textDecoration: 'none', fontWeight: 600 }}>← Back to Quiz</Link>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Preparing quiz…</div>
        </div>
      </main>
    );
  }

  if (stage === 'results') {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        elapsed={elapsed}
        subject={subject}
        onRetry={() => {
          const { questions: qs } = selectQuestions(subject);
          setQuestions(qs);
          setAnswers([]);
          setElapsed(0);
          setStage('quiz');
        }}
      />
    );
  }

  return (
    <QuizScreen
      subject={subject}
      questions={questions}
      onDone={(finalAnswers, secs) => {
        setAnswers(finalAnswers);
        setElapsed(secs);
        setStage('results');
      }}
    />
  );
}

// ─── Page export ───────────────────────────────────────────────────────────────
export default async function QuizTakingPage({ params }: { params: Promise<{ subject: Subject }> }) {
  const { subject } = await params;
  return (
    <AuthGuard checkLimit={true} redirectAfterLogin={`/quiz/${subject}`}>
      <QuizRoot subject={subject} />
    </AuthGuard>
  );
}
