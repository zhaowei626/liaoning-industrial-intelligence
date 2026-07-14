# 增加“各地市 库存金额”区域执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在省公司大屏页面底部增加“各地市 库存金额”展示区域，占 1/3 宽度，展示 14 个城市的库存进度条。

**Architecture:** 在 `mockData.ts` 中定义数据结构，创建 `CityInventoryPanel` 组件，并在 `DashboardPage.tsx` 中完成集成。

**Tech Stack:** React, Tailwind CSS, Lucide React (图标)

## Global Constraints
- 仅在省公司页面显示数据，沈阳市页面该位置保持空白。
- 城市列表必须按行政顺序排列。
- 采用双列进度条布局（Option B）。
- 高度必须与相邻的趋势图和 TOP5 列表保持一致。

---

### Task 1: 更新数据结构与 Mock 数据

**Files:**
- Modify: `src/data/mockData.ts`

**Interfaces:**
- Produces: `CityInventoryPanelData` 接口及 `dashboards.province.cityInventoryPanel` 数据。

- [ ] **Step 1: 定义接口类型**

```typescript
// 在 src/data/mockData.ts 中定义
export interface CityInventoryItem {
  readonly name: string;
  readonly value: string;
  readonly percent: number;
}

export interface CityInventoryPanelData {
  readonly title: string;
  readonly items: readonly CityInventoryItem[];
}

// 在 DashboardData 接口中增加可选字段
export interface DashboardData {
  // ... 其他字段
  readonly cityInventoryPanel?: CityInventoryPanelData;
}
```

- [ ] **Step 2: 增加省公司 Mock 数据 (14个城市)**

```typescript
// dashboards.province 下增加
cityInventoryPanel: {
  title: "各地市 库存金额",
  items: [
    { name: "沈阳", value: "28.5", percent: 85 },
    { name: "大连", value: "32.1", percent: 95 },
    { name: "鞍山", value: "15.2", percent: 50 },
    { name: "抚顺", value: "12.8", percent: 42 },
    { name: "本溪", value: "10.5", percent: 35 },
    { name: "丹东", value: "9.8", percent: 32 },
    { name: "锦州", value: "11.2", percent: 38 },
    { name: "营口", value: "14.5", percent: 48 },
    { name: "阜新", value: "8.2", percent: 28 },
    { name: "辽阳", value: "9.5", percent: 31 },
    { name: "盘锦", value: "13.2", percent: 44 },
    { name: "铁岭", value: "10.1", percent: 34 },
    { name: "朝阳", value: "11.5", percent: 38 },
    { name: "葫芦岛", value: "9.2", percent: 30 },
  ],
},
```

- [ ] **Step 3: 运行类型检查并提交**

Run: `npm run typecheck`
Expected: SUCCESS

---

### Task 2: 创建 CityInventoryPanel 组件

**Files:**
- Create: `src/components/CityInventoryPanel.tsx`

**Interfaces:**
- Consumes: `CityInventoryPanelData`

- [ ] **Step 1: 编写组件代码 (双列布局)**

```tsx
import { MapPin } from "lucide-react";
import type { CityInventoryPanelData } from "../data/mockData";
import { GlassCard } from "./GlassCard";

export interface CityInventoryPanelProps {
  panel: CityInventoryPanelData;
}

export function CityInventoryPanel({ panel }: CityInventoryPanelProps) {
  return (
    <GlassCard className="flex min-h-[300px] flex-col p-container-padding">
      <h2 className="mb-5 flex items-center gap-2 font-headline-md text-xl font-bold text-primary dark:text-primary">
        <MapPin className="h-6 w-6" />
        {panel.title}
        <span className="ml-auto text-xs font-normal text-on-surface-variant/60">(单位：亿元)</span>
      </h2>

      <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3">
        {panel.items.map((item) => (
          <div key={item.name} className="flex flex-col justify-center gap-1">
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>{item.name}</span>
              <span className="font-data-md font-semibold text-primary">{item.value}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-container/10">
              <div 
                className="h-full rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                style={{ width: `${item.percent}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
```

- [ ] **Step 2: 提交代码**

---

### Task 3: 在 DashboardPage 中集成组件

**Files:**
- Modify: `src/pages/DashboardPage.tsx`

- [ ] **Step 1: 替换占位符并增加判断**

```tsx
import { CityInventoryPanel } from "../components/CityInventoryPanel";

// ...
<section className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-3">
  <LineTrendChart panel={dashboard.trendPanel} />
  
  {dashboard.cityInventoryPanel ? (
    <CityInventoryPanel panel={dashboard.cityInventoryPanel} />
  ) : (
    <div className="hidden lg:block" aria-hidden="true" />
  )}
  
  <RankingList panel={dashboard.rankingPanel} />
</section>
```

- [ ] **Step 2: 最终验证**

访问 `/` 确认中间面板显示。
访问 `/shenyang` 确认中间保持空白占位。
检查 14 个城市的排列顺序和进度条发光效果。

- [ ] **Step 3: 运行类型检查并提交**
