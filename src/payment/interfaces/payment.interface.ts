export const PAYMENT_STATUSES = ['Pending', 'Approved', 'Refused'] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
