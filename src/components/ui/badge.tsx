import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "soft" | "outline";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "soft" && "bg-primary/10 text-primary",
        variant === "outline" &&
          "border border-primary/20 bg-background/60 text-primary backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
