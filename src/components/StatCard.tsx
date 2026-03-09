import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: { value: number; up: boolean };
  variant?: "default" | "primary" | "accent" | "warning" | "danger";
}

const variantStyles = {
  default: "text-foreground",
  primary: "text-primary glow-text",
  accent: "text-accent glow-text-accent",
  warning: "text-warning",
  danger: "text-destructive",
};

const iconBgStyles = {
  default: "bg-muted",
  primary: "bg-primary/10 border border-primary/20",
  accent: "bg-accent/10 border border-accent/20",
  warning: "bg-warning/10 border border-warning/20",
  danger: "bg-destructive/10 border border-destructive/20",
};

const StatCard = ({ title, value, unit, icon: Icon, trend, variant = "default" }: StatCardProps) => (
  <div className="tech-card corner-decoration p-5 group hover:tech-card-accent transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <span className="text-[10px] font-display tracking-[0.2em] text-muted-foreground uppercase">{title}</span>
      <div className={`w-9 h-9 rounded-sm ${iconBgStyles[variant]} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${variantStyles[variant]}`} />
      </div>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className={`stat-value ${variantStyles[variant]}`}>{value}</span>
      {unit && <span className="text-xs text-muted-foreground font-heading">{unit}</span>}
    </div>
    {trend && (
      <div className={`mt-2.5 text-xs font-heading font-semibold flex items-center gap-1 ${trend.up ? "text-accent" : "text-destructive"}`}>
        <span className="font-display text-[10px]">{trend.up ? "▲" : "▼"}</span>
        {Math.abs(trend.value)}% 较昨日
      </div>
    )}
  </div>
);

export default StatCard;
