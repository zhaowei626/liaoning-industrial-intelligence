# 增加“沈阳各区县 库存金额”区域执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在沈阳市大屏页面底部增加“各区县 库存金额”展示区域，占 1/3 宽度，展示 13 个区县的库存进度条。

**Architecture:** 在 `mockData.ts` 中为 `shenyang` 数据对象补充 `cityInventoryPanel` 数据，复用已有的 `CityInventoryPanel` 组件。

**Tech Stack:** React, Tailwind CSS

## Global Constraints
- 区县列表必须按行政顺序排列。
- 采用双列进度条布局（Option A）。
- 高度必须与相邻的趋势图和 TOP5 列表保持一致。

---

### Task 1: 为沈阳市大屏补充 Mock 数据

**Files:**
- Modify: `src/data/mockData.ts`

**Interfaces:**
- Produces: `dashboards.shenyang.cityInventoryPanel` 数据。

- [ ] **Step 1: 补充沈阳区县 Mock 数据 (13个区县)**

```typescript
// 在 dashboards.shenyang 对象中增加 cityInventoryPanel 字段
cityInventoryPanel: {
  title: "各区县 库存金额",
  items: [
    { name: "和平区", value: "4.2", percent: 88 },
    { name: "沈河区", value: "3.8", percent: 82 },
    { name: "大东区", value: "3.1", percent: 65 },
    { name: "皇姑区", value: "2.8", percent: 60 },
    { name: "铁西区", value: "4.5", percent: 95 },
    { name: "苏家屯区", value: "1.8", percent: 40 },
    { name: "浑南区", value: "3.5", percent: 75 },
    { name: "沈北新区", value: "2.2", percent: 48 },
    { name: "于洪区", value: "2.5", percent: 55 },
    { name: "辽中区", value: "1.2", percent: 25 },
    { name: "康平县", value: "0.8", percent: 18 },
    { name: "法库县", value: "0.9", percent: 20 },
    { name: "新民市", value: "1.5", percent: 32 },
  ],
},
```

- [ ] **Step 2: 验证页面效果**

访问 `http://localhost:5175/shenyang`。
预期：底部中间区域自动加载并显示“各区县 库存金额”面板，包含 13 个区县。

- [ ] **Step 3: 运行类型检查并提交**

Run: `npm run typecheck`
Expected: SUCCESS

```bash
git add src/data/mockData.ts
git commit -m "data: add shenyang districts inventory mock data"
```
