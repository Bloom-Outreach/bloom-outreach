"use client";

import { useState } from "react";
import { Building2, CreditCard, Heart, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PaystackForm } from "@/components/support/paystack-form";
import { BankTransferForm } from "@/components/support/bank-transfer-form";
import { cn } from "@/lib/utils";

const methods = [
  {
    id: "paystack" as const,
    label: "Pay Online",
    description: "Card, USSD & mobile",
    icon: CreditCard,
  },
  {
    id: "bank" as const,
    label: "Bank Transfer",
    description: "Send via account",
    icon: Building2,
  },
];

export function SupportPaymentPanel() {
  const [method, setMethod] = useState<"paystack" | "bank">("paystack");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-primary/10 via-secondary/60 to-bloom-green/10 p-8 shadow-xl shadow-primary/5">
        <div className="bloom-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-bloom-petal/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-0 size-32 rounded-full bg-bloom-green/20 blur-3xl" />

        <div className="relative">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Heart className="size-6 fill-primary/20" />
          </span>
          <h2 className="mt-6 font-heading text-3xl font-semibold text-balance md:text-4xl">
            Your gift plants seeds of hope
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every contribution helps us buy cleanup supplies, equip volunteers,
            print gospel materials, and show up week after week in neighborhoods
            that need the love of Jesus.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Secure payments powered by Paystack",
              "Bank transfer option for direct giving",
              "100% directed toward outreach & service",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-bloom-green" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Card className="overflow-hidden border-border/50 p-0 shadow-2xl shadow-primary/10">
        <div className="grid grid-cols-2 border-b border-border/60">
          {methods.map((item) => {
            const Icon = item.icon;
            const active = method === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                className={cn(
                  "flex flex-col items-start gap-2 px-5 py-5 text-left transition-colors sm:px-6",
                  active
                    ? "bg-primary/5 text-foreground"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", active && "text-primary")} />
                <span className="font-medium">{item.label}</span>
                <span className="text-xs">{item.description}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          {method === "paystack" ? <PaystackForm /> : <BankTransferForm />}
        </div>
      </Card>
    </div>
  );
}
