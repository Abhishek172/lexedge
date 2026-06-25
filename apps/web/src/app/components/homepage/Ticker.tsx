'use client';

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
