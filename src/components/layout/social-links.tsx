import { socialLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";

const iconMap = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} as const;

type SocialLinksProps = {
  className?: string;
  variant?: "footer" | "card";
};

export function SocialLinks({ className, variant = "footer" }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label}: @${link.handle}`}
              className={cn(
                "group flex items-center gap-2 transition-all duration-200",
                variant === "footer" &&
                  "rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/75 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 hover:text-white",
                variant === "card" &&
                  "rounded-2xl border border-border/50 bg-card p-4 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-xl transition-colors",
                  variant === "footer" &&
                    "size-8 bg-white/10 text-white group-hover:bg-white/20",
                  variant === "card" &&
                    "size-11 bg-primary/10 text-primary group-hover:bg-primary/15"
                )}
              >
                <Icon className="size-4" />
              </span>
              {variant === "card" && (
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block text-foreground transition-colors group-hover:text-primary">
                    @{link.handle}
                  </span>
                </span>
              )}
              {variant === "footer" && (
                <span className="pr-1">
                  <span className="block font-medium">@{link.handle}</span>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
