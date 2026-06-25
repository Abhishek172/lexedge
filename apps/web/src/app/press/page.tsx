'use client';

import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/homepage/Footer';

const coverage = [
  { outlet: 'YourStory', title: 'LexEdge is making corporate legal services accessible to every Indian startup', date: 'Coming soon', type: 'Feature' },
  { outlet: 'Inc42', title: 'How LexEdge is disrupting the Rs.1.5L crore Indian legal services market', date: 'Coming soon', type: 'Interview' },
  { outlet: 'The Ken', title: 'Fixed-fee legal: the model that could democratise access to corporate law', date: 'Coming soon', type: 'Analysis' },
];

const facts = [
  { n: '500+', l: 'Matters handled' },
  { n: '8+', l: 'Years of practice' },
  { n: '3', l: 'Service tiers' },
  { n: '48hr', l: 'Standard turnaround' },
  { n: 'Pan-India', l: 'Client coverage' },
  { n: 'International', l: 'Cross-border capability' },
];

const assets = [
  { name: 'LexEdge Logo — Dark (PNG)', desc: 'For use on light backgrounds', format: 'PNG' },
  { name: 'LexEdge Logo — Light (PNG)', desc: 'For use on dark backgrounds', format: 'PNG' },
  { name: 'LexEdge Logo — SVG', desc: 'Vector format, scalable', format: 'SVG' },
  { name: 'Brand Guidelines PDF', desc: 'Colours, typography, usage rules', format: 'PDF' },
  { name: 'Founder Headshot', desc: 'High-resolution press photo', format: 'JPG' },
  { name: 'Product Screenshots', desc: 'Platform UI screenshots', format: 'ZIP' },
];

export default function Press() {
  const [hoveredAsset, setHoveredAsset] = useState<number | null>(null);
  const [hoveredCoverage, setHoveredCoverage] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '66px', background: 'var(--paper)', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: 'var(--ink)', padding: '5rem 8vw 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Press & Media
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem', maxWidth: '560px' }}>
              Media kit and press resources.
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '480px', marginBottom: '2rem' }}>
              Everything you need to cover LexEdge — brand assets, key facts, founder bio, and press contact.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '6px', padding: '0.85rem 1.25rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
                Press enquiries:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                press@lexedge.in
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: '5rem 8vw' }}>

          {/* Key facts */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
              Key Facts
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              LexEdge at a glance
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }} className="facts-grid">
              {facts.map((f) => (
                <div key={f.l} style={{ background: 'var(--white)', padding: '2rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1, marginBottom: '0.4rem' }}>
                    {f.n}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                    {f.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About section */}
          <div style={{ marginBottom: '5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="press-about-grid">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
                About LexEdge
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Company Overview
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                LexEdge is India's online corporate legal platform, providing fixed-fee contract drafting, document review, and legal advisory services to startups, MSMEs, and enterprises. Founded by a qualified corporate lawyer with over 8 years of practice across courtrooms, corporate legal departments, and contract management operations.
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.8 }}>
                LexEdge operates on a prepayment, fixed-fee model — making high-quality legal expertise predictable and accessible to businesses at every stage of growth, in India and internationally.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
                Founder Bio
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Principal Counsel
              </h2>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>
                  [Your Name]
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '1rem' }}>
                  Founder & Head of Legal, LexEdge
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  BA LLB and LLM from Amity University Noida. Practice spanning courtroom litigation, corporate law departments, contract management operations, and freelance corporate counsel. Founded LexEdge to make enterprise-grade legal services accessible to every Indian business.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Corporate Law', 'Contract Drafting', 'M&A', 'IP', 'MSME Compliance'].map((tag) => (
                    <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--paper-warm)', padding: '0.2rem 0.6rem', borderRadius: '50px', whiteSpace: 'nowrap' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
              Coverage
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              In the press
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
              {coverage.map((c, i) => (
                <div
                  key={c.title}
                  onMouseEnter={() => setHoveredCoverage(i)}
                  onMouseLeave={() => setHoveredCoverage(null)}
                  style={{ background: hoveredCoverage === i ? 'var(--paper)' : 'var(--white)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', transition: 'background 0.2s', flexWrap: 'wrap' }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>
                      {c.outlet}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {c.title}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{c.date}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--ink-muted)', background: 'var(--paper-warm)', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>{c.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', marginTop: '1rem', fontStyle: 'italic' }}>
              Coverage listings will be updated as stories are published.
            </p>
          </div>

          {/* Brand assets */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
              Brand Assets
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Download assets
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="assets-grid">
              {assets.map((a, i) => (
                <div
                  key={a.name}
                  onMouseEnter={() => setHoveredAsset(i)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  style={{ background: 'var(--white)', border: hoveredAsset === i ? '1px solid var(--gold)' : '1px solid var(--border)', borderRadius: '8px', padding: '1.25rem 1.5rem', transition: 'all 0.2s', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>{a.name}</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--gold-dark)', border: '1px solid var(--gold)', padding: '0.15rem 0.4rem', borderRadius: '2px', flexShrink: 0, marginLeft: '0.5rem' }}>
                      {a.format}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>{a.desc}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: hoveredAsset === i ? 'var(--gold-dark)' : 'var(--ink-muted)', transition: 'color 0.2s' }}>
                    Download →
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', background: 'var(--paper-warm)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              For press enquiries, interview requests, or custom asset needs, contact us at{' '}
              <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>press@lexedge.in</span>.
              {' '}We typically respond within 4 hours on business days.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}