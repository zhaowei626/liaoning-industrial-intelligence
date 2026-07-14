import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Info } from "lucide-react";
import { EChartsBase } from "./EChartsBase";
import { GlassCard } from "./GlassCard";
import type { CityInventoryItem } from "../data/mockData";

export interface LiaoningMapProps {
  title: string;
  data: readonly CityInventoryItem[];
  className?: string;
}

export function LiaoningMap({ title, data, className = "" }: LiaoningMapProps) {
  const [mapRegistered, setMapRegistered] = useState(false);

  useEffect(() => {
    // 辽宁省 GeoJSON 数据地址 (阿里云 DataV 提供)
    const LIAONING_GEOJSON_URL = "https://geo.datav.aliyun.com/areas_v3/bound/210000_full.json";

    fetch(LIAONING_GEOJSON_URL)
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap("liaoning", geoJson);
        setMapRegistered(true);
      })
      .catch((err) => console.error("Failed to load Liaoning GeoJSON:", err));
  }, []);

  if (!mapRegistered) {
    return (
      <GlassCard className={`flex items-center justify-center ${className}`}>
        <div className="text-on-surface-variant/60 animate-pulse">地图数据加载中...</div>
      </GlassCard>
    );
  }

  // 准备热力图数据
  const mapData = data
    .filter(item => !["信通公司", "物资分公司", "建设分公司", "送变电公司"].includes(item.name)) // 排除非地市单位
    .map((item) => ({
      name: item.name + (item.name.endsWith("市") ? "" : "市"), // 确保名称匹配 GeoJSON 中的名称 (通常带“市”)
      value: item.stationCount,
      amount: item.value,
    }));

  const option: echarts.EChartsOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(18, 33, 49, 0.9)",
      borderColor: "rgba(0, 219, 231, 0.3)",
      textStyle: { color: "#d4e4fa", fontSize: 12 },
      formatter: (params: any) => {
        if (!params.data) return params.name;
        return `
          <div class="flex flex-col gap-1 p-1">
            <div class="font-bold border-b border-white/10 pb-1 mb-1 text-[#00dbe7]">${params.name}</div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">材料站数量</span>
              <span class="font-bold text-[#00dbe7]">${params.data.value} 个</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">库存总金额</span>
              <span class="font-bold text-[#ffb950]">${params.data.amount} 亿元</span>
            </div>
          </div>
        `;
      },
    },
    visualMap: {
      min: 0,
      max: 300,
      left: "5%",
      bottom: "5%",
      text: ["高", "低"],
      calculable: true,
      inRange: {
        color: ["rgba(0, 219, 231, 0.2)", "rgba(0, 219, 231, 0.8)"],
      },
      textStyle: {
        color: "#b9cacb",
        fontSize: 10,
      },
    },
    series: [
      {
        name: "材料站分布",
        type: "map",
        map: "liaoning",
        roam: false, // 禁用缩放和平移以保持大屏稳定性
        emphasis: {
          label: {
            show: true,
            color: "#fff",
            fontSize: 14,
            fontWeight: "bold",
          },
          itemStyle: {
            areaColor: "rgba(255, 185, 80, 0.6)",
            borderColor: "#ffb950",
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: "rgba(255, 185, 80, 0.5)",
          },
        },
        itemStyle: {
          areaColor: "rgba(0, 219, 231, 0.1)",
          borderColor: "rgba(0, 219, 231, 0.5)",
          borderWidth: 1.5,
        },
        data: mapData,
        // 调整地图位置和大小
        layoutCenter: ["50%", "50%"],
        layoutSize: "95%",
      },
    ],
  };

  return (
    <GlassCard className={`relative flex flex-col overflow-hidden ${className}`}>
      <div className="absolute left-container-padding top-container-padding z-10 flex items-center gap-2">
        <h2 className="font-headline-md text-xl font-bold text-on-background dark:text-on-background">
          {title}
        </h2>
        <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
      </div>
      
      <div className="flex-1">
        <EChartsBase option={option} />
      </div>
    </GlassCard>
  );
}
