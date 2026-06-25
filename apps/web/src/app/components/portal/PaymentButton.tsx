'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { apiRequest } from '../../../lib/api';
import { initiateRazorpayPayment } from '../../../lib/payment';

interface PaymentButtonProps {
  matterId: string;
  amount: number;
  currency: string;
  matterTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onSuccess: () => void;
}

export default function PaymentButton({
  matterId, amount, currency, matterTitle,
  clientName, clientEmail, clientPhone, onSuccess,
}: PaymentButtonProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      const order = await apiRequest('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ matterId, amount, currency }),
      }, token || undefined);

      initiateRazorpayPayment({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        keyId: order.keyId,
        clientName,
        clientEmail,
        clientPhone,
        matterTitle,
        onSuccess: async (paymentId) => {
          setLoading(false);
          onSuccess();
        },
        onFailure: (err) => {
          setError(err);
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: loading ? '#B45309' : hovered ? '#92400E' : '#B45309',
          color: 'var(--white)',
          padding: '0.6rem 1.25rem',
          borderRadius: '4px',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Processing...' : 'Pay Now →'}
      </button>
      {error && (
        <div style={{ fontSize: '0.72rem', color: 'var(--crimson)', marginTop: '0.4rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}