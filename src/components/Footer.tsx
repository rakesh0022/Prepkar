import Link from 'next/link';

const POPULAR_TOOLS = [
  { href: '/jobs', label: 'Explore Careers' },
  { href: '/ai-practice', label: 'AI Practice' },
  { href: '/quiz', label: 'Question Bank' },
  { href: '/salary-calculator', label: 'Salary Calculator' },
  { href: '/current-affairs', label: 'Current Affairs' },
];

const RESOURCES = [
  { href: '/compare', label: 'Career Comparisons' },
  { href: '/cutoffs', label: 'Cutoff Analysis' },
  { href: '/exam-calendar', label: 'Exam Calendar' },
  { href: '/life', label: 'Day in Life' },
  { href: '/prepare', label: 'Study Plans' },
];

const COMPANY = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const LEGAL = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer style={{
      marginTop: 40,
      borderRadius: 20,
      padding: '36px 24px 28px',
      background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
      color: '#fff',
    }}>
      {/* Logo + Tagline */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          fontFamily: "'Outfit'",
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 6,
        }}>
          Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px' }}>
          Sapne se Selection Tak
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {[
            { 
              label: 'YouTube', href: '#', bg: 'rgba(255,0,0,0.15)', color: '#FF4444',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> 
            },
            { 
              label: 'Telegram', href: '#', bg: 'rgba(0,136,204,0.15)', color: '#0088CC',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> 
            },
            { 
              label: 'Instagram', href: '#', bg: 'rgba(225,48,108,0.15)', color: '#E1306C',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> 
            },
            { 
              label: 'Twitter', href: '#', bg: 'rgba(255,255,255,0.08)', color: '#fff',
              icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> 
            },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: s.bg, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Links Grid — 4 columns on desktop, 2 on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '28px 20px',
        maxWidth: 700,
        margin: '0 auto 28px',
      }}>
        {/* Popular Tools */}
        <div>
          <FooterHeading>Popular Tools</FooterHeading>
          <FooterLinks links={POPULAR_TOOLS} />
        </div>

        {/* Resources */}
        <div>
          <FooterHeading>Resources</FooterHeading>
          <FooterLinks links={RESOURCES} />
        </div>

        {/* Company */}
        <div>
          <FooterHeading>Company</FooterHeading>
          <FooterLinks links={COMPANY} />
        </div>

        {/* Legal */}
        <div>
          <FooterHeading>Legal</FooterHeading>
          <FooterLinks links={LEGAL} />
        </div>
      </div>

      {/* Newsletter */}
      <div style={{
        maxWidth: 500, margin: '0 auto 28px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 16, padding: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>📧 Stay Updated</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
          Get daily current affairs & exam updates in your inbox
        </div>
        <div style={{ display: 'flex', gap: 8, maxWidth: 360, margin: '0 auto', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              flex: 1, minWidth: 160, padding: '10px 14px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)', color: '#fff',
              fontSize: 14, outline: 'none',
            }}
          />
          <button style={{
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(90deg, #5EEAD4, #3B82F6)',
            border: 'none', color: '#0F2440', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', flexShrink: 0,
          }}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          © 2026 NaukriYatra. All rights reserved.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Made with ❤️ in India 🇮🇳
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: 1.5, textTransform: 'uppercase',
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

function FooterLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} style={{
          fontSize: 12, color: 'rgba(255,255,255,0.65)',
          textDecoration: 'none', transition: 'color 0.2s',
        }}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
