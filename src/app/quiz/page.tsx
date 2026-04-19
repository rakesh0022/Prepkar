'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import AuthGuard from '@/components/AuthGuard';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';

type Difficulty = 'easy' | 'medium' | 'hard' | 'all';
type Subject = 'polity' | 'economy' | 'geography' | 'history' | 'science' |
  'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

const SUBJECTS: { id: Subject; name: string; description: string; icon: string }[] = [
  { id: 'polity',               name: 'Polity',          description: '30 questions', icon: '🏛️' },
  { id: 'economy',              name: 'Economy',         description: '30 questions', icon: '💰' },
  { id: 'geography',            name: 'Geography',       description: '30 questions', icon: '🗺️' },
  { id: 'history',              name: 'History',         description: '30 questions', icon: '📚' },
  { id: 'science',              name: 'Science',         description: '30 questions', icon: '🔬' },
  { id: 'current-affairs',      name: 'Current Affairs', description: '20 questions', icon: '📰' },
  { id: 'quantitative-aptitude',name: 'Quant Aptitude',  description: '20 questions', icon: '🧮' },
  { id: 'english',              name: 'English',         description: '20 questions', icon: '📖' },
  { id: 'reasoning',            name: 'Reasoning',       description: '20 questions', icon: '🧩' },
];

function QuizSetup() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [numQuestions, setNumQuestions] = useState(10);
  const { attempts, limitReached, limit } = useQuizAttempts();
  const router = useRouter();

  const handleStart = () => {
    if (!selectedSubject) { alert('Please select a subject first'); return; }
    if (limitReached) return;
    localStorage.setItem('quizSettings', JSON.stringify({ selectedSubject, difficulty, numQuestions }));
    router.push(`/quiz/${selectedSubject}`);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', color: 'white', padding: '40px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Free Online Quizzes</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>Master the concepts with interactive MCQ quizzes</p>
        <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
          📊 Attempts today: {attempts}/{limit}
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>

        {/* Subject Selection */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '14px', color: '#111827' }}>📚 Choose Subject</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              style={{
                backgroundColor: selectedSubject === s.id ? '#6d28d9' : 'white',
                color: selectedSubject === s.id ? 'white' : '#111827',
                borderRadius: '12px', padding: '16px',
                border: `2px solid ${selectedSubject === s.id ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{s.name}</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>{s.description}</div>
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>⚙️ Difficulty</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              style={{
                backgroundColor: difficulty === level ? '#6d28d9' : 'white',
                color: difficulty === level ? 'white' : '#374151',
                borderRadius: '10px', padding: '11px 8px',
                border: `2px solid ${difficulty === level ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
              }}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Number of Questions */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>🎯 Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {[10, 20, 30].map((n) => (
            <button
              key={n}
              onClick={() => setNumQuestions(n)}
              style={{
                backgroundColor: numQuestions === n ? '#6d28d9' : 'white',
                color: numQuestions === n ? 'white' : '#374151',
                borderRadius: '10px', padding: '11px',
                border: `2px solid ${numQuestions === n ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
              }}
            >
              {n} Questions
            </button>
          ))}
        </div>

        {/* Limit warning */}
        {limitReached && (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>
              📋 Daily limit reached — {attempts}/{limit} attempts used today.
            </div>
            <a href="/pricing" style={{ fontSize: '12px', color: '#b45309', display: 'block', marginTop: '6px' }}>
              Upgrade for unlimited access →
            </a>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={limitReached || !selectedSubject}
          style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
            backgroundColor: limitReached ? '#d1d5db' : !selectedSubject ? '#a78bfa' : '#6d28d9',
            color: 'white', fontSize: '16px', fontWeight: 'bold',
            cursor: limitReached || !selectedSubject ? 'not-allowed' : 'pointer',
            opacity: limitReached ? 0.6 : 1, transition: 'all 0.2s',
          }}
        >
          {limitReached ? '❌ Daily limit reached' : !selectedSubject ? 'Select a subject first' : '🚀 Start Quiz'}
        </button>

        {/* Info */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>ℹ️ How It Works</h3>
          <ul style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.9', paddingLeft: '16px', margin: 0 }}>
            <li>Answer questions one by one with instant feedback</li>
            <li>Detailed explanations for every answer</li>
            <li>Track your progress and scores</li>
            <li>{limit} free quiz attempts per day (upgrade for unlimited)</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

export default function QuizPage() {
  return (
    <AuthGuard redirectAfterLogin="/quiz">
      <QuizSetup />
    </AuthGuard>
  );
}
