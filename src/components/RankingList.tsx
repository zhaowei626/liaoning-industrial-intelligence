import { Info } from "lucide-react";
import type { DashboardData } from "../data/mockData";
import { GlassCard } from "./GlassCard";

export interface RankingListProps
  extends Readonly<{
    panel: DashboardData["inboundRankingPanel"] | DashboardData["materialRankingPanel"];
    className?: string;
  }> {}

export function RankingList({ panel, className }: RankingListProps) {
  const Icon = panel.icon;

  return (
    <GlassCard className={`flex min-h-[300px] flex-col p-container-padding ${className || ""}`}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-on-background dark:text-on-background" />
          <h2 className="font-headline-md text-xl font-bold text-on-background dark:text-on-background">
            {panel.title}
          </h2>
          <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {panel.items.map((item, index) => (
          <div key={item.name} className="flex min-h-11 items-center rounded border border-white/5 bg-surface-container/50 px-3 text-sm dark:border-white/5 dark:bg-surface-container/50">
            <span className={`${index === 0 ? "bg-secondary-container/30 text-secondary-fixed dark:bg-secondary-container/30 dark:text-secondary-fixed" : "bg-surface-bright text-on-surface-variant dark:bg-surface-bright dark:text-on-surface-variant"} mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded font-data-md text-xs`}>
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 truncate pr-3">
              <div className="truncate text-on-background dark:text-on-background">{item.name}</div>
              {(item.city || item.department || item.station) && (
                <div className="flex gap-2 text-[10px] text-on-surface-variant/60 dark:text-on-surface-variant/60">
                  {item.city && <span>{item.city}</span>}
                  {item.city && (item.department || item.station) && <span className="opacity-30">|</span>}
                  {item.department && <span>{item.department}</span>}
                  {item.station && <span>{item.station}</span>}
                </div>
              )}
            </div>
            <span className="font-data-md text-secondary-fixed dark:text-secondary-fixed">{item.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
