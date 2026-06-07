"use client";

import { cn } from "@/lib/utils";

interface AnimatedHamburgerProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export function AnimatedHamburger({
  open,
  onClick,
  className,
}: AnimatedHamburgerProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:hidden",
        className
      )}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative flex size-5 flex-col items-center justify-center">
        <span
          className={cn(
            "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
          )}
        />
      </span>
    </button>
  );
}
