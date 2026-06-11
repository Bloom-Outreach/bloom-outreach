export const supportConfig = {
  currency: "NGN",
  currencySymbol: "₦",
  presetAmounts: [5000, 10000, 25000, 50000, 100000] as const,
  bankAccount: {
    bankName: "Guaranty Trust Bank",
    accountName: "Bloom Outreach",
    accountNumber: "0123456789",
  },
  paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "",
} as const;

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generatePaymentReference() {
  return `BLOOM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
