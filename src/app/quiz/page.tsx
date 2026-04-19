'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

type Difficulty = 'easy' | 'medium' | 'hard' | 'all';
type Subject = 'polity' | 'economy' | 'geography' | 'history' | 'science' | 'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [numQuestions, setNumQuestions] = useState(10);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizLimitReached, setQuizLimitReached] = useState(false);

  const subjects: { id: Subject; name: string; description: string; icon: string }[] = [
    { id: 'polity', name: 'Polity', description: '30 questions', icon: '🏛️' },
    { id: 'economy', name: 'Economy', description: '30 questions', icon: '💰' },
    { id: 'geography', name: 'Geography', description: '30 questions', icon: '🗺️' },
    { id: 'history', name: 'History', description: '30 questions', icon: '📚' },
    { id: 'science', name: 'Science', description: '30 questions', icon: '🔬' },
    { id: 'current-affairs', name: 'Current Affairs', description: '20 questions', icon: '📰' },
    { id: 'quantitative-aptitude', name: 'Quant Aptitude', description: '20 questions', icon: '🧮' },
    { id: 'english', name: 'English', description: '20 questions', icon: '📖' },
    { id: 'reasoning', name: 'Reasoning', description: '20 questions', icon: '🧩' },
  ];

  useEffect(() => {
    // Check quiz attempts from localStorage
    const today = new Date().toDateString();
    const lastAttemptDate = localStorage.getItem('quizAttemptDate');
    let attempts = parseInt(localStorage.getItem('quizAttempts') || '0');

    if (lastAttemptDate !== today) {
      // New day, reset attempts
      attempts = 0;
      localStorage.setItem('quizAttemptDate', today);
    }

    setQuizAttempts(attempts);
    setQuizLimitReached(attempts >= 5);
  }, []);

  const handleStartQuiz = () => {
    if (quizLimitReached) return;

    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }

    // Increment attempt count
    const newAttempts = quizAttempts + 1;
    localStorage.setItem('quizAttempts', newAttempts.toString());
    setQuizAttempts(newAttempts);
    if (newAttempts >= 5) {
      setQuizLimitReached(true);
    }

    // Store quiz settings and redirect
    localStorage.setItem('quizSettings', JSON.stringify({ selectedSubject, difficulty, numQuestions }));
    window.location.href = `/quiz/${selectedSubject}`;
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', color: 'white', padding: '40px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Free Online Quizzes</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>Master the concepts with our interactive quizzes</p>
        <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
          📊 Attempts today: {quizAttempts}/5
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        {/* Subject Selection */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>📚 Choose Subject</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              style={{
                backgroundColor: selectedSubject === subject.id ? '#6d28d9' : 'white',
                color: selectedSubject === subject.id ? 'white' : '#111827',
                borderRadius: '12px',
                padding: '16px',
                border: `2px solid ${selectedSubject === subject.id ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (selectedSubject !== subject.id) {
                  (e.currentTarget).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{subject.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{subject.name}</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>{subject.description}</div>
            </div>
          ))}
        </div>

        {/* Difficulty Selection */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>⚙️ Select Difficulty</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {(['easy', 'medium', 'hard', 'all'] as Difficulty[]).map((level) => (
            <div
              key={level}
              onClick={() => setDifficulty(level)}
              style={{
                backgroundColor: difficulty === level ? '#6d28d9' : 'white',
                color: difficulty === level ? 'white' : '#111827',
                borderRadius: '12px',
                padding: '12px',
                border: `2px solid ${difficulty === level ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (difficulty !== level) {
                  (e.currentTarget).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow = 'none';
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </div>
          ))}
        </div>

        {/* Number of Questions */}
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>🎯 Number of Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[10, 20, 30].map((num) => (
            <div
              key={num}
              onClick={() => setNumQuestions(num)}
              style={{
                backgroundColor: numQuestions === num ? '#6d28d9' : 'white',
                color: numQuestions === num ? 'white' : '#111827',
                borderRadius: '12px',
                padding: '12px',
                border: `2px solid ${numQuestions === num ? '#6d28d9' : 'var(--border)'}`,
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (numQuestions !== num) {
                  (e.currentTarget).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow = 'none';
              }}
            >
              {num} Questions
            </div>
          ))}
        </div>

        {/* Limit Warning */}
        {quizLimitReached && (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#92400e', fontWeight: '500' }}>
              📋 Daily limit reached! You've used all 5 free attempts today.
            </div>
            <div style={{ fontSize: '12px', color: '#b45309', marginTop: '8px' }}>
              💡 Upgrade your account to take unlimited quizzes.
            </div>
          </div>
        )}

        {/* Start Button */}
        <div
          onClick={handleStartQuiz}
          style={{
            backgroundColor: quizLimitReached ? '#d1d5db' : '#6d28d9',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: quizLimitReached ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            opacity: quizLimitReached ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!quizLimitReached) {
              (e.currentTarget).style.backgroundColor = '#5b21b6';
            }
          }}
          onMouseLeave={(e) => {
            if (!quizLimitReached) {
              (e.currentTarget).style.backgroundColor = '#6d28d9';
            }
          }}
        >
          {quizLimitReached ? '❌ Daily limit reached' : '🚀 Start Quiz'}
        </div>

        {/* Info Section */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>ℹ️ How It Works</h3>
          <ul style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.8' }}>
            <li>✅ Answer questions one by one</li>
            <li>✅ Instant feedback with explanations</li>
            <li>✅ Track your progress and scores</li>
            <li>✅ 5 free quizzes per day (upgrade for unlimited)</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}