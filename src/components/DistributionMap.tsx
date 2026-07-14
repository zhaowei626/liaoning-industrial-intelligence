import type { MapPanelData } from "../data/mockData";
import { GlassCard } from "./GlassCard";

export interface DistributionMapProps
  extends Readonly<{
    map: MapPanelData;
  }> {}

export function DistributionMap({ map }: DistributionMapProps) {
  return (
    <GlassCard className="min-h-[620px] p-container-padding">
      <div className="relative flex h-full min-h-[580px] flex-col rounded-lg border border-white/5 bg-surface-container-lowest/60 p-4 chart-grid dark:border-white/5 dark:bg-surface-container-lowest/60">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-primary-fixed-dim/20 bg-surface-container-lowest/70 dark:border-primary-fixed-dim/20 dark:bg-surface-container-lowest/70">
          <img src={map.imageSrc} alt={map.imageAlt} className="h-full max-h-[520px] w-full object-cover object-center opacity-95 mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(5_20_36_/_0.12)_58%,rgb(5_20_36_/_0.72)_100%)]" />
        </div>

        {map.focusTitle ? (
          <div className="absolute right-10 top-20 z-20 w-[min(320px,45%)] rounded-xl border border-primary-fixed-dim/30 bg-surface-container-low/90 p-5 shadow-glass backdrop-blur-xl dark:border-primary-fixed-dim/30 dark:bg-surface-container-low/90">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-headline-md text-xl font-bold text-primary dark:text-primary">{map.focusTitle}</h3>
              {map.statusLabel ? (
                <span className="flex items-center gap-2 font-label-caps text-[11px] uppercase tracking-widest text-primary-fixed-dim dark:text-primary-fixed-dim">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary-fixed-dim dark:bg-primary-fixed-dim" />
                  {map.statusLabel}
                </span>
              ) : null}
            </div>
            <div className="space-y-3">
              {map.calloutRows.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className={`flex items-center justify-between gap-3 text-sm ${row.tone === "risk" ? "text-error dark:text-error" : "text-on-surface-variant dark:text-on-surface-variant"}`}>
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="truncate">{row.label}</span>
                    </span>
                    <span className={`font-data-md font-semibold ${row.tone === "risk" ? "text-error dark:text-error" : "text-on-background dark:text-on-background"}`}>{row.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}
