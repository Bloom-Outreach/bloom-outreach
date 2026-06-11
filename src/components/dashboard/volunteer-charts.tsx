"use client";

import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  volunteerFocusSplit,
  volunteerMonthlyHours,
} from "@/lib/mock-dashboard";

const hoursConfig = {
  hours: {
    label: "Hours Served",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function VolunteerHoursChart() {
  return (
    <ChartContainer config={hoursConfig} className="h-[220px] w-full">
      <BarChart data={volunteerMonthlyHours} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}

const focusConfig = {
  events: {
    label: "Events",
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

export function VolunteerFocusChart() {
  return (
    <ChartContainer config={focusConfig} className="mx-auto aspect-square h-[220px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={volunteerFocusSplit}
          dataKey="events"
          nameKey="focus"
          innerRadius={52}
          strokeWidth={4}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="focus" />}
          className="-translate-y-2 flex-wrap gap-2 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
