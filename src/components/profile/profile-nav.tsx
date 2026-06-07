"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/calendar", label: "My Events", icon: CalendarDays },
] as const;

interface ProfileNavProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function ProfileNav({
  className,
  orientation = "vertical",
}: ProfileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        orientation === "vertical" ? "flex flex-col gap-1" : "flex flex-wrap gap-2",
        className
      )}
      aria-label="Account navigation"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
              active
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
