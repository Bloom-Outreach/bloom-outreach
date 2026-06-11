"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  eventsByMonth,
  focusBreakdown,
  monthlyEngagement,
} from "@/lib/mock-dashboard";

const engagementConfig = {
  volunteers: {
    label: "Active Volunteers",
    color: "var(--chart-1)",
  },
  hours: {
    label: "Hours Served",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function EngagementChart() {
  return (
    <ChartContainer config={engagementConfig} className="h-[280px] w-full">
      <AreaChart data={monthlyEngagement} margin={{ left: 4, right: 4 }}>
        <defs>
          <linearGradient id="fillVolunteers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-volunteers)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-volunteers)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-hours)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-hours)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="hours"
          type="natural"
          fill="url(#fillHours)"
          stroke="var(--color-hours)"
          strokeWidth={2}
        />
        <Area
          dataKey="volunteers"
          type="natural"
          fill="url(#fillVolunteers)"
          stroke="var(--color-volunteers)"
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}

const eventsConfig = {
  cleaning: {
    label: "Cleaning",
    color: "var(--chart-3)",
  },
  volunteering: {
    label: "Volunteering",
    color: "var(--chart-1)",
  },
  spreading: {
    label: "Spreading the Word",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function EventsByPillarChart() {
  return (
    <ChartContainer config={eventsConfig} className="h-[280px] w-full">
      <BarChart data={eventsByMonth} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="cleaning" stackId="events" fill="var(--color-cleaning)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="volunteering" stackId="events" fill="var(--color-volunteering)" />
        <Bar dataKey="spreading" stackId="events" fill="var(--color-spreading)" radius={[4, 4, 0, 0]} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
}

const focusConfig = {
  volunteers: {
    label: "Volunteers",
  },
  cleaning: {
    label: "Cleaning",
    color: "var(--chart-3)",
  },
  volunteering: {
    label: "Volunteering",
    color: "var(--chart-1)",
  },
  spreading: {
    label: "Spreading the Word",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function FocusBreakdownChart() {
  return (
    <ChartContainer
      config={focusConfig}
      className="mx-auto aspect-square h-[280px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={focusBreakdown}
          dataKey="volunteers"
          nameKey="focus"
          innerRadius={64}
          strokeWidth={4}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="focus" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
