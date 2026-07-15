import React, { useState, useEffect } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { navActions, shellIcons } from "../data/mockData";

export interface TopAppBarProps
  extends Readonly<{
    title: string;
  }> {}

export function TopAppBar({ title }: TopAppBarProps) {
  const BrandIcon = shellIcons.brand;
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

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-surface/80 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-surface/80">
      <div className="mx-auto flex h-16 min-w-[1280px] w-full items-center justify-between px-grid-margin">
        <Link to="/" className="flex min-w-0 items-center gap-4 text-primary transition hover:text-primary-fixed-dim dark:text-primary dark:hover:text-primary-fixed-dim">
          <BrandIcon className="h-8 w-8 shrink-0 text-primary-fixed-dim dark:text-primary-fixed-dim" strokeWidth={2.4} />
          <span className="truncate font-headline-md text-[clamp(18px,2.1vw,24px)] font-bold text-primary glow-text-primary dark:text-primary">
            {title}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-on-surface-variant dark:text-on-surface-variant">
            {navActions.map((action) => {
              const Icon = action.icon === navActions[2].icon ? Bell : action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  aria-label={action.label}
                  title={action.label}
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-primary-container/10 hover:text-primary-fixed-dim dark:text-on-surface-variant dark:hover:bg-primary-container/10 dark:hover:text-primary-fixed-dim"
                >
                  <Icon className="h-5 w-5" />
                  {action.icon === navActions[2].icon ? <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-error dark:bg-error" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
