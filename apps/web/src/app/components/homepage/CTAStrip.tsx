'use client';

import { useState } from 'react';

export default function CTAStrip() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: 'var(--gold)',
      padding: '3.5rem 8vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem',
      flexWrap: 'wrap',
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight: 900,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: '0.35rem',
        }}>
          Your next contract should not be a risk.
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'rgba(13,13,13,0.6)' }}>
          Book a free consultation — it takes 2 minutes and costs nothing.
        </p>
      </div>
      <button
        onClick={() => window.location.href = '#booking'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--crimson)' : 'var(--ink)',
          color: 'var(--white)',
          padding: '1rem 2.25rem',
          borderRadius: '4px',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        Book Free Consultation →
      </button>
    </div>
  );
}