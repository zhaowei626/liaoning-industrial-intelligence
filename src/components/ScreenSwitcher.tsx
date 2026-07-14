import { Link, useLocation } from "react-router-dom";
import { dashboardRoutes, shellIcons } from "../data/mockData";

export interface ScreenSwitcherProps extends Readonly<Record<string, never>> {}

export function ScreenSwitcher(_props: ScreenSwitcherProps) {
  const location = useLocation();
  const RouteIcon = shellIcons.route;

  return (
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
  );
}
