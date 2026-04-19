'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
  exam: string[];
  topic: string;
}

type Subject = 'polity' | 'economy' | 'geography' | 'history' | 'science' |
  'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

type LoadState = 'loading' | 'ready' | 'error' | 'empty';

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({
  questions,
  selectedAnswers,
  startTime,
  subject,
}: {
  questions: QuizQuestion[];
  selectedAnswers: (number | null)[];
  startTime: number;
  subject: string;
}) {
  const score = selectedAnswers.filter((ans, idx) => ans === questions[idx]?.correct).length;
  const percentage = Math.round((score / questions.length) * 100);
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  // Save score — safe to call unconditionally here since this component only mounts on results
  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    scores.push({
      date: new Date().toISOString(),
      subject,
      score,
      total: questions.length,
      time: elapsed,
    });
    localStorage.setItem('quizScores', JSON.stringify(scores.slice(-50))); // keep last 50
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const color = percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444';
  const bg = percentage >= 70 ? '#d1fae5' : percentage >= 50 ? '#fef3c7' : '#fee2e2';

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Score Card */}
        <div style={{ backgroundColor: bg, border: `2px solid ${color}`, borderRadius: '16px', padding: '28px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '52px', fontWeight: 'bold', color, marginBottom: '8px' }}>{percentage}%</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '6px' }}>
            {score} / {questions.length} correct
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>Time: {minutes}m {seconds}s</div>
          <div style={{ marginTop: '12px', fontSize: '14px', color }}>
            {percentage >= 70 ? '🎉 Excellent! Keep it up!' : percentage >= 50 ? '👍 Good effort! Review the mistakes.' : '📚 Keep practicing — you\'ll get there!'}
          </div>
        </div>

        {/* Answer Review */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>📋 Review Your Answers</h2>
          {questions.map((q, idx) => {
            const isCorrect = selectedAnswers[idx] === q.correct;
            const userAns = selectedAnswers[idx];
            return (
              <div key={q.id} style={{
                marginBottom: '16px', padding: '14px', borderRadius: '10px',
                backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Q{idx + 1}. {q.question}
                </div>
                <div style={{ fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: isCorrect ? '#16a34a' : '#dc2626' }}>
                    Your answer: {userAns !== null ? q.options[userAns] : 'Not answered'} {isCorrect ? '✅' : '❌'}
                  </span>
                </div>
                {!isCorrect && (
                  <div style={{ fontSize: '12px', color: '#16a34a', marginBottom: '6px' }}>
                    Correct: {q.options[q.correct]} ✓
                  </div>
                )}
                <div style={{ fontSize: '12px', color: '#374151', backgroundColor: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '6px' }}>
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Link href="/quiz" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#6d28d9', padding: '13px', borderRadius: '10px', textAlign: 'center', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              ← Try Another Quiz
            </div>
          </Link>
          <Link href="/prepare" style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#6d28d9', color: 'white', padding: '13px', borderRadius: '10px', textAlign: 'center', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              📚 Study Plans →
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Quiz Taking Screen ────────────────────────────────────────────────────────
function QuizScreen({ subject }: { subject: Subject }) {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [errorMsg, setErrorMsg] = useState('');
  const { recordAttempt } = useQuizAttempts();

  const loadQuestions = useCallback(async () => {
    setLoadState('loading');
    try {
      const settings = JSON.parse(
        localStorage.getItem('quizSettings') || '{"numQuestions":10,"difficulty":"all"}'
      );

      const res = await fetch(`/quizzes/${subject}.json`);
      if (!res.ok) throw new Error(`Failed to load questions (${res.status})`);

      const data: QuizQuestion[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error('No questions found');

      let filtered = data;
      if (settings.difficulty && settings.difficulty !== 'all') {
        filtered = data.filter((q) => q.difficulty === settings.difficulty);
        // Fall back to all if filter leaves nothing
        if (filtered.length === 0) filtered = data;
      }

      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(settings.numQuestions ?? 10, shuffled.length));

      setQuestions(selected);
      setSelectedAnswers(new Array(selected.length).fill(null));
      setLoadState('ready');

      // Record the attempt when questions actually load
      recordAttempt();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setLoadState('error');
    }
  }, [subject, recordAttempt]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  if (showResults) {
    return (
      <ResultsScreen
        questions={questions}
        selectedAnswers={selectedAnswers}
        startTime={startTime}
        subject={subject}
      />
    );
  }

  if (loadState === 'loading') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>Loading questions…</div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Preparing your {subject} quiz</div>
        </div>
      </main>
    );
  }

  if (loadState === 'error') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '16px' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Couldn&apos;t load questions</div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>{errorMsg}</div>
          <button onClick={loadQuestions} style={{ padding: '10px 24px', backgroundColor: '#6d28d9', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginRight: '12px' }}>
            Retry
          </button>
          <Link href="/quiz" style={{ fontSize: '14px', color: '#6d28d9', textDecoration: 'none' }}>← Back to Quiz</Link>
        </div>
      </main>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Link href="/quiz" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>← Exit Quiz</Link>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#6d28d9', textTransform: 'capitalize' }}>{subject.replace(/-/g, ' ')}</span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#6d28d9', borderRadius: '3px', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Question Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '14px', padding: '24px', marginBottom: '20px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', backgroundColor: '#f3f4f6', color: '#6b7280', padding: '3px 8px', borderRadius: '6px', fontWeight: '600', textTransform: 'capitalize' }}>
              {q.difficulty}
            </span>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>{q.topic}</span>
          </div>
          <p style={{ fontSize: '15px', fontWeight: '600', color: '#111827', lineHeight: '1.6', marginBottom: '20px' }}>
            {q.question}
          </p>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const updated = [...selectedAnswers];
                    updated[currentQuestion] = idx;
                    setSelectedAnswers(updated);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: `2px solid ${isSelected ? '#6d28d9' : '#e5e7eb'}`,
                    backgroundColor: isSelected ? '#ede9fe' : 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#111827',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.15s',
                    fontWeight: isSelected ? '600' : '400',
                  }}
                >
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? '#6d28d9' : '#d1d5db'}`,
                    backgroundColor: isSelected ? '#6d28d9' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: isSelected ? 'white' : '#9ca3af', fontWeight: '700',
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setCurrentQuestion((c) => Math.max(0, c - 1))}
            disabled={currentQuestion === 0}
            style={{
              padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb',
              backgroundColor: currentQuestion === 0 ? '#f9fafb' : 'white',
              color: currentQuestion === 0 ? '#9ca3af' : '#374151',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px', fontWeight: '600',
            }}
          >
            ← Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion((c) => c + 1)}
              style={{ padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#6d28d9', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              style={{ padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#10b981', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              ✓ Submit Quiz
            </button>
          )}
        </div>

        {/* Quick Nav */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Navigation</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                style={{
                  width: '32px', height: '32px', borderRadius: '6px', border: 'none',
                  backgroundColor: currentQuestion === idx ? '#6d28d9' : selectedAnswers[idx] !== null ? '#c4b5fd' : '#f3f4f6',
                  color: currentQuestion === idx ? 'white' : selectedAnswers[idx] !== null ? '#4c1d95' : '#6b7280',
                  cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#c4b5fd', borderRadius: '2px', marginRight: '4px' }} />Answered &nbsp;
            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#f3f4f6', borderRadius: '2px', marginRight: '4px' }} />Not answered
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function QuizTakingPage({ params }: { params: { subject: Subject } }) {
  return (
    <AuthGuard checkLimit={true} redirectAfterLogin={`/quiz/${params.subject}`}>
      <QuizScreen subject={params.subject} />
    </AuthGuard>
  );
}
