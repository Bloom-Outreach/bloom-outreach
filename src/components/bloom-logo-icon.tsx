import { cn } from "@/lib/utils";

interface BloomLogoIconProps {
  className?: string;
  variant?: "default" | "light";
}

/** Soft teardrop petal pointing upward from the origin. */
const PETAL_PATH =
  "M0 1.8 C-3.8-.2 -4.8-5.2 -3-9.2 C-1.4-11.4 1.4-11.4 3-9.2 C4.8-5.2 3.8-.2 0 1.8Z";

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300] as const;

export function BloomLogoIcon({
  className,
  variant = "default",
}: BloomLogoIconProps) {
  const isLight = variant === "light";

  const petalA = isLight ? "#FFFFFF" : "#7A3349";
  const petalB = isLight ? "#F0D4DC" : "#C97B8B";
  const center = "#5B9A7A";
  const centerRing = isLight ? "#FFFFFF" : "#FAF8F6";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden
    >
      <g transform="translate(20 21)">
        {PETAL_ANGLES.map((angle, index) => (
          <path
            key={angle}
            d={PETAL_PATH}
            fill={index % 2 === 0 ? petalA : petalB}
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="3.6" fill={centerRing} />
        <circle r="2.5" fill={center} />
      </g>
    </svg>
  );
}
