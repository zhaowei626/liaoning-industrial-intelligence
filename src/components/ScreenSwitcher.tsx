import { Link, useLocation } from "react-router-dom";
import { Info, ArrowUpRight, HelpCircle, RefreshCw } from "lucide-react";
import { dashboardRoutes, shellIcons } from "../data/mockData";
import { useState, useEffect } from "react";

export interface ScreenSwitcherProps extends Readonly<Record<string, never>> {}

export function ScreenSwitcher(_props: ScreenSwitcherProps) {
  const location = useLocation();
  const RouteIcon = shellIcons.route;
  const [showLegend, setShowLegend] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    setUpdateTime(formatTime());
    const timer = setInterval(() => {
      setUpdateTime(formatTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isShenyang = location.pathname === "/shenyang";
  const pageTitle = isShenyang ? "国网沈阳供电公司" : "国网辽宁省电力有限公司";

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-5 w-1 rounded-full bg-primary-fixed-dim shadow-glow-primary" />
        <h1 className="font-headline-md text-xl font-bold tracking-tight text-primary glow-text-primary">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* 数据更新时间 */}
        {updateTime && (
          <div className="flex items-center gap-2 rounded-lg border border-primary-fixed/10 bg-surface-container/30 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            <RefreshCw className="h-3 w-3 animate-[spin_4s_linear_infinite] text-primary-fixed-dim/40" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-label-caps uppercase tracking-wider text-on-surface-variant/40">
                数据更新时间
              </span>
              <span className="font-data-md text-[11px] text-primary-fixed-dim/60 tabular-nums">
                {updateTime}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2" aria-label="screen navigation">
            {dashboardRoutes.map((route) => {
              const active = location.pathname === route.path;

              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex h-9 items-center gap-2 rounded-lg border px-3 font-label-caps text-[11px] uppercase tracking-widest transition ${
                    active
                      ? "border-primary-fixed-dim bg-primary-container/15 text-primary-fixed-dim shadow-glow-primary dark:border-primary-fixed-dim dark:bg-primary-container/15 dark:text-primary-fixed-dim"
                      : "border-white/10 bg-surface-container/40 text-on-surface-variant hover:border-primary-fixed-dim/40 hover:text-primary dark:border-white/10 dark:bg-surface-container/40 dark:text-on-surface-variant dark:hover:border-primary-fixed-dim/40 dark:hover:text-primary"
                  }`}
                >
                  <RouteIcon className="h-3.5 w-3.5" />
                  {route.label}
                </Link>
              );
            })}
          </nav>

          {/* 图标说明按钮 */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowLegend(true)}
              onMouseLeave={() => setShowLegend(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-container/40 text-on-surface-variant transition hover:border-primary-fixed-dim/40 hover:text-primary dark:border-white/10 dark:bg-surface-container/40 dark:text-on-surface-variant dark:hover:border-primary-fixed-dim/40 dark:hover:text-primary"
              aria-label="show legend"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            {/* 悬浮说明面板 */}
            {showLegend && (
              <div className="absolute right-0 top-11 z-[100] w-56 rounded-xl border border-primary-fixed/30 bg-surface-container-highest/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="mb-3 font-label-caps text-[10px] uppercase tracking-wider text-primary-fixed-dim">功能图标说明</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5">
                      <Info className="h-3.5 w-3.5 text-on-surface-variant" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-on-background">提示信息图标</div>
                      <div className="mt-0.5 text-[10px] leading-relaxed text-on-surface-variant/70">悬浮查看该业务指标的详细定义、统计口径及相关背景说明。</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5">
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary-fixed-dim" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-on-background">可点击跳转图标</div>
                      <div className="mt-0.5 text-[10px] leading-relaxed text-on-surface-variant/70">点击可下钻跳转至更详细的业务分析页面，查看多维度的明细数据。</div>
                    </div>
                  </div>
                </div>
                {/* 装饰性三角形 */}
                <div className="absolute -top-1.5 right-3.5 h-3 w-3 rotate-45 border-l border-t border-primary-fixed/30 bg-surface-container-highest/95"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
