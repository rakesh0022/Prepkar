'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

type Subject = 'polity' | 'economy' | 'geography' | 'history' | 'science' | 'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

export default function QuizTakingPage({ params }: { params: { subject: Subject } }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizConfig, setQuizConfig] = useState<{ numQuestions: number; difficulty: string }>({ numQuestions: 10, difficulty: 'all' });
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    // Load quiz settings
    const settings = JSON.parse(localStorage.getItem('quizSettings') || '{"numQuestions": 10, "difficulty": "all"}');
    setQuizConfig(settings);

    // Load questions from JSON
    fetch(`/quizzes/${params.subject}.json`)
      .then((res) => res.json())
      .then((data: QuizQuestion[]) => {
        let filtered = data;

        // Filter by difficulty
        if (settings.difficulty !== 'all') {
          filtered = filtered.filter((q) => q.difficulty === settings.difficulty);
        }

        // Shuffle and limit
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, settings.numQuestions));
        setSelectedAnswers(new Array(Math.min(settings.numQuestions, filtered.length)).fill(null));
        setStartTime(Date.now());
      });
  }, [params.subject]);

  if (questions.length === 0) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Loading quiz...</div>
        </div>
      </main>
    );
  }

  if (showResults) {
    const score = selectedAnswers.filter((ans, idx) => ans === questions[idx].correct).length;
    const percentage = Math.round((score / questions.length) * 100);
    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeTakenSeconds / 60);
    const seconds = timeTakenSeconds % 60;

    // Save score to localStorage
    useEffect(() => {
      const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      scores.push({
        date: new Date().toISOString(),
        subject: params.subject,
        score,
        total: questions.length,
        time: timeTakenSeconds,
      });
      localStorage.setItem('quizScores', JSON.stringify(scores));
    }, []);

    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: 76 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
          {/* Results Header */}
          <div
            style={{
              backgroundColor: percentage >= 70 ? '#d1fae5' : percentage >= 50 ? '#fef3c7' : '#fee2e2',
              border: `2px solid ${percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'}`,
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444', marginBottom: '8px' }}>
              {percentage}%
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              You scored {score} out of {questions.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Time taken: {minutes}m {seconds}s
            </div>
          </div>

          {/* Detailed Results */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>📋 Review Your Answers</h2>
            {questions.map((question, idx) => {
              const isCorrect = selectedAnswers[idx] === question.correct;
              return (
                <div
                  key={question.id}
                  style={{
                    marginBottom: '16px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${isCorrect ? '#dcfce7' : '#fecaca'}`,
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                    Q{idx + 1}. {question.question}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    <div>Your answer: {question.options[selectedAnswers[idx] || 0]} {isCorrect ? '✅' : '❌'}</div>
                    {!isCorrect && <div>Correct answer: {question.options[question.correct]} ✓</div>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#374151', backgroundColor: 'rgba(0,0,0,0.02)', padding: '8px', borderRadius: '6px' }}>
                    💡 {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Link href="/quiz" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  color: '#6d28d9',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ← Try Another Quiz
              </div>
            </Link>
            <Link href="/prepare" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: '#6d28d9',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                📚 Start Preparation →
              </div>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];
  const answered = selectedAnswers[currentQuestion] !== null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: 76 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px' }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#6b7280' }}>
            <span>Question {currentQuestion + 1}/{questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: '100%',
                backgroundColor: '#6d28d9',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          {/* Question Text */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {question.question}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              Difficulty: <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{question.difficulty}</span>
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const newAnswers = [...selectedAnswers];
                  newAnswers[currentQuestion] = idx;
                  setSelectedAnswers(newAnswers);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `2px solid ${selectedAnswers[currentQuestion] === idx ? '#6d28d9' : '#e5e7eb'}`,
                  backgroundColor: selectedAnswers[currentQuestion] === idx ? '#ede9fe' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '14px',
                  color: '#111827',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.backgroundColor = selectedAnswers[currentQuestion] === idx ? '#ede9fe' : 'white';
                }}
              >
                <input
                  type="radio"
                  checked={selectedAnswers[currentQuestion] === idx}
                  onChange={() => {}}
                  style={{ marginRight: '12px' }}
                />
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: currentQuestion === 0 ? '#f3f4f6' : 'white',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: currentQuestion === 0 ? '#9ca3af' : '#111827',
            }}
          >
            ← Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #6d28d9',
                backgroundColor: '#6d28d9',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => {
                setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
                setShowResults(true);
              }}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#10b981',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
              }}
            >
              ✓ Submit Quiz
            </button>
          )}
        </div>

        {/* Question Indicator */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#6b7280' }}>Quick Navigation</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))', gap: '6px' }}>
            {questions.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor:
                    currentQuestion === idx ? '#6d28d9' : selectedAnswers[idx] !== null ? '#d1d5db' : '#e5e7eb',
                  color: currentQuestion === idx ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}