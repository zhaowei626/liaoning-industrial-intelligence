import { Info } from "lucide-react";
import * as echarts from "echarts";
import { shellIcons, type DashboardData } from "../data/mockData";
import { GlassCard } from "./GlassCard";
import { EChartsBase } from "./EChartsBase";

export interface ReturnTrendChartProps
  extends Readonly<{
    panel: DashboardData["returnTrendPanel"];
    className?: string;
  }> {}

export function ReturnTrendChart({ panel, className = "" }: ReturnTrendChartProps) {
  const TrendIcon = shellIcons.trendUp;

  const option: echarts.EChartsOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(18, 33, 49, 0.9)",
      borderColor: "rgba(0, 219, 231, 0.3)",
      textStyle: {
        color: "#d4e4fa",
        fontSize: 12,
      },
      formatter: (params: any) => {
        const item = params[0];
        return `
          <div class="flex flex-col gap-2 p-1">
            <div class="text-[10px] opacity-70 mb-1 border-b border-white/10 pb-1">${item.name}</div>
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-[#ffb950]"></span>
                <span class="text-[10px] opacity-70">退利库金额</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="font-bold text-[#ffb950]">${item.value}</span>
                <span class="text-[10px] opacity-70">${panel.unitLabel}</span>
              </div>
            </div>
          </div>`;
      },
    },
    grid: {
      top: "15%",
      left: "3%",
      right: "6%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: panel.points.map((p) => p.label),
      axisLine: {
        show: true,
        lineStyle: { color: "rgba(185, 202, 203, 0.2)" },
      },
      axisTick: { show: false },
      axisLabel: {
        color: "#b9cacb",
        fontSize: 10,
        margin: 12,
      },
    },
    yAxis: {
      type: "value",
      name: `(${panel.unitLabel})`,
      nameTextStyle: {
        color: "#b9cacb",
        fontSize: 10,
        padding: [0, 0, 0, -30],
      },
      splitLine: {
        lineStyle: { color: "rgba(185, 202, 203, 0.05)", type: "dashed" },
      },
      axisLabel: {
        color: "#b9cacb",
        fontSize: 10,
      },
    },
    series: [
      {
        name: "退利库金额",
        type: "line",
        smooth: true,
        showSymbol: false,
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#ffb950",
        },
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "rgba(255, 185, 80, 0.5)" },
            { offset: 1, color: "#ffb950" },
          ]),
          shadowColor: "rgba(255, 185, 80, 0.3)",
          shadowBlur: 10,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 185, 80, 0.3)" },
            { offset: 1, color: "rgba(255, 185, 80, 0)" },
          ]),
        },
        emphasis: {
          scale: true,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#fff",
          },
        },
        data: panel.points.map((p) => p.value),
        animationDuration: 2000,
        animationEasing: "cubicOut",
      },
    ],
  };

  return (
    <GlassCard className={`flex min-h-[300px] flex-col p-container-padding ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendIcon className="h-6 w-6 text-on-background dark:text-on-background" />
          <h2 className="font-headline-md text-xl font-bold text-on-background dark:text-on-background">
            {panel.title}
          </h2>
          <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
        </div>
      </div>

      <div className="relative min-h-48 flex-1">
        <EChartsBase option={option} />
        
        <div className="absolute right-4 top-2 z-10 flex flex-col gap-2 rounded-lg border border-primary-fixed/30 bg-surface-container-highest/80 p-2 shadow-lg backdrop-blur-xl dark:border-primary-fixed/30 dark:bg-surface-container-highest/80">
          <div className="font-label-caps text-[10px] text-on-surface-variant dark:text-on-surface-variant">{panel.highlightLabel}</div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] opacity-60">退利库金额</span>
              <div className="flex items-baseline gap-1">
                <span className="font-data-md text-sm text-tertiary-fixed-dim dark:text-tertiary-fixed-dim">{panel.highlightValue}</span>
                <span className="text-[10px] text-on-surface-variant dark:text-on-surface-variant">{panel.unitLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
