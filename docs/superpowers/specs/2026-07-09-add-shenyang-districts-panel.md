# 增加“沈阳各区县 库存金额”区域设计文档

## 1. 问题陈述
在沈阳市大屏页面底部增加一个“各区县 库存金额”区域。该区域需位于“库存总金额变化趋势”与“TOP5 综合材料站库存金额”之间，宽度占 1/3，且高度与相邻区域一致。展示沈阳市下属 13 个区县的库存数据。

## 2. 方案详述
### 2.1 布局集成
- 在 [DashboardPage.tsx](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/pages/DashboardPage.tsx) 中，目前的逻辑已经支持根据 `dashboard.cityInventoryPanel` 是否存在来渲染面板或占位符。
- 此次改动无需修改页面逻辑，只需在 Mock 数据中补充沈阳市的数据即可。

### 2.2 数据配置
- 在 [mockData.ts](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/data/mockData.ts) 的 `dashboards.shenyang` 对象中增加 `cityInventoryPanel` 字段。
- **城市清单 (按行政顺序)**：
    1. 和平区 (4.2 亿, 88%)
    2. 沈河区 (3.8 亿, 82%)
    3. 大东区 (3.1 亿, 65%)
    4. 皇姑区 (2.8 亿, 60%)
    5. 铁西区 (4.5 亿, 95%)
    6. 苏家屯区 (1.8 亿, 40%)
    7. 浑南区 (3.5 亿, 75%)
    8. 沈北新区 (2.2 亿, 48%)
    9. 于洪区 (2.5 亿, 55%)
    10. 辽中区 (1.2 亿, 25%)
    11. 康平县 (0.8 亿, 18%)
    12. 法库县 (0.9 亿, 20%)
    13. 新民市 (1.5 亿, 32%)

### 2.3 组件复用
- 直接复用 [CityInventoryPanel.tsx](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/%E6%95%B0%E6%8D%AE%E5%A4%A7%E5%B1%8F/liaoning-industrial-intelligence/src/components/CityInventoryPanel.tsx)。
- 由于采用双列布局 (方案 A)，13 个项目会排列成 7 行，最后一行为单个项目，视觉上平衡。

## 3. 影响评估
- **页面一致性**：省公司展示全省 14 地市，沈阳市展示市内 13 区县，两者 UI 风格和布局逻辑完全统一。
- **高度对齐**：由于区县数量 (13) 与地市数量 (14) 接近，面板内容高度将非常接近，能完美保持与左右两侧组件的高度对齐。

## 4. 验证计划
- 访问 `/shenyang` 确认中间面板出现，且展示 13 个区县。
- 确认城市顺序为行政顺序。
- 确认样式与省公司页面的地市面板一致。
