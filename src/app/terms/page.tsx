import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Use"
        description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <section>
            <h2 className="font-heading text-xl font-semibold">
              Acceptance of Terms
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              By accessing and using the {siteConfig.name} website, you accept
              and agree to be bound by these Terms of Use. If you do not agree
              to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">Use of Website</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              This website is provided for informational purposes about our
              community outreach programs and faith-based mission. You may use
              the site for lawful purposes only. You agree not to use the site
              in any way that could damage, disable, or impair the website or
              interfere with others&apos; use.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Intellectual Property
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              All content on this website — including text, graphics, logos, and
              images — is the property of {siteConfig.name} or its content
              suppliers and is protected by applicable copyright laws.
              Unauthorized use of any materials may violate copyright and other
              laws.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Support and Volunteering
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Information about support and volunteer opportunities on this
              site is provided in good faith. {siteConfig.name} reserves the
              right to modify programs, events, and opportunities at any time.
              Financial support is generally non-refundable unless required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Disclaimer of Warranties
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              This website is provided &ldquo;as is&rdquo; without warranties of
              any kind, either express or implied. {siteConfig.name} does not
              warrant that the website will be uninterrupted, error-free, or
              free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Limitation of Liability
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {siteConfig.name} shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from your use of this
              website or participation in our programs, to the fullest extent
              permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              External Links
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Our website may contain links to third-party websites. We are not
              responsible for the content or privacy practices of those sites.
              Links are provided for convenience only and do not imply
              endorsement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">
              Changes to Terms
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We reserve the right to modify these Terms of Use at any time.
              Changes will be effective immediately upon posting. Your continued
              use of the website constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold">Contact Us</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Questions about these Terms of Use may be directed to{" "}
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
