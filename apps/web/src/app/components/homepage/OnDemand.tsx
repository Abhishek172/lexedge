'use client';

import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';

const docTypes = [
  { id: 'nda', label: 'NDA / Confidentiality', icon: '🤝', priceIN: '₹2,999', priceINT: '$49' },
  { id: 'employment', label: 'Employment Contract', icon: '💼', priceIN: '₹3,499', priceINT: '$59' },
  { id: 'vendor', label: 'Vendor / Service Agreement', icon: '🏢', priceIN: '₹3,999', priceINT: '$69' },
  { id: 'saas', label: 'SaaS / Terms of Service', icon: '🌐', priceIN: '₹4,499', priceINT: '$75' },
  { id: 'mou', label: 'MOU / Letter of Intent', icon: '📝', priceIN: '₹2,999', priceINT: '$49' },
  { id: 'other', label: 'Other Document', icon: '📄', priceIN: '₹3,999', priceINT: '$69' },
];

const turnaround = [
  { id: 'std', label: 'Standard', sub: '48 hours', addIN: 0, addINT: 0 },
  { id: 'pri', label: 'Priority', sub: '24 hours', addIN: 999, addINT: 15 },
  { id: 'urg', label: 'Urgent', sub: 'Same day', addIN: 2499, addINT: 39 },
];

const steps = [
  { n: '01', title: 'Pick your document type', desc: 'Choose from the most common contract types or upload any document.' },
  { n: '02', title: 'Upload securely', desc: 'Your file goes into an encrypted vault instantly. No email exchange ever.' },
  { n: '03', title: 'Get a reviewed, annotated document back', desc: 'Track changes, plain-English explanations for every flag, and a summary note included.' },
];

export default function OnDemand() {
  const [selectedDoc, setSelectedDoc] = useState('nda');
  const [selectedTA, setSelectedTA] = useState('std');
  // const [region] = useState<'IN' | 'INT'>('IN');
  const { region } = useRegion();
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);
  const [hoveredTA, setHoveredTA] = useState<string | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState(false);

  const doc = docTypes.find((d) => d.id === selectedDoc)!;
  const ta = turnaround.find((t) => t.id === selectedTA)!;

  const basePrice = region === 'IN'
    ? parseInt(doc.priceIN.replace('₹', '').replace(',', ''))
    : parseInt(doc.priceINT.replace('$', ''));

  const totalPrice = basePrice + (region === 'IN' ? ta.addIN : ta.addINT);
  const displayPrice = region === 'IN' ? `₹${totalPrice.toLocaleString('en-IN')}` : `$${totalPrice}`;

  return (
    <section
      id="on-demand"
      style={{ background: 'var(--paper)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="ondemand-grid"
      >
        {/* LEFT */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
            On-Demand
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: '1.75rem' }}>
            One<br />
            doc.<br />
            <span style={{ color: 'var(--gold)' }}>Done.</span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: '420px', marginBottom: '2.5rem' }}>
            Not a startup. Not an enterprise. Just someone who needs one contract reviewed properly — without signing up for a retainer or sitting through a consultation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '1.25rem 0',
                  borderTop: i === 0 ? '1px solid var(--border)' : undefined,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 500, paddingTop: '0.15rem', flexShrink: 0, width: '20px' }}>
                  {s.n}
                </span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.25rem' }}>
                    {s.title}
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — interactive card */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2.5rem', position: 'sticky', top: '90px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.35rem' }}>
            Get your document reviewed
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '1.75rem' }}>
            Select type, choose turnaround, pay fixed fee. No surprises.
          </p>

          {/* Doc type selector */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '0.6rem' }}>
            Document Type
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.75rem' }}>
            {docTypes.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDoc(d.id)}
                onMouseEnter={() => setHoveredDoc(d.id)}
                onMouseLeave={() => setHoveredDoc(null)}
                style={{
                  padding: '0.75rem 1rem',
                  border: selectedDoc === d.id ? '1.5px solid var(--gold)' : hoveredDoc === d.id ? '1.5px solid var(--ink-muted)' : '1.5px solid var(--border-strong)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: selectedDoc === d.id ? 600 : 400,
                  color: selectedDoc === d.id ? 'var(--ink)' : 'var(--ink-soft)',
                  background: selectedDoc === d.id ? 'var(--gold-pale)' : 'var(--white)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-body)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
              </button>
            ))}
          </div>

          {/* Turnaround */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '0.6rem' }}>
            Turnaround
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            {turnaround.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTA(t.id)}
                onMouseEnter={() => setHoveredTA(t.id)}
                onMouseLeave={() => setHoveredTA(null)}
                style={{
                  flex: 1,
                  minWidth: '80px',
                  padding: '0.6rem 0.5rem',
                  border: selectedTA === t.id ? '1.5px solid var(--gold)' : hoveredTA === t.id ? '1.5px solid var(--ink-muted)' : '1.5px solid var(--border-strong)',
                  borderRadius: '6px',
                  background: selectedTA === t.id ? 'var(--gold-pale)' : 'var(--white)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)' }}>{t.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '0.1rem' }}>{t.sub}</div>
                {t.addIN > 0 && (
                  <div style={{ fontSize: '0.68rem', color: 'var(--gold-dark)', marginTop: '0.1rem', fontWeight: 600 }}>
                    +{region === 'IN' ? `₹${t.addIN.toLocaleString('en-IN')}` : `$${t.addINT}`}
                  </div>
                )}
              </button>
            ))}
          </div>

           {/* Price display */} 
          <div style={{ background: 'var(--paper)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.25rem' }}>Total price</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>
                {displayPrice}  
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginTop: '0.2rem' }}>
                Fixed fee - includes 1 round of revisions
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.4rem' }}>Includes</div>
              {['Annotated redline', 'Summary note', '1 revision round'].map((item) => (
                <div key={item} style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                  <span>✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.location.href = '#booking'}
            onMouseEnter={() => setHoveredCTA(true)}
            onMouseLeave={() => setHoveredCTA(false)}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              background: hoveredCTA ? 'var(--gold)' : 'var(--ink)',
              color: hoveredCTA ? 'var(--ink)' : 'var(--white)',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s',
              marginBottom: '0.75rem',
            }}
          >
            Get This Document Reviewed
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '0.7rem', color: 'var(--ink-faint)' }}>
            <span>🔒 Secure upload</span>
<span>|</span>
<span>Fixed price</span>
<span>|</span>
<span>Satisfaction guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}