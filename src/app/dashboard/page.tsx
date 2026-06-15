import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Your Bloom Outreach volunteer dashboard — streaks, badges, and upcoming outreaches.",
};

export default function DashboardPage() {
	return (
		<div className="bg-bloom-cream dark:bg-background">
			<DashboardContent />
		</div>
	);
}
