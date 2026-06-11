import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { SupportPaymentPanel } from "@/components/support/support-payment-panel";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support Bloom Outreach with a secure online payment or bank transfer.",
};

export default function SupportPaymentPage() {
  return (
    <>
      <PageHeader
        title="Give to Bloom Outreach"
        description="Choose how you'd like to give — pay instantly with Paystack or send a bank transfer."
        image={siteImages.pageHeaders.support}
        eyebrow="Make a Gift"
      />

      <Section className="pt-0">
        <FadeIn>
          <div className="mb-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/support-us">
                <ArrowLeft className="size-4" />
                Back to Support Us
              </Link>
            </Button>
          </div>

          <SupportPaymentPanel />
        </FadeIn>
      </Section>
    </>
  );
}
