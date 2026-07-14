import { Navigate, Route, Routes } from "react-router-dom";
import { dashboardRoutes } from "./data/mockData";
import { DashboardPage } from "./pages/DashboardPage";

export interface AppProps extends Readonly<Record<string, never>> {}

export default function App(_props: AppProps) {
  return (
    <Routes>
      {dashboardRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<DashboardPage dashboardId={route.dashboardId} />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
