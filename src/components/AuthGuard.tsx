'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';

interface AuthGuardProps {
  children: React.ReactNode;
  /** If true, also enforce the daily attempt limit */
  checkLimit?: boolean;
  /** Redirect path after login (defaults to current page) */
  redirectAfterLogin?: string;
}

export default function AuthGuard({ children, checkLimit = false, redirectAfterLogin }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const { attempts, limitReached, limit } = useQuizAttempts();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setShowLoginModal(true);
    } else if (checkLimit && limitReached) {
      setShowLimitModal(true);
    }
  }, [user, loading, checkLimit, limitReached]);

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    const supabase = createClient();
    const next = redirectAfterLogin ?? window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setAuthLoading(false);
  };

  const handleMaybeLater = () => {
    setShowLoginModal(false);
    router.push('/');
  };

  // Still loading auth state
  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>Checking session…</div>
      </main>
    );
  }

  return (
    <>
      {/* Show content only when logged in and limit not reached */}
      {user && !(checkLimit && limitReached) && children}

      {/* ── Login Required Modal ── */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '20px', padding: '32px 24px',
            maxWidth: '380px', width: '100%', textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Login Required
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
              Sign in to access quizzes, mock tests, and practice sessions.
              Your progress will be saved automatically.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={authLoading}
              style={{
                width: '100%', padding: '13px', borderRadius: '12px',
                border: '1.5px solid #e5e7eb', backgroundColor: 'white',
                color: '#374151', fontSize: '14px', fontWeight: '600',
                cursor: authLoading ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                marginBottom: '12px',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
                <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              {authLoading ? 'Redirecting…' : 'Sign in with Google'}
            </button>

            <button
              onClick={handleMaybeLater}
              style={{
                width: '100%', padding: '11px', borderRadius: '12px',
                border: '1px solid #e5e7eb', backgroundColor: 'transparent',
                color: '#6b7280', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* ── Daily Limit Reached Modal ── */}
      {showLimitModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '20px', padding: '32px 24px',
            maxWidth: '380px', width: '100%', textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Daily Limit Reached
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '8px' }}>
              You&apos;ve used both free attempts today ({attempts}/{limit}).
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
              Come back tomorrow for {limit} more, or upgrade for unlimited access.
            </p>

            <a
              href="/pricing"
              style={{
                display: 'block', width: '100%', padding: '13px', borderRadius: '12px',
                backgroundColor: '#6d28d9', color: 'white',
                fontSize: '14px', fontWeight: '700', textDecoration: 'none',
                marginBottom: '12px',
              }}
            >
              Upgrade to Pro — ₹99/month
            </a>

            <button
              onClick={() => {
                // Set a reminder via notification API if available
                if ('Notification' in window && Notification.permission !== 'denied') {
                  Notification.requestPermission().then((perm) => {
                    if (perm === 'granted') {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(8, 0, 0, 0);
                      const delay = tomorrow.getTime() - Date.now();
                      setTimeout(() => {
                        new Notification('PrepKar — Daily Quiz Ready!', {
                          body: 'Your 2 free quiz attempts are ready. Start practicing now!',
                        });
                      }, delay);
                    }
                  });
                }
                router.push('/');
              }}
              style={{
                width: '100%', padding: '11px', borderRadius: '12px',
                border: '1px solid #e5e7eb', backgroundColor: 'transparent',
                color: '#6b7280', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
              }}
            >
              Set Reminder for Tomorrow
            </button>
          </div>
        </div>
      )}
    </>
  );
}
