import { Info, type LucideIcon } from "lucide-react";
import type { ProgressItem } from "../data/mockData";
import { GlassCard } from "./GlassCard";

const toneClasses: Record<ProgressItem["tone"], string> = {
  primary: "bg-primary-fixed text-primary-fixed-dim dark:bg-primary-fixed dark:text-primary-fixed-dim",
  secondary: "bg-primary-fixed/80 text-primary-fixed-dim dark:bg-primary-fixed/80 dark:text-primary-fixed-dim",
  muted: "bg-primary-fixed/50 text-primary-fixed-dim dark:bg-primary-fixed/50 dark:text-primary-fixed-dim",
  risk: "bg-error text-error dark:bg-error dark:text-error",
  warning: "bg-error/60 text-tertiary-fixed-dim dark:bg-error/60 dark:text-tertiary-fixed-dim",
};

export interface ProgressListProps
  extends Readonly<{
    title: string;
    icon: LucideIcon;
    items: readonly ProgressItem[];
    riskMode?: boolean;
    className?: string;
  }> {}

export function ProgressList({ title, icon: Icon, items, riskMode = false, className = "" }: ProgressListProps) {
  return (
    <GlassCard className={`flex flex-col overflow-hidden p-container-padding ${riskMode ? "border-error/20" : "border-primary/20"} ${className}`}>
      <div className="mb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <h2 className={`font-headline-md text-lg font-semibold ${riskMode ? "text-error dark:text-error" : "text-on-background dark:text-on-background"}`}>{title}</h2>
          <Info className={`h-4 w-4 cursor-help transition-colors ${riskMode ? "text-error/40 hover:text-error" : "text-on-surface-variant/40 hover:text-on-surface-variant"}`} />
        </div>
        <Icon className={`h-5 w-5 ${riskMode ? "text-error dark:text-error" : "text-on-surface-variant dark:text-on-surface-variant"}`} />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-primary-fixed/20 scrollbar-track-transparent hover:scrollbar-thumb-primary-fixed/40 transition-colors">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="space-y-1 shrink-0">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className={`${item.tone === "risk" ? "text-error dark:text-error" : "text-on-surface-variant dark:text-on-surface-variant"}`}>{item.label}</span>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-baseline gap-0.5">
                    <span className={`font-data-md font-semibold ${toneClasses[item.tone].split(" ").filter((className) => className.startsWith("text-") || className.startsWith("dark:text-")).join(" ")}`}>
                      {item.value}
                    </span>
                    <span className="text-[10px] opacity-40 text-on-surface-variant">个</span>
                  </div>
                  {item.amount && (
                    <span className="font-data-md text-[10px] text-tertiary-fixed-dim dark:text-tertiary-fixed-dim min-w-[60px] text-right">
                      {item.amount}
                    </span>
                  )}
                </div>
              </div>
              <div className={`${riskMode ? "bg-error-container/10 dark:bg-error-container/10" : "bg-primary-container/10 dark:bg-primary-container/10"} h-2 overflow-hidden rounded-full`}>
                <div className={`h-full rounded-full ${toneClasses[item.tone]}`} style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
