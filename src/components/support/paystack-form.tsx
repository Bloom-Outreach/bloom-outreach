"use client";

import Script from "next/script";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/ui/field-error";
import { AmountPicker } from "@/components/support/amount-picker";
import {
  formatNaira,
  generatePaymentReference,
  supportConfig,
} from "@/lib/support";
import {
  paystackDonationSchema,
  type PaystackDonationValues,
} from "@/lib/validation";

export function PaystackForm() {
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaystackDonationValues>({
    resolver: zodResolver(paystackDonationSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: supportConfig.presetAmounts[1],
      note: "",
    },
  });

  const paystackKey = supportConfig.paystackPublicKey;

  const onSubmit = handleSubmit((values) => {
    setError(null);
    setSuccess(null);

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
      email: values.email,
      amount: values.amount * 100,
      currency: supportConfig.currency,
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "First Name", variable_name: "first_name", value: values.firstName },
          { display_name: "Last Name", variable_name: "last_name", value: values.lastName },
          { display_name: "Note", variable_name: "note", value: values.note ?? "" },
        ],
      },
      onClose: () => setLoading(false),
      callback: (response) => {
        setLoading(false);
        setSuccess(
          `Thank you! Your gift of ${formatNaira(values.amount)} was received. Reference: ${response.reference}`,
        );
      },
    });

    handler.openIframe();
  });

  const amountValue = useWatch({ control, name: "amount" });

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
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
          <p className="flex items-start gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
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
              autoComplete="given-name"
              className="h-11 rounded-xl"
              aria-invalid={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div>
            <label htmlFor="pay-last-name" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <Input
              id="pay-last-name"
              autoComplete="family-name"
              className="h-11 rounded-xl"
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>

        <div>
          <label htmlFor="pay-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="pay-email"
            type="email"
            autoComplete="email"
            className="h-11 rounded-xl"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Controller
            control={control}
            name="amount"
            render={({ field, fieldState }) => (
              <>
                <AmountPicker
                  amount={field.value}
                  onAmountChange={field.onChange}
                  customAmount={customAmount}
                  onCustomAmountChange={setCustomAmount}
                />
                <FieldError message={fieldState.error?.message} />
              </>
            )}
          />
        </div>

        <div>
          <label htmlFor="pay-note" className="mb-2 block text-sm font-medium">
            Note <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="pay-note"
            className="min-h-[88px] rounded-xl"
            placeholder="In honor of, prayer request, or designation..."
            aria-invalid={Boolean(errors.note)}
            {...register("note")}
          />
          <FieldError message={errors.note?.message} />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={loading || !scriptReady}
        >
          {loading ? (
            <>
              Processing...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Pay {formatNaira(amountValue)}
              <CreditCard className="size-4" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}
