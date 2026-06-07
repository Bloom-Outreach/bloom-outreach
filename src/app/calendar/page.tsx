import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EventsCalendar } from "@/components/sections/events-calendar";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Events",
  description:
    "View upcoming Bloom Outreach events — volunteer days, cleanups, and gospel outreach.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="Upcoming Events"
        description="Join us to volunteer, clean, or spread the word. Find an upcoming event and come serve with us."
        image={siteImages.pageHeaders.calendar}
        eyebrow="Calendar"
      />

      <Section>
        <EventsCalendar />
      </Section>

      <Section className="pt-0">
        <div className="rounded-[2rem] border border-border/50 bg-gradient-to-br from-muted/60 to-muted/30 px-8 py-12 text-center shadow-sm md:px-14 md:py-14">
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">
            Want to help at an event?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            New volunteers are always welcome. Reach out to RSVP, ask questions,
            or learn how you can serve at our next outreach.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
