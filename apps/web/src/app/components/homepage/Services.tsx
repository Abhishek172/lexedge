'use client';

import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';

const serviceList = [
  { icon: '📄', name: 'Contract Drafting & Review', desc: 'Airtight contracts built from scratch, or thorough red-flag reviews of existing ones. Every clause scrutinized before you sign.', tag: 'Most Popular', priceIN: 'from ₹2,999', priceINT: 'from $49' },
  { icon: '🤝', name: 'NDA & Confidentiality', desc: 'Mutual and unilateral NDAs for partnerships, employment, IP sharing, and product collaborations — India and cross-border.', tag: '48hr turnaround', priceIN: 'from ₹2,999', priceINT: 'from $49' },
  { icon: '🚀', name: 'Startup Legal Pack', desc: 'Founders agreement, equity terms, IP assignment, advisor agreements, ESOP policy — everything to be investor-ready.', tag: 'Bundled', priceIN: 'from ₹9,999', priceINT: 'from $149' },
  { icon: '🏢', name: 'Vendor & Procurement', desc: 'Vendor agreements, SLAs, procurement policies, and supply chain contracts that protect your business relationships.', tag: 'B2B', priceIN: 'from ₹3,999', priceINT: 'from $69' },
  { icon: '⭐', name: 'Brand & Endorsement', desc: 'Celebrity deals, influencer contracts, brand licensing, and IP commercialisation across one or multiple parties.', tag: 'Entertainment', priceIN: 'from ₹4,999', priceINT: 'from $79' },
  { icon: '💼', name: 'Employment & HR Legal', desc: 'Offer letters, employment contracts, POSH policies, performance clauses, and severance agreements.', tag: 'HR', priceIN: 'from ₹2,999', priceINT: 'from $49' },
  { icon: '🌐', name: 'Tech & SaaS Contracts', desc: 'Terms of Service, Privacy Policies, DPDPA/GDPR compliance, API agreements, and SaaS subscription terms.', tag: 'Digital', priceIN: 'from ₹3,999', priceINT: 'from $69' },
  { icon: '🔍', name: 'Legal Due Diligence', desc: 'Pre-investment, pre-acquisition, or pre-merger document review — identify every liability before you commit.', tag: 'M&A', priceIN: 'from ₹14,999', priceINT: 'from $249' },
  { icon: '📋', name: 'MSME & Compliance', desc: 'Regulatory docs, GST-related agreements, MSME Udyam filings, and government contract review for growing Indian businesses.', tag: 'India Focus', priceIN: 'from ₹3,499', priceINT: 'from $59' },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { region, setSelectedService } = useRegion();

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" style={{ background: 'var(--white)', padding: '6rem 8vw' }} className="section-pad">
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
          What We Handle
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.85rem' }}>
          Every legal need, one platform.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', maxWidth: '500px', lineHeight: 1.75 }}>
          Full-spectrum corporate legal services — from your first NDA to enterprise compliance frameworks.
        </p>
      </div>

      <div className="services-grid">
        {serviceList.map((s, i) => (
          <div
            key={s.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleServiceClick(s.name)}
            style={{
              background: hovered === i ? 'var(--gold-pale)' : 'var(--white)',
              padding: '2.25rem', position: 'relative', overflow: 'hidden',
              transition: 'background 0.25s', cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: hovered === i ? '100%' : '0%', background: 'var(--gold)', transition: 'width 0.3s' }} />
            <span style={{ fontSize: '1.6rem', marginBottom: '1rem', display: 'block' }}>{s.icon}</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{s.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{s.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', border: '1px solid var(--gold)', padding: '0.18rem 0.5rem', borderRadius: '2px' }}>{s.tag}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-faint)' }}>
                {region === 'IN' ? s.priceIN : s.priceINT}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}