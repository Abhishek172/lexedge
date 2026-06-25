'use client';

import { useState } from 'react';

const featured = [
  {
    emoji: '📋',
    type: 'Guide · Free Download',
    title: 'The Startup Legal Checklist — 2025 India Edition',
    desc: '12 documents every India-registered startup must have before their first funding conversation.',
    href: '/resources',
    bg: '#0D0D0D',
  },
  {
    emoji: '🛡️',
    type: 'Article',
    title: 'What DPDPA 2023 Means for Your SaaS Business',
    desc: "India's new data protection law and the 5 documents your digital business needs to update immediately.",
    href: '/resources',
    bg: '#1A3A2A',
  },
  {
    emoji: '📝',
    type: 'Template · Free Download',
    title: 'Mutual NDA Template for Indian Businesses',
    desc: 'A plain-English, lawyer-drafted NDA template you can use and customise for your next partnership.',
    href: '/resources',
    bg: '#3A1A0D',
  },
];

export default function ResourcesTeaser() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState(false);

  return (
    <section
      id="resources"
      style={{ background: 'var(--white)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
            Resources & Guides
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)' }}>
            Legal knowledge, free.
          </h2>
        </div>
        <button
          onClick={() => window.location.href = '/resources'}
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
          style={{
            background: 'none',
            border: `1.5px solid ${hoveredCTA ? 'var(--ink)' : 'var(--border-strong)'}`,
            color: hoveredCTA ? 'var(--ink)' : 'var(--ink-muted)',
            padding: '0.7rem 1.5rem', borderRadius: '4px',
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
        >
          View All Resources →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="resources-grid">
        {featured.map((r, i) => (
          <div
            key={r.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => window.location.href = r.href}
            style={{
              background: 'var(--white)',
              border: hovered === i ? '1px solid rgba(201,168,76,0.4)' : '1px solid var(--border)',
              borderRadius: '10px', overflow: 'hidden',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: hovered === i ? '0 8px 30px rgba(0,0,0,0.07)' : 'none',
              transform: hovered === i ? 'translateY(-2px)' : 'none',
            }}
          >
            <div style={{ height: '100px', background: hovered === i ? 'var(--ink)' : r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', transition: 'background 0.2s' }}>
              {r.emoji}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                {r.type}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                {r.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                {r.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Health Score CTA */}
      <div style={{ marginTop: '2rem', background: 'var(--gold-pale)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '10px', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.75rem' }}>📊</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.2rem' }}>
              Free Legal Health Score
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              10 questions. 3 minutes. Find out exactly where your business is legally exposed.
            </div>
          </div>
        </div>
        <button
          onClick={() => window.location.href = '/legal-health-score'}
          style={{ background: 'var(--ink)', color: 'var(--white)', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
        >
          Take the Free Quiz →
        </button>
      </div>
    </section>
  );
}