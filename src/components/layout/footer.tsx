import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-primary text-primary-foreground dark:bg-[#2a141c] dark:text-[#f5eef0]">
      <div className="bloom-pattern absolute inset-0 opacity-10" />
      <div className="pointer-events-none absolute -right-32 -top-32 size-[400px] rounded-full bg-bloom-petal/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">
                Follow Us
              </h3>
              <SocialLinks />
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/90">
              Get Involved
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/get-involved", label: "Volunteer" },
                { href: "/calendar", label: "Events" },
                { href: "/support-us", label: "Support Us" },
                { href: "/videos", label: "Videos" },
                { href: "/gallery", label: "Gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/90">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-white/65">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/45">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/45 transition-colors hover:text-white/75"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/45 transition-colors hover:text-white/75"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
