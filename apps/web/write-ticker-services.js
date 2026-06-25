const fs = require('fs');
const path = require('path');

// ── TICKER ──
const ticker = `'use client';

const items = [
  'Contract Drafting',
  'NDA Review',
  'MOU Drafting',
  'Employment Agreements',
  'Shareholder Agreements',
  'Vendor Contracts',
  'MSME Compliance',
  'IP Licensing',
  'Due Diligence',
  'Franchise Agreements',
  'Tech & SaaS Contracts',
  'Brand Endorsements',
  'DPDPA Compliance',
  'Term Sheets',
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: 'var(--ink)',
        padding: '0.65rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '3.5rem',
          whiteSpace: 'nowrap',
          animation: 'ticker 35s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3.5rem',
            }}
          >
            {item}
            <span style={{ color: 'var(--gold)', marginLeft: '-3rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
`;

// ── SERVICES ──
const services = `'use client';

import { useState } from 'react';

const serviceList = [
  {
    icon: '📄',
    name: 'Contract Drafting & Review',
    desc: 'Airtight contracts built from scratch, or thorough red-flag reviews of existing ones. Every clause scrutinized before you sign.',
    tag: 'Most Popular',
    price: 'from Rs.2,999',
  },
  {
    icon: '🤝',
    name: 'NDA & Confidentiality',
    desc: 'Mutual and unilateral NDAs for partnerships, employment, IP sharing, and product collaborations — India and cross-border.',
    tag: '48hr turnaround',
    price: 'from Rs.2,999',
  },
  {
    icon: '🚀',
    name: 'Startup Legal Pack',
    desc: "Founders agreement, equity terms, IP assignment, advisor agreements, ESOP policy — everything to be investor-ready.",
    tag: 'Bundled',
    price: 'from Rs.9,999',
  },
  {
    icon: '🏢',
    name: 'Vendor & Procurement',
    desc: 'Vendor agreements, SLAs, procurement policies, and supply chain contracts that protect your business relationships.',
    tag: 'B2B',
    price: 'from Rs.3,999',
  },
  {
    icon: '⭐',
    name: 'Brand & Endorsement',
    desc: 'Celebrity deals, influencer contracts, brand licensing, and IP commercialisation across one or multiple parties.',
    tag: 'Entertainment',
    price: 'from Rs.4,999',
  },
  {
    icon: '💼',
    name: 'Employment & HR Legal',
    desc: 'Offer letters, employment contracts, POSH policies, performance clauses, and severance agreements.',
    tag: 'HR',
    price: 'from Rs.2,999',
  },
  {
    icon: '🌐',
    name: 'Tech & SaaS Contracts',
    desc: 'Terms of Service, Privacy Policies, DPDPA/GDPR compliance, API agreements, and SaaS subscription terms.',
    tag: 'Digital',
    price: 'from Rs.3,999',
  },
  {
    icon: '🔍',
    name: 'Legal Due Diligence',
    desc: 'Pre-investment, pre-acquisition, or pre-merger document review — identify every liability before you commit.',
    tag: 'M&A',
    price: 'from Rs.14,999',
  },
  {
    icon: '📋',
    name: 'MSME & Compliance',
    desc: 'Regulatory docs, GST-related agreements, MSME Udyam filings, and government contract review for growing Indian businesses.',
    tag: 'India Focus',
    price: 'from Rs.3,499',
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      style={{ background: 'var(--white)', padding: '6rem 8vw' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.85rem',
          }}
        >
          What We Handle
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: '0.85rem',
          }}
        >
          Every legal need, one platform.
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--ink-muted)',
            maxWidth: '500px',
            lineHeight: 1.75,
          }}
        >
          Full-spectrum corporate legal services — from your first NDA to
          enterprise compliance frameworks.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid var(--border)',
          gap: '1px',
          background: 'var(--border)',
        }}
      >
        {serviceList.map((s, i) => (
          <div
            key={s.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'var(--gold-pale)' : 'var(--white)',
              padding: '2.25rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.25s',
              cursor: 'default',
            }}
          >
            {/* Gold underline on hover */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '2px',
                width: hovered === i ? '100%' : '0%',
                background: 'var(--gold)',
                transition: 'width 0.3s',
              }}
            />

            <span style={{ fontSize: '1.6rem', marginBottom: '1rem', display: 'block' }}>
              {s.icon}
            </span>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: '0.5rem',
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--ink-muted)',
                lineHeight: 1.65,
                marginBottom: '1.25rem',
              }}
            >
              {s.desc}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-dark)',
                  border: '1px solid var(--gold)',
                  padding: '0.18rem 0.5rem',
                  borderRadius: '2px',
                }}
              >
                {s.tag}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-faint)',
                }}
              >
                {s.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`;

// ── PAGE.TSX ──
const page = `import Navbar from './components/layout/Navbar';
import Hero from './components/homepage/Hero';
import Ticker from './components/homepage/Ticker';
import Services from './components/homepage/Services';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
    </main>
  );
}
`;

const base = __dirname;

const files = [
  {
    path: path.join(base, 'src', 'app', 'components', 'homepage', 'Ticker.tsx'),
    content: ticker,
  },
  {
    path: path.join(base, 'src', 'app', 'components', 'homepage', 'Services.tsx'),
    content: services,
  },
  {
    path: path.join(base, 'src', 'app', 'page.tsx'),
    content: page,
  },
];

files.forEach(({ path: p, content }) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Written:', p);
});

console.log('\nAll done. Check localhost:3000');
