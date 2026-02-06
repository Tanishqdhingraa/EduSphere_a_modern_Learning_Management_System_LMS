import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent";
}

export function StatCard({ title, value, description, icon: Icon, trend, variant = "default" }: StatCardProps) {
  const variants = {
    default: "bg-card",
    primary: "gradient-primary text-primary-foreground",
    accent: "gradient-accent text-accent-foreground",
  };

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary-foreground/20 text-primary-foreground",
    accent: "bg-accent-foreground/20 text-accent-foreground",
  };

  const textVariants = {
    default: "text-muted-foreground",
    primary: "text-primary-foreground/80",
    accent: "text-accent-foreground/80",
  };

  return (
    <div className={cn("stat-card rounded-xl p-6", variants[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-sm font-medium", textVariants[variant])}>{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {description && (
            <p className={cn("mt-1 text-sm", textVariants[variant])}>{description}</p>
          )}
          {trend && (
            <p className={cn("mt-2 text-sm font-medium", trend.isPositive ? "text-success" : "text-destructive")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-3", iconVariants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
