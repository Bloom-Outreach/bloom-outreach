"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  LogIn,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { AnimatedHamburger } from "@/components/layout/animated-hamburger";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const useLightNav = isHome && !scrolled;

  // Auto-close the drawer when the route changes. Adjust state during render
  // — see https://react.dev/learn/you-might-not-need-an-effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

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

      {/* Scrim */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
        onClick={closeMobile}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer — slides in from the left */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100%,20rem)] flex-col border-r border-border/60 bg-background shadow-[0_24px_60px_-12px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0.16,1)] md:hidden",
          mobileOpen ? "translate-x-0" : "pointer-events-none -translate-x-full"
        )}
      >
        {/* Header — logo + close */}
        <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-border/60 px-4">
          <Logo variant="default" />
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Hero strip */}
        <div className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/10 via-bloom-petal/10 to-bloom-green/10 px-4 py-5">
          <div className="bloom-pattern pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-primary backdrop-blur-sm dark:bg-foreground/10 dark:text-bloom-petal">
              <Heart className="size-3 fill-primary text-primary dark:fill-bloom-petal dark:text-bloom-petal" />
              {siteConfig.motto}
            </span>
            <p className="mt-2 font-heading text-base font-semibold leading-snug text-foreground">
              Volunteer. Clean.{" "}
              <span className="text-primary">Spread the Word.</span>
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
            Navigate
          </p>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const active = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={cn(
                    "transition-[opacity,transform] duration-300 ease-out",
                    mobileOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-3 opacity-0"
                  )}
                  style={{
                    transitionDelay: mobileOpen ? `${index * 40 + 80}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      className={cn(
                        "size-4 transition-all duration-200",
                        active
                          ? "translate-x-0 text-primary opacity-100"
                          : "-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={cn(
              "mt-6 transition-[opacity,transform] duration-300 ease-out",
              mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            )}
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 40 + 80}ms`
                : "0ms",
            }}
          >
            <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
              Your account
            </p>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/profile"
                  onClick={closeMobile}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200",
                    pathname === "/profile"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <User className="size-5" />
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                >
                  <LogIn className="size-5" />
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer CTA */}
        <div
          className={cn(
            "shrink-0 border-t border-border/60 bg-muted/30 p-4 transition-[opacity,transform] duration-300 ease-out",
            mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
          )}
          style={{
            transitionDelay: mobileOpen
              ? `${navLinks.length * 40 + 140}ms`
              : "0ms",
          }}
        >
          <Button asChild className="h-12 w-full rounded-full text-base" size="lg">
            <Link href="/get-involved" onClick={closeMobile}>
              Join Us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </aside>
    </header>
  );
}
