import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}
