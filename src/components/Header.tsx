'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Don't show header on login page
  if (pathname === '/login') return null;

  return (
    <>
      {/* Desktop Header */}
      <header className="desktop-only" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: "'Outfit'",
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: -0.5,
            }}>
              Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="/jobs" style={{
              color: pathname === '/jobs' ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'color 0.2s',
            }}>
              Jobs
            </Link>
            <Link href="/salary-calculator" style={{
              color: pathname === '/salary-calculator' ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'color 0.2s',
            }}>
              Salary Calculator
            </Link>
            <Link href="/current-affairs" style={{
              color: pathname === '/current-affairs' ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'color 0.2s',
            }}>
              Current Affairs
            </Link>
            <Link href="/compare" style={{
              color: pathname === '/compare' ? '#5EEAD4' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'color 0.2s',
            }}>
              Comparisons
            </Link>
          </nav>

          {/* Auth Section */}
          <div style={{ position: 'relative' }}>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5EEAD4, #3B82F6)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    color: '#0F2440',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {userEmail?.charAt(0).toUpperCase() || 'U'}
                </button>
                
                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 8,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    minWidth: 200,
                    overflow: 'hidden',
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Signed in as</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{userEmail}</div>
                    </div>
                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '10px 16px',
                        fontSize: 14,
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        📊 Dashboard
                      </div>
                    </Link>
                    <Link href="/pricing" style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '10px 16px',
                        fontSize: 14,
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        💎 Upgrade
                      </div>
                    </Link>
                    <div style={{ borderTop: '1px solid #E5E7EB' }}>
                      <button
                        onClick={handleSignOut}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          fontSize: 14,
                          color: '#DC2626',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
                  boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          onClick={() => setShowUserMenu(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
          }}
        />
      )}
    </>
  );
}
