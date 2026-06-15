import { cn } from "@/lib/utils";
import { getUserInitials, type AuthUser } from "@/lib/auth-session";

type VolunteerAvatarProps = {
	user: Pick<AuthUser, "firstName" | "lastName">;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const sizeClasses = {
	sm: "size-9 text-xs",
	md: "size-11 text-sm",
	lg: "size-14 text-base",
} as const;

export function VolunteerAvatar({ user, size = "md", className }: VolunteerAvatarProps) {
	const initials = getUserInitials(user);

	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center justify-center rounded-full bg-bloom-wine font-semibold text-bloom-petal ring-2 ring-bloom-pink/50",
				sizeClasses[size],
				className,
			)}
			aria-hidden
		>
			{initials}
		</span>
	);
}
