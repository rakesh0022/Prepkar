'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useDarkMode } from '@/hooks/useDarkMode';

const NAV_LINKS = [
  { href: '/jobs', label: '💼 Jobs' },
  { href: '/salary-calculator', label: '💰 Salary Calculator' },
  { href: '/current-affairs', label: '📰 Current Affairs' },
  { href: '/compare', label: '⚖️ Comparisons' },
  { href: '/quiz', label: '📚 Question Bank' },
  { href: '/ai-practice', label: '🎯 AI Practice' },
  { href: '/cutoffs', label: '📊 Cutoffs' },
  { href: '/exam-calendar', label: '📅 Exam Calendar' },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email || null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setShowMobileMenu(false); }, [pathname]);

  const handleSignIn = () => { window.location.href = '/login'; };
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (pathname === '/login') return null;

  const avatarLetter = userEmail?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      {/* ── DESKTOP HEADER ── */}
      <header className="desktop-only" style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56,
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
            </div>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { href: '/jobs', label: 'Jobs' },
              { href: '/salary-calculator', label: 'Salary Calculator' },
              { href: '/current-affairs', label: 'Current Affairs' },
              { href: '/compare', label: 'Comparisons' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                color: pathname === href ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.2s',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Dark mode toggle */}
            <button
              className="dm-toggle"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? '☀️ Light mode' : '🌙 Dark mode'}
            />

            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowUserMenu(!showUserMenu)} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #5EEAD4, #3B82F6)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  color: '#0F2440', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {avatarLetter}
                </button>
                {showUserMenu && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: 8,
                    background: 'var(--bg-card)', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    minWidth: 200, overflow: 'hidden', border: '1px solid var(--border)',
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 2 }}>Signed in as</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)' }}>{userEmail}</div>
                    </div>
                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '10px 16px', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>📊 Dashboard</div>
                    </Link>
                    <Link href="/pricing" style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '10px 16px', fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>💎 Upgrade</div>
                    </Link>
                    <div style={{ borderTop: '1px solid var(--border)' }}>
                      <button onClick={handleSignOut} style={{
                        width: '100%', padding: '10px 16px', fontSize: 14, color: '#DC2626',
                        background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer',
                      }}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleSignIn} style={{
                padding: '8px 20px',
                background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE HEADER ── */}
      <header className="mobile-only" style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 52, padding: '0 16px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
            </div>
          </Link>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

            {/* Dark mode toggle */}
            <button
              className="dm-toggle"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{ transform: 'scale(0.85)' }}
            />

            {/* Profile / Sign In icon */}
            {isLoggedIn ? (
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #5EEAD4, #3B82F6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#0F2440',
                }}>
                  {avatarLetter}
                </div>
              </Link>
            ) : (
              <button onClick={handleSignIn} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
              }} aria-label="Sign in">
                {/* Person icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            )}

            {/* Hamburger menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.85)',
              }}
              aria-label="Open menu"
            >
              {showMobileMenu ? (
                /* X icon */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {showMobileMenu && (
          <div style={{
            background: '#0F2440',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '8px 0 16px',
          }}>
            {/* User info if logged in */}
            {isLoggedIn && (
              <div style={{
                padding: '12px 20px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 6,
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Signed in as</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#5EEAD4' }}>{userEmail}</div>
              </div>
            )}

            {/* Nav links */}
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '11px 20px',
                  fontSize: 14, fontWeight: 600,
                  color: pathname === href ? '#5EEAD4' : 'rgba(255,255,255,0.82)',
                  borderLeft: pathname === href ? '3px solid #5EEAD4' : '3px solid transparent',
                  background: pathname === href ? 'rgba(94,234,212,0.06)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                  {label}
                </div>
              </Link>
            ))}

            {/* Auth action at bottom */}
            <div style={{ padding: '12px 20px 0', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 8 }}>
              {isLoggedIn ? (
                <button onClick={handleSignOut} style={{
                  width: '100%', padding: '11px', borderRadius: 10,
                  background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)',
                  color: '#FCA5A5', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>
                  Sign Out
                </button>
              ) : (
                <button onClick={handleSignIn} style={{
                  width: '100%', padding: '11px', borderRadius: 10,
                  background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                  border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Backdrop to close menus */}
      {(showUserMenu || showMobileMenu) && (
        <div onClick={() => { setShowUserMenu(false); setShowMobileMenu(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
        />
      )}
    </>
  );
}
