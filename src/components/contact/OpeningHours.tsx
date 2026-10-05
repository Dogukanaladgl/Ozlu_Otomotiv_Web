import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type OpeningHoursProps = {
  invert?: boolean;
  className?: string;
};

export function OpeningHours({ invert = false, className }: OpeningHoursProps) {
  return (
    <dl className={cn("space-y-1.5 text-sm", className)}>
      {siteConfig.openingHours.map((row) => (
        <div key={row.label} className="flex justify-between gap-4">
          <dt className={invert ? "text-white/72" : "text-muted"}>{row.label}</dt>
          <dd
            className={cn(
              "font-semibold tabular-nums",
              invert ? "text-white" : "text-ink",
            )}
          >
            {row.opens && row.closes ? `${row.opens} - ${row.closes}` : "Kapalı"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
