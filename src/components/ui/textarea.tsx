import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  ref?: React.Ref<HTMLTextAreaElement>;
};

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}
