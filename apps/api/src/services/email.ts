import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
//const FROM = 'LexEdge <hello@lexedge.in>';
const FROM = 'LexEdge <onboarding@resend.dev>';

export async function sendBookingConfirmation({
  email, firstName, consultType,
}: { email: string; firstName: string; consultType: string }) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Your LexEdge consultation is confirmed',
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0D0D0D;">
        <div style="background: #0D0D0D; padding: 2rem; text-align: center;">
          <span style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 900; color: white;">
            Lex<span style="color: #C9A84C;">Edge</span>
          </span>
        </div>
        <div style="padding: 2rem; background: #F8F5F0;">
          <h1 style="font-family: Georgia, serif; font-size: 1.4rem; margin-bottom: 1rem;">
            Hi ${firstName}, you are booked in.
          </h1>
          <p style="color: #5C5C5C; line-height: 1.7; margin-bottom: 1rem;">
            We have received your request for a <strong>${consultType}</strong> and will confirm your slot within 2 hours via email and WhatsApp.
          </p>
          <p style="color: #5C5C5C; line-height: 1.7;">
            In the meantime, you can take our free <a href="https://lexedge.in/legal-health-score" style="color: #C9A84C;">Legal Health Score quiz</a> to understand your current legal risk profile.
          </p>
        </div>
        <div style="padding: 1.5rem 2rem; background: #EDE9E2; font-size: 0.75rem; color: #999; text-align: center;">
          LexEdge · legal services platform · Not a law firm
        </div>
      </div>
    `,
  });
}

export async function sendMatterUpdate({
  email, firstName, matterId, title, status,
}: { email: string; firstName: string; matterId: string; title: string; status: string }) {
  const statusMessages: Record<string, string> = {
    RECEIVED: 'We have received your matter and will begin review shortly.',
    IN_REVIEW: 'Our lawyer is actively reviewing your document.',
    DRAFT_READY: 'Your reviewed document is ready. Please log in to review and provide feedback.',
    REVISIONS: 'We are working on the revisions you requested.',
    FINAL_DELIVERED: 'Your final document has been delivered. Please log in to download.',
    CLOSED: 'Your matter has been closed. Thank you for choosing LexEdge.',
  };

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Matter Update — ${title}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0D0D0D;">
        <div style="background: #0D0D0D; padding: 2rem; text-align: center;">
          <span style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 900; color: white;">
            Lex<span style="color: #C9A84C;">Edge</span>
          </span>
        </div>
        <div style="padding: 2rem; background: #F8F5F0;">
          <h1 style="font-family: Georgia, serif; font-size: 1.4rem; margin-bottom: 1rem;">
            Hi ${firstName}, your matter has been updated.
          </h1>
          <div style="background: white; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem; border-left: 4px solid #C9A84C;">
            <div style="font-size: 0.75rem; color: #999; margin-bottom: 0.25rem;">${matterId}</div>
            <div style="font-weight: 700; color: #0D0D0D; margin-bottom: 0.5rem;">${title}</div>
            <div style="font-size: 0.85rem; color: #5C5C5C;">${statusMessages[status] || 'Your matter status has been updated.'}</div>
          </div>
          <a href="https://lexedge.in/portal" style="display: inline-block; background: #0D0D0D; color: white; padding: 0.75rem 1.5rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
            View in Portal
          </a>
        </div>
        <div style="padding: 1.5rem 2rem; background: #EDE9E2; font-size: 0.75rem; color: #999; text-align: center;">
          LexEdge · legal services platform
        </div>
      </div>
    `,
  });
}

export async function sendPaymentConfirmation({
  email, firstName, amount, currency, matterId, matterTitle,
}: { email: string; firstName: string; amount: number; currency: string; matterId: string; matterTitle: string }) {
  const displayAmount = currency === 'INR'
    ? `₹${(amount).toLocaleString('en-IN')}`
    : `$${amount}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Payment Confirmed — ${matterTitle}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0D0D0D;">
        <div style="background: #0D0D0D; padding: 2rem; text-align: center;">
          <span style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 900; color: white;">
            Lex<span style="color: #C9A84C;">Edge</span>
          </span>
        </div>
        <div style="padding: 2rem; background: #F8F5F0;">
          <h1 style="font-family: Georgia, serif; font-size: 1.4rem; margin-bottom: 1rem;">
            Payment confirmed, ${firstName}.
          </h1>
          <div style="background: #E8F5EE; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="font-size: 1.5rem; font-weight: 900; color: #1A6B3C;">${displayAmount}</div>
            <div style="font-size: 0.82rem; color: #1A6B3C; margin-top: 0.25rem;">Payment received for ${matterTitle}</div>
          </div>
          <p style="color: #5C5C5C; line-height: 1.7; margin-bottom: 1rem;">
            Work on your matter will now begin. You will receive updates as we progress. GST invoice has been sent separately.
          </p>
          <a href="https://lexedge.in/portal" style="display: inline-block; background: #0D0D0D; color: white; padding: 0.75rem 1.5rem; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
            Track Your Matter
          </a>
        </div>
        <div style="padding: 1.5rem 2rem; background: #EDE9E2; font-size: 0.75rem; color: #999; text-align: center;">
          LexEdge · legal services platform
        </div>
      </div>
    `,
  });
}

export async function sendQuizResults({
  email, score, recommendations,
}: { email: string; score: number; recommendations: string[] }) {
  const tier = score >= 85 ? 'Legally Strong' : score >= 60 ? 'Moderate Risk' : 'High Risk';
  const tierColor = score >= 85 ? '#1A6B3C' : score >= 60 ? '#B45309' : '#8B1A2E';

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your Legal Health Score: ${score}/100`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0D0D0D;">
        <div style="background: #0D0D0D; padding: 2rem; text-align: center;">
          <span style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 900; color: white;">
            Lex<span style="color: #C9A84C;">Edge</span>
          </span>
        </div>
        <div style="padding: 2rem; background: #F8F5F0;">
          <h1 style="font-family: Georgia, serif; font-size: 1.4rem; margin-bottom: 1rem;">
            Your Legal Health Score is in.
          </h1>
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="font-family: Georgia, serif; font-size: 4rem; font-weight: 900; color: ${tierColor}; line-height: 1;">${score}</div>
            <div style="font-size: 0.9rem; color: ${tierColor}; font-weight: 700; margin-top: 0.25rem;">${tier}</div>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #5C5C5C; margin-bottom: 0.75rem;">Recommended next steps</div>
            ${recommendations.map(r => `
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.6rem; padding: 0.75rem 1rem; background: white; border-radius: 6px;">
                <span style="color: #C9A84C; font-weight: 700; flex-shrink: 0;">→</span>
                <span style="font-size: 0.85rem; color: #2A2A2A;">${r}</span>
              </div>
            `).join('')}
          </div>
          <a href="https://lexedge.in/#booking" style="display: block; background: #C9A84C; color: #0D0D0D; padding: 1rem; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 0.9rem; text-align: center;">
            Book Free Consultation to Fix These Gaps →
          </a>
        </div>
        <div style="padding: 1.5rem 2rem; background: #EDE9E2; font-size: 0.75rem; color: #999; text-align: center;">
          LexEdge · legal services platform
        </div>
      </div>
    `,
  });
}