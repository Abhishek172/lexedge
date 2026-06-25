'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hoveredAccept, setHoveredAccept] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lexedge-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('lexedge-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('lexedge-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 200,
      background: 'var(--ink)',
      borderTop: '1px solid rgba(201,168,76,0.2)',
      padding: '1.25rem 8vw',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2rem', flexWrap: 'wrap',
    }}>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
        We use cookies to improve your experience and comply with the{' '}
        <span style={{ color: 'var(--gold)' }}>Digital Personal Data Protection Act 2023</span>.
        By continuing, you agree to our use of cookies.{' '}
        <button
          onClick={() => window.location.href = '/privacy'}
          style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.8rem', padding: 0, textDecoration: 'underline', fontFamily: 'var(--font-body)' }}
        >
          Privacy Policy
        </button>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '0.55rem 1.25rem', borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent', color: 'rgba(255,255,255,0.5)',
            fontSize: '0.8rem', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          onMouseEnter={() => setHoveredAccept(true)}
          onMouseLeave={() => setHoveredAccept(false)}
          style={{
            padding: '0.55rem 1.25rem', borderRadius: '4px',
            border: 'none',
            background: hoveredAccept ? 'var(--gold-light)' : 'var(--gold)',
            color: 'var(--ink)',
            fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}