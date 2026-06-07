import { BackgroundImage } from "@/components/ui/background-image";
import { Badge } from "@/components/ui/badge";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  image?: string;
  eyebrow?: string;
}

export function PageHeader({
  title,
  description,
  className,
  image = siteImages.pageHeaders.default,
  eyebrow = "Bloom Outreach",
}: PageHeaderProps) {
  return (
    <BackgroundImage
      src={image}
      alt=""
      priority
      className={cn("-mt-16 pt-16 py-24 md:py-32", className)}
      overlayClassName="bg-gradient-to-br from-bloom-wine-deep/95 via-primary/88 to-[#4a2530]/90"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-5 border-white/25 text-white">
            {eyebrow}
          </Badge>
          <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-white/80 text-balance md:text-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </BackgroundImage>
  );
}
