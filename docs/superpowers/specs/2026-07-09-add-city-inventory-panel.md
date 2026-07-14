# 增加“各地市 库存金额”区域设计文档

## 1. 问题陈述
在省公司大屏页面底部增加一个新的区域，展示辽宁省 14 个地市的库存金额数据。该区域需位于“库存总金额变化趋势”与“Top5 综合材料站库存金额”之间，宽度占 1/3，且高度与相邻区域一致。

## 2. 方案详述
### 2.1 布局调整
- 修改 [DashboardPage.tsx](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/pages/DashboardPage.tsx) 底部的 Grid 容器。
- 将原本作为占位的 `div` 替换为新创建的 `CityInventoryPanel` 组件。
- 布局结构：`lg:grid-cols-3` (1/3 趋势图 + 1/3 地市库存 + 1/3 TOP5)。

### 2.2 数据模型
- 在 [mockData.ts](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/data/mockData.ts) 的 `DashboardData` 接口中增加 `cityInventoryPanel` 字段。
- 增加 14 个城市的 Mock 数据，按行政顺序排列：沈阳、大连、鞍山、抚顺、本溪、丹东、锦州、营口、阜新、辽阳、盘锦、铁岭、朝阳、葫芦岛。

### 2.3 组件实现
- 创建新组件 `CityInventoryPanel.tsx`。
- 采用方案 B（进度条列表）：
    - 标题显示“各地市 库存金额”，配以 `MapPin` 或类似图标。
    - 14 个城市分两列展示（每列 7 个），以适应 1/3 的宽度空间。
    - 每个城市显示：名称、具体金额（单位：亿元）、水平进度条。
    - 进度条颜色统一使用主题主色（Primary）。

## 3. 影响评估
- **布局一致性**：该区域仅在 `province` (省公司) 大屏显示，`shenyang` (沈阳市) 大屏则在此位置保持空白或显示占位（需在 `DashboardPage` 中做条件判断）。
- **空间利用**：1/3 的宽度内分两列展示 14 个城市比较紧凑，需精细调整字号和间距。

## 4. 验证计划
- 访问 `/` 确认省公司大屏显示该区域，且 14 个城市数据完整。
- 访问 `/shenyang` 确认沈阳市大屏该位置的处理（建议保持空白或占位）。
- 检查响应式：在 `lg` 以下断点，三个区域应按 趋势图 -> 地市库存 -> TOP5 顺序垂直堆叠。
