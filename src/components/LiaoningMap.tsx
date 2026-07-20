import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useNavigate } from "react-router-dom";
import { Info, ArrowUpRight } from "lucide-react";
import { EChartsBase } from "./EChartsBase";
import { GlassCard } from "./GlassCard";
import type { CityInventoryItem } from "../data/mockData";
// 静态导入 GeoJSON，避免运行时 fetch 被沙箱/代理拦截
import liaoningGeoJson from "../data/geo/liaoning.geo.json";

export interface LiaoningMapProps {
  title: string;
  data: readonly CityInventoryItem[];
  className?: string;
}

export function LiaoningMap({ title, data, className = "" }: LiaoningMapProps) {
  const [mapRegistered, setMapRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      echarts.registerMap("liaoning", liaoningGeoJson as any);
      setMapRegistered(true);
    } catch (err) {
      console.error("Failed to register Liaoning GeoJSON:", err);
    }
  }, []);

  const handleMapClick = (params: any) => {
    if (params.name === "沈阳市") {
      navigate("/shenyang");
    }
  };

  const onEvents = {
    click: handleMapClick,
  };

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
      name: item.name + (item.name.endsWith("市") ? "" : "市"), // 确保名称匹配 GeoJSON 中的名称 (通常带"市")
      value: item.stationCount,
      amount: item.value,
      enabledCount: item.enabledCount ?? item.stationCount,
      inboundAmount: item.inboundAmount ?? "—",
      outboundAmount: item.outboundAmount ?? "—",
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
          <div class="flex flex-col gap-1 p-1 min-w-[200px]">
            <div class="font-bold border-b border-white/10 pb-1 mb-1 text-[#00dbe7]">${params.name}</div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">材料站启用数量</span>
              <span class="font-bold text-[#00dbe7]">${params.data.enabledCount} 个</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">库存金额</span>
              <span class="font-bold text-[#ffb950]">${params.data.amount} 亿元</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">累计入库金额</span>
              <span class="font-bold text-[#7ed957]">${params.data.inboundAmount} 亿元</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[10px] opacity-70">累计出库金额</span>
              <span class="font-bold text-[#ff8a65]">${params.data.outboundAmount} 亿元</span>
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
        <div className="flex items-center gap-1">
          <Info className="h-4 w-4 cursor-help text-on-surface-variant/40 transition-colors hover:text-on-surface-variant" />
          <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
          <ArrowUpRight className="h-4 w-4 cursor-pointer text-primary-fixed-dim/60 transition-colors hover:text-primary-fixed-dim" />
        </div>
      </div>

      <div className="flex-1">
        <EChartsBase option={option} onEvents={onEvents} />
      </div>

      {/* 业务单位标签 - 显示在地图最下方一行 */}
      <div className="flex items-center justify-center gap-3 px-container-padding pb-container-padding pt-2">
        <span className="text-[10px] font-label-caps uppercase tracking-wider text-on-surface-variant/50">业务单位</span>
        <div className="flex items-center gap-2">
          {data
            .filter((item) => ["信通公司", "物资分公司", "建设分公司", "送变电公司"].includes(item.name))
            .map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-surface-container/30 px-2.5 py-1 transition-colors hover:border-primary-fixed-dim/40"
              >
                <span className="text-[11px] font-medium text-on-background">{item.name}</span>
                <span className="text-[10px] tabular-nums text-primary-fixed-dim/70">{item.stationCount} 站</span>
              </div>
            ))}
        </div>
      </div>
    </GlassCard>
  );
}
