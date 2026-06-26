'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiRequest } from '../../../lib/api';

export default function AdminClients() {
  const { getToken } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const token = await getToken();
      const data = await apiRequest('/api/users', {}, token || undefined);
      setClients(data.filter((u: any) => u.role === 'CLIENT'));
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = clients.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.company || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '60px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => window.location.href = '/admin'} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            All Clients
          </span>
        </div>
        <button onClick={() => window.location.href = '/admin'} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{ padding: '2.5rem 3rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              All Clients
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
              {clients.length} registered clients
            </p>
          </div>
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.7rem 1rem', border: '1.5px solid var(--border-strong)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', width: '280px' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--ink-muted)' }}>Loading clients...</div>
        ) : (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', padding: '0.85rem 1.5rem', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
              {['Client', 'Contact', 'Matters', 'Region', 'Joined'].map((h) => (
                <div key={h} style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>{h}</div>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                No clients found
              </div>
            ) : (
              filtered.map((c) => (
                <div
                  key={c.id}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => window.location.href = `/admin/matters/new?clientId=${c.id}`}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center', background: hovered === c.id ? 'var(--paper)' : 'var(--white)', cursor: 'pointer', transition: 'background 0.15s' }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>{c.firstName} {c.lastName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '0.1rem' }}>{c.company || 'Individual'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{c.email}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '0.1rem' }}>{c.phone || 'No phone'}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
                    {c._count?.matters || 0}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--paper-warm)', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                      {c.region || 'INDIA'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}