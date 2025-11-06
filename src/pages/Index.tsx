import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { PositionsTable } from "@/components/dashboard/PositionsTable";
import { TradeHistory } from "@/components/dashboard/TradeHistory";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { SignalIndicator } from "@/components/dashboard/SignalIndicator";

const Index = () => {
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [currencySymbol, setCurrencySymbol] = useState<string>("₹");
  const [exchange, setExchange] = useState<string>("NSE");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await api.getMetrics();
        setPortfolioValue(metrics.total_value || 0);
        setCurrencySymbol(metrics.currency_symbol || "₹");
        setExchange(metrics.exchange || "NSE");
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">QuantEdge</h1>
            <span className="text-xs text-muted-foreground">AI Trading Simulator - {exchange}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Portfolio Value</div>
              <div className="text-xl font-bold text-success">{formatCurrency(portfolioValue)}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioChart />
          <PriceChart />
        </div>

        {/* ML Signal Indicator */}
        <SignalIndicator />

        {/* Positions and History */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PositionsTable />
          </div>
          <div>
            <TradeHistory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
