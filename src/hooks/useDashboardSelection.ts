import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { dashboardFallback, dashboardRoutes, dashboards, type DashboardData, type DashboardId } from "../data/mockData";

export interface UseDashboardSelectionResult {
  readonly dashboard: DashboardData;
  readonly activeId: DashboardId;
}

export function useDashboardSelection(explicitDashboardId?: DashboardId): UseDashboardSelectionResult {
  const location = useLocation();

  return useMemo(() => {
    const routeMatch = dashboardRoutes.find((route) => route.path === location.pathname);
    const activeId = explicitDashboardId ?? routeMatch?.dashboardId ?? dashboardFallback;

    return {
      dashboard: dashboards[activeId],
      activeId,
    };
  }, [explicitDashboardId, location.pathname]);
}
