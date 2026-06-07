import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { ProfileNav } from "@/components/profile/profile-nav";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { SettingsForm } from "@/components/profile/settings-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Bloom Outreach volunteer profile, preferences, and notifications.",
};

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Update your profile, volunteer preferences, and how we stay in touch with you."
        image={siteImages.pageHeaders.profile}
        eyebrow="Account"
      />

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-24">
              <ProfileSidebar />
              <Card className="hidden lg:block">
                <ProfileNav />
              </Card>
            </div>
          </FadeIn>

          <div className="lg:col-span-8 xl:col-span-9">
            <FadeIn delay={0.05}>
              <Card className="mb-8 lg:hidden">
                <ProfileNav orientation="horizontal" />
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <SettingsForm />
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
