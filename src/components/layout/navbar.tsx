"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { User } from "lucide-react";
import { Logo } from "@/components/logo";
import { AnimatedHamburger } from "@/components/layout/animated-hamburger";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const useLightNav = isHome && !scrolled;

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobile]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
        scrolled || !isHome
          ? "border-border/30 bg-background/70 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo
          className="min-w-0 shrink"
          variant={useLightNav ? "light" : "default"}
        />

        <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? useLightNav
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary"
                    : useLightNav
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle
            className={cn(
              "hidden md:inline-flex",
              useLightNav && "text-white hover:bg-white/10"
            )}
          />

          <Link
            href="/sign-in"
            className={cn(
              "hidden rounded-full px-3 py-2 text-sm font-medium transition-colors sm:inline-block",
              useLightNav
                ? "text-white/90 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Sign In
          </Link>

          <Link
            href="/profile"
            aria-label="My profile"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full transition-colors",
              pathname === "/profile" || pathname === "/settings"
                ? useLightNav
                  ? "bg-white/20 text-white"
                  : "bg-primary/10 text-primary"
                : useLightNav
                  ? "text-white hover:bg-white/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <User className="size-5" strokeWidth={1.75} />
          </Link>

          <div className="hidden md:block">
            <Button
              asChild
              size="lg"
              className={cn(
                "rounded-full px-5",
                useLightNav && "bg-white text-primary hover:bg-white/90"
              )}
            >
              <Link href="/get-involved">Join Us</Link>
            </Button>
          </div>

          <ThemeToggle
            className={cn(
              "md:hidden",
              useLightNav && "text-white hover:bg-white/10"
            )}
          />

          <AnimatedHamburger
            open={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={useLightNav ? "text-white hover:bg-white/10" : undefined}
          />
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100%,18rem)] flex-col border-r border-border/60 bg-background/98 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-border/50 px-4">
          <Logo variant="default" />
        </div>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={cn(
                "transition-[opacity,transform] duration-300 ease-out",
                mobileOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              )}
              style={{ transitionDelay: mobileOpen ? `${index * 40 + 50}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={closeMobile}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            className={cn(
              "transition-[opacity,transform] duration-300 ease-out",
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0"
            )}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 40 + 50}ms`
                : "0ms",
            }}
          >
            <Link
              href="/profile"
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200",
                pathname === "/profile"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <User className="size-5" />
              My Profile
            </Link>
          </li>
          <li
            className={cn(
              "transition-[opacity,transform] duration-300 ease-out",
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0"
            )}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 40 + 90}ms`
                : "0ms",
            }}
          >
            <Link
              href="/sign-in"
              onClick={closeMobile}
              className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              Sign In
            </Link>
          </li>
          <li
            className={cn(
              "pt-2 transition-[opacity,transform] duration-300 ease-out",
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0"
            )}
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 40 + 130}ms` : "0ms",
            }}
          >
            <Button asChild className="h-11 w-full rounded-full text-base" size="lg">
              <Link href="/get-involved" onClick={closeMobile}>
                Join Us
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
