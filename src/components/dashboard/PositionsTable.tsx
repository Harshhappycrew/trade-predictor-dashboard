import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { api } from "@/services/api";

export const PositionsTable = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState<string>("₹");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const [positionsData, metricsData] = await Promise.all([
          api.getPositions(),
          api.getMetrics()
        ]);
        setPositions(positionsData || []);
        setCurrencySymbol(metricsData.currency_symbol || "₹");
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    
    fetchPositions();
    const interval = setInterval(fetchPositions, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getDisplaySymbol = (symbol: string) => {
    // Remove .NS or .BO suffix for display
    return symbol.replace(/\.(NS|BO)$/, '');
  };

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/30 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Positions</span>
          <Badge variant="outline">{positions.length} holdings</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {positions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No active positions. Start trading to see positions here.
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold">Symbol</TableHead>
                  <TableHead className="text-right font-semibold">Shares</TableHead>
                  <TableHead className="text-right font-semibold">Avg Price</TableHead>
                  <TableHead className="text-right font-semibold">Current</TableHead>
                  <TableHead className="text-right font-semibold">P&L</TableHead>
                  <TableHead className="text-right font-semibold">Return</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.symbol} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-bold text-foreground">{getDisplaySymbol(position.symbol)}</TableCell>
                    <TableCell className="text-right">{position.quantity}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(position.avg_entry_price)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(position.current_price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={position.unrealized_pnl >= 0 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                        {position.unrealized_pnl >= 0 ? "+" : ""}{formatCurrency(position.unrealized_pnl)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {position.unrealized_pnl_percent >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span className={position.unrealized_pnl_percent >= 0 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                          {position.unrealized_pnl_percent >= 0 ? "+" : ""}{position.unrealized_pnl_percent.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
