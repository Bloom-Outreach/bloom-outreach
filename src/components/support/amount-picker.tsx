"use client";

import { Input } from "@/components/ui/input";
import { formatNaira, supportConfig } from "@/lib/support";
import { cn } from "@/lib/utils";

interface AmountPickerProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  customAmount: string;
  onCustomAmountChange: (value: string) => void;
}

export function AmountPicker({
  amount,
  onAmountChange,
  customAmount,
  onCustomAmountChange,
}: AmountPickerProps) {
  const isCustom = !supportConfig.presetAmounts.includes(
    amount as (typeof supportConfig.presetAmounts)[number],
  );

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Select amount</p>
      <div className="flex flex-wrap gap-2">
        {supportConfig.presetAmounts.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              onAmountChange(preset);
              onCustomAmountChange("");
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
              amount === preset && !customAmount
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            {formatNaira(preset)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onCustomAmountChange(customAmount || "10000")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            isCustom || customAmount
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
          )}
        >
          Custom
        </button>
      </div>

      {(isCustom || customAmount) && (
        <div>
          <label htmlFor="custom-amount" className="mb-2 block text-sm text-muted-foreground">
            Enter custom amount ({supportConfig.currencySymbol})
          </label>
          <Input
            id="custom-amount"
            type="number"
            min={100}
            step={100}
            value={customAmount}
            onChange={(event) => {
              onCustomAmountChange(event.target.value);
              const parsed = Number(event.target.value);
              if (parsed >= 100) onAmountChange(parsed);
            }}
            className="h-11 rounded-xl"
            placeholder="10000"
          />
        </div>
      )}
    </div>
  );
}
