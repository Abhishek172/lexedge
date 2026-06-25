'use client';

import { useState } from 'react';

const quals = [
  'BA LLB, Amity University Noida',
  'LLM, Amity University Noida',
  'Courtroom litigation experience',
  'Corporate legal departments',
  'Contract management and oversight',
  'Freelance corporate counsel',
];

export default function About() {
  const [hoveredCTA, setHoveredCTA] = useState(false);

  return (
    <section
      id="about"
      className="about-layout section-pad"
      style={{ background: 'var(--paper)', padding: '6rem 8vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}
    >
      {/* Left — visual */}
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--ink)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(201,168,76,0.04) 18px, rgba(201,168,76,0.04) 19px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
              Photo coming soon
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--white)' }}>
              Priya Rai
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)', marginTop: '0.25rem' }}>
              BA LLB · LLM · Amity University Noida
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-1px', top: '3rem', background: 'var(--gold)', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', fontWeight: 700, padding: '0.75rem 0.5rem', borderRadius: '0 4px 4px 0' }}>
          Head of Legal · LexEdge
        </div>
      </div>

      {/* Right — content */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
          About LexEdge
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '1.25rem' }}>
          A platform built on real legal experience.
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          LexEdge was built on one conviction: that every business — not just large corporates — deserves access to enterprise-quality legal counsel. The legal infrastructure that protects a Series C company should be equally accessible to the founder who just registered their first startup.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Our Principal Counsel has practiced across courtrooms, corporate legal departments, and contract management operations — which means a perspective that is not just academically sound but operationally battle-tested.
        </p>

        <div
          className="quals-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '2rem' }}
        >
          {quals.map((q) => (
            <div key={q} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: '0.45rem', display: 'block' }} />
              {q}
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.href = '#booking'}
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: hoveredCTA ? 'var(--gold)' : 'var(--ink)',
            color: hoveredCTA ? 'var(--ink)' : 'var(--white)',
            padding: '0.9rem 1.85rem',
            borderRadius: '4px',
            border: 'none',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '1.5rem',
          }}
        >
          Work With Us
        </button>

        <p style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', fontStyle: 'italic', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          LexEdge is a legal services platform. Services are provided by a qualified legal professional. We do not provide litigation or court representation.
        </p>
      </div>
    </section>
  );
}