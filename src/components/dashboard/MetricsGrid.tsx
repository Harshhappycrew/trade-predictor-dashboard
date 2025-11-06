import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/api";

const staticMetrics = [
  {
    label: "Total P&L",
    value: "+₹25,847.92",
    change: "+25.8%",
    positive: true,
    icon: DollarSign,
  },
  {
    label: "Sharpe Ratio",
    value: "1.87",
    change: "Excellent",
    positive: true,
    icon: Target,
  },
  {
    label: "Win Rate",
    value: "64.2%",
    change: "+2.1%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Max Drawdown",
    value: "-8.3%",
    change: "Within Limit",
    positive: true,
    icon: AlertCircle,
  },
  {
    label: "Active Positions",
    value: "7",
    change: "3 signals",
    positive: true,
    icon: Activity,
  },
  {
    label: "Sortino Ratio",
    value: "2.14",
    change: "Strong",
    positive: true,
    icon: TrendingUp,
  },
];

export const MetricsGrid = () => {
  const [portfolioMetrics, setPortfolioMetrics] = useState<any>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string>("₹");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.getMetrics();
        setPortfolioMetrics(data);
        setCurrencySymbol(data.currency_symbol || "₹");
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Update first metric with real data
  const metrics = [...staticMetrics];
  if (portfolioMetrics) {
    metrics[0] = {
      label: "Total P&L",
      value: portfolioMetrics.total_pnl >= 0 
        ? `+${formatCurrency(portfolioMetrics.total_pnl)}`
        : formatCurrency(portfolioMetrics.total_pnl),
      change: `${portfolioMetrics.total_pnl_percent >= 0 ? '+' : ''}${portfolioMetrics.total_pnl_percent.toFixed(1)}%`,
      positive: portfolioMetrics.total_pnl >= 0,
      icon: DollarSign,
    };
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card 
            key={index} 
            className="bg-gradient-to-br from-card to-secondary/30 border-border/50 transition-all hover:border-primary/50"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Icon className={`h-4 w-4 ${metric.positive ? 'text-success' : 'text-destructive'}`} />
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  metric.positive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
