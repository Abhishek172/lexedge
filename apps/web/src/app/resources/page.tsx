'use client';

import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/homepage/Footer';

const categories = ['All', 'Guides', 'Templates', 'Articles', 'Checklists'];

const resources = [
  {
    type: 'Guide',
    category: 'Guides',
    title: 'The Startup Legal Checklist — 2025 India Edition',
    desc: '12 documents every India-registered startup must have before their first funding conversation. Covers founders agreement, IP assignment, ESOP, and more.',
    readTime: '8 min read',
    tag: 'Free Download',
    tagColor: 'var(--green)',
    tagBg: 'var(--green-pale)',
    emoji: '🚀',
    href: '#',
  },
  {
    type: 'Article',
    category: 'Articles',
    title: 'What DPDPA 2023 Means for Your SaaS Business',
    desc: "India's new data protection law and the 5 documents your digital business needs to update immediately. Non-compliance fines start at Rs.50 crore.",
    readTime: '6 min read',
    tag: 'Must Read',
    tagColor: 'var(--crimson)',
    tagBg: '#FEE2E2',
    emoji: '🛡️',
    href: '#',
  },
  {
    type: 'Template',
    category: 'Templates',
    title: 'Mutual NDA Template for Indian Businesses',
    desc: 'A plain-English, lawyer-drafted mutual NDA you can use and customise for your next partnership, hiring, or vendor discussion.',
    readTime: 'Free Template',
    tag: 'Free Download',
    tagColor: 'var(--green)',
    tagBg: 'var(--green-pale)',
    emoji: '📄',
    href: '#',
  },
  {
    type: 'Checklist',
    category: 'Checklists',
    title: 'MSME Vendor Contract Checklist',
    desc: '18 clauses every vendor agreement must have to protect your business. Payment terms, liability caps, IP ownership, termination rights, and more.',
    readTime: '5 min read',
    tag: 'Free Download',
    tagColor: 'var(--green)',
    tagBg: 'var(--green-pale)',
    emoji: '✅',
    href: '#',
  },
  {
    type: 'Guide',
    category: 'Guides',
    title: 'How to Review a Contract Without a Lawyer',
    desc: '10 red flags to look for before signing any commercial agreement. A practical guide for founders who need to move fast but stay protected.',
    readTime: '10 min read',
    tag: 'Popular',
    tagColor: 'var(--amber)',
    tagBg: 'var(--amber-pale)',
    emoji: '🔍',
    href: '#',
  },
  {
    type: 'Article',
    category: 'Articles',
    title: 'Founders Agreement vs Shareholders Agreement — What is the Difference?',
    desc: 'Two documents that every co-founded startup needs, and why confusing them is one of the most expensive mistakes early-stage founders make.',
    readTime: '7 min read',
    tag: 'Startup',
    tagColor: 'var(--ink-muted)',
    tagBg: 'var(--paper-warm)',
    emoji: '🤝',
    href: '#',
  },
  {
    type: 'Template',
    category: 'Templates',
    title: 'Freelancer / Contractor Agreement Template',
    desc: 'A clean, enforceable contractor agreement covering scope, payment, IP ownership, and confidentiality. Used by 200+ Indian businesses.',
    readTime: 'Free Template',
    tag: 'Free Download',
    tagColor: 'var(--green)',
    tagBg: 'var(--green-pale)',
    emoji: '💼',
    href: '#',
  },
  {
    type: 'Article',
    category: 'Articles',
    title: 'The 5 Most Dangerous Clauses in Indian Employment Contracts',
    desc: 'Non-compete, intellectual property, termination without cause, garden leave, and clawback clauses — what they mean and when to push back.',
    readTime: '9 min read',
    tag: 'HR Legal',
    tagColor: 'var(--ink-muted)',
    tagBg: 'var(--paper-warm)',
    emoji: '⚖️',
    href: '#',
  },
  {
    type: 'Checklist',
    category: 'Checklists',
    title: 'Pre-Funding Legal Audit Checklist for Startups',
    desc: 'Everything a VC or angel investor will ask for in a due diligence request. Get ahead of it before your first term sheet arrives.',
    readTime: '6 min read',
    tag: 'Investor Ready',
    tagColor: 'var(--amber)',
    tagBg: 'var(--amber-pale)',
    emoji: '📊',
    href: '#',
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '66px', background: 'var(--paper)', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: 'var(--ink)', padding: '5rem 8vw 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: '600px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Resources & Guides
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
              Legal knowledge, free.
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Guides, templates, checklists, and articles to help Indian businesses understand and manage their legal risk — written by our legal team, free to use.
            </p>
            <button
              onClick={() => window.location.href = '/legal-health-score'}
              style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '0.85rem 1.75rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold-light)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}
            >
              Take the Free Legal Health Score Quiz →
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 8vw' }}>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'none', border: 'none',
                  borderBottom: activeCategory === cat ? '2px solid var(--gold)' : '2px solid transparent',
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  color: activeCategory === cat ? 'var(--ink)' : hoveredCat === cat ? 'var(--ink-soft)' : 'var(--ink-muted)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '4rem 8vw' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="resources-grid">
            {filtered.map((r, i) => (
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
                {/* Thumb */}
                <div style={{ height: '100px', background: hovered === i ? 'var(--ink)' : 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', transition: 'background 0.2s' }}>
                  {r.emoji}
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {r.type}
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, color: r.tagColor, background: r.tagBg, padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                      {r.tag}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {r.desc}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
                    {r.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div style={{ marginTop: '4rem', background: 'var(--ink)', borderRadius: '12px', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem' }}>
                Stay Updated
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.4rem' }}>
                New guides every week.
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
                No spam. Just practical legal content for Indian businesses.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', width: '240px' }}
              />
              <button
                style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}
              >
                Subscribe →
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}