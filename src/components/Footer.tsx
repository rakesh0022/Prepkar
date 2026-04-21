import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 40,
      borderRadius: 20,
      padding: '32px 24px',
      background: 'linear-gradient(135deg, #0F2440, #1E3A5F)',
      color: '#fff',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Outfit'",
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 4,
        }}>
          Naukri<span style={{ color: '#5EEAD4' }}>Yatra</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Sapne se Selection Tak
        </p>
      </div>

      {/* Links Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        maxWidth: 500,
        margin: '0 auto 24px',
      }}>
        {/* Company Column */}
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Company
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/about" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              About Us
            </Link>
            <Link href="/contact" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              Contact
            </Link>
            <Link href="/disclaimer" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Legal Column */}
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Legal
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/privacy" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          © 2026 NaukriYatra
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          Made with ❤️ in India 🇮🇳
        </p>
      </div>
    </footer>
  );
}
