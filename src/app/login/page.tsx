"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginInner() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();
  const redirectTo = params.get("redirect") || "/dashboard";

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push(redirectTo);
    });
  }, [supabase, router, redirectTo]);

  async function handleGoogleLogin() {
    setError(""); setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setSuccess("Account created! Check your email to verify, then log in.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      {/* Left side - Illustration (Desktop only) */}
      <div className="desktop-only" style={{
        flex: 1, height: "100vh", backgroundImage: "url('/images/pages/login-illustration.png')",
        backgroundSize: "cover", backgroundPosition: "center", borderRadius: "40px 0 0 40px",
      }} />
      
      <div className="anim-up" style={{ background: "#FFFFFF", borderRadius: 20, padding: "32px 24px", maxWidth: 420, width: "100%", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: "#111827" }}>
            Naukri<span style={{ color: "#2563EB" }}>Yatra</span>
          </div>
          <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
            {mode === "login" ? "Log in to track your progress" : "Create your free account"}
          </p>
        </div>

        {/* Google Login */}
        <button onClick={handleGoogleLogin} disabled={loading} style={{
          width: "100%", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 600,
          border: "1.5px solid var(--border)", background: "#FFFFFF", color: "#374151",
          cursor: loading ? "default" : "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 10, marginBottom: 16,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 3, marginBottom: 20 }}>
          {(["login", "signup"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }} style={{
              flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: "none", cursor: "pointer",
              background: mode === m ? "#FFFFFF" : "transparent",
              color: mode === m ? "#111827" : "#9CA3AF",
              boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Rakesh Kumar"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#F9FAFB" }} />
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#F9FAFB" }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Minimum 6 characters" minLength={6}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#F9FAFB" }} />
          </div>

          {error && <div style={{ fontSize: 12, color: "#DC2626", background: "#FEF2F2", padding: "8px 12px", borderRadius: 8, marginBottom: 12, border: "1px solid rgba(220,38,38,0.12)" }}>{error}</div>}
          {success && <div style={{ fontSize: 12, color: "#16A34A", background: "#F0FDF4", padding: "8px 12px", borderRadius: 8, marginBottom: 12, border: "1px solid rgba(22,163,74,0.12)" }}>{success}</div>}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "13px", background: loading ? "#93C5FD" : "#2563EB",
            color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
            cursor: loading ? "default" : "pointer", boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
          }}>
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/" style={{ fontSize: 12, color: "#6B7280", textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() { return <Suspense><LoginInner /></Suspense>; }
