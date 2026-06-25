'use client';

import { useState } from 'react';

const testimonials = [
  {
    initials: 'AP',
    name: 'Aarav Patel',
    role: 'Co-founder, EdTech Startup · Bengaluru',
    text: 'Got our entire founding docs — shareholders agreement, IP assignment, and ESOP policy — reviewed in under 48 hours. Precise, clear, and genuinely affordable for this quality of work.',
  },
  {
    initials: 'SR',
    name: 'Sunita Rao',
    role: 'Director, Manufacturing MSME · Pune',
    text: 'Our vendor contracts had a major liability gap we had missed for two years. Caught immediately, fixed cleanly. The MSME monthly plan has saved us far more than it costs.',
  },
  {
    initials: 'MK',
    name: 'Meera Krishnan',
    role: 'Talent Manager · Mumbai',
    text: 'A complex brand endorsement deal with three parties across two jurisdictions — everything explained in plain language, closed faster than any deal I have done before.',
  },
  {
    initials: 'RV',
    name: 'Rohan Verma',
    role: 'CTO, SaaS Startup · Delhi NCR',
    text: 'Our Terms of Service and Privacy Policy were outdated and DPDPA non-compliant. LexEdge turned around fully updated, compliant docs in 24 hours. Exactly what a fast-moving team needs.',
  },
  {
    initials: 'PS',
    name: 'Priya Shah',
    role: 'Founder, D2C Brand · Ahmedabad',
    text: 'Needed influencer contracts fast before a campaign launch. Three agreements drafted, reviewed and ready in one day. The portal made tracking everything effortless.',
  },
  {
    initials: 'AK',
    name: 'Arjun Kapoor',
    role: 'MD, Import-Export MSME · Chennai',
    text: 'Cross-border vendor agreements are complex. LexEdge handled Indian and UAE law in the same engagement without missing a beat. Will not use anyone else going forward.',
  },
];

export default function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="testimonials"
      style={{ background: 'var(--white)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
          Client Stories
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)' }}>
          Trusted by founders, MSMEs, and brands.
        </h2>
      </div>

      <div
        className="testi-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '2rem',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              transition: 'box-shadow 0.25s, border-color 0.25s',
              boxShadow: hovered === i ? '0 8px 30px rgba(0,0,0,0.07)' : 'none',
              borderColor: hovered === i ? 'rgba(201,168,76,0.3)' : 'var(--border)',
            }}
          >
            <div style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
              ★★★★★
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.72, marginBottom: '1.5rem' }}>
              {t.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink)' }}>{t.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}