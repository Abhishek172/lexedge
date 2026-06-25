const fs = require('fs');
const path = require('path');

const base = __dirname;

// ── GLOBALS.CSS — append responsive rules ──
const responsiveCSS = `

/* ══════════════════════════════════
   RESPONSIVE LAYOUT
══════════════════════════════════ */

/* Hero */
.hero-grid {
  min-height: 100vh;
  padding-top: 66px;
  display: grid;
  grid-template-columns: 1fr 480px;
}

.hero-right-panel {
  display: flex;
}

/* Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
  gap: 1px;
  background: var(--border);
}

/* Nav */
.nav-desktop-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-mobile-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

/* ── TABLET (max 960px) ── */
@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-bottom: 4rem;
  }

  .hero-right-panel {
    display: none;
  }

  .hero-left-panel {
    padding: 3rem 6vw 2rem !important;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .nav-desktop-links {
    display: none;
  }

  .nav-mobile-btn {
    display: flex;
  }
}

/* ── MOBILE (max 640px) ── */
@media (max-width: 640px) {
  .hero-left-panel {
    padding: 2.5rem 5vw 2rem !important;
  }

  .hero-trust-stats {
    gap: 1.5rem !important;
  }

  .hero-ctas {
    flex-direction: column !important;
  }

  .hero-ctas a {
    width: 100%;
    justify-content: center;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .section-pad {
    padding: 4rem 5vw !important;
  }
}
`;

// ── NAVBAR ──
const navbar = `'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'One-Time Review', href: '#on-demand' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#process' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '66px', padding: '0 5vw',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(248,245,240,0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            fontWeight: 900,
            color: 'var(--ink)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}
        >
          Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-desktop-links">
          {navLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: hoveredLink === item.href ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={() => setHoveredLink(item.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <Link
            href="/portal"
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--ink-muted)',
              textDecoration: 'none',
            }}
          >
            Client Login
          </Link>
          <a
            href="#booking"
            style={{
              background: 'var(--ink)',
              color: 'var(--white)',
              padding: '0.55rem 1.25rem',
              borderRadius: '4px',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.color = 'var(--ink)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ink)';
              e.currentTarget.style.color = 'var(--white)';
            }}
          >
            Free Consultation
          </a>

          {/* Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', borderRadius: '2px', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '66px', left: 0, right: 0,
            zIndex: 99,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem 5vw 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--ink)',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '1rem 0',
                borderBottom: '1px solid var(--border)',
                display: 'block',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/portal"
            style={{
              textDecoration: 'none',
              color: 'var(--ink-muted)',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '1rem 0',
              borderBottom: '1px solid var(--border)',
              display: 'block',
            }}
          >
            Client Login
          </a>
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'var(--ink)',
              color: 'var(--white)',
              padding: '0.9rem 1.25rem',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: '1.25rem',
              display: 'block',
            }}
          >
            Book Free Consultation
          </a>
        </div>
      )}
    </>
  );
}
`;

// ── HERO ──
const hero = `'use client';

import { useState } from 'react';

type StatId = 'free' | 'speed' | 'fixed' | 'secure';

const credentials = [
  'BA LLB - Amity University Noida',
  'LLM - Amity University Noida',
  'Courtroom to Corporate to Solo Practice',
  'Commercial Contracts · M&A · IP · Compliance',
];

const stats: { n: string; l: string; id: StatId }[] = [
  { n: 'Rs.0', l: 'First consultation', id: 'free' },
  { n: '24hr', l: 'Priority turnaround', id: 'speed' },
  { n: '100%', l: 'Fixed-fee, no surprises', id: 'fixed' },
  { n: 'AES', l: '256-bit encrypted', id: 'secure' },
];

const trustStats = [
  { n: '500+', l: 'Matters handled' },
  { n: '8+', l: 'Years practice' },
  { n: '48hr', l: 'Standard turnaround' },
];

export default function Hero() {
  const [hoveredStat, setHoveredStat] = useState<StatId | null>(null);
  const [hoveredCard, setHoveredCard] = useState(false);
  const [hoveredLI, setHoveredLI] = useState(false);
  const [hoveredPrimary, setHoveredPrimary] = useState(false);
  const [hoveredSecondary, setHoveredSecondary] = useState(false);

  return (
    <section className="hero-grid">

      {/* LEFT */}
      <div
        className="hero-left-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem 4rem 5rem 8vw',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)', display: 'block', flexShrink: 0 }} />
          India's Corporate Legal Platform
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
            marginBottom: '1.5rem',
          }}
        >
          Legal expertise
          <br />
          that works as
          <br />
          fast as{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>you do.</em>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--ink-muted)',
            maxWidth: '440px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}
        >
          Fixed-fee contract drafting, document review, and corporate legal
          advisory for everyone from solo founders to scaling enterprises.
          No retainers. No surprises.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{
            display: 'flex',
            gap: '0.85rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <a
            href="#booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: hoveredPrimary ? 'var(--gold)' : 'var(--ink)',
              color: hoveredPrimary ? 'var(--ink)' : 'var(--white)',
              padding: '0.9rem 1.85rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => setHoveredPrimary(true)}
            onMouseLeave={() => setHoveredPrimary(false)}
          >
            Book Free Consultation
          </a>
          <a
            href="#on-demand"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid var(--border-strong)',
              color: hoveredSecondary ? 'var(--white)' : 'var(--ink-soft)',
              padding: '0.9rem 1.85rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              background: hoveredSecondary ? 'var(--ink)' : 'transparent',
            }}
            onMouseEnter={() => setHoveredSecondary(true)}
            onMouseLeave={() => setHoveredSecondary(false)}
          >
            Single Doc Review
          </a>
        </div>

        {/* Trust stats */}
        <div
          className="hero-trust-stats"
          style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}
        >
          {trustStats.map((s) => (
            <div key={s.l}>
              <strong
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'var(--ink)',
                  lineHeight: 1,
                }}
              >
                {s.n}
              </strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', letterSpacing: '0.03em' }}>
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="hero-right-panel"
        style={{
          background: 'var(--ink)',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3.5rem 2.5rem',
          gap: '1.25rem',
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px)',
          }}
        />

        {/* Credential card */}
        <div
          onMouseEnter={() => setHoveredCard(true)}
          onMouseLeave={() => setHoveredCard(false)}
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.04)',
            border: hoveredCard ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.25)',
            boxShadow: hoveredCard ? '0 0 24px rgba(201,168,76,0.08)' : 'none',
            borderRadius: '10px',
            padding: '1.75rem',
            transition: 'all 0.3s',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            Principal Counsel
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)' }}>
              [Your Name]
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              onMouseEnter={() => setHoveredLI(true)}
              onMouseLeave={() => setHoveredLI(false)}
              style={{
                width: '30px', height: '30px', borderRadius: '6px',
                background: hoveredLI ? 'rgba(10,102,194,0.3)' : 'rgba(255,255,255,0.06)',
                border: hoveredLI ? '1px solid rgba(10,102,194,0.6)' : '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', flexShrink: 0, transition: 'all 0.2s', marginTop: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="9" width="4" height="12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="4" r="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
            Head of Legal · LexEdge
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {credentials.map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: '0.35rem', display: 'block' }} />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Stat tiles */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {stats.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setHoveredStat(s.id)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                background: hoveredStat === s.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.04)',
                border: hoveredStat === s.id ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px', padding: '1rem 1.25rem',
                cursor: 'default',
                transform: hoveredStat === s.id ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredStat === s.id ? '0 8px 24px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: hoveredStat === s.id ? 'var(--gold-light)' : 'var(--white)', lineHeight: 1, transition: 'color 0.2s' }}>
                {s.n}
              </div>
              <div style={{ fontSize: '0.7rem', color: hoveredStat === s.id ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.4)', marginTop: '0.2rem', transition: 'color 0.2s' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Available pill */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(26,107,60,0.15)', border: '1px solid rgba(26,107,60,0.3)', borderRadius: '6px', padding: '0.85rem 1.25rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'pulse-green 2s infinite', flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>
            <strong style={{ color: '#4ADE80' }}>Accepting new clients. </strong>
            Free 30-min call available this week.
          </span>
        </div>
      </div>
    </section>
  );
}
`;

// ── SERVICES ──
const services = `'use client';

import { useState } from 'react';

const serviceList = [
  { icon: '📄', name: 'Contract Drafting & Review', desc: 'Airtight contracts built from scratch, or thorough red-flag reviews of existing ones. Every clause scrutinized before you sign.', tag: 'Most Popular', price: 'from Rs.2,999' },
  { icon: '🤝', name: 'NDA & Confidentiality', desc: 'Mutual and unilateral NDAs for partnerships, employment, IP sharing, and product collaborations — India and cross-border.', tag: '48hr turnaround', price: 'from Rs.2,999' },
  { icon: '🚀', name: 'Startup Legal Pack', desc: 'Founders agreement, equity terms, IP assignment, advisor agreements, ESOP policy — everything to be investor-ready.', tag: 'Bundled', price: 'from Rs.9,999' },
  { icon: '🏢', name: 'Vendor & Procurement', desc: 'Vendor agreements, SLAs, procurement policies, and supply chain contracts that protect your business relationships.', tag: 'B2B', price: 'from Rs.3,999' },
  { icon: '⭐', name: 'Brand & Endorsement', desc: 'Celebrity deals, influencer contracts, brand licensing, and IP commercialisation across one or multiple parties.', tag: 'Entertainment', price: 'from Rs.4,999' },
  { icon: '💼', name: 'Employment & HR Legal', desc: 'Offer letters, employment contracts, POSH policies, performance clauses, and severance agreements.', tag: 'HR', price: 'from Rs.2,999' },
  { icon: '🌐', name: 'Tech & SaaS Contracts', desc: 'Terms of Service, Privacy Policies, DPDPA/GDPR compliance, API agreements, and SaaS subscription terms.', tag: 'Digital', price: 'from Rs.3,999' },
  { icon: '🔍', name: 'Legal Due Diligence', desc: 'Pre-investment, pre-acquisition, or pre-merger document review — identify every liability before you commit.', tag: 'M&A', price: 'from Rs.14,999' },
  { icon: '📋', name: 'MSME & Compliance', desc: 'Regulatory docs, GST-related agreements, MSME Udyam filings, and government contract review for growing Indian businesses.', tag: 'India Focus', price: 'from Rs.3,499' },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" style={{ background: 'var(--white)', padding: '6rem 8vw' }} className="section-pad">
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
          What We Handle
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.85rem' }}>
          Every legal need, one platform.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', maxWidth: '500px', lineHeight: 1.75 }}>
          Full-spectrum corporate legal services — from your first NDA to enterprise compliance frameworks.
        </p>
      </div>

      <div className="services-grid">
        {serviceList.map((s, i) => (
          <div
            key={s.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'var(--gold-pale)' : 'var(--white)',
              padding: '2.25rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.25s',
              cursor: 'default',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: hovered === i ? '100%' : '0%', background: 'var(--gold)', transition: 'width 0.3s' }} />
            <span style={{ fontSize: '1.6rem', marginBottom: '1rem', display: 'block' }}>{s.icon}</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{s.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', border: '1px solid var(--gold)', padding: '0.18rem 0.5rem', borderRadius: '2px' }}>{s.tag}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{s.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`;

// Write globals.css append
const globalsPath = path.join(base, 'src', 'app', 'globals.css');
const existingCSS = fs.readFileSync(globalsPath, 'utf8');
if (!existingCSS.includes('RESPONSIVE LAYOUT')) {
  fs.writeFileSync(globalsPath, existingCSS + responsiveCSS, 'utf8');
  console.log('Written: globals.css (responsive rules appended)');
} else {
  console.log('Skipped: globals.css already has responsive rules');
}

const files = [
  { path: path.join(base, 'src', 'app', 'components', 'layout', 'Navbar.tsx'), content: navbar },
  { path: path.join(base, 'src', 'app', 'components', 'homepage', 'Hero.tsx'), content: hero },
  { path: path.join(base, 'src', 'app', 'components', 'homepage', 'Services.tsx'), content: services },
];

files.forEach(({ path: p, content }) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Written:', p);
});

console.log('\nAll done. Resize localhost:3000 to test responsiveness.');
