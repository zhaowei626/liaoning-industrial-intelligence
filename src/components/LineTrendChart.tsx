import { Info, ArrowUpRight } from "lucide-react";
import * as echarts from "echarts";
import { shellIcons, type DashboardData } from "../data/mockData";
import { GlassCard } from "./GlassCard";
import { EChartsBase } from "./EChartsBase";

export interface LineTrendChartProps
  extends Readonly<{
    panel: DashboardData["trendPanel"];
    className?: string;
  }> {}

export function LineTrendChart({ panel, className = "" }: LineTrendChartProps) {
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
        const item1 = params[0];
        const item2 = params[1];
        let tooltipHtml = `
          <div class="flex flex-col gap-2 p-1">
            <div class="text-[10px] opacity-70 mb-1 border-b border-white/10 pb-1">${item1.name}</div>
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-[#00dbe7]"></span>
                <span class="text-[10px] opacity-70">库存金额</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="font-bold text-[#00dbe7]">${item1.value}</span>
                <span class="text-[10px] opacity-70">${panel.unitLabel}</span>
              </div>
            </div>`;
        
        if (item2) {
          tooltipHtml += `
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-[#ffb950]"></span>
                <span class="text-[10px] opacity-70">材料站数量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="font-bold text-[#ffb950]">${item2.value}</span>
                <span class="text-[10px] opacity-70">${panel.unitLabel2 || ""}</span>
              </div>
            </div>`;
        }
        
        tooltipHtml += `</div>`;
        return tooltipHtml;
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
    yAxis: [
      {
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
      {
        type: "value",
        name: `(${panel.unitLabel2 || ""})`,
        nameTextStyle: {
          color: "#b9cacb",
          fontSize: 10,
          padding: [0, -30, 0, 0],
        },
        splitLine: { show: false },
        axisLabel: {
          color: "#b9cacb",
          fontSize: 10,
        },
      },
    ],
    series: [
      {
        name: "库存总金额",
        type: "line",
        smooth: true,
        showSymbol: false,
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#00dbe7",
        },
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "rgba(0, 219, 231, 0.5)" },
            { offset: 1, color: "#00dbe7" },
          ]),
          shadowColor: "rgba(0, 219, 231, 0.3)",
          shadowBlur: 10,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0, 219, 231, 0.3)" },
            { offset: 1, color: "rgba(0, 219, 231, 0)" },
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
      {
        name: "材料站数量",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        showSymbol: false,
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#ffb950",
        },
        lineStyle: {
          width: 2,
          type: "dashed",
          color: "#ffb950",
        },
        emphasis: {
          scale: true,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#fff",
          },
        },
        data: panel.points.map((p) => p.value2 || 0),
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
          <div className="flex items-center gap-1">
            <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
          </div>
        </div>
      </div>

      <div className="relative min-h-48 flex-1">
        <EChartsBase option={option} />
        
        <div className="absolute right-4 top-2 z-10 flex flex-col gap-2 rounded-lg border border-primary-fixed/30 bg-surface-container-highest/80 p-2 shadow-lg backdrop-blur-xl dark:border-primary-fixed/30 dark:bg-surface-container-highest/80">
          <div className="font-label-caps text-[10px] text-on-surface-variant dark:text-on-surface-variant">{panel.highlightLabel}</div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] opacity-60">库存总额</span>
              <div className="flex items-baseline gap-1">
                <span className="font-data-md text-sm text-primary-fixed-dim dark:text-primary-fixed-dim">{panel.highlightValue}</span>
                <span className="text-[10px] text-on-surface-variant dark:text-on-surface-variant">{panel.unitLabel}</span>
              </div>
            </div>
            
            {panel.highlightValue2 && (
              <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-1">
                <span className="text-[10px] opacity-60">材料站数</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-data-md text-sm text-tertiary-fixed-dim dark:text-tertiary-fixed-dim">{panel.highlightValue2}</span>
                  <span className="text-[10px] text-on-surface-variant dark:text-on-surface-variant">{panel.unitLabel2}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
