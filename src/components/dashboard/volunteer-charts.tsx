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
import { BloomLogoIcon } from "@/components/bloom-logo-icon";
import {
	volunteerFocusSplit,
	volunteerMonthlyHours,
	volunteerScheduleConfig,
	volunteerYearAttendance,
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
	volunteering: {
		label: "Volunteering",
		color: "var(--chart-1)",
	},
	remaining: {
		label: "Remaining",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function VolunteerFocusChart() {
	const attendedCount = volunteerYearAttendance.reduce(
		(total, event) => total + event.attended,
		0,
	);

	return (
		<div className="space-y-4">
			<div className="flex items-end justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-foreground">Volunteering</p>
					<p className="text-xs text-muted-foreground">
						{volunteerScheduleConfig.eventWeekday}s ·{" "}
						{volunteerScheduleConfig.annualEventCount} per year
					</p>
				</div>
				<p className="font-heading text-3xl font-semibold text-primary">
					{attendedCount}
					<span className="text-lg text-muted-foreground">
						/{volunteerScheduleConfig.annualEventCount}
					</span>
				</p>
			</div>

			<ChartContainer config={focusConfig} className="mx-auto aspect-square h-[220px]">
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								hideLabel
								formatter={(value, name) => {
									if (name === "volunteering") {
										return [`${value} attended`, "Volunteering"];
									}
									return [`${value} remaining`, "Volunteering"];
								}}
							/>
						}
					/>
					<Pie
						data={volunteerFocusSplit}
						dataKey="events"
						nameKey="focus"
						innerRadius={52}
						strokeWidth={4}
					/>
					<ChartLegend
						content={
							<ChartLegendContent
								nameKey="focus"
								payload={[
									{
										value: "volunteering",
										type: "square",
										color: "var(--color-volunteering)",
									},
								]}
							/>
						}
						className="-translate-y-2 flex-wrap gap-2 *:justify-center"
					/>
				</PieChart>
			</ChartContainer>

			<div className="space-y-1.5">
				{volunteerYearAttendance
					.filter((event) => event.isNextEvent)
					.map((event) => (
						<div
							key={event.date}
							className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 py-2.5 pl-3 pr-3"
						>
							<p className="text-xs font-medium text-primary">Next volunteering Saturday</p>
							<p className="text-sm font-semibold text-foreground">
								Saturday, July 25, 2026
							</p>
							<span
								className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-bl-xl border-l border-b border-primary/25 bg-primary/10"
								aria-hidden
							>
								<BloomLogoIcon className="size-5 text-sm" />
							</span>
						</div>
					))}
			</div>
		</div>
	);
}
