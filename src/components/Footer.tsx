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
            { label: 'YouTube', icon: '▶', href: '#', bg: 'rgba(255,0,0,0.15)', color: '#FF4444' },
            { label: 'Telegram', icon: '✈', href: '#', bg: 'rgba(0,136,204,0.15)', color: '#0088CC' },
            { label: 'Instagram', icon: '📷', href: '#', bg: 'rgba(225,48,108,0.15)', color: '#E1306C' },
            { label: 'Twitter', icon: '𝕏', href: '#', bg: 'rgba(255,255,255,0.08)', color: '#fff' },
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
        <div style={{ display: 'flex', gap: 8, maxWidth: 360, margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)', color: '#fff',
              fontSize: 12, outline: 'none',
            }}
          />
          <button style={{
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(90deg, #5EEAD4, #3B82F6)',
            border: 'none', color: '#0F2440', fontSize: 12, fontWeight: 700,
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
