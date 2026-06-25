'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Is the first consultation really free?',
    a: 'Yes, completely. The first 30-minute discovery call is free with zero obligation to proceed. We use it to understand your needs and scope the right solution — if there is nothing more we can help with, that is fine too.',
  },
  {
    q: 'How are documents shared and stored?',
    a: 'All documents go through our encrypted portal — AES-256 encryption, access-controlled, no public URLs. We never exchange documents over email. Your files are deleted on request within 24 hours.',
  },
  {
    q: 'Can you handle contracts governed by foreign law?',
    a: 'Yes. We regularly handle cross-border agreements including contracts under English, Singapore, UAE, and US law — common for Indian businesses with international partners, investors, or clients.',
  },
  {
    q: 'What exactly does a document review include?',
    a: 'You receive an annotated redline document with comments on every flag, a plain-English summary note explaining what each issue means and why it matters, and one round of revisions included in the base fee.',
  },
  {
    q: 'Why are international prices different from Indian prices?',
    a: 'This reflects market parity — we price in line with what comparable services cost in each region. It is the same work, the same quality, the same lawyer. International engagements also typically involve more complex cross-border requirements.',
  },
  {
    q: 'Do you represent clients in court?',
    a: 'LexEdge specialises in non-litigation corporate legal services — contracts, compliance, advisory, and documentation. For litigation matters, we can connect you with trusted counsel from our network.',
  },
  {
    q: 'Can I track my document progress?',
    a: 'Yes. Every matter on Growth, Scale, and Enterprise plans has a live status tracker in your client portal: Received, In Review, Draft Ready, Revisions, Final Delivered. You can message directly from the dashboard at any stage.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major UPI apps, credit and debit cards, net banking, and international cards. GST invoices are issued automatically for every transaction. International clients can pay via wire transfer or international card.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{ background: 'var(--paper)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      <div
        className="faq-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem' }}
      >
        {/* Left */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
            FAQ
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '1rem' }}>
            Questions we hear most often.
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Something not covered here? We are happy to answer directly.
          </p>
          <button
            onClick={() => window.location.href = '#booking'}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              fontWeight: 600, color: 'var(--gold-dark)',
              padding: 0, textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Ask us directly →
          </button>
        </div>

        {/* Right — accordion */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                borderBottom: '1px solid var(--border)',
                borderTop: i === 0 ? '1px solid var(--border)' : undefined,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', padding: '1.4rem 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <span style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  border: openIndex === i ? 'none' : '1.5px solid var(--border-strong)',
                  background: openIndex === i ? 'var(--gold)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', color: openIndex === i ? 'var(--ink)' : 'var(--ink-muted)',
                  flexShrink: 0, transition: 'all 0.2s',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  fontWeight: 700,
                }}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75, paddingBottom: '1.4rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}