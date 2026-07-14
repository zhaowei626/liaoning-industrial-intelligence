# 库存趋势区域宽度调整执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将大屏底部“库存趋势”图表宽度由 2/3 缩小为 1/3，中间留出 1/3 的空白区域，保持右侧 TOP5 列表位置不变。

**Architecture:** 修改 `DashboardPage.tsx` 中的 Grid 布局配置，并在两个组件之间插入一个响应式的占位 `div`。

**Tech Stack:** React, Tailwind CSS

## Global Constraints
- 必须同时适配“省公司”和“沈阳市”页面。
- 保持移动端（小屏）下的垂直堆叠布局。
- 占位区域仅在 `lg` 及以上断点显示。

---

### Task 1: 修改 DashboardPage 底部布局

**Files:**
- Modify: `src/pages/DashboardPage.tsx:51-54`

**Interfaces:**
- Consumes: `LineTrendChart`, `RankingList` 组件

- [ ] **Step 1: 修改 Grid 列配置并添加占位符**

```tsx
// 找到以下代码：
<section className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
  <LineTrendChart panel={dashboard.trendPanel} />
  <RankingList panel={dashboard.rankingPanel} />
</section>

// 替换为：
<section className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-3">
  <LineTrendChart panel={dashboard.trendPanel} />
  <div className="hidden lg:block" aria-hidden="true" />
  <RankingList panel={dashboard.rankingPanel} />
</section>
```

- [ ] **Step 2: 验证大屏布局**

访问 `http://localhost:5175/` 和 `http://localhost:5175/shenyang`。
预期：底部区域分为三部分，左侧是图表，中间是空白，右侧是列表。

- [ ] **Step 3: 验证响应式布局**

将浏览器窗口缩小至 `lg` 断点（1024px）以下。
预期：中间的空白 `div` 消失，图表和列表恢复为上下堆叠，各占 100% 宽度。

- [ ] **Step 4: 运行类型检查**

Run: `npm run typecheck`
Expected: SUCCESS (忽略 scripts/ 目录下的 node 类型错误)

- [ ] **Step 5: 提交代码**

```bash
git add src/pages/DashboardPage.tsx
git commit -m "style: adjust inventory trend chart width to 1/3 with middle spacer"
```
