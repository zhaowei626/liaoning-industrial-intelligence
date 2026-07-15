import { LiaoningMap } from "../components/LiaoningMap";
import { LineTrendChart } from "../components/LineTrendChart";
import { CityInventoryPanel } from "../components/CityInventoryPanel";
import { MetricCard } from "../components/MetricCard";
import { ProgressList } from "../components/ProgressList";
import { RankingList } from "../components/RankingList";
import { ScreenSwitcher } from "../components/ScreenSwitcher";
import { TopAppBar } from "../components/TopAppBar";
import { WarehouseDonutChart } from "../components/WarehouseDonutChart";
import type { DashboardId } from "../data/mockData";
import { useDashboardSelection } from "../hooks/useDashboardSelection";

export interface DashboardPageProps
  extends Readonly<{
    dashboardId?: DashboardId;
  }> {}

export function DashboardPage({ dashboardId }: DashboardPageProps) {
  const { dashboard } = useDashboardSelection(dashboardId);

  return (
    <div className="min-h-screen w-full overflow-x-auto bg-background text-on-background dark:bg-background dark:text-on-background">
      <TopAppBar title={dashboard.title} />

      <main className="mx-auto grid min-w-[1280px] w-full grid-cols-12 gap-gutter px-grid-margin pb-grid-margin pt-[88px]">
        <section className="col-span-12">
          <ScreenSwitcher />
        </section>

        <section className="col-span-12 flex gap-gutter overflow-hidden">
          {dashboard.metrics.map((metric, index) => (
            <div 
              key={metric.label} 
              className="min-w-0" 
              style={{ flex: index === 0 ? '24 24 0%' : '19 19 0%' }}
            >
              <MetricCard metric={metric} />
            </div>
          ))}
        </section>

        <section className="col-span-12 grid grid-cols-12 gap-gutter">
          <aside className="col-span-12 flex flex-col gap-gutter lg:col-span-3">
            {dashboard.id === "shenyang" && (
              <ProgressList title={dashboard.riskPanel.title} icon={dashboard.riskPanel.icon} items={dashboard.riskPanel.items} riskMode />
            )}
            <WarehouseDonutChart title={dashboard.warehousePanel.title} icon={dashboard.warehousePanel.icon} items={dashboard.warehousePanel.items} className="h-[300px]" />
            {dashboard.id !== "shenyang" && (
              <ProgressList title={dashboard.departmentPanel.title} icon={dashboard.departmentPanel.icon} items={dashboard.departmentPanel.items} className="h-[300px]" />
            )}
          </aside>

          <section className={`${dashboard.id === "shenyang" ? "col-span-12 lg:col-span-3" : "col-span-12 lg:col-span-6"}`}>
            {dashboard.id !== "shenyang" && dashboard.cityInventoryPanel && (
              <LiaoningMap 
                title={dashboard.map.title} 
                data={dashboard.cityInventoryPanel.items} 
                className="h-[620px]" 
              />
            )}
            {dashboard.id === "shenyang" && dashboard.cityInventoryPanel && (
              <CityInventoryPanel panel={dashboard.cityInventoryPanel} className="h-[520px]" />
            )}
          </section>

          <section className={`${dashboard.id === "shenyang" ? "col-span-12 lg:col-span-6" : "col-span-12 lg:col-span-3"}`}>
            {dashboard.id !== "shenyang" && (
              <ProgressList title={dashboard.riskPanel.title} icon={dashboard.riskPanel.icon} items={dashboard.riskPanel.items} riskMode />
            )}
            <LineTrendChart panel={dashboard.trendPanel} className={dashboard.id === "shenyang" ? "h-[520px]" : "h-[390px]"} />
          </section>

          {/*沈阳大屏：Top5 放在第 4 行*/}
          {dashboard.id === "shenyang" && (
            <>
              <div className="col-span-12 lg:col-span-6">
                <RankingList panel={dashboard.inventoryRankingPanel} className="h-[400px]" />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <RankingList panel={dashboard.materialRankingPanel} className="h-[400px]" />
              </div>
            </>
          )}

          {/*非沈阳大屏：原有布局*/}
          {dashboard.id !== "shenyang" && (
            <>
              <div className="col-span-12 lg:col-span-3">
                <RankingList panel={dashboard.inventoryRankingPanel} className="h-[400px]" stackedInfo />
              </div>
              <div className="col-span-12 lg:col-span-6">
                {dashboard.cityInventoryPanel ? (
                  <CityInventoryPanel panel={dashboard.cityInventoryPanel} className="h-[400px]" />
                ) : null}
              </div>
              <div className="col-span-12 lg:col-span-3">
                <RankingList panel={dashboard.materialRankingPanel} className="h-[400px]" stackedInfo />
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
