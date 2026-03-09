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
  default: "bg-secondary",
  primary: "bg-primary/15",
  accent: "bg-accent/15",
  warning: "bg-warning/15",
  danger: "bg-destructive/15",
};

const StatCard = ({ title, value, unit, icon: Icon, trend, variant = "default" }: StatCardProps) => (
  <div className="glass-card p-5 group hover:glow-border transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <span className="text-sm text-muted-foreground font-heading">{title}</span>
      <div className={`w-9 h-9 rounded-lg ${iconBgStyles[variant]} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${variantStyles[variant]}`} />
      </div>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className={`stat-value ${variantStyles[variant]}`}>{value}</span>
      {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
    </div>
    {trend && (
      <div className={`mt-2 text-xs font-medium ${trend.up ? "text-accent" : "text-destructive"}`}>
        {trend.up ? "↑" : "↓"} {Math.abs(trend.value)}% 较昨日
      </div>
    )}
  </div>
);

export default StatCard;
