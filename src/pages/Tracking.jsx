import { Calendar, TrendingUp, TrendingDown, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock transaction history
const transactions = [
  {
    id: 1,
    date: "2024-06-15",
    type: "buy",
    etf: "VUSA",
    name: "Vanguard S&P 500 ETF",
    shares: 15,
    price: 105.50,
    total: 1582.50,
  },
  {
    id: 2,
    date: "2024-06-01",
    type: "buy",
    etf: "IWDA",
    name: "iShares MSCI World UCITS ETF",
    shares: 25,
    price: 82.30,
    total: 2057.50,
  },
  {
    id: 3,
    date: "2024-05-15",
    type: "buy",
    etf: "VWRL",
    name: "Vanguard FTSE All-World UCITS ETF",
    shares: 20,
    price: 98.75,
    total: 1975.00,
  },
  {
    id: 4,
    date: "2024-05-01",
    type: "buy",
    etf: "IEMG",
    name: "iShares Core MSCI Emerging Markets",
    shares: 50,
    price: 33.20,
    total: 1660.00,
  },
  {
    id: 5,
    date: "2024-04-15",
    type: "buy",
    etf: "IEAG",
    name: "iShares Euro Government Bond UCITS ETF",
    shares: 100,
    price: 18.50,
    total: 1850.00,
  },
  {
    id: 6,
    date: "2024-04-01",
    type: "buy",
    etf: "VUSA",
    name: "Vanguard S&P 500 ETF",
    shares: 10,
    price: 102.30,
    total: 1023.00,
  },
  {
    id: 7,
    date: "2024-03-15",
    type: "buy",
    etf: "IWDA",
    name: "iShares MSCI World UCITS ETF",
    shares: 30,
    price: 80.10,
    total: 2403.00,
  },
  {
    id: 8,
    date: "2024-03-01",
    type: "dividend",
    etf: "VUSA",
    name: "Vanguard S&P 500 ETF",
    shares: null,
    price: null,
    total: 45.80,
  },
  {
    id: 9,
    date: "2024-02-15",
    type: "buy",
    etf: "VWRL",
    name: "Vanguard FTSE All-World UCITS ETF",
    shares: 18,
    price: 96.50,
    total: 1737.00,
  },
  {
    id: 10,
    date: "2024-02-01",
    type: "buy",
    etf: "IEMG",
    name: "iShares Core MSCI Emerging Markets",
    shares: 40,
    price: 31.80,
    total: 1272.00,
  },
];

// Mock monthly investment data
const monthlyData = [
  { month: "Jan", invested: 2500, value: 2580 },
  { month: "Feb", invested: 5509, value: 5720 },
  { month: "Mrt", invested: 8357, value: 8690 },
  { month: "Apr", invested: 11230, value: 11850 },
  { month: "Mei", invested: 14865, value: 15720 },
  { month: "Jun", invested: 18505, value: 19560 },
];

export default function Tracking() {
  const totalInvested = transactions
    .filter((t) => t.type === "buy")
    .reduce((sum, t) => sum + t.total, 0);

  const totalDividends = transactions
    .filter((t) => t.type === "dividend")
    .reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investment Tracking</h1>
          <p className="text-slate-600 mt-1">Volg je investeringen en transacties</p>
        </div>
        <Button variant="secondary" className="gap-2">
          <Download className="h-4 w-4" /> Exporteer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Totaal Geïnvesteerd</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalInvested.toLocaleString("nl-NL")}</div>
            <p className="text-xs text-slate-600 mt-1">Via {transactions.filter(t => t.type === "buy").length} transacties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Dividenden Ontvangen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€ {totalDividends.toFixed(2)}</div>
            <p className="text-xs text-slate-600 mt-1">Dit jaar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gem. Maandelijks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {(totalInvested / 6).toFixed(0)}</div>
            <p className="text-xs text-slate-600 mt-1">Afgelopen 6 maanden</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Eerste Investering</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(transactions[transactions.length - 1].date).toLocaleDateString("nl-NL", {
                month: "short",
                year: "numeric",
              })}
            </div>
            <p className="text-xs text-slate-600 mt-1">Start datum</p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Investering Groei</CardTitle>
          <p className="text-sm text-slate-600">Geïnvesteerd bedrag vs. Portfolio waarde</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
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
              <Legend />
              <Bar dataKey="invested" name="Geïnvesteerd" fill="#94a3b8" />
              <Bar dataKey="value" name="Waarde" fill="#0f172a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactie Geschiedenis</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Al je investeringen en dividenden</p>
            </div>
            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "buy"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {transaction.type === "buy" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {transaction.type === "buy" ? "Aankoop" : "Dividend"} - {transaction.etf}
                    </div>
                    <div className="text-sm text-slate-600">{transaction.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-500">
                        {new Date(transaction.date).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">
                    € {transaction.total.toLocaleString("nl-NL")}
                  </div>
                  {transaction.shares && (
                    <div className="text-sm text-slate-600">
                      {transaction.shares} × €{transaction.price.toFixed(2)}
                    </div>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      transaction.type === "buy" ? "text-blue-600" : "text-green-600"
                    }`}
                  >
                    {transaction.type === "buy" ? "Gekocht" : "Ontvangen"}
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
