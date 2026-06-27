'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiRequest } from '../../../../lib/api';

const statusSteps = ['RECEIVED', 'IN_REVIEW', 'DRAFT_READY', 'REVISIONS', 'FINAL_DELIVERED'];
const statusLabels: Record<string, string> = {
  RECEIVED: 'Received',
  IN_REVIEW: 'In Review',
  DRAFT_READY: 'Draft Ready',
  REVISIONS: 'Revisions',
  FINAL_DELIVERED: 'Final Delivered',
  CLOSED: 'Closed',
};

export default function AdminMatterDetail({ params }: { params: { id: string } }) {
  const { getToken } = useAuth();
  const [matter, setMatter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [sendingPaymentLink, setSendingPaymentLink] = useState(false);
  const [paymentLinkSent, setPaymentLinkSent] = useState(false);

  useEffect(() => {
    loadMatter();
  }, []);

  const loadMatter = async () => {
    try {
      const token = await getToken();
      const data = await apiRequest(`/api/matters/${params.id}`, {}, token || undefined);
      setMatter(data);
      setInternalNote(data.internalNotes || '');
    } catch (error) {
      console.error('Failed to load matter:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    setUpdatingStatus(true);
    try {
      const token = await getToken();
      const updated = await apiRequest(`/api/matters/${params.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }, token || undefined);
      setMatter((prev: any) => ({ ...prev, status: updated.status, statusHistory: updated.statusHistory }));
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveNote = async () => {
    setSavingNote(true);
    try {
      const token = await getToken();
      await apiRequest(`/api/matters/${params.id}/notes`, {
        method: 'PATCH',
        body: JSON.stringify({ notes: internalNote }),
      }, token || undefined);
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setSavingNote(false);
    }
  };

  const sendMessage = async (isInternal = false) => {
    if (!message.trim()) return;
    setSendingMsg(true);
    try {
      const token = await getToken();
      const msg = await apiRequest(`/api/matters/${params.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content: message, isInternal }),
      }, token || undefined);
      setMatter((prev: any) => ({
        ...prev,
        messages: [...(prev.messages || []), msg],
      }));
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMsg(false);
    }
  };

  const triggerPaymentLink = async () => {
    setSendingPaymentLink(true);
    try {
      const token = await getToken();
      await apiRequest('/api/payments/send-link', {
        method: 'POST',
        body: JSON.stringify({ matterId: params.id }),
      }, token || undefined);
      setPaymentLinkSent(true);
      setTimeout(() => setPaymentLinkSent(false), 5000);
    } catch (error) {
      console.error('Failed to send payment link:', error);
    } finally {
      setSendingPaymentLink(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Loading matter...</div>
      </div>
    );
  }

  if (!matter) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ color: 'var(--crimson)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Matter not found</div>
      </div>
    );
  }

  const isPaid = matter.payments?.some((p: any) => p.status === 'PAID');
  const pendingPayment = matter.payments?.find((p: any) => p.status === 'PENDING');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '60px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => window.location.href = '/admin'} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Matter Detail
          </span>
        </div>
        <button onClick={() => window.location.href = '/admin'} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.3rem' }}>
              {matter.id?.slice(0, 12)}...
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              {matter.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: '0.35rem' }}>
              {matter.client?.firstName} {matter.client?.lastName} · {matter.client?.company || 'Individual'} · {matter.client?.email}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isPaid && pendingPayment && (
              <button
                onClick={triggerPaymentLink}
                disabled={sendingPaymentLink || paymentLinkSent}
                style={{
                  background: paymentLinkSent ? 'var(--green)' : 'var(--crimson)',
                  color: 'var(--white)', padding: '0.65rem 1.25rem',
                  borderRadius: '4px', border: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
                  cursor: sendingPaymentLink ? 'not-allowed' : 'pointer',
                  opacity: sendingPaymentLink ? 0.7 : 1,
                }}
              >
                {paymentLinkSent ? '✓ Link Sent!' : sendingPaymentLink ? 'Sending...' : '💳 Send Payment Link'}
              </button>
            )}
            {isPaid && (
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--green)', background: 'var(--green-pale)', padding: '0.4rem 1rem', borderRadius: '50px' }}>
                ✓ Paid
              </span>
            )}
          </div>
        </div>

        {/* Status tracker */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
            Update Status
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            {statusSteps.map((step, i) => {
              const currentIndex = statusSteps.indexOf(matter.status);
              const isDone = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  {i < statusSteps.length - 1 && (
                    <div style={{ position: 'absolute', top: '13px', left: '50%', right: '-50%', height: '2px', background: i < currentIndex ? 'var(--gold)' : 'var(--border)', zIndex: 0 }} />
                  )}
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isCurrent ? 'var(--gold)' : isDone ? 'var(--ink)' : 'var(--paper-warm)', border: isCurrent ? '3px solid var(--gold)' : isDone ? '3px solid var(--ink)' : '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative', flexShrink: 0 }}>
                    {isDone && !isCurrent && <span style={{ color: 'var(--white)', fontSize: '0.65rem', fontWeight: 700 }}>✓</span>}
                    {isCurrent && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)', display: 'block' }} />}
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: isCurrent ? 700 : 400, color: isCurrent ? 'var(--ink)' : isDone ? 'var(--ink-soft)' : 'var(--ink-faint)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.3, padding: '0 0.25rem' }}>
                    {statusLabels[step]}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {statusSteps.map((step) => (
              <button
                key={step}
                onClick={() => updateStatus(step)}
                disabled={updatingStatus || matter.status === step}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '4px',
                  border: matter.status === step ? '2px solid var(--gold)' : '1px solid var(--border-strong)',
                  background: matter.status === step ? 'var(--gold-pale)' : 'var(--white)',
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  fontWeight: matter.status === step ? 700 : 400,
                  color: matter.status === step ? 'var(--ink)' : 'var(--ink-muted)',
                  cursor: matter.status === step || updatingStatus ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (matter.status !== step) { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; } }}
                onMouseLeave={(e) => { if (matter.status !== step) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--ink-muted)'; } }}
              >
                {statusLabels[step]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

          {/* Matter details */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
              Matter Details
            </div>
            {[
              { label: 'Service', value: matter.service },
              { label: 'Fee', value: `${matter.region === 'INDIA' ? '₹' : '$'}${matter.fee?.toLocaleString('en-IN')} + GST` },
              { label: 'SLA', value: `${matter.slaHours || 48} hours` },
              { label: 'Due Date', value: matter.dueDate ? new Date(matter.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not set' },
              { label: 'Region', value: matter.region },
              { label: 'Payment', value: isPaid ? 'Paid' : 'Pending' },
            ].map((d) => (
              <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{d.label}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: d.label === 'Payment' ? (isPaid ? 'var(--green)' : 'var(--crimson)') : 'var(--ink)' }}>{d.value}</span>
              </div>
            ))}
            {matter.description && (
              <div style={{ marginTop: '1rem', padding: '0.85rem', background: 'var(--paper)', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)', marginBottom: '0.4rem' }}>Description</div>
                {matter.description}
              </div>
            )}
          </div>

          {/* Internal notes */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Internal Notes
              <span style={{ fontSize: '0.62rem', color: 'var(--ink-faint)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>🔒 Not visible to client</span>
            </div>
            <textarea
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add internal notes about this matter..."
              rows={8}
              style={{ width: '100%', padding: '0.75rem', border: '1.5px solid var(--border-strong)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink)', background: 'var(--paper)', outline: 'none', resize: 'vertical' }}
            />
            <button
              onClick={saveNote}
              disabled={savingNote}
              style={{ marginTop: '0.75rem', background: savingNote ? 'var(--ink-muted)' : 'var(--ink)', color: 'var(--white)', padding: '0.6rem 1.25rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, cursor: savingNote ? 'not-allowed' : 'pointer' }}
            >
              {savingNote ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </div>

        {/* Documents */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
            Documents ({matter.documents?.length || 0})
          </div>
          {matter.documents?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-faint)', fontSize: '0.82rem' }}>
              No documents uploaded yet
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {matter.documents?.map((doc: any) => (
                <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--paper)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                    <span>{doc.isClientDoc ? '📤' : '📄'}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.72rem', color: 'var(--gold-dark)', fontWeight: 600, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
                    ↓
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
            Messages ({(matter.messages || []).filter((m: any) => !m.isInternal).length} client · {(matter.messages || []).filter((m: any) => m.isInternal).length} internal)
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(matter.messages || []).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-faint)', fontSize: '0.82rem' }}>
                No messages yet
              </div>
            ) : (
              (matter.messages || []).map((msg: any) => (
                <div key={msg.id} style={{ padding: '0.85rem 1rem', background: msg.isInternal ? '#FEF3C7' : msg.sender?.role === 'CLIENT' ? 'var(--paper)' : 'var(--gold-pale)', borderRadius: '8px', border: msg.isInternal ? '1px solid #B45309' : '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: msg.isInternal ? '#92400E' : 'var(--ink)' }}>
                      {msg.isInternal ? '🔒 Internal — ' : ''}{msg.sender?.firstName} {msg.sender?.lastName} ({msg.sender?.role})
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--ink-faint)' }}>
                      {new Date(msg.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{msg.content}</div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message to client or internal note..."
              rows={3}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border-strong)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', resize: 'vertical', background: 'var(--paper)' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => sendMessage(false)}
                disabled={sendingMsg || !message.trim()}
                style={{ padding: '0.65rem 1.25rem', background: 'var(--ink)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, cursor: sendingMsg ? 'not-allowed' : 'pointer', opacity: sendingMsg ? 0.7 : 1 }}
              >
                Send to Client
              </button>
              <button
                onClick={() => sendMessage(true)}
                disabled={sendingMsg || !message.trim()}
                style={{ padding: '0.65rem 1.25rem', background: '#FEF3C7', color: '#92400E', border: '1px solid #B45309', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, cursor: sendingMsg ? 'not-allowed' : 'pointer', opacity: sendingMsg ? 0.7 : 1 }}
              >
                🔒 Internal Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}