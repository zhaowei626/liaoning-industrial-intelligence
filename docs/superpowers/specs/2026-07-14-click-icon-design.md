# 业务跳转图标设计规范

## 设计背景
为了提升大屏的交互指引，需要在现有的业务指标标题区域新增“跳转详情”图标，引导用户点击进入详细业务页面。

## 图标方案
- **图标库**: Lucide React
- **图标名称**: `ArrowUpRight` (斜上方箭头)
- **颜色**: `text-primary-fixed-dim` (项目主色调 - 青色)
- **尺寸**: `14px` (h-3.5 / w-3.5)

## 视觉布局
1. **位置**: 紧跟在 `Info` (提示图标) 的右侧。
2. **分割线**: 在 `Info` 和 `ArrowUpRight` 之间增加一个高度为 `12px` 的垂直分割线。
   - **背景色**: `bg-white/10`
   - **外边距**: `mx-1`
3. **交互效果**: 
   - 悬浮时颜色变亮或增加不透明度。
   - 鼠标指针改为 `cursor-pointer`。

## 适用范围
所有包含标题提示 (`Info`) 的业务组件，包括但不限于：
- MetricCard (顶部指标卡)
- LiaoningMap (辽宁地图)
- LineTrendChart (趋势图)
- ProgressList (分布列表)
- RankingList (排行榜)
- CityInventoryPanel (地市统计)
- WarehouseDonutChart (仓库分布)
- ReturnTrendChart (退利库趋势)
