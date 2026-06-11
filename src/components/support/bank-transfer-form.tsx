"use client";

import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Copy,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmountPicker } from "@/components/support/amount-picker";
import { formatNaira, supportConfig } from "@/lib/support";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 backdrop-blur-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="font-medium text-foreground">{value}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
          <Copy className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function BankTransferForm() {
  const [amount, setAmount] = useState<number>(supportConfig.presetAmounts[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { bankName, accountName, accountNumber } = supportConfig.bankAccount;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/8 via-secondary/50 to-bloom-green/8 p-5">
        <div className="bloom-pattern pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">Bank transfer details</p>
              <p className="text-xs text-muted-foreground">
                Send your gift directly to our account.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <CopyField label="Bank" value={bankName} />
            <CopyField label="Account Name" value={accountName} />
            <CopyField label="Account Number" value={accountNumber} />
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-3xl border border-bloom-green/25 bg-bloom-green/10 p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-bloom-green" />
          <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
            Transfer details received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Thank you for your planned gift of {formatNaira(amount)}. Please
            complete the transfer to account number{" "}
            <span className="font-medium text-foreground">{accountNumber}</span>{" "}
            and use your name as the payment reference. We&apos;ll send a
            confirmation once we receive it.
          </p>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bank-first-name" className="mb-2 block text-sm font-medium">
                First Name
              </label>
              <Input
                id="bank-first-name"
                name="firstName"
                className="h-11 rounded-xl"
                required
              />
            </div>
            <div>
              <label htmlFor="bank-last-name" className="mb-2 block text-sm font-medium">
                Last Name
              </label>
              <Input
                id="bank-last-name"
                name="lastName"
                className="h-11 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="bank-email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <Input
              id="bank-email"
              name="email"
              type="email"
              className="h-11 rounded-xl"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="bank-phone" className="mb-2 block text-sm font-medium">
              Phone <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="bank-phone"
              name="phone"
              type="tel"
              className="h-11 rounded-xl"
              placeholder="+234..."
            />
          </div>

          <AmountPicker
            amount={amount}
            onAmountChange={setAmount}
            customAmount={customAmount}
            onCustomAmountChange={setCustomAmount}
          />

          <div>
            <label htmlFor="bank-reference" className="mb-2 block text-sm font-medium">
              Transfer reference
            </label>
            <Input
              id="bank-reference"
              name="reference"
              className="h-11 rounded-xl"
              placeholder="Your full name (as it will appear on the transfer)"
              required
            />
          </div>

          <div>
            <label htmlFor="bank-note" className="mb-2 block text-sm font-medium">
              Note <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id="bank-note"
              name="note"
              className="min-h-[88px] rounded-xl"
              placeholder="Monthly partner, cleanup supplies, gospel outreach..."
            />
          </div>

          <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
            I&apos;ve Made a Transfer
            <Send className="size-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
