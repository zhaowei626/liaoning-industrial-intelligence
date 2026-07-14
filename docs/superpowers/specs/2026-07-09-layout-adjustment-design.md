# 布局调整设计文档：库存趋势区域宽度调整

## 1. 问题陈述
用户需要调整“省公司”和“沈阳市”大屏页面底部的布局。目前“库存总金额变化趋势”占据了 2/3 的宽度，而“TOP5 库存金额”占据 1/3。目标是将趋势图缩小到 1/3，中间留空，TOP5 保持在最右侧。

## 2. 方案详述
### 2.1 布局架构 (Architecture)
修改 [DashboardPage.tsx](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/pages/DashboardPage.tsx) 中的底部 `section` 结构。

**当前结构：**
```html
<section className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
  <LineTrendChart />
  <RankingList />
</section>
```

**目标结构：**
```html
<section className="col-span-12 grid grid-cols-1 gap-gutter lg:grid-cols-3">
  <LineTrendChart />
  <div className="hidden lg:block" /> <!-- 占位 Spacer -->
  <RankingList />
</section>
```

### 2.2 响应式处理 (Responsive)
- **移动端/中屏 (MD以下)**：保持 `grid-cols-1`，组件堆叠排列，符合小屏阅读习惯。
- **大屏 (LG及以上)**：激活 `grid-cols-3`。中间的 `div` 通过 `hidden lg:block` 控制显示，确保在三列布局中占据中间位置。

## 3. 影响评估
- **一致性**：同时影响“省公司”和“沈阳市”页面（因为它们共用同一个 `DashboardPage` 组件）。
- **视觉平衡**：由于趋势图宽度大幅缩小，图表内部的 X 轴刻度或数据点密度可能需要注意，但基于现有 [LineTrendChart](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/components/LineTrendChart.tsx) 的响应式设计，应该能自动适配。

## 4. 验证计划
- 启动服务后，分别访问 `/` (省公司) 和 `/shenyang` (沈阳市) 页面。
- 检查底部区域是否呈现 1/3 + 1/3(空) + 1/3(TOP5) 的分布。
- 缩放浏览器窗口，确认在小屏下恢复为单列垂直布局。
