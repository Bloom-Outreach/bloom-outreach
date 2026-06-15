import { cn } from "@/lib/utils";

export function DashboardSkeleton() {
	return (
		<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="size-11 animate-pulse rounded-full bg-bloom-petal dark:bg-secondary" />
					<div className="space-y-2">
						<div className="h-4 w-40 animate-pulse rounded-full bg-bloom-petal dark:bg-secondary" />
						<div className="h-3 w-28 animate-pulse rounded-full bg-bloom-petal/70 dark:bg-secondary/70" />
					</div>
				</div>
				<div className="size-10 animate-pulse rounded-full bg-bloom-petal dark:bg-secondary" />
			</div>

			<div className="h-44 animate-pulse rounded-3xl bg-bloom-petal/80 ring-1 ring-white/20 dark:bg-secondary/80 dark:ring-white/10" />

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"h-24 animate-pulse rounded-3xl bg-bloom-petal/70 ring-1 ring-white/20 dark:bg-secondary/70 dark:ring-white/10",
							index === 2 && "col-span-2 sm:col-span-1",
						)}
					/>
				))}
			</div>

			<div className="h-28 animate-pulse rounded-3xl bg-bloom-petal/70 ring-1 ring-white/20 dark:bg-secondary/70 dark:ring-white/10" />
			<div className="h-36 animate-pulse rounded-3xl bg-bloom-petal/70 ring-1 ring-white/20 dark:bg-secondary/70 dark:ring-white/10" />
			<div className="h-52 animate-pulse rounded-3xl bg-bloom-petal/70 ring-1 ring-white/20 dark:bg-secondary/70 dark:ring-white/10" />
		</div>
	);
}
