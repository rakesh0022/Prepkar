'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import AuthGuard from '@/components/AuthGuard';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type Difficulty = 'easy' | 'medium' | 'hard' | 'all';
type Subject = 'polity' | 'economy' | 'geography' | 'history' | 'science' |
  'current-affairs' | 'quantitative-aptitude' | 'english' | 'reasoning';

const SUBJECTS: { id: Subject; name: string; questions: number; icon: string; gradient: string; iconBg: string; color: string }[] = [
  { id: 'polity',                name: 'Polity',          questions: 30, icon: '🏛️', gradient: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', iconBg: 'rgba(37,99,235,0.1)', color: '#2563EB' },
  { id: 'economy',              name: 'Economy',         questions: 30, icon: '💰', gradient: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', iconBg: 'rgba(16,185,129,0.1)', color: '#059669' },
  { id: 'geography',            name: 'Geography',       questions: 30, icon: '🗺️', gradient: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', iconBg: 'rgba(217,119,6,0.1)', color: '#D97706' },
  { id: 'history',              name: 'History',         questions: 30, icon: '📚', gradient: 'linear-gradient(135deg,#FDF4FF,#FAE8FF)', iconBg: 'rgba(168,85,247,0.1)', color: '#7C3AED' },
  { id: 'science',              name: 'Science',         questions: 30, icon: '🔬', gradient: 'linear-gradient(135deg,#F0FDFA,#CCFBF1)', iconBg: 'rgba(20,184,166,0.1)', color: '#0D9488' },
  { id: 'current-affairs',      name: 'Current Affairs', questions: 20, icon: '📰', gradient: 'linear-gradient(135deg,#FEE2E2,#FECACA)', iconBg: 'rgba(239,68,68,0.1)', color: '#DC2626' },
  { id: 'quantitative-aptitude',name: 'Quant Aptitude',  questions: 20, icon: '🧮', gradient: 'linear-gradient(135deg,#E0E7FF,#C7D2FE)', iconBg: 'rgba(99,102,241,0.1)', color: '#4F46E5' },
  { id: 'english',              name: 'English',         questions: 20, icon: '📖', gradient: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', iconBg: 'rgba(234,88,12,0.1)', color: '#EA580C' },
  { id: 'reasoning',            name: 'Reasoning',       questions: 20, icon: '🧩', gradient: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', iconBg: 'rgba(124,58,237,0.1)', color: '#6D28D9' },
];

const DIFFICULTIES: { id: Difficulty; label: string; icon: string; desc: string }[] = [
  { id: 'all', label: 'All Levels', icon: '🎯', desc: 'Mixed difficulty' },
  { id: 'easy', label: 'Easy', icon: '🟢', desc: 'Build confidence' },
  { id: 'medium', label: 'Medium', icon: '🟡', desc: 'Standard level' },
  { id: 'hard', label: 'Hard', icon: '🔴', desc: 'Challenge yourself' },
];

function QuizSetup() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [numQuestions, setNumQuestions] = useState(10);
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);
  const { attempts, limitReached, limit } = useQuizAttempts();
  const router = useRouter();

  const handleStart = () => {
    if (!selectedSubject) { alert('Please select a subject first'); return; }
    if (limitReached) return;
    
    // Check login before starting
    const checkLogin = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = `/login?next=/quiz`;
        return;
      }
      localStorage.setItem('quizSettings', JSON.stringify({ selectedSubject, difficulty, numQuestions }));
      router.push(`/quiz/${selectedSubject}`);
    };
    checkLogin();
  };

  const totalQuestions = SUBJECTS.reduce((s, sub) => s + sub.questions, 0);
  const progressPercent = Math.min(100, (attempts / limit) * 100);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      {/* ═══ PREMIUM HERO ═══ */}
      <section className="anim-up" style={{
        background: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 30%, #7C3AED 60%, #8B5CF6 100%)',
        color: '#fff', padding: '48px 16px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', top: -60, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 100, padding: '6px 16px', marginBottom: 16, backdropFilter: 'blur(8px)' }}>
            <span style={{ fontSize: 16 }}>📚</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>QUESTION BANK</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Practice Makes<br/>
            <span style={{ color: '#FDE68A' }}>Selection</span>
          </h1>
          <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 28, maxWidth: 400, margin: '0 auto 28px' }}>
            Subject-wise MCQ sets curated from previous year papers & expert collections
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            {[
              { n: `${totalQuestions}+`, l: 'MCQs', icon: '📝' },
              { n: `${SUBJECTS.length}`, l: 'Subjects', icon: '📖' },
              { n: '3', l: 'Difficulty Levels', icon: '🎯' },
            ].map((s, i) => (
              <div key={i} className="anim-up" style={{ textAlign: 'center', animationDelay: `${0.1 + i * 0.1}s` }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Outfit'", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{s.icon} {s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* ═══ INTERACTIVE TEASER: SAMPLE QUESTION ═══ */}
        <div className="anim-up card-premium" style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(109,40,217,0.05))',
          borderRadius: 18, padding: '20px', marginBottom: 24,
          border: '1px solid rgba(109,40,217,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>Sample Question of the Day</div>
          </div>
          
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-body)', marginBottom: 16, lineHeight: 1.4 }}>
            Which article of the Indian Constitution is related to the establishment of the Finance Commission?
          </div>
          
          <div style={{ display: 'grid', gap: 10 }}>
            {['Article 280', 'Article 324', 'Article 315', 'Article 148'].map((opt) => {
              const isSelected = sampleAnswer === opt;
              const isCorrect = opt === 'Article 280';
              const showStatus = sampleAnswer !== null;
              
              let bg = 'var(--bg-card)';
              let border = 'var(--border)';
              let color = 'var(--text-body)';

              if (showStatus) {
                if (isCorrect) {
                  bg = 'rgba(16,185,129,0.1)'; border = '#10B981'; color = '#065F46';
                } else if (isSelected) {
                  bg = 'rgba(239,68,68,0.1)'; border = '#EF4444'; color = '#991B1B';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => !sampleAnswer && setSampleAnswer(opt)}
                  style={{
                    padding: '14px 16px', borderRadius: 12, border: `1px solid ${border}`,
                    background: bg, color: color, fontSize: 14, fontWeight: 600,
                    textAlign: 'left', cursor: sampleAnswer ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <span>{opt}</span>
                  {showStatus && isCorrect && <span>✅</span>}
                  {showStatus && isSelected && !isCorrect && <span>❌</span>}
                </button>
              );
            })}
          </div>

          {sampleAnswer && (
            <div className="anim-up" style={{ marginTop: 16, padding: '14px', background: 'rgba(37,99,235,0.08)', borderRadius: 12, border: '1px solid rgba(37,99,235,0.2)' }}>
              <div style={{ fontSize: 13, color: 'var(--text-dark)', fontWeight: 700, marginBottom: 4 }}>
                {sampleAnswer === 'Article 280' ? '🎉 Correct!' : '💡 The correct answer is Article 280.'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', lineHeight: 1.5, marginBottom: 12 }}>
                Article 280 of the Constitution of India provides for a Finance Commission as a quasi-judicial body. It is constituted by the president of India every fifth year or at such earlier time as he considers necessary.
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🔥 Want to practice 500+ more? Select a subject below!</span>
              </div>
            </div>
          )}
        </div>

        {/* ═══ DAILY PROGRESS BAR ═══ */}
        <div className="anim-up-1" style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: '16px 18px',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>📊</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>Today&apos;s Progress</div>
                <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{attempts} of {limit} attempts used</div>
              </div>
            </div>
            {limitReached ? (
              <span className="badge badge-hot">Limit Reached</span>
            ) : (
              <span className="badge badge-live">✓ Active</span>
            )}
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{
              width: `${progressPercent}%`,
              background: limitReached
                ? 'linear-gradient(90deg, #DC2626, #F87171)'
                : 'linear-gradient(90deg, #6D28D9, #8B5CF6)',
            }} />
          </div>
          {limitReached && (
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <div style={{
                marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(90deg, #6D28D9, #4C1D95)', borderRadius: 10,
                padding: '10px', color: '#fff', fontSize: 12, fontWeight: 700,
              }}>
                🚀 Upgrade for Unlimited Access
              </div>
            </Link>
          )}
        </div>

        {/* ═══ SUBJECT SELECTION ═══ */}
        <div className="anim-up-2">
          <div className="divider-text" style={{ marginBottom: 16 }}>Choose Your Subject</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 12, marginBottom: 32,
          }}>
            {SUBJECTS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className="anim-up card-premium"
                style={{
                  padding: '18px 14px',
                  borderRadius: 16,
                  border: selectedSubject === s.id ? `2px solid ${s.color}` : '2px solid var(--border)',
                  background: selectedSubject === s.id ? s.gradient : 'var(--bg-card)',
                  cursor: 'pointer', textAlign: 'center',
                  animationDelay: `${0.1 + i * 0.04}s`,
                  boxShadow: selectedSubject === s.id ? `0 4px 20px ${s.color}25` : 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: selectedSubject === s.id ? `${s.color}15` : s.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, margin: '0 auto 10px',
                  transition: 'transform 0.3s ease',
                  transform: selectedSubject === s.id ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: selectedSubject === s.id ? s.color : 'var(--text-dark)', marginBottom: 2 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 10, color: selectedSubject === s.id ? s.color : 'var(--text-light)', fontWeight: 500 }}>
                  {s.questions} questions
                </div>
                {selectedSubject === s.id && (
                  <div style={{
                    marginTop: 8, width: 22, height: 22, borderRadius: '50%',
                    background: s.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, margin: '8px auto 0', fontWeight: 700,
                  }}>✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ DIFFICULTY & QUESTIONS — SIDE BY SIDE ON DESKTOP ═══ */}
        <div className="anim-up-3" style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 32,
        }}>
          {/* Difficulty */}
          <div>
            <div className="divider-text" style={{ marginBottom: 14 }}>Difficulty Level</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 8 }}>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  style={{
                    padding: '12px 8px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                    background: difficulty === d.id
                      ? 'linear-gradient(135deg, #6D28D9, #4C1D95)'
                      : 'var(--bg-card)',
                    border: difficulty === d.id ? '2px solid #6D28D9' : '2px solid var(--border)',
                    color: difficulty === d.id ? '#fff' : 'var(--text-body)',
                    boxShadow: difficulty === d.id ? '0 4px 16px rgba(109,40,217,0.25)' : 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{d.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.label}</div>
                  <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Questions Count */}
          <div>
            <div className="divider-text" style={{ marginBottom: 14 }}>Number of Questions</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8 }}>
              {[10, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumQuestions(n)}
                  style={{
                    padding: '14px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                    background: numQuestions === n
                      ? 'linear-gradient(135deg, #6D28D9, #4C1D95)'
                      : 'var(--bg-card)',
                    border: numQuestions === n ? '2px solid #6D28D9' : '2px solid var(--border)',
                    color: numQuestions === n ? '#fff' : 'var(--text-body)',
                    boxShadow: numQuestions === n ? '0 4px 16px rgba(109,40,217,0.25)' : 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Outfit'", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>Questions</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ SELECTED SUMMARY & START ═══ */}
        <div className="anim-up-4" style={{
          background: 'var(--bg-card)', borderRadius: 18, padding: '20px',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', marginBottom: 24,
        }}>
          {selectedSubject ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: SUBJECTS.find(s => s.id === selectedSubject)?.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                  {SUBJECTS.find(s => s.id === selectedSubject)?.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)' }}>
                    {SUBJECTS.find(s => s.id === selectedSubject)?.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>
                    {numQuestions} questions · {difficulty === 'all' ? 'All levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0', marginBottom: 8 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>☝️</div>
              <div style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 500 }}>Select a subject above to begin</div>
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={limitReached || !selectedSubject}
            style={{
              width: '100%', padding: '16px', borderRadius: 14, border: 'none',
              background: limitReached
                ? 'var(--bg-card-2)'
                : !selectedSubject
                ? 'linear-gradient(135deg, #A78BFA, #8B5CF6)'
                : 'linear-gradient(135deg, #6D28D9, #4C1D95)',
              color: limitReached ? 'var(--text-faint)' : '#fff',
              fontSize: 15, fontWeight: 700, cursor: limitReached || !selectedSubject ? 'not-allowed' : 'pointer',
              opacity: limitReached ? 0.6 : 1, transition: 'all 0.3s ease',
              boxShadow: selectedSubject && !limitReached ? '0 4px 20px rgba(109,40,217,0.35)' : 'none',
              letterSpacing: 0.3,
            }}
          >
            {limitReached ? '❌ Daily Limit Reached' : !selectedSubject ? 'Select a Subject First' : '🚀 Start Quiz'}
          </button>
        </div>

        {/* ═══ HOW IT WORKS — PREMIUM STEPS ═══ */}
        <div className="anim-up-5" style={{
          background: 'var(--bg-card)', borderRadius: 18, padding: '20px',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', marginBottom: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>💡</span> How It Works
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: '1', title: 'Choose & Configure', desc: 'Select subject, difficulty & question count', icon: '📚', color: '#6D28D9' },
              { step: '2', title: 'Answer Questions', desc: 'One-by-one with instant feedback & explanations', icon: '✍️', color: '#2563EB' },
              { step: '3', title: 'Track Progress', desc: 'Review scores, find weak areas, improve daily', icon: '📊', color: '#059669' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${s.color}10`, color: s.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, flexShrink: 0,
                  fontFamily: "'Outfit'",
                }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>{s.icon} {s.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16, padding: '10px 14px', borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(109,40,217,0.04), rgba(109,40,217,0.08))',
            border: '1px solid rgba(109,40,217,0.1)',
            fontSize: 11, color: '#6D28D9', fontWeight: 600, textAlign: 'center',
          }}>
            💎 {limit} free quiz attempts per day · <Link href="/pricing" style={{ color: '#4C1D95', fontWeight: 700 }}>Upgrade for unlimited</Link>
          </div>
        </div>

        {/* ═══ AI PRACTICE CTA ═══ */}
        <Link href="/ai-practice" style={{ textDecoration: 'none' }}>
          <div className="anim-up-6 card-premium" style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
            borderRadius: 18, padding: '20px', display: 'flex', alignItems: 'center', gap: 16,
            border: 'none', boxShadow: '0 4px 24px rgba(109,40,217,0.25)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0,
            }}>
              🎯
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Want AI-powered practice?</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                Exam-specific stages scored by AI — from Prelims to Interview
              </div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: 20, flexShrink: 0 }}>→</span>
          </div>
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}

export default function QuizPage() {
  return <QuizSetup />;
}
