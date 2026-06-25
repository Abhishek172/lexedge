import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.07) 39px, rgba(201,168,76,0.07) 40px)',
      }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em' }}>
          Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
        </div>
        <SignIn />
      </div>
    </div>
  );
}