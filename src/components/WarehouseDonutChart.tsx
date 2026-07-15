import { Info, ArrowUpRight, type LucideIcon } from "lucide-react";
import * as echarts from "echarts";
import type { ProgressItem } from "../data/mockData";
import { GlassCard } from "./GlassCard";
import { EChartsBase } from "./EChartsBase";

export interface WarehouseDonutChartProps
  extends Readonly<{
    title: string;
    icon: LucideIcon;
    items: readonly ProgressItem[];
    className?: string;
  }> {}

// 颜色映射，与 tailwind 配置保持一致
const colorMap: Record<string, string> = {
  "text-primary-fixed-dim": "#00dbe7",
  "text-secondary": "#afc6ff",
  "text-tertiary-fixed-dim": "#ffb950",
  "text-error": "#ffb4ab",
  "text-outline": "#849495",
  "text-primary-fixed-dim/60": "rgba(0, 219, 231, 0.6)",
  "text-secondary/60": "rgba(175, 198, 255, 0.6)",
  "text-tertiary-fixed-dim/60": "rgba(255, 185, 80, 0.6)",
};

const getColor = (className?: string) => {
  if (!className) return "#00dbe7";
  const key = className.split(" ")[0];
  return colorMap[key] || "#00dbe7";
};

export function WarehouseDonutChart({ title, icon: Icon, items, className = "" }: WarehouseDonutChartProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  const option: echarts.EChartsOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(18, 33, 49, 0.9)",
      borderColor: "rgba(0, 219, 231, 0.3)",
      textStyle: { color: "#d4e4fa", fontSize: 12 },
      formatter: (params: any) => {
        const item = items.find((i) => i.label === params.name);
        return `
          <div class="flex flex-col gap-1">
            <div class="font-bold border-b border-white/10 pb-1 mb-1">${params.name}</div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">材料站数量</span>
              <span class="font-bold text-[#00dbe7]">${params.value}</span>
            </div>
            ${
              item?.amount
                ? `
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">库存总金额</span>
              <span class="font-bold text-[#ffb950]">${item.amount}</span>
            </div>`
                : ""
            }
          </div>
        `;
      },
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["65%", "85%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "#051424",
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
            color: "#d4e4fa",
          },
          scale: true,
          scaleSize: 5,
        },
        data: items.map((item) => ({
          name: item.label,
          value: item.value,
          itemStyle: { color: getColor(item.className) },
        })),
        animationType: "scale",
        animationEasing: "exponentialOut",
        animationDuration: 1500,
      },
    ],
  };

  return (
    <GlassCard className={`flex min-h-64 flex-col p-container-padding ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h2 className="font-headline-md text-lg font-semibold text-on-background dark:text-on-background">{title}</h2>
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
            <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
            <ArrowUpRight className="h-4 w-4 cursor-pointer text-primary-fixed-dim/60 transition-colors hover:text-primary-fixed-dim" />
          </div>
        </div>
        <Icon className="h-5 w-5 text-on-surface-variant dark:text-on-surface-variant" />
      </div>

      <div className="flex flex-1 items-center justify-between gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <EChartsBase option={option} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-data-md text-xl text-primary-fixed-dim dark:text-primary-fixed-dim">{total}</span>
            <span className="text-[10px] text-on-surface-variant dark:text-on-surface-variant">仓库总数</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto max-h-[180px] pr-1 scrollbar-thin">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2 rounded px-1 py-0.5 transition-colors hover:bg-white/5">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`h-2 w-2 shrink-0 rounded-full bg-current ${item.className || "text-primary-fixed-dim"}`} />
                <span className="truncate text-xs text-on-surface-variant dark:text-on-surface-variant" title={item.label}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-baseline gap-0.5 w-10 justify-end">
                  <span className="font-data-md text-xs text-on-surface-variant dark:text-on-surface-variant">{item.value}</span>
                  <span className="text-[8px] opacity-40 text-on-surface-variant">个</span>
                </div>
                <span className="font-data-md text-[10px] text-tertiary-fixed-dim dark:text-tertiary-fixed-dim w-16 text-right">{item.amount || "-"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
