'use client';

import { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [hoveredWA, setHoveredWA] = useState(false);
  const [hoveredTop, setHoveredTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
      {/* Back to top */}
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setHoveredTop(true)}
          onMouseLeave={() => setHoveredTop(false)}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: hoveredTop ? 'var(--gold)' : 'var(--ink)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
            color: hoveredTop ? 'var(--ink)' : 'var(--white)',
            fontSize: '0.9rem', fontWeight: 700,
          }}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      {/* WhatsApp */}
      <button
        onClick={() => window.open('https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20would%20like%20to%20discuss%20my%20legal%20requirements%20with%20LexEdge', '_blank')}
        onMouseEnter={() => setHoveredWA(true)}
        onMouseLeave={() => setHoveredWA(false)}
        style={{
          background: '#25D366',
          color: 'var(--white)',
          padding: '0.7rem 1.25rem',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          boxShadow: hoveredWA ? '0 8px 24px rgba(37,211,102,0.4)' : '0 4px 18px rgba(37,211,102,0.35)',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transform: hoveredWA ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <span>💬</span>
        Chat on WhatsApp
      </button>
    </div>
  );
}