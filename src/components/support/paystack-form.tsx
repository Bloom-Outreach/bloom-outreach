"use client";

import Script from "next/script";
import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmountPicker } from "@/components/support/amount-picker";
import {
  formatNaira,
  generatePaymentReference,
  supportConfig,
} from "@/lib/support";

export function PaystackForm() {
  const [amount, setAmount] = useState<number>(supportConfig.presetAmounts[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const paystackKey = supportConfig.paystackPublicKey;

  function handlePay() {
    setError(null);
    setSuccess(null);

    if (!email || amount < 100) {
      setError("Please enter a valid email and amount of at least ₦100.");
      return;
    }

    if (!paystackKey) {
      setError(
        "Paystack is not configured yet. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to your environment, or use bank transfer below.",
      );
      return;
    }

    if (!window.PaystackPop) {
      setError("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    const reference = generatePaymentReference();

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email,
      amount: amount * 100,
      currency: supportConfig.currency,
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "First Name", variable_name: "first_name", value: firstName },
          { display_name: "Last Name", variable_name: "last_name", value: lastName },
          { display_name: "Note", variable_name: "note", value: note },
        ],
      },
      onClose: () => setLoading(false),
      callback: (response) => {
        setLoading(false);
        setSuccess(
          `Thank you! Your gift of ${formatNaira(amount)} was received. Reference: ${response.reference}`,
        );
      },
    });

    handler.openIframe();
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />

      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 via-secondary/40 to-bloom-green/5 px-4 py-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Pay securely with Paystack</p>
            <p className="text-xs text-muted-foreground">
              Card, bank transfer, USSD, and mobile money accepted.
            </p>
          </div>
        </div>

        {success && (
          <p className="flex items-start gap-2 rounded-2xl border border-bloom-green/25 bg-bloom-green/10 px-4 py-3 text-sm text-bloom-green">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            {success}
          </p>
        )}

        {error && (
          <p className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pay-first-name" className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <Input
              id="pay-first-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="h-11 rounded-xl"
              required
            />
          </div>
          <div>
            <label htmlFor="pay-last-name" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <Input
              id="pay-last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="pay-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="pay-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl"
            placeholder="you@example.com"
            required
          />
        </div>

        <AmountPicker
          amount={amount}
          onAmountChange={setAmount}
          customAmount={customAmount}
          onCustomAmountChange={setCustomAmount}
        />

        <div>
          <label htmlFor="pay-note" className="mb-2 block text-sm font-medium">
            Note <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="pay-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="min-h-[88px] rounded-xl"
            placeholder="In honor of, prayer request, or designation..."
          />
        </div>

        <Button
          type="button"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          onClick={handlePay}
          disabled={loading || !scriptReady}
        >
          {loading ? (
            <>
              Processing...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Pay {formatNaira(amount)}
              <CreditCard className="size-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
}
