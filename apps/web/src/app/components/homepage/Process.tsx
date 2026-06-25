'use client';

const steps = [
  {
    n: '01',
    title: 'Book a free consultation',
    desc: 'Choose a slot that works for you. First 30 minutes are always free — no obligation to proceed.',
    time: 'Done in 2 minutes',
  },
  {
    n: '02',
    title: 'Share your documents securely',
    desc: 'Upload through the encrypted client portal. We review, come back with a clear fixed-fee quote and timeline.',
    time: 'Quote within 4 hours',
  },
  {
    n: '03',
    title: 'Track progress in real time',
    desc: 'Your matter dashboard shows exactly where we are — Received, In Review, Draft Ready, Revisions, Final. Ask questions anytime.',
    time: 'Full visibility always',
  },
  {
    n: '04',
    title: 'Receive, review, and sign',
    desc: 'Final document delivered with a plain-English summary. Pay only on satisfaction. Digital signing available.',
    time: 'Within agreed timeline',
  },
];

const promises = [
  'A fixed quote before any work begins — no billing surprises',
  'Plain-English explanations alongside every legal recommendation',
  'You own every document we draft — forever',
  'Revisions included until you are satisfied',
  'Direct access to the lawyer handling your matter, not a paralegal',
  'Your documents are never used as templates for other clients',
];

const security = [
  'AES-256 encrypted document storage',
  'Pre-signed URLs — no public file links, ever',
  'JWT-authenticated client portal',
  'DPDPA 2023 compliant data handling',
  'Documents deleted on request within 24hrs',
  'No document shared with third parties without consent',
];

export default function Process() {
  return (
    <section
      id="process"
      style={{ background: 'var(--paper-warm)', padding: '6rem 8vw' }}
      className="section-pad"
    >
      <div
        className="process-layout"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
      >
        {/* Left — steps */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
            The Process
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '2.5rem' }}>
            Transparent from first message to final document.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '2rem 0',
                  borderBottom: '1px solid var(--border)',
                  borderTop: i === 0 ? '1px solid var(--border)' : undefined,
                }}
              >
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--ink)', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid rgba(201,168,76,0.3)' }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem' }}>
                    {s.title}
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.65, margin: '0 0 0.4rem' }}>
                    {s.desc}
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>
                    {s.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — promise + security */}
        <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2.25rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1.25rem' }}>
              What we promise on every matter
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {promises.map((p) => (
                <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.83rem', color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--ink)', borderRadius: '12px', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              How we protect your data
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {security.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '0.6rem' }}>◆</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}