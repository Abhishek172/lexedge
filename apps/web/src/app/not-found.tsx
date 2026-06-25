'use client';

import { useState } from 'react';

export default function NotFound() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.05) 39px, rgba(201,168,76,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.05) 39px, rgba(201,168,76,0.05) 40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>
          Error 404
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 15vw, 12rem)', fontWeight: 900, color: 'var(--white)', lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '1.5rem', opacity: 0.15 }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          This page does not exist.
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          You may have followed a broken link or the page has moved. Let us get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.location.href = '/'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered ? 'var(--gold)' : 'var(--white)',
              color: 'var(--ink)', padding: '0.9rem 2rem',
              borderRadius: '4px', border: 'none',
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '0.875rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Back to Homepage
          </button>
          <button
            onClick={() => window.location.href = '#booking'}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)', padding: '0.9rem 2rem',
              borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: '0.875rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Book a Consultation
          </button>
        </div>

        <div style={{ marginTop: '4rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)' }}>
          Lex<span style={{ color: 'rgba(201,168,76,0.3)' }}>Edge</span>
        </div>
      </div>
    </div>
  );
}