'use client';

import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/homepage/Footer';

const openings = [
  {
    code: 'LEX-001',
    title: 'Junior Corporate Lawyer',
    team: 'Legal',
    type: 'Full-time',
    location: 'Remote / Delhi NCR',
    experience: '1-3 years',
    desc: 'We are looking for a junior lawyer with a strong foundation in corporate and commercial law to join our growing team. You will work directly with our Principal Counsel on contract drafting, review, and client advisory.',
    requirements: [
      'LLB from a recognised university',
      '1-3 years of experience in corporate or commercial law',
      'Strong drafting and communication skills',
      'Ability to work independently and manage multiple matters',
      'Familiarity with Indian contract law, company law, and compliance frameworks',
    ],
    nice: [
      'LLM or additional specialisation',
      'Experience with startup or MSME clients',
      'Exposure to cross-border or international contracts',
    ],
  },
  {
    code: 'LEX-002',
    title: 'Legal Operations Associate',
    team: 'Operations',
    type: 'Full-time',
    location: 'Remote',
    experience: '0-2 years',
    desc: 'A non-lawyer role supporting the operational backbone of LexEdge — client coordination, matter tracking, document management, and process improvement. Ideal for someone organised, detail-oriented, and excited about the intersection of law and technology.',
    requirements: [
      'Bachelor\'s degree in any discipline',
      'Exceptional written and verbal communication',
      'Strong organisational skills and attention to detail',
      'Comfortable with digital tools and project management software',
      'Professional and empathetic client-facing manner',
    ],
    nice: [
      'Background in paralegal work or legal administration',
      'Familiarity with SaaS tools and CRM systems',
      'Interest in legal technology and process automation',
    ],
  },
];

export default function Careers() {
  const [expanded, setExpanded] = useState<string | null>('LEX-001');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '66px', background: 'var(--paper)', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: 'var(--ink)', padding: '5rem 8vw 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Careers at LexEdge
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem', maxWidth: '600px' }}>
              Build India's biggest legal platform with us.
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '500px', lineHeight: 1.75 }}>
              We are a small, ambitious team making corporate legal expertise accessible to every business in India & overseas. If that excites you, we would love to hear from you.
            </p>
          </div>
        </div>

        {/* Values strip */}
        <div style={{ background: 'var(--gold-pale)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1.5rem 8vw' }}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🌐', text: 'Fully remote-first' },
              { icon: '⚖️', text: 'Mission-driven work' },
              { icon: '📈', text: 'Early-stage equity' },
              { icon: '🧠', text: 'Learn from the best' },
              { icon: '🏡', text: 'Flexible hours' },
            ].map((v) => (
              <div key={v.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink-soft)' }}>
                <span>{v.icon}</span>
                <span>{v.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Openings */}
        <div style={{ padding: '5rem 8vw' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.85rem' }}>
            Open Positions
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
            {openings.length} open role{openings.length !== 1 ? 's' : ''} right now
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
            {openings.map((job) => (
              <div key={job.code} style={{ background: 'var(--white)' }}>
                {/* Job header */}
                <div
                  onClick={() => setExpanded(expanded === job.code ? null : job.code)}
                  onMouseEnter={() => setHovered(job.code)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '1.75rem 2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', gap: '1rem',
                    background: hovered === job.code && expanded !== job.code ? 'var(--paper)' : 'var(--white)',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>
                        {job.code}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
                        {job.title}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[job.team, job.type, job.location, job.experience].map((tag) => (
                        <span key={tag} style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--ink-muted)', background: 'var(--paper-warm)', padding: '0.25rem 0.65rem', borderRadius: '50px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: 'var(--ink-muted)', flexShrink: 0, transition: 'transform 0.2s', transform: expanded === job.code ? 'rotate(45deg)' : 'none', display: 'block', fontWeight: 300 }}>
                    +
                  </span>
                </div>

                {/* Expanded content */}
                {expanded === job.code && (
                  <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)', lineHeight: 1.75, margin: '1.5rem 0' }}>
                      {job.desc}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: '0.75rem' }}>
                          Requirements
                        </div>
                        {job.requirements.map((r) => (
                          <div key={r} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--ink-soft)', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700, marginTop: '0.1rem' }}>→</span>
                            {r}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: '0.75rem' }}>
                          Nice to Have
                        </div>
                        {job.nice.map((n) => (
                          <div key={n} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--ink-soft)', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--ink-faint)', flexShrink: 0 }}>+</span>
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apply CTA */}
                    <div style={{ background: 'var(--paper)', borderRadius: '8px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                          To apply for this role
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                          Send your CV and a short cover note to{' '}
                          <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>careers@lexedge.in</span>
                          {' '}with the subject line{' '}
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--gold-pale)', padding: '0.1rem 0.4rem', borderRadius: '3px', color: 'var(--ink)' }}>
                            [{job.code}] Your Name
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => window.location.href = `mailto:careers@lexedge.in?subject=[${job.code}] Application`}
                        style={{
                          background: 'var(--ink)', color: 'var(--white)',
                          padding: '0.8rem 1.75rem', borderRadius: '4px',
                          border: 'none', fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem', fontWeight: 600,
                          cursor: 'pointer', whiteSpace: 'nowrap',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
                      >
                        Apply via Email →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No role fits */}
          <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                Do not see a role that fits?
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                We are always open to hearing from exceptional people. Send us a speculative application.
              </div>
            </div>
            <button
              onClick={() => window.location.href = 'mailto:careers@lexedge.in?subject=Speculative Application'}
              style={{
                background: 'transparent', color: 'var(--ink)',
                padding: '0.8rem 1.75rem', borderRadius: '4px',
                border: '1.5px solid var(--border-strong)',
                fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
            >
              Send Speculative CV →
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}