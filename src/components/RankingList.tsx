import { Info, ArrowUpRight } from "lucide-react";
import type { DashboardData } from "../data/mockData";
import { GlassCard } from "./GlassCard";

export interface RankingListProps
  extends Readonly<{
    panel: DashboardData["materialRankingPanel"];
    className?: string;
    stackedInfo?: boolean;
  }> {}

export function RankingList({ panel, className, stackedInfo = false }: RankingListProps) {
  const Icon = panel.icon;

  return (
    <GlassCard className={`flex min-h-[300px] flex-col p-container-padding ${className || ""}`}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-on-background dark:text-on-background" />
          <h2 className="font-headline-md text-xl font-bold text-on-background dark:text-on-background">
            {panel.title}
          </h2>
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary-fixed/20 scrollbar-track-transparent hover:scrollbar-thumb-primary-fixed/40 transition-colors">
        {panel.items.map((item, index) => (
          <div key={item.name} className={`flex ${stackedInfo ? "items-start py-2" : "items-center min-h-11"} rounded border border-white/5 bg-surface-container/50 px-3 text-sm dark:border-white/5 dark:bg-surface-container/50`}>
            <span className={`${index === 0 ? "bg-secondary-container/30 text-secondary-fixed dark:bg-secondary-container/30 dark:text-secondary-fixed" : "bg-surface-bright text-on-surface-variant dark:bg-surface-bright dark:text-on-surface-variant"} mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded font-data-md text-xs ${stackedInfo ? "mt-0.5" : ""}`}>
              {index + 1}
            </span>
            <div className={`min-w-0 flex-1 pr-3 flex ${stackedInfo ? "flex-col gap-0.5" : "items-center justify-between"}`}>
              <span className={`truncate text-on-background dark:text-on-background ${stackedInfo ? "" : "max-w-[40%]"}`}>{item.name}</span>
              {(item.city || item.department || item.station) && (
                <span className={`flex shrink-0 gap-1 text-on-background dark:text-on-background opacity-80 ${stackedInfo ? "text-[10px]" : "flex-1 justify-end text-right mr-4 text-[11px]"}`}>
                  {item.city && <span>{item.city}</span>}
                  {item.department && <span>· {item.department}</span>}
                  {item.station && <span>· {item.station}</span>}
                </span>
              )}
            </div>
            <span className={`font-data-md text-secondary-fixed dark:text-secondary-fixed ${stackedInfo ? "mt-0.5" : ""}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
