'use client';

import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';

type Region = 'IN' | 'INT';

const tiers = [
  {
    id: 'ondemand',
    tier: 'Transactional',
    name: 'On-Demand',
    desc: 'For anyone who needs one document handled — fast, properly, affordably.',
    priceIN: '2,999', priceINT: '49',
    cadenceIN: 'per document', cadenceINT: 'per document',
    saveIN: '', saveINT: '',
    featured: false,
    cta: 'Start Review',
    ctaHref: '#on-demand',
    features: [
      '1 document review or draft',
      'Annotated redline + summary note',
      '48hr turnaround (upgradeable)',
      'Secure document portal access',
      '1 round of revisions',
    ],
  },
  {
    id: 'founder',
    tier: 'Startup',
    name: 'Founder Pack',
    desc: 'Everything a pre-seed or seed-stage startup needs to be legally sound.',
    priceIN: '9,999', priceINT: '149',
    cadenceIN: 'one-time pack', cadenceINT: 'one-time pack',
    saveIN: 'Save 30% vs individual pricing',
    saveINT: 'Save 30% vs individual pricing',
    featured: false,
    cta: 'Get Started',
    ctaHref: '#booking',
    features: [
      "Founders' agreement",
      '1 NDA template (mutual)',
      'IP assignment agreement',
      '1 advisor agreement',
      'Free 30-min strategy call',
      '48hr turnaround',
    ],
  },
  {
    id: 'msme',
    tier: 'Growth',
    name: 'MSME Monthly',
    desc: 'For businesses with regular legal needs — one flat monthly fee.',
    priceIN: '14,999', priceINT: '299',
    cadenceIN: 'per month', cadenceINT: 'per month',
    saveIN: 'Save 40% vs on-demand rate',
    saveINT: 'Save 40% vs on-demand rate',
    featured: true,
    cta: 'Book Onboarding Call',
    ctaHref: '#booking',
    features: [
      'Up to 5 matters per month',
      'Priority 24hr turnaround',
      'Unlimited revisions per matter',
      'Monthly compliance check-in',
      'Contract template library',
      'Live matter tracker dashboard',
      'WhatsApp priority line',
    ],
  },
  {
    id: 'scale',
    tier: 'Scale',
    name: 'Series A+',
    desc: 'For funded startups and growing companies with high document volume.',
    priceIN: '39,999', priceINT: '699',
    cadenceIN: 'per month', cadenceINT: 'per month',
    saveIN: 'Save 50% vs on-demand rate',
    saveINT: 'Save 50% vs on-demand rate',
    featured: false,
    cta: 'Request Scope Call',
    ctaHref: '#booking',
    features: [
      'Unlimited matters',
      'Same-day SLA',
      'Dedicated legal POC',
      'Multi-user client portal',
      'Cross-border contracts included',
      'Quarterly legal audit',
      'Internal policy drafting',
    ],
  },
  {
    id: 'enterprise',
    tier: 'Enterprise',
    name: 'Custom',
    desc: 'For large organisations, international teams, and high-stakes engagements.',
    priceIN: null, priceINT: null,
    cadenceIN: 'fully bespoke', cadenceINT: 'fully bespoke',
    saveIN: '', saveINT: '',
    featured: false,
    cta: 'Get Custom Quote',
    ctaHref: '#booking',
    features: [
      'Bespoke SLA and scope',
      'White-label client portal',
      'Team onboarding support',
      'Full due diligence support',
      'M&A documentation',
      'Legal health score report',
      'International jurisdiction coverage',
    ],
  },
];

const bundles = [
  { docs: '3 docs', saveIN: '10% off — save Rs.900', saveINT: '10% off — save $14' },
  { docs: '5 docs', saveIN: '20% off — save Rs.3,000', saveINT: '20% off — save $49' },
  { docs: '10 docs', saveIN: '30% off — save Rs.9,000 + free consult', saveINT: '30% off — save $147 + free consult' },
];

export default function Pricing() {
  // 
  const { region, setRegion } = useRegion();
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  return (
    <section
      id="pricing"
      style={{ background: 'var(--ink)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
          Plans and Pricing
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--white)', marginBottom: '0.85rem', maxWidth: '560px' }}>
          One platform, every stage of your business.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          No hourly billing. No hidden fees. Fixed-fee packages designed to scale with you.
        </p>

        {/* Region toggle */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px', gap: '3px' }}>
          {(['IN', 'INT'] as Region[]).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              onMouseEnter={() => setHoveredRegion(r)}
              onMouseLeave={() => setHoveredRegion(null)}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: region === r ? 'var(--gold)' : hoveredRegion === r ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: region === r ? 'var(--ink)' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)',
              }}
            >
              {r === 'IN' ? 'India (Rs.)' : 'International ($)'}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing grid */}
      <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
        {tiers.map((t) => (
          <div
            key={t.id}
            onMouseEnter={() => setHoveredTier(t.id)}
            onMouseLeave={() => setHoveredTier(null)}
            style={{
              background: t.featured
                ? 'rgba(201,168,76,0.08)'
                : hoveredTier === t.id
                ? 'rgba(255,255,255,0.055)'
                : 'rgba(255,255,255,0.03)',
              padding: '2rem 1.75rem',
              position: 'relative',
              transition: 'background 0.2s',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {t.featured && (
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.75rem', borderRadius: '0 0 5px 5px', whiteSpace: 'nowrap' }}>
                Most Popular
              </div>
            )}

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.6rem', marginTop: t.featured ? '0.75rem' : '0' }}>
              {t.tier}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.35rem' }}>
              {t.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.55, marginBottom: '1.25rem', minHeight: '2.5rem' }}>
              {t.desc}
            </div>

            {t.priceIN ? (
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--white)', lineHeight: 1 }}>
                <span style={{ fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>
                  {region === 'IN' ? 'Rs.' : '$'}
                </span>
                {region === 'IN' ? t.priceIN : t.priceINT}
              </div>
            ) : (
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--white)', lineHeight: 1.2 }}>
                Let's talk
              </div>
            )}

            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem', marginBottom: '0.3rem' }}>
              {region === 'IN' ? t.cadenceIN : t.cadenceINT}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600, height: '1rem', marginBottom: '1.25rem' }}>
              {region === 'IN' ? t.saveIN : t.saveINT}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '1.25rem' }} />

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem', flex: 1 }}>
              {t.features.map((f) => (
                <li key={f} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', lineHeight: 1.45 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.location.href = t.ctaHref}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)',
                background: t.featured ? 'var(--gold)' : 'transparent',
                color: t.featured ? 'var(--ink)' : hoveredTier === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                border: t.featured ? 'none' : `1px solid ${hoveredTier === t.id ? 'var(--gold)' : 'rgba(255,255,255,0.18)'}`,
              }}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Bundle discounts */}
      <div style={{ marginTop: '2rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>
            Bundle Discounts
          </div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
            Buy multiple On-Demand reviews together and save. Applied automatically at checkout.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {bundles.map((b) => (
            <div key={b.docs} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '4px', padding: '0.35rem 0.85rem', fontSize: '0.78rem', color: 'var(--gold-light)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {b.docs}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>→</span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                {region === 'IN' ? b.saveIN : b.saveINT}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}