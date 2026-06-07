import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
      />

      <Section>
        <div className="prose-custom mx-auto max-w-3xl space-y-8">
          <section>
            <h2 className="font-heading text-xl font-semibold">Introduction</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you visit our website or interact with our
              organization.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Information We Collect
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We may collect personal information that you voluntarily provide,
              including your name, email address, phone number, and mailing
              address when you fill out contact forms, sign up to volunteer, or
              make a gift of support. We may also collect non-personal information
              such as browser type, device information, and pages visited
              through standard analytics tools.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              How We Use Your Information
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
              <li>To respond to your inquiries and requests</li>
              <li>To process volunteer applications and support contributions</li>
              <li>To send updates about our outreach programs and events</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Information Sharing
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with trusted service providers
              who assist us in operating our website and conducting outreach,
              provided they agree to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">Data Security</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We implement reasonable security measures to protect your personal
              information. However, no method of transmission over the Internet
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">Your Rights</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Changes to This Policy
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">Contact Us</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
