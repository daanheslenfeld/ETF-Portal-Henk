import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for the chart
const performanceData = [
  { month: "Jan", value: 25000 },
  { month: "Feb", value: 26200 },
  { month: "Mrt", value: 25800 },
  { month: "Apr", value: 27500 },
  { month: "Mei", value: 28900 },
  { month: "Jun", value: 30150 },
];

// Mock portfolio data
const topHoldings = [
  { name: "Vanguard S&P 500", ticker: "VUSA", value: 8500, change: 2.3, positive: true },
  { name: "iShares MSCI World", ticker: "IWDA", value: 7200, change: 1.8, positive: true },
  { name: "Vanguard FTSE All-World", ticker: "VWRL", value: 6800, change: -0.5, positive: false },
  { name: "iShares Core MSCI EM", ticker: "IEMG", value: 4200, change: 3.1, positive: true },
];

export default function Dashboard() {
  const totalValue = 30150;
  const invested = 25000;
  const profit = totalValue - invested;
  const profitPercentage = ((profit / invested) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welkom terug! Hier is je portfolio overzicht.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Totale Waarde</CardTitle>
            <Wallet className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalValue.toLocaleString("nl-NL")}</div>
            <p className="text-xs text-slate-600 mt-1">Je huidige portfolio waarde</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Geïnvesteerd</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {invested.toLocaleString("nl-NL")}</div>
            <p className="text-xs text-slate-600 mt-1">Totaal gestort bedrag</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Winst/Verlies</CardTitle>
            {profit >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              € {profit.toLocaleString("nl-NL")}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <span className={profit >= 0 ? "text-green-600" : "text-red-600"}>
                {profit >= 0 ? "+" : ""}{profitPercentage}%
              </span>{" "}
              ten opzichte van inleg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Posities</CardTitle>
            <PieChart className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topHoldings.length}</div>
            <p className="text-xs text-slate-600 mt-1">Actieve ETF posities</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Prestatie</CardTitle>
          <p className="text-sm text-slate-600">Waarde ontwikkeling afgelopen 6 maanden</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value) => `€ ${value.toLocaleString("nl-NL")}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0f172a"
                strokeWidth={2}
                dot={{ fill: "#0f172a", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
          <p className="text-sm text-slate-600">Je grootste posities</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topHoldings.map((holding) => (
              <div key={holding.ticker} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{holding.name}</div>
                  <div className="text-sm text-slate-600">{holding.ticker}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">€ {holding.value.toLocaleString("nl-NL")}</div>
                  <div
                    className={`text-sm flex items-center justify-end gap-1 ${
                      holding.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {holding.positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {holding.positive ? "+" : ""}
                    {holding.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
