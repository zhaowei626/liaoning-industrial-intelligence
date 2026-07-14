import { MapPin, Info } from "lucide-react";
import type { CityInventoryPanelData } from "../data/mockData";
import { GlassCard } from "./GlassCard";
import { EChartsBase } from "./EChartsBase";
import type { EChartsOption } from "echarts";

export interface CityInventoryPanelProps {
  panel: CityInventoryPanelData;
  className?: string;
}

export function CityInventoryPanel({ panel, className }: CityInventoryPanelProps) {
  const items = panel.items;
  
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "rgba(13, 17, 23, 0.8)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      textStyle: {
        color: "#E2E8F0",
      },
    },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(226, 232, 240, 0.6)",
        fontSize: 10,
      },
      data: ["库存金额", "站点数量"],
    },
    grid: {
      top: 40,
      left: 10,
      right: 10,
      bottom: 40,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: items.map((item) => item.name),
      axisLabel: {
        color: "rgba(226, 232, 240, 0.6)",
        fontSize: 10,
        rotate: 35,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "亿元",
        nameTextStyle: {
          color: "rgba(226, 232, 240, 0.4)",
          fontSize: 10,
          align: "right",
          padding: [0, 5, 0, 0],
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.05)",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "rgba(226, 232, 240, 0.4)",
          fontSize: 10,
        },
      },
      {
        type: "value",
        name: "个",
        nameTextStyle: {
          color: "rgba(226, 232, 240, 0.4)",
          fontSize: 10,
          align: "left",
          padding: [0, 0, 0, 5],
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "rgba(226, 232, 240, 0.4)",
          fontSize: 10,
        },
      },
    ],
    series: [
      {
        name: "库存金额",
        type: "bar",
        data: items.map((item) => parseFloat(item.value)),
        barWidth: "40%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(34, 211, 238, 0.6)" },
              { offset: 1, color: "rgba(34, 211, 238, 0.1)" },
            ],
          },
          borderRadius: [2, 2, 0, 0],
        },
      },
      {
        name: "站点数量",
        type: "line",
        yAxisIndex: 1,
        data: items.map((item) => item.stationCount),
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#FB923C",
        },
        lineStyle: {
          width: 2,
          shadowBlur: 10,
          shadowColor: "rgba(251, 146, 60, 0.4)",
        },
      },
    ],
  };

  return (
    <GlassCard className={`flex min-h-[300px] flex-col p-container-padding ${className || ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-on-background dark:text-on-background" />
          <h2 className="font-headline-md text-xl font-bold text-on-background dark:text-on-background">
            {panel.title}
          </h2>
          <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
        </div>
      </div>

      <div className="flex-1">
        <EChartsBase option={option} />
      </div>
    </GlassCard>
  );
}
