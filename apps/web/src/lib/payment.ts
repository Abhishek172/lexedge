declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  matterTitle: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

export function initiateRazorpayPayment(options: PaymentOptions) {
  const rzp = new window.Razorpay({
    key: options.keyId,
    amount: options.amount * 100,
    currency: options.currency,
    name: 'LexEdge',
    description: options.matterTitle,
    order_id: options.orderId,
    prefill: {
      name: options.clientName,
      email: options.clientEmail,
      contact: options.clientPhone,
    },
    theme: {
      color: '#C9A84C',
    },
    modal: {
      ondismiss: () => options.onFailure('Payment cancelled'),
    },
    handler: (response: any) => {
      options.onSuccess(response.razorpay_payment_id);
    },
  });
  rzp.open();
}