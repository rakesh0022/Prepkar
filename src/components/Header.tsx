'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useStreak } from '@/hooks/useStreak';
import { useSavedArticles } from '@/hooks/useSavedArticles';
import NotificationBell from '@/components/NotificationBell';

type PracticeSession = {
  created_at: string;
  exam_name: string;
  stage_name: string;
  score_overall: number;
};

type QuizHistoryEntry = {
  date: string;
  score: number;
  subject: string;
  total: number;
};

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
  badge?: string;
  isNew?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const DESKTOP_LINKS = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/ai-practice', label: 'AI Practice' },
  { href: '/salary-calculator', label: 'Salary Calculator' },
  { href: '/compare', label: 'Comparisons' },
  { href: '/study-plan', label: 'Study Plan' },
];

const MORE_LINKS = [
  { href: '/current-affairs', label: 'Current Affairs' },
  { href: '/cutoffs', label: 'Cutoffs' },
  { href: '/exam-calendar', label: 'Exam Calendar' },
  { href: '/life', label: 'Day in Life' },
];

const MOBILE_SECTIONS: NavSection[] = [
  {
    title: 'Prepare',
    items: [
      {
        href: '/quiz',
        label: 'Quiz Practice',
        description: 'Timed subject quizzes and daily mocks',
        icon: '📝',
        accent: '#2563EB',
        badge: '500+ questions',
      },
      {
        href: '/ai-practice',
        label: 'AI Practice',
        description: 'Guided answer evaluation for major exams',
        icon: '🎯',
        accent: '#7C3AED',
        badge: 'Essay & Interview',
      },
      {
        href: '/study-plan',
        label: 'Study Plan',
        description: 'AI-powered personalized study schedule',
        icon: '📅',
        accent: '#0891B2',
        badge: 'AI',
      },
      {
        href: '/quiz',
        label: 'Question Bank',
        description: 'Static MCQ sets across core subjects',
        icon: '📚',
        accent: '#D97706',
      },
    ],
  },
  {
    title: 'Explore',
    items: [
      {
        href: '/jobs',
        label: 'Jobs & Careers',
        description: 'Roles, career paths, and real-life insights',
        icon: '💼',
        accent: '#0F766E',
      },
      {
        href: '/salary-calculator',
        label: 'Salary Calculator',
        description: 'Estimate in-hand pay and allowances',
        icon: '💰',
        accent: '#059669',
      },
      {
        href: '/compare',
        label: 'Comparisons',
        description: 'See side-by-side exam and role tradeoffs',
        icon: '📊',
        accent: '#4F46E5',
      },
      {
        href: '/current-affairs',
        label: 'Current Affairs',
        description: 'Daily updates for GK and interview prep',
        icon: '📰',
        accent: '#DC2626',
      },
    ],
  },
  {
    title: 'Track',
    items: [
      {
        href: '/cutoffs',
        label: 'Cutoffs & Trends',
        description: 'Track competition level and score movement',
        icon: '📈',
        accent: '#2563EB',
      },
      {
        href: '/exam-calendar',
        label: 'Exam Calendar',
        description: 'Stay on top of dates, forms, and deadlines',
        icon: '📅',
        accent: '#EA580C',
      },
      {
        href: '/saved',
        label: 'Saved Articles',
        description: 'Your reading list of saved guides and stories',
        icon: '🔖',
        accent: '#0891B2',
        badge: 'New',
        isNew: true,
      },
    ],
  },
];

function getFirstName(session: Session | null): string {
  const fullName = session?.user?.user_metadata?.full_name as string | undefined;
  if (fullName?.trim()) return fullName.trim().split(/\s+/)[0];

  const email = session?.user?.email;
  if (!email) return 'Aspirant';

  const local = email.split('@')[0]?.replace(/[._-]+/g, ' ').trim();
  if (!local) return 'Aspirant';

  const [first = 'Aspirant'] = local.split(/\s+/);
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function formatSubjectLabel(subject: string): string {
  return subject
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('Aspirant');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);
  const pathname = usePathname();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { streak } = useStreak();
  const { savedCount } = useSavedArticles();

  const mobileSections = MOBILE_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) =>
      item.href === '/saved'
        ? {
            ...item,
            badge: savedCount > 0 ? `${savedCount} saved` : 'New',
            isNew: savedCount === 0,
          }
        : item
    ),
  }));

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const loadQuizHistory = () => {
      try {
        const raw = localStorage.getItem('quizScores');
        const parsed = raw ? (JSON.parse(raw) as QuizHistoryEntry[]) : [];
        if (isMounted) setQuizHistory(parsed.slice(-10).reverse());
      } catch {
        if (isMounted) setQuizHistory([]);
      }
    };

    const syncSession = async (session: Session | null) => {
      if (!isMounted) return;

      setIsLoggedIn(!!session);
      setUserFirstName(getFirstName(session));
      loadQuizHistory();

      if (!session?.user) {
        setPracticeSessions([]);
        return;
      }

      const { data } = await supabase
        .from('practice_sessions')
        .select('created_at, exam_name, stage_name, score_overall')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(8);

      if (isMounted) setPracticeSessions((data as PracticeSession[]) || []);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      void syncSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!showMobileMenu) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (pathname === '/login') return null;

  const avatarLetter = userFirstName.charAt(0).toUpperCase() || 'A';
  const latestPractice = practiceSessions[0] || null;
  const latestQuiz = quizHistory[0] || null;
  const totalActivityCount = practiceSessions.length + quizHistory.length;
  const xp = totalActivityCount * 35 + streak * 10;
  const level = Math.max(1, Math.floor(xp / 120) + 1);
  const xpIntoLevel = xp % 120;
  const xpProgress = Math.min(100, Math.round((xpIntoLevel / 120) * 100));

  const continueCard = latestPractice
    ? {
        href: '/ai-practice',
        icon: '⏱️',
        label: `Continue ${latestPractice.exam_name}`,
        description: latestPractice.stage_name || 'Pick up your latest AI practice session',
      }
    : latestQuiz
      ? {
          href: `/quiz/${latestQuiz.subject}`,
          icon: '↺',
          label: `Continue ${formatSubjectLabel(latestQuiz.subject)}`,
          description: `Last quiz score ${latestQuiz.score}/${latestQuiz.total}`,
        }
      : null;

  return (
    <>
      <header
        className="desktop-only"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
            </div>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {DESKTOP_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: pathname === href ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Link>
            ))}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowMoreDropdown(true)}
              onMouseLeave={() => setShowMoreDropdown(false)}
            >
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: MORE_LINKS.some((l) => l.href === pathname) ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
                  fontSize: 14,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  padding: 0,
                }}
              >
                More <span style={{ fontSize: 10 }}>▾</span>
              </button>
              {showMoreDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: 180,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(15,36,64,0.16)',
                    border: '1px solid rgba(15,36,64,0.06)',
                    padding: '6px 0',
                    zIndex: 100,
                  }}
                >
                  {MORE_LINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      style={{
                        display: 'block',
                        padding: '10px 18px',
                        fontSize: 13,
                        color: pathname === href ? '#2563EB' : '#334155',
                        textDecoration: 'none',
                        fontWeight: pathname === href ? 700 : 500,
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="dm-toggle"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            />

            <Link
              href="/saved"
              style={{
                position: 'relative',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: pathname.startsWith('/saved') ? '#5EEAD4' : 'rgba(255,255,255,0.75)',
                padding: '6px',
              }}
              title="Saved articles"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {savedCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    background: '#EF4444',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  {savedCount}
                </span>
              )}
            </Link>

            <NotificationBell />

            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 10px 6px 6px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #5EEAD4, #3B82F6)',
                      color: '#0F2440',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    {avatarLetter}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{userFirstName}</span>
                </button>

                {showUserMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      minWidth: 240,
                      background: 'var(--bg-card)',
                      borderRadius: 16,
                      boxShadow: '0 24px 48px rgba(15,36,64,0.18)',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 4 }}>Welcome back</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-dark)' }}>{userFirstName}</div>
                      <div style={{ fontSize: 12, color: '#2563EB', marginTop: 6 }}>
                        {streak} day streak · Level {level}
                      </div>
                    </div>

                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '11px 16px', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>
                        Profile
                      </div>
                    </Link>
                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '11px 16px', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>
                        Progress
                      </div>
                    </Link>
                    <Link href="/pricing" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '11px 16px', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>
                        Upgrade
                      </div>
                    </Link>
                    <div style={{ borderTop: '1px solid var(--border)', padding: 12 }}>
                      <button
                        onClick={handleSignOut}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#991B1B',
                          background: '#FEF2F2',
                          border: '1px solid #FECACA',
                          cursor: 'pointer',
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                style={{
                  padding: '8px 20px',
                  background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <header
        className="mobile-only"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 80,
          background: 'rgba(248,249,251,0.94)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(15,23,42,0.06)',
          boxShadow: '0 10px 24px rgba(15,23,42,0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 58,
            padding: '0 16px',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 17, fontWeight: 800, color: '#0F2440', letterSpacing: -0.5 }}>
              Naukri<span style={{ color: '#0D9488' }}>Yatra</span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className="dm-toggle"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{ transform: 'scale(0.88)' }}
            />

            <Link
              href="/saved"
              style={{
                position: 'relative',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: pathname.startsWith('/saved') ? '#2563EB' : '#475569',
                padding: '6px',
              }}
              aria-label="Saved articles"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {savedCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 1,
                    right: 1,
                    minWidth: 14,
                    height: 14,
                    borderRadius: 7,
                    background: '#EF4444',
                    color: '#fff',
                    fontSize: 8,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  {savedCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5EEAD4, #3B82F6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#0F2440',
                    boxShadow: '0 8px 16px rgba(37,99,235,0.18)',
                  }}
                >
                  {avatarLetter}
                </div>
              </Link>
            ) : (
              <button
                onClick={handleSignIn}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                }}
                aria-label="Sign in"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            )}

            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                border: '1px solid rgba(148,163,184,0.25)',
                background: showMobileMenu ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.84)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: showMobileMenu ? '#2563EB' : '#334155',
                boxShadow: '0 6px 18px rgba(15,23,42,0.05)',
                transition: 'all 0.22s ease',
              }}
              aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
            >
              {showMobileMenu ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className="mobile-only"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          pointerEvents: showMobileMenu ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setShowMobileMenu(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            inset: 0,
            border: 'none',
            background: showMobileMenu ? 'rgba(15,23,42,0.26)' : 'rgba(15,23,42,0)',
            backdropFilter: showMobileMenu ? 'blur(8px)' : 'blur(0px)',
            transition: 'all 0.25s ease',
          }}
        />

        <aside
          style={{
            position: 'absolute',
            top: 58,
            right: 0,
            bottom: 0,
            width: 'min(88vw, 380px)',
            background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 32%, #F8FBFF 100%)',
            borderLeft: '1px solid rgba(226,232,240,0.9)',
            boxShadow: '-18px 0 40px rgba(15,23,42,0.12)',
            transform: showMobileMenu ? 'translateX(0)' : 'translateX(104%)',
            transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 24px' }}>
            <div
              style={{
                borderRadius: 24,
                padding: 16,
                background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(13,148,136,0.08))',
                border: '1px solid rgba(191,219,254,0.9)',
                boxShadow: '0 16px 32px rgba(37,99,235,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563EB, #0D9488)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    fontWeight: 800,
                    fontFamily: "'Outfit'",
                    flexShrink: 0,
                  }}
                >
                  {avatarLetter}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#64748B', textTransform: 'uppercase' }}>
                    Your prep
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>{isLoggedIn ? userFirstName : 'Guest'}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 10px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        background: '#FFF7ED',
                        color: '#C2410C',
                        border: '1px solid #FED7AA',
                      }}
                    >
                      🔥 {streak} day streak
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 10px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        background: '#EFF6FF',
                        color: '#1D4ED8',
                        border: '1px solid #BFDBFE',
                      }}
                    >
                      Level {level} · {xp} XP
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>Progress to next level</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB' }}>{xpIntoLevel}/120 XP</span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 999,
                    background: 'rgba(148,163,184,0.18)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${xpProgress}%`,
                      height: '100%',
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, #2563EB, #0D9488)',
                      transition: 'width 0.25s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <div
                    className="card-lift"
                    style={{
                      borderRadius: 16,
                      padding: '12px 14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(226,232,240,0.9)',
                      color: '#0F172A',
                      boxShadow: '0 8px 18px rgba(15,23,42,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 800 }}>Profile</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>Account and preferences</div>
                  </div>
                </Link>
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <div
                    className="card-lift"
                    style={{
                      borderRadius: 16,
                      padding: '12px 14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(226,232,240,0.9)',
                      color: '#0F172A',
                      boxShadow: '0 8px 18px rgba(15,23,42,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 800 }}>Progress</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>
                      {totalActivityCount > 0 ? `${totalActivityCount} recent activity items` : 'Start tracking your journey'}
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <Link href="/quiz/current-affairs" style={{ textDecoration: 'none' }}>
                <div
                  className="card-premium"
                  style={{
                    borderRadius: 20,
                    padding: '14px 16px',
                    background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
                    color: '#fff',
                    boxShadow: '0 16px 28px rgba(15,36,64,0.18)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.1, opacity: 0.8, textTransform: 'uppercase' }}>
                        Daily quick action
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>Today&apos;s Challenge</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                        Jump into a current affairs quiz set
                      </div>
                    </div>
                    <div
                      style={{
                        minWidth: 74,
                        borderRadius: 999,
                        padding: '6px 10px',
                        textAlign: 'center',
                        background: 'rgba(94,234,212,0.18)',
                        color: '#99F6E4',
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      Daily
                    </div>
                  </div>
                </div>
              </Link>

              {continueCard && (
                <Link href={continueCard.href} style={{ textDecoration: 'none' }}>
                  <div
                    className="card-lift"
                    style={{
                      borderRadius: 20,
                      padding: '14px 16px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(191,219,254,0.9)',
                      boxShadow: '0 12px 22px rgba(37,99,235,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 14,
                          background: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                        }}
                      >
                        {continueCard.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{continueCard.label}</div>
                        <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>{continueCard.description}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              {mobileSections.map((section) => (
                <div key={section.title} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(203,213,225,0.9)' }} />
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: '#64748B',
                      }}
                    >
                      {section.title}
                    </div>
                    <div style={{ flex: 1, height: 1, background: 'rgba(203,213,225,0.9)' }} />
                  </div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {section.items.map((item) => {
                      const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                      return (
                        <Link key={`${section.title}-${item.href}-${item.label}`} href={item.href} style={{ textDecoration: 'none' }}>
                          <div
                            className="card-lift"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              padding: '14px 14px',
                              borderRadius: 20,
                              background: active ? `${item.accent}12` : '#FFFFFF',
                              border: active ? `1px solid ${item.accent}44` : '1px solid rgba(226,232,240,0.9)',
                              boxShadow: active ? `0 14px 24px ${item.accent}14` : '0 8px 18px rgba(15,23,42,0.04)',
                              transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
                            }}
                          >
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: 16,
                                background: active ? `${item.accent}1F` : `${item.accent}14`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 22,
                                flexShrink: 0,
                              }}
                            >
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 14, fontWeight: 800, color: active ? item.accent : '#0F172A' }}>{item.label}</span>
                                {item.badge && (
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      padding: '4px 8px',
                                      borderRadius: 999,
                                      fontSize: 10,
                                      fontWeight: 800,
                                      color: item.isNew ? '#065F46' : item.accent,
                                      background: item.isNew ? '#DCFCE7' : `${item.accent}12`,
                                      border: `1px solid ${item.isNew ? '#BBF7D0' : `${item.accent}22`}`,
                                    }}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 1.45 }}>{item.description}</div>
                            </div>
                            <div style={{ color: active ? item.accent : '#94A3B8', fontSize: 18, fontWeight: 700 }}>›</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '14px 16px calc(14px + env(safe-area-inset-bottom))',
              borderTop: '1px solid rgba(226,232,240,0.9)',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 14,
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 14,
                  background: 'linear-gradient(90deg, #2563EB, #0D9488)',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Sign In to Save Progress
              </button>
            )}
          </div>
        </aside>
      </div>

      {showUserMenu && (
        <div
          onClick={() => setShowUserMenu(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
        />
      )}
    </>
  );
}
