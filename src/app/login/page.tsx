"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

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
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="anim-up" style={{ background: "#FFFFFF", borderRadius: 20, padding: "32px 24px", maxWidth: 420, width: "100%", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: "#111827" }}>
            Naukri<span style={{ color: "#2563EB" }}>Yatra</span>
          </div>
          <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
            {mode === "login" ? "Log in to track your progress" : "Create your free account"}
          </p>
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
            cursor: loading ? "default" : "pointer",
            boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
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
