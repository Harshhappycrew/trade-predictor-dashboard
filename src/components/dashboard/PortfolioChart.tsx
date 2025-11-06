import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { api } from "@/services/api";

export const PortfolioChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState<string>("₹");

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const [performanceData, metricsData] = await Promise.all([
          api.getPerformance(30),
          api.getMetrics()
        ]);
        
        setCurrencySymbol(metricsData.currency_symbol || "₹");
        
        if (performanceData.history && performanceData.history.length > 0) {
          const formattedData = performanceData.history.map((item: any) => ({
            date: new Date(item.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            value: Math.round(item.total_value),
            benchmark: Math.round(item.positions_value),
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };
    
    fetchPerformance();
    const interval = setInterval(fetchPerformance, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `${currencySymbol}${(value / 1000).toFixed(0)}k`;
  };
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Portfolio Performance</span>
          <span className="text-sm font-normal text-muted-foreground">Last 30 Days</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading performance data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
              }}
              formatter={(value: number) => [`${currencySymbol}${value.toLocaleString('en-IN')}`, '']}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
              fill="url(#colorBenchmark)"
              name="S&P 500"
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorValue)"
              name="Portfolio"
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
