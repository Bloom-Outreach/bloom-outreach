interface AuthDividerProps {
	label?: string;
}

export function AuthDivider({ label = "Or continue with email" }: AuthDividerProps) {
	return (
		<div className="relative my-8">
			<div className="absolute inset-0 flex items-center">
				<div className="w-full border-t border-border/60" />
			</div>
			<div className="relative flex justify-center">
				<span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
					{label}
				</span>
			</div>
		</div>
	);
}
