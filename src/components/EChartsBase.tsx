import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface EChartsBaseProps {
  option: EChartsOption;
  style?: React.CSSProperties;
  className?: string;
  onEvents?: Record<string, (params: any) => void>;
}

export function EChartsBase({ option, style, className, onEvents }: EChartsBaseProps) {
  const defaultStyle = {
    height: "100%",
    width: "100%",
    ...style,
  };

  return (
    <ReactECharts
      option={option}
      style={defaultStyle}
      className={className}
      onEvents={onEvents}
      opts={{ renderer: "canvas" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}
