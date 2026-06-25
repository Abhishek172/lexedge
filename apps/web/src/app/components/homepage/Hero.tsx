'use client';

import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';

type StatId = 'free' | 'speed' | 'fixed' | 'secure';

const credentials = [
  'BA LLB - Amity University Noida',
  'LLM - Amity University Noida',
  'Courtroom to Corporate to Solo Practice',
  'Commercial Contracts · M&A · IP · Compliance',
];

const trustStats = [
  { n: '500+', l: 'Matters handled' },
  { n: '8+', l: 'Years practice' },
  { n: '48hr', l: 'Standard turnaround' },
];

export default function Hero() {
  const { region } = useRegion();
  const [hoveredStat, setHoveredStat] = useState<StatId | null>(null);
  const [hoveredCard, setHoveredCard] = useState(false);
  const [hoveredLI, setHoveredLI] = useState(false);
  const [hoveredPrimary, setHoveredPrimary] = useState(false);
  const [hoveredSecondary, setHoveredSecondary] = useState(false);

  const stats: { n: string; l: string; id: StatId }[] = [
    { n: region === 'IN' ? '₹0' : '$0', l: 'First consultation', id: 'free' },
    { n: '24hr', l: 'Priority turnaround', id: 'speed' },
    { n: '100%', l: 'Fixed-fee, no surprises', id: 'fixed' },
    { n: 'AES', l: '256-bit encrypted', id: 'secure' },
  ];

  return (
    <section className="hero-grid">
      {/* LEFT */}
      <div
        className="hero-left-panel"
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '5rem 4rem 5rem 8vw',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)', display: 'block', flexShrink: 0 }} />
          India's Corporate Legal Platform
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: '1.5rem' }}>
          Legal expertise<br />that works as<br />fast as{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>you do.</em>
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', maxWidth: '440px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Fixed-fee contract drafting, document review, and corporate legal advisory for everyone from solo founders to scaling enterprises. No retainers. No surprises.
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={() => window.location.href = '#booking'}
            onMouseEnter={() => setHoveredPrimary(true)}
            onMouseLeave={() => setHoveredPrimary(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: hoveredPrimary ? 'var(--gold)' : 'var(--ink)',
              color: hoveredPrimary ? 'var(--ink)' : 'var(--white)',
              padding: '0.9rem 1.85rem', borderRadius: '4px',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            Book Free Consultation
          </button>
          <button
            onClick={() => window.location.href = '#on-demand'}
            onMouseEnter={() => setHoveredSecondary(true)}
            onMouseLeave={() => setHoveredSecondary(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid var(--border-strong)',
              color: hoveredSecondary ? 'var(--white)' : 'var(--ink-soft)',
              padding: '0.9rem 1.85rem', borderRadius: '4px',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
              background: hoveredSecondary ? 'var(--ink)' : 'transparent',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            Single Doc Review
          </button>
        </div>

        <div className="hero-trust-stats" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          {trustStats.map((s) => (
            <div key={s.l}>
              <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>
                {s.n}
              </strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', letterSpacing: '0.03em' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="hero-right-panel"
        style={{
          background: 'var(--ink)', position: 'relative', overflow: 'hidden',
          flexDirection: 'column', justifyContent: 'center',
          padding: '3.5rem 2.5rem', gap: '1.25rem',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px)' }} />

        {/* Credential card */}
        <div
          onMouseEnter={() => setHoveredCard(true)}
          onMouseLeave={() => setHoveredCard(false)}
          style={{
            position: 'relative', background: 'rgba(255,255,255,0.04)',
            border: hoveredCard ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.25)',
            boxShadow: hoveredCard ? '0 0 24px rgba(201,168,76,0.08)' : 'none',
            borderRadius: '10px', padding: '1.75rem', transition: 'all 0.3s',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
            Principal Counsel
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)' }}>
              Priya Rai
            </div>
            <button
              onClick={() => window.open('https://linkedin.com/in/yourprofile', '_blank')}
              onMouseEnter={() => setHoveredLI(true)}
              onMouseLeave={() => setHoveredLI(false)}
              title="LinkedIn Profile"
              style={{
                width: '30px', height: '30px', borderRadius: '6px',
                background: hoveredLI ? 'rgba(10,102,194,0.3)' : 'rgba(255,255,255,0.06)',
                border: hoveredLI ? '1px solid rgba(10,102,194,0.6)' : '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s', marginTop: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="9" width="4" height="12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="4" r="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
                borderRadius: '8px', padding: '1rem 1.25rem', cursor: 'default',
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