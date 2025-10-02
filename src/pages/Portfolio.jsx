import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

// Mock portfolio data
const holdings = [
  {
    id: 1,
    name: "Vanguard S&P 500 ETF",
    ticker: "VUSA",
    shares: 42,
    avgPrice: 95.24,
    currentPrice: 107.14,
    value: 8500,
    invested: 4000,
    change: 2.3,
    positive: true,
    category: "Aandelen VS",
  },
  {
    id: 2,
    name: "iShares MSCI World UCITS ETF",
    ticker: "IWDA",
    shares: 85,
    avgPrice: 75.50,
    currentPrice: 84.71,
    value: 7200,
    invested: 6418,
    change: 1.8,
    positive: true,
    category: "Aandelen Wereld",
  },
  {
    id: 3,
    name: "Vanguard FTSE All-World UCITS ETF",
    ticker: "VWRL",
    shares: 68,
    avgPrice: 105.88,
    currentPrice: 100.00,
    value: 6800,
    invested: 7200,
    change: -0.5,
    positive: false,
    category: "Aandelen Wereld",
  },
  {
    id: 4,
    name: "iShares Core MSCI Emerging Markets",
    ticker: "IEMG",
    shares: 120,
    avgPrice: 32.50,
    currentPrice: 35.00,
    value: 4200,
    invested: 3900,
    change: 3.1,
    positive: true,
    category: "Aandelen EM",
  },
  {
    id: 5,
    name: "iShares Euro Government Bond",
    ticker: "IEAG",
    shares: 150,
    avgPrice: 18.67,
    currentPrice: 19.00,
    value: 2850,
    invested: 2800,
    change: 0.5,
    positive: true,
    category: "Obligaties",
  },
  {
    id: 6,
    name: "Vanguard EUR Eurozone Government Bond",
    ticker: "VGEA",
    shares: 120,
    avgPrice: 13.17,
    currentPrice: 13.00,
    value: 1560,
    invested: 1580,
    change: -0.3,
    positive: false,
    category: "Obligaties",
  },
];

// Calculate allocation data
const allocationData = [
  { name: "Aandelen VS", value: 8500, color: "#0f172a" },
  { name: "Aandelen Wereld", value: 14000, color: "#334155" },
  { name: "Aandelen EM", value: 4200, color: "#64748b" },
  { name: "Obligaties", value: 4410, color: "#94a3b8" },
];

export default function Portfolio() {
  const navigate = useNavigate();
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.invested, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPct = ((totalProfit / totalInvested) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="text-slate-600 mt-1">Volledig overzicht van al je posities</p>
        </div>
        <Button
          onClick={() => navigate("/etf-selection")}
          className="bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Nieuwe Positie
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Totale Waarde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalValue.toLocaleString("nl-NL")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Geïnvesteerd</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalInvested.toLocaleString("nl-NL")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Totaal Resultaat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              € {totalProfit.toLocaleString("nl-NL")}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <span className={totalProfit >= 0 ? "text-green-600" : "text-red-600"}>
                {totalProfit >= 0 ? "+" : ""}
                {totalProfitPct}%
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Allocation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocatie</CardTitle>
            <p className="text-sm text-slate-600">Verdeling van je portfolio</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `€ ${value.toLocaleString("nl-NL")}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Posities ({holdings.length})</CardTitle>
            <p className="text-sm text-slate-600">Al je ETF holdings</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {holdings.map((holding) => {
                const profit = holding.value - holding.invested;
                const profitPct = ((profit / holding.invested) * 100).toFixed(1);

                return (
                  <div
                    key={holding.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate">{holding.ticker}</div>
                      <div className="text-sm text-slate-600 truncate">{holding.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {holding.shares} aandelen @ €{holding.currentPrice}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-semibold">€ {holding.value.toLocaleString("nl-NL")}</div>
                      <div
                        className={`text-sm flex items-center justify-end gap-1 ${
                          profit >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {profit >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {profit >= 0 ? "+" : ""}€{Math.abs(profit).toLocaleString("nl-NL")} ({profitPct}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gedetailleerd Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">ETF</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Aandelen</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Gem. Prijs</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Huidige Prijs</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Waarde</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Winst/Verlies</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const profit = holding.value - holding.invested;
                  const profitPct = ((profit / holding.invested) * 100).toFixed(1);

                  return (
                    <tr key={holding.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-900">{holding.ticker}</div>
                        <div className="text-xs text-slate-600">{holding.category}</div>
                      </td>
                      <td className="text-right py-3 px-2">{holding.shares}</td>
                      <td className="text-right py-3 px-2">€{holding.avgPrice.toFixed(2)}</td>
                      <td className="text-right py-3 px-2">€{holding.currentPrice.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-semibold">
                        €{holding.value.toLocaleString("nl-NL")}
                      </td>
                      <td className={`text-right py-3 px-2 font-semibold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {profit >= 0 ? "+" : ""}€{Math.abs(profit).toLocaleString("nl-NL")}
                        <div className="text-xs">
                          ({profit >= 0 ? "+" : ""}{profitPct}%)
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
