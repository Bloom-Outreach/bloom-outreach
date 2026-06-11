interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref: string;
  metadata?: Record<string, unknown>;
  onClose?: () => void;
  callback?: (response: { reference: string; status: string }) => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackPop {
  setup: (options: PaystackSetupOptions) => PaystackHandler;
}

interface Window {
  PaystackPop?: PaystackPop;
}
