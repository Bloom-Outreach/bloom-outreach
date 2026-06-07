import Link from "next/link";
import { BloomLogoIcon } from "@/components/bloom-logo-icon";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span className="flex size-10 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <BloomLogoIcon variant={variant} />
      </span>
      <span
        className={cn(
          "font-heading text-lg font-semibold leading-none tracking-tight",
          isLight ? "text-white" : "text-foreground"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
