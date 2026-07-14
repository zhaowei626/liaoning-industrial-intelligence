import React from "react";
import { Info } from "lucide-react";
import { shellIcons, type MetricItem } from "../data/mockData";
import { GlassCard } from "./GlassCard";

export interface MetricCardProps
  extends Readonly<{
    metric: MetricItem;
  }> {}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;
  const TrendIcon = metric.status === "risk" ? shellIcons.trendDown : shellIcons.trendUp;
  const textTone =
    metric.status === "risk"
      ? "text-error dark:text-error"
      : "text-primary-fixed-dim dark:text-primary-fixed-dim";

  const subMetrics = metric.subMetrics;

  const renderValue = (value: string) => {
    if (value.startsWith("¥")) {
      const parts = value.split(" ");
      return (
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-bold opacity-70">¥</span>
          <span>{parts.length > 1 ? parts[1] : value.substring(1)}</span>
        </span>
      );
    }
    return value;
  };

  return (
    <GlassCard className={`flex min-h-[126px] items-center justify-between p-container-padding ${metric.status === "risk" ? "border-error/20" : "border-primary/20 shadow-glow-primary"}`}>
      <div className="flex-1 min-w-0">
        <div className="mb-2 flex items-center gap-1.5">
          <h2 className={`font-label-caps text-label-caps uppercase tracking-widest ${metric.status === "risk" ? textTone : "text-on-surface-variant dark:text-on-surface-variant"}`}>
            {metric.label}
          </h2>
          <Info className={`h-3.5 w-3.5 cursor-help transition-colors ${metric.status === "risk" ? "text-error/40 hover:text-error" : "text-on-surface-variant/40 hover:text-on-surface-variant"}`} />
        </div>

        {subMetrics ? (
          <div className="flex items-center mt-1">
            {subMetrics.map((sub, index) => (
              <React.Fragment key={sub.label}>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-data-lg text-data-lg glow-text-primary text-primary dark:text-primary">
                      {renderValue(sub.value)}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/40">{sub.unit}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant/60 uppercase font-label-caps mt-0.5">{sub.label}</span>
                </div>
                {index < subMetrics.length - 1 && (
                  <div className="mx-4 h-8 w-[1px] bg-outline-variant/30 self-center mt-[-8px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className={`font-data-lg text-data-lg glow-text-primary ${metric.status === "risk" ? textTone : "text-primary dark:text-primary"}`}>
                {renderValue(metric.value)}
              </span>
              <span className="font-body-base text-body-base text-on-surface-variant dark:text-on-surface-variant">{metric.unit}</span>
              
              {metric.trend && (
                <div className={`ml-1 flex items-center gap-1 text-xs font-semibold ${textTone}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{metric.trend}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={`ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${metric.status === "risk" ? "border-error/30 bg-error-container/20 text-error dark:border-error/30 dark:bg-error-container/20 dark:text-error" : "border-primary/20 bg-primary-container/10 text-primary-fixed dark:border-primary/20 dark:bg-primary-container/10 dark:text-primary-fixed"}`}>
        <Icon className="h-6 w-6" />
      </div>
    </GlassCard>
  );
}
