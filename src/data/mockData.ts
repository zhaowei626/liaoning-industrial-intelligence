import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  Boxes,
  Building2,
  Clock3,
  GitBranch,
  Globe2,
  Landmark,
  LayoutDashboard,
  Network,
  PackageCheck,
  PieChart,
  Radio,
  Route,
  Store,
  TrendingDown,
  TrendingUp,
  WalletCards,
  Warehouse,
} from "lucide-react";

export type DashboardId = "province" | "shenyang";

export interface NavAction {
  readonly label: string;
  readonly icon: LucideIcon;
}

export interface DashboardRoute {
  readonly label: string;
  readonly path: string;
  readonly dashboardId: DashboardId;
}

export interface MetricItem {
  readonly label: string;
  readonly value: string;
  readonly unit: string;
  readonly trend?: string;
  readonly icon: LucideIcon;
  readonly status: "normal" | "risk";
  readonly subMetrics?: readonly { readonly label: string; readonly value: string; readonly unit: string }[];
}

export interface DonutSegment {
  readonly label: string;
  readonly value: number;
  readonly className: string;
}

export interface ProgressItem {
  readonly label: string;
  readonly value: number;
  readonly amount?: string;
  readonly percent: number;
  readonly tone: "primary" | "secondary" | "muted" | "risk" | "warning";
  readonly className?: string;
}

export interface MapCalloutRow {
  readonly label: string;
  readonly value: string;
  readonly icon: LucideIcon;
  readonly tone: "primary" | "risk" | "neutral";
}

export interface MapPanelData {
  readonly title: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly focusTitle?: string;
  readonly statusLabel?: string;
  readonly calloutRows: readonly MapCalloutRow[];
}

export interface TrendPoint {
  readonly label: string;
  readonly value: number;
  readonly value2?: number;
}

export interface RankingItem {
  readonly name: string;
  readonly value: string;
  readonly city?: string;
  readonly department?: string;
  readonly station?: string;
}

export interface CityInventoryItem {
  readonly name: string;
  readonly value: string;
  readonly stationCount: number;
  readonly percent: number;
}

export interface CityInventoryPanelData {
  readonly title: string;
  readonly items: readonly CityInventoryItem[];
}

export interface DashboardData {
  readonly id: DashboardId;
  readonly title: string;
  readonly routePath: string;
  readonly metrics: readonly MetricItem[];
  readonly stationStatus: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly totalLabel: string;
    readonly total: string;
    readonly segments: readonly DonutSegment[];
  };
  readonly departmentPanel: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly items: readonly ProgressItem[];
  };
  readonly map: MapPanelData;
  readonly riskPanel: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly items: readonly ProgressItem[];
  };
  readonly warehousePanel: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly items: readonly ProgressItem[];
  };
  readonly trendPanel: {
    readonly title: string;
    readonly unitLabel: string;
    readonly unitLabel2?: string;
    readonly highlightLabel: string;
    readonly highlightValue: string;
    readonly highlightValue2?: string;
    readonly points: readonly TrendPoint[];
  };
  readonly materialRankingPanel: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly items: readonly RankingItem[];
  };
  readonly inventoryRankingPanel: {
    readonly title: string;
    readonly icon: LucideIcon;
    readonly items: readonly RankingItem[];
  };
  readonly cityInventoryPanel?: CityInventoryPanelData;
}

export const navActions: readonly NavAction[] = [
  { label: "时间同步", icon: Clock3 },
  { label: "区域语言", icon: Globe2 },
  { label: "风险通知", icon: Radio },
];

export const dashboardRoutes: readonly DashboardRoute[] = [
  { label: "辽宁省", path: "/", dashboardId: "province" },
  { label: "沈阳市", path: "/shenyang", dashboardId: "shenyang" },
];

const months: readonly string[] = ["23-06", "07", "08", "09", "10", "11", "12", "24-01", "02", "03", "04", "05"];

export const dashboards: Record<DashboardId, DashboardData> = {
  province: {
    id: "province",
    title: "辽宁省 综合材料站数据大屏平台",
    routePath: "/",
    metrics: [
      {
        label: "材料站注册情况",
        value: "1,248",
        unit: "个",
        icon: Warehouse,
        status: "normal",
        subMetrics: [
          { label: "总数", value: "1,523", unit: "个" },
          { label: "启用", value: "1,248", unit: "个" },
          { label: "停用", value: "155", unit: "个" },
        ],
      },
      { label: "材料站本月入库金额", value: "¥ 12.45", unit: "亿元", icon: ArrowDownCircle, status: "normal" },
      { label: "材料站本月出库金额", value: "¥ 10.82", unit: "亿元", icon: ArrowUpCircle, status: "normal" },
      { label: "材料站库存金额", value: "¥ 84.50", unit: "亿元", trend: "+5.20% 较上月", icon: WalletCards, status: "normal" },
      { label: "材料站物资数量", value: "3,492", unit: "万条", trend: "平稳", icon: Boxes, status: "normal" },
    ],
    stationStatus: {
      title: "材料站状态",
      icon: PieChart,
      totalLabel: "注册总数",
      total: "1,523",
      segments: [
        { label: "启用", value: 1248, className: "text-primary-fixed-dim dark:text-primary-fixed-dim" },
        { label: "停用", value: 155, className: "text-secondary dark:text-secondary" },
        { label: "待审批", value: 80, className: "text-tertiary-fixed-dim dark:text-tertiary-fixed-dim" },
        { label: "已驳回", value: 40, className: "text-error dark:text-error" },
      ],
    },
    departmentPanel: {
      title: "各地市材料站按归属部门分布",
      icon: GitBranch,
      items: [
        { label: "设备管理部", value: 385, amount: "28.40 亿元", percent: 80, tone: "primary" },
        { label: "市场营销部", value: 290, amount: "22.15 亿元", percent: 60, tone: "secondary" },
        { label: "基建部", value: 245, amount: "18.60 亿元", percent: 50, tone: "muted" },
        { label: "物资管理部", value: 180, amount: "12.45 亿元", percent: 38, tone: "muted" },
        { label: "后勤保障部", value: 95, amount: "4.80 亿元", percent: 20, tone: "muted" },
        { label: "数字化工作部", value: 82, amount: "3.50 亿元", percent: 18, tone: "muted" },
        { label: "发展策划部", value: 75, amount: "3.20 亿元", percent: 16, tone: "muted" },
        { label: "财务资产部", value: 68, amount: "2.80 亿元", percent: 14, tone: "muted" },
        { label: "安全监察部", value: 55, amount: "2.10 亿元", percent: 12, tone: "muted" },
        { label: "科技部", value: 48, amount: "1.85 亿元", percent: 10, tone: "muted" },
        { label: "审计部", value: 42, amount: "1.50 亿元", percent: 9, tone: "muted" },
        { label: "法律合规部", value: 35, amount: "1.20 亿元", percent: 8, tone: "muted" },
        { label: "党建工作部", value: 28, amount: "0.95 亿元", percent: 6, tone: "muted" },
        { label: "纪委办公室", value: 22, amount: "0.75 亿元", percent: 5, tone: "muted" },
        { label: "办公室", value: 10, amount: "0.35 亿元", percent: 2, tone: "muted" },
      ],
    },
    map: {
      title: "辽宁省综合材料站分布全景",
      imageSrc: "/stitch-reference/province-map.png",
      imageAlt: "辽宁省综合材料站分布地图",
      focusTitle: "沈阳市",
      statusLabel: "MONITORING",
      calloutRows: [
        { label: "材料站数量", value: "248 个", icon: Warehouse, tone: "neutral" },
        { label: "库存金额", value: "28.50 亿元", icon: WalletCards, tone: "neutral" },
        { label: "风险预警", value: "12 项", icon: AlertTriangle, tone: "risk" },
      ],
    },
    riskPanel: {
      title: "风险预警",
      icon: BarChart3,
      items: [
        { label: "超72小时未审批", value: 60, percent: 42, tone: "risk" },
        { label: "近一年零库存站点", value: 50, percent: 35, tone: "warning" },
        { label: "存量物料超期未处置", value: 32, percent: 23, tone: "warning" },
      ],
    },
    warehousePanel: {
      title: "材料站按仓库性质分布",
      icon: PackageCheck,
      items: [
        { label: "变电站", value: 420, amount: "25.40 亿元", percent: 92, tone: "primary", className: "text-primary-fixed-dim dark:text-primary-fixed-dim" },
        { label: "供电所", value: 315, amount: "18.20 亿元", percent: 72, tone: "secondary", className: "text-secondary dark:text-secondary" },
        { label: "产业仓库", value: 210, amount: "15.60 亿元", percent: 58, tone: "muted", className: "text-tertiary-fixed-dim dark:text-tertiary-fixed-dim" },
        { label: "项目现场", value: 158, amount: "10.80 亿元", percent: 43, tone: "muted", className: "text-primary-fixed-dim/60 dark:text-primary-fixed-dim/60" },
        { label: "地市供电局", value: 85, amount: "8.40 亿元", percent: 30, tone: "muted", className: "text-secondary/60 dark:text-secondary/60" },
        { label: "地市公司库房", value: 42, amount: "4.20 亿元", percent: 12, tone: "muted", className: "text-tertiary-fixed-dim/60 dark:text-tertiary-fixed-dim/60" },
        { label: "其他", value: 18, amount: "1.90 亿元", percent: 6, tone: "muted", className: "text-outline dark:text-outline" },
      ],
    },
    trendPanel: {
      title: "近一年 库存金额与材料站数量变化趋势",
      unitLabel: "亿元",
      unitLabel2: "个",
      highlightLabel: "2024-05",
      highlightValue: "84.52",
      highlightValue2: "1,248",
      points: months.map((label, index) => ({ 
        label, 
        value: [45, 48, 52, 55, 60, 58, 65, 70, 68, 75, 82, 84.52][index],
        value2: [1100, 1120, 1150, 1180, 1200, 1210, 1220, 1230, 1235, 1240, 1245, 1248][index]
      })),
    },
    materialRankingPanel: {
      title: "Top 5 物资 库存金额",
      icon: Boxes,
      items: [
        { name: "变压器 (220kV)", value: "1.24 亿元", city: "沈阳市", station: "沈阳铁西中心库" },
        { name: "隔离开关 (500kV)", value: "0.85 亿元", city: "大连市", station: "大连金普一号库" },
        { name: "断路器 (110kV)", value: "0.72 亿元", city: "鞍山市", station: "鞍山钢铁备件库" },
        { name: "互感器 (35kV)", value: "0.58 亿元", city: "抚顺市", station: "抚顺石油专用库" },
        { name: "绝缘子 (复合)", value: "0.42 亿元", city: "本溪市", station: "本溪钢铁一号库" },
      ],
    },
    inventoryRankingPanel: {
      title: "Top 5 综合材料站 库存金额",
      icon: Store,
      items: [
        { name: "沈阳铁西中心库", value: "4.22 亿元", city: "沈阳市", department: "物资管理部" },
        { name: "大连金普一号库", value: "3.82 亿元", city: "大连市", department: "物资管理部" },
        { name: "鞍山钢铁备件库", value: "3.12 亿元", city: "鞍山市", department: "设备管理部" },
        { name: "抚顺石油专用库", value: "2.82 亿元", city: "抚顺市", department: "基建部" },
        { name: "本溪钢铁一号库", value: "2.52 亿元", city: "本溪市", department: "物资管理部" },
      ],
    },
    cityInventoryPanel: {
      title: "各地市/各业务单位 库存金额与材料站数量",
      items: [
        { name: "沈阳", value: "28.52", stationCount: 248, percent: 85 },
        { name: "大连", value: "32.13", stationCount: 186, percent: 95 },
        { name: "鞍山", value: "15.23", stationCount: 142, percent: 50 },
        { name: "抚顺", value: "12.84", stationCount: 98, percent: 42 },
        { name: "本溪", value: "10.55", stationCount: 85, percent: 35 },
        { name: "丹东", value: "9.83", stationCount: 112, percent: 32 },
        { name: "锦州", value: "11.22", stationCount: 125, percent: 38 },
        { name: "营口", value: "14.56", stationCount: 134, percent: 48 },
        { name: "阜新", value: "8.26", stationCount: 65, percent: 28 },
        { name: "辽阳", value: "9.54", stationCount: 88, percent: 31 },
        { name: "盘锦", value: "13.24", stationCount: 76, percent: 44 },
        { name: "铁岭", value: "10.18", stationCount: 118, percent: 34 },
        { name: "朝阳", value: "11.55", stationCount: 145, percent: 38 },
        { name: "葫芦岛", value: "9.25", stationCount: 102, percent: 30 },
        { name: "信通公司", value: "5.24", stationCount: 42, percent: 18 },
        { name: "物资分公司", value: "8.12", stationCount: 65, percent: 28 },
        { name: "建设分公司", value: "6.45", stationCount: 52, percent: 22 },
        { name: "送变电公司", value: "7.82", stationCount: 58, percent: 25 },
      ],
    },
  },
  shenyang: {
    id: "shenyang",
    title: "沈阳市 综合材料站数据大屏平台",
    routePath: "/shenyang",
    metrics: [
      {
        label: "材料站注册情况",
        value: "248",
        unit: "个",
        icon: Warehouse,
        status: "normal",
        subMetrics: [
          { label: "总数", value: "296", unit: "个" },
          { label: "启用", value: "248", unit: "个" },
          { label: "停用", value: "25", unit: "个" },
        ],
      },
      { label: "材料站本月入库金额", value: "¥ 4.25", unit: "亿元", icon: ArrowDownCircle, status: "normal" },
      { label: "材料站本月出库金额", value: "¥ 3.12", unit: "亿元", icon: ArrowUpCircle, status: "normal" },
      { label: "材料站库存金额", value: "¥ 28.5", unit: "亿元", trend: "+5.20% 较上月", icon: WalletCards, status: "normal" },
      { label: "材料站物资数量", value: "892", unit: "万条", trend: "平稳", icon: Boxes, status: "normal" },
    ],
    stationStatus: {
      title: "材料站状态",
      icon: PieChart,
      totalLabel: "注册总数",
      total: "296",
      segments: [
        { label: "启用", value: 248, className: "text-primary-fixed-dim dark:text-primary-fixed-dim" },
        { label: "停用", value: 25, className: "text-secondary dark:text-secondary" },
        { label: "待审批", value: 15, className: "text-tertiary-fixed-dim dark:text-tertiary-fixed-dim" },
        { label: "已驳回", value: 8, className: "text-error dark:text-error" },
      ],
    },
    departmentPanel: {
      title: "材料站按归属部门分布",
      icon: GitBranch,
      items: [
        { label: "设备管理部", value: 85, amount: "8.50 亿元", percent: 34, tone: "primary" },
        { label: "市场营销部", value: 68, amount: "5.20 亿元", percent: 27, tone: "secondary" },
        { label: "基建部", value: 42, amount: "4.80 亿元", percent: 17, tone: "muted" },
        { label: "物资管理部", value: 30, amount: "3.20 亿元", percent: 12, tone: "muted" },
        { label: "后勤保障部", value: 15, amount: "2.40 亿元", percent: 6, tone: "muted" },
        { label: "数字化工作部", value: 12, amount: "1.50 亿元", percent: 5, tone: "muted" },
        { label: "发展策划部", value: 10, amount: "1.20 亿元", percent: 4, tone: "muted" },
        { label: "财务资产部", value: 8, amount: "0.80 亿元", percent: 3, tone: "muted" },
        { label: "安全监察部", value: 7, amount: "0.60 亿元", percent: 3, tone: "muted" },
        { label: "科技部", value: 6, amount: "0.50 亿元", percent: 2, tone: "muted" },
        { label: "审计部", value: 5, amount: "0.45 亿元", percent: 2, tone: "muted" },
        { label: "法律合规部", value: 4, amount: "0.35 亿元", percent: 2, tone: "muted" },
        { label: "党建工作部", value: 3, amount: "0.25 亿元", percent: 1, tone: "muted" },
        { label: "纪委办公室", value: 2, amount: "0.20 亿元", percent: 1, tone: "muted" },
        { label: "工会", value: 2, amount: "0.15 亿元", percent: 1, tone: "muted" },
        { label: "团委", value: 1, amount: "0.10 亿元", percent: 1, tone: "muted" },
        { label: "办公室", value: 1, amount: "0.08 亿元", percent: 1, tone: "muted" },
        { label: "培训中心", value: 1, amount: "0.05 亿元", percent: 1, tone: "muted" },
        { label: "科研院", value: 1, amount: "0.02 亿元", percent: 1, tone: "muted" },
        { label: "经研院", value: 1, amount: "0.01 亿元", percent: 1, tone: "muted" },
        { label: "其他", value: 8, amount: "1.20 亿元", percent: 4, tone: "muted" },
      ],
    },
    map: {
      title: "沈阳市综合材料站分布全景",
      imageSrc: "/stitch-reference/shenyang-map.png",
      imageAlt: "沈阳市综合材料站分布地图",
      calloutRows: [],
    },
    riskPanel: {
      title: "风险预警",
      icon: BarChart3,
      items: [
        { label: "超72小时未审批", value: 7, percent: 42, tone: "risk" },
        { label: "近一年零库存站点", value: 3, percent: 35, tone: "warning" },
        { label: "存量物料超期未处置", value: 2, percent: 23, tone: "warning" },
      ],
    },
    warehousePanel: {
      title: "材料站按仓库性质分布",
      icon: PackageCheck,
      items: [
        { label: "变电站", value: 90, amount: "8.50 亿元", percent: 36, tone: "primary", className: "text-primary-fixed-dim dark:text-primary-fixed-dim" },
        { label: "供电所", value: 65, amount: "5.20 亿元", percent: 26, tone: "secondary", className: "text-secondary dark:text-secondary" },
        { label: "产业仓库", value: 42, amount: "4.80 亿元", percent: 17, tone: "muted", className: "text-tertiary-fixed-dim dark:text-tertiary-fixed-dim" },
        { label: "项目现场", value: 25, amount: "3.20 亿元", percent: 10, tone: "muted", className: "text-primary-fixed-dim/60 dark:text-primary-fixed-dim/60" },
        { label: "地市供电局", value: 15, amount: "2.40 亿元", percent: 6, tone: "muted", className: "text-secondary/60 dark:text-secondary/60" },
        { label: "地市公司库房", value: 8, amount: "1.20 亿元", percent: 3, tone: "muted", className: "text-tertiary-fixed-dim/60 dark:text-tertiary-fixed-dim/60" },
        { label: "其他", value: 3, amount: "0.50 亿元", percent: 2, tone: "muted", className: "text-outline dark:text-outline" },
      ],
    },
    trendPanel: {
      title: "近一年 库存总金额与材料站数量变化趋势",
      unitLabel: "亿元",
      unitLabel2: "个",
      highlightLabel: "2024-05",
      highlightValue: "28.52",
      highlightValue2: "248",
      points: months.map((label, index) => ({ 
        label, 
        value: [14, 16, 15, 18, 20, 19, 22, 24, 23, 26, 28, 28.52][index],
        value2: [210, 215, 220, 225, 230, 232, 235, 238, 240, 242, 245, 248][index]
      })),
    },
    materialRankingPanel: {
      title: "Top 10 物资 库存金额",
      icon: Boxes,
      items: [
        { name: "配电变压器", value: "0.45 亿元", city: "沈阳市", station: "沈阳铁西中心库" },
        { name: "高压电缆", value: "0.38 亿元", city: "沈阳市", station: "沈阳浑南智慧库" },
        { name: "组合电器", value: "0.32 亿元", city: "沈阳市", station: "沈阳大东生产库" },
        { name: "智能电表", value: "0.25 亿元", city: "沈阳市", station: "沈阳于洪物流仓" },
        { name: "充电桩模块", value: "0.18 亿元", city: "沈阳市", station: "沈阳和平储备站" },
        { name: "互感器", value: "0.15 亿元", city: "沈阳市", station: "沈阳苏家屯中心库" },
        { name: "断路器", value: "0.12 亿元", city: "沈阳市", station: "沈阳康平应急站" },
        { name: "避雷器", value: "0.10 亿元", city: "沈阳市", station: "沈阳法库备件库" },
        { name: "隔离开关", value: "0.08 亿元", city: "沈阳市", station: "沈阳新民物流仓" },
        { name: "电力电容器", value: "0.05 亿元", city: "沈阳市", station: "沈阳辽中储备站" },
      ],
    },
    inventoryRankingPanel: {
      title: "Top 5 综合材料站 库存金额",
      icon: Store,
      items: [
        { name: "沈阳铁西中心库", value: "4.20 亿元", city: "沈阳市", department: "物资管理部" },
        { name: "沈阳浑南智慧库", value: "3.80 亿元", city: "沈阳市", department: "设备管理部" },
        { name: "沈阳大东生产库", value: "3.10 亿元", city: "沈阳市", department: "物资管理部" },
        { name: "沈阳于洪物流仓", value: "2.80 亿元", city: "沈阳市", department: "基建部" },
        { name: "沈阳和平储备站", value: "2.50 亿元", city: "沈阳市", department: "后勤保障部" },
      ],
    },
    cityInventoryPanel: {
      title: "材料站按归属部门分布",
      items: [
        { name: "设备管理部", value: "8.50", stationCount: 85, percent: 34 },
        { name: "市场营销部", value: "5.20", stationCount: 68, percent: 27 },
        { name: "基建部", value: "4.80", stationCount: 42, percent: 17 },
        { name: "物资管理部", value: "3.20", stationCount: 30, percent: 12 },
        { name: "后勤保障部", value: "2.40", stationCount: 15, percent: 6 },
      ],
    },
  },
};

export const dashboardFallback: DashboardId = "province";

export const shellIcons = {
  brand: Network,
  dashboard: LayoutDashboard,
  route: Route,
  trendUp: TrendingUp,
  trendDown: TrendingDown,
  landmark: Landmark,
  building: Building2,
} as const;
