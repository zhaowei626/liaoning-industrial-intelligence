import type { ReactNode } from "react";

export interface GlassCardProps
  extends Readonly<{
    children: ReactNode;
    className?: string;
  }> {}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}
