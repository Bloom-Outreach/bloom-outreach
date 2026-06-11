import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import {
  EngagementChart,
  EventsByPillarChart,
  FocusBreakdownChart,
} from "@/components/dashboard/admin-charts";
import {
  orgStats,
  recentSignups,
  topVolunteers,
  type EventCategory,
} from "@/lib/mock-dashboard";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Bloom Outreach at a glance — volunteers, events, hours served, and community impact.",
};

const categoryStyles: Record<EventCategory, string> = {
  Volunteering: "bg-primary/10 text-primary",
  Cleaning: "badge-cleaning",
  "Spreading the Word": "badge-placards",
};

const statCards = [
  {
    label: "Active Volunteers",
    value: orgStats.activeVolunteers.toLocaleString(),
    change: orgStats.volunteersChange,
    icon: Users,
  },
  {
    label: "Events Held (YTD)",
    value: orgStats.eventsHeld.toLocaleString(),
    change: orgStats.eventsChange,
    icon: CalendarDays,
  },
  {
    label: "Hours Served (YTD)",
    value: orgStats.hoursServed.toLocaleString(),
    change: orgStats.hoursChange,
    icon: Clock,
  },
  {
    label: "Neighborhoods Served",
    value: orgStats.neighborhoodsServed.toLocaleString(),
    change: orgStats.neighborhoodsChange,
    icon: MapPin,
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Bloom Outreach at a glance — track volunteers, events, and the impact we're making together."
        image={siteImages.pageHeaders.default}
        eyebrow="Organization Overview"
      />

      <Section className="pt-0">
        <div className="space-y-8">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map(({ label, value, change, icon: Icon }) => (
                <Card key={label} className="relative overflow-hidden">
                  <div className="pointer-events-none absolute -right-4 -top-4 size-20 rounded-full bg-primary/5" />
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <p className="mt-4 font-heading text-3xl font-semibold text-primary">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{change}</p>
                </Card>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-6 lg:grid-cols-5">
              <Card className="lg:col-span-3">
                <div className="mb-6">
                  <Badge variant="soft" className="mb-2">
                    Growth
                  </Badge>
                  <h3 className="font-heading text-xl font-semibold">
                    Volunteer Engagement
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Active volunteers and hours served over the last 12 months.
                  </p>
                </div>
                <EngagementChart />
              </Card>

              <Card className="lg:col-span-2">
                <div className="mb-6">
                  <Badge variant="soft" className="mb-2">
                    Pillars
                  </Badge>
                  <h3 className="font-heading text-xl font-semibold">
                    Volunteer Focus
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    How our volunteers serve across the three pillars.
                  </p>
                </div>
                <FocusBreakdownChart />
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card>
              <div className="mb-6">
                <Badge variant="soft" className="mb-2">
                  Events
                </Badge>
                <h3 className="font-heading text-xl font-semibold">
                  Events by Pillar
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monthly events this year, split by Cleaning, Volunteering, and
                  Spreading the Word.
                </p>
              </div>
              <EventsByPillarChart />
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-0">
                <div className="flex items-center justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
                  <div>
                    <Badge variant="soft" className="mb-2">
                      New
                    </Badge>
                    <h3 className="font-heading text-xl font-semibold">
                      Recent Signups
                    </h3>
                  </div>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/get-involved">
                      Invite More
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 divide-y divide-border/60">
                  {recentSignups.map((signup) => (
                    <div
                      key={signup.id}
                      className="flex items-center gap-4 px-6 py-4 md:px-8"
                    >
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-2xl">
                        <Image
                          src={signup.avatar}
                          alt={signup.name}
                          width={80}
                          height={80}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground">
                          {signup.name}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {signup.email}
                        </p>
                      </div>
                      <div className="hidden text-right sm:block">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                            categoryStyles[signup.focus]
                          )}
                        >
                          {signup.focus}
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {signup.joined}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-0">
                <div className="flex items-center gap-3 px-6 pt-6 md:px-8 md:pt-8">
                  <div>
                    <Badge variant="soft" className="mb-2">
                      Leaders
                    </Badge>
                    <h3 className="font-heading text-xl font-semibold">
                      Top Volunteers
                    </h3>
                  </div>
                </div>
                <div className="mt-4 divide-y divide-border/60">
                  {topVolunteers.map((volunteer, index) => (
                    <div
                      key={volunteer.id}
                      className="flex items-center gap-4 px-6 py-4 md:px-8"
                    >
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          index === 0
                            ? "bg-bloom-gold/15 text-bloom-gold-foreground"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {index === 0 ? <Trophy className="size-4" /> : index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground">
                          {volunteer.name}
                        </p>
                        <span
                          className={cn(
                            "mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                            categoryStyles[volunteer.focus]
                          )}
                        >
                          {volunteer.focus}
                        </span>
                      </div>
                      <div className="shrink-0 text-right text-sm">
                        <p className="font-semibold text-primary">
                          {volunteer.hours} hrs
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {volunteer.events} events
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
