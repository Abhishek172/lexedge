'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiRequest } from '../../../lib/api';

export default function AdminBookings() {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const token = await getToken();
      const data = await apiRequest('/api/bookings', {}, token || undefined);
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '60px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => window.location.href = '/admin'} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Bookings
          </span>
        </div>
        <button onClick={() => window.location.href = '/admin'} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{ padding: '2.5rem 3rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              Consultation Bookings
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
              {bookings.length} total bookings from homepage form
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/admin/matters/new'}
            style={{ background: 'var(--ink)', color: 'var(--white)', padding: '0.7rem 1.5rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
          >
            + Create Matter from Booking
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--ink-muted)' }}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>No bookings yet</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>Bookings from the homepage consultation form will appear here.</p>
          </div>
        ) : (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', padding: '0.85rem 1.5rem', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
              {['Contact', 'Service / Message', 'Type', 'Region', 'Date'].map((h) => (
                <div key={h} style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>{h}</div>
              ))}
            </div>
            {bookings.map((b) => (
              <div
                key={b.id}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'start', background: hovered === b.id ? 'var(--paper)' : 'var(--white)', transition: 'background 0.15s' }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>{b.firstName} {b.lastName}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '0.1rem' }}>{b.email}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{b.phone}</div>
                  {b.company && <div style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{b.company}</div>}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink)', fontWeight: 500 }}>{b.service || 'Not specified'}</div>
                  {b.message && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      {b.message.length > 80 ? b.message.slice(0, 80) + '...' : b.message}
                    </div>
                  )}
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--paper-warm)', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                    {b.consultType}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{b.region}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                  {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}