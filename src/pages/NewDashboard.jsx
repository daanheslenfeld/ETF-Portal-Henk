import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { riskProfiles } from "../data/etfData";
import { runMonteCarloSimulation } from "../utils/monteCarlo";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Wallet, Target, Calendar, Play, BarChart3, LogOut } from "lucide-react";

export default function NewDashboard() {
  const navigate = useNavigate();
  const { portfolio, user, logout } = useApp();
  const [simulationData, setSimulationData] = useState(null);
  const [animationMonth, setAnimationMonth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get risk profile details
  const profileData = riskProfiles[portfolio.riskProfile || "neutraal"];

  // Run Monte Carlo simulation on mount
  useEffect(() => {
    if (portfolio.initialAmount > 0) {
      const results = runMonteCarloSimulation({
        initialAmount: portfolio.initialAmount,
        monthlyContribution: portfolio.monthlyContribution,
        horizonYears: portfolio.horizon || 10,
        expectedReturn: profileData.verwachtRendement,
        standardDeviation: profileData.standaardDeviatie,
        scenarios: 1000,
      });
      setSimulationData(results);
    }
  }, [portfolio]);

  // Animation logic
  useEffect(() => {
    if (isAnimating && simulationData) {
      if (animationMonth < simulationData.length - 1) {
        const timer = setTimeout(() => {
          setAnimationMonth((prev) => prev + 1);
        }, 50); // 50ms per month
        return () => clearTimeout(timer);
      } else {
        setIsAnimating(false);
      }
    }
  }, [isAnimating, animationMonth, simulationData]);

  const startAnimation = () => {
    setAnimationMonth(0);
    setIsAnimating(true);
  };

  // If no portfolio, redirect to purchase
  if (!portfolio.initialAmount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Welkom bij ETF Portfolio Pro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              Je hebt nog geen portfolio. Start met beleggen om je dashboard te zien.
            </p>
            <Button
              onClick={() => navigate("/purchase")}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              Start met Beleggen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentData = simulationData ? simulationData.slice(0, animationMonth + 1) : [];
  const finalValues = simulationData ? simulationData[simulationData.length - 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-2">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ETF Portfolio Pro</h1>
                <p className="text-sm text-slate-600">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right mr-4">
                <p className="text-sm text-slate-600">Welkom terug</p>
                <p className="font-semibold">{user?.email || "Gebruiker"}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex gap-3 mb-6">
          <Button variant="default" className="bg-slate-900">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/etf-database")}
          >
            ETF Database
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/purchase")}
          >
            Nieuw Beleggen
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Initiële Storting
                </CardTitle>
                <Wallet className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                € {portfolio.initialAmount?.toLocaleString("nl-NL")}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Maandelijks
                </CardTitle>
                <Calendar className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                € {portfolio.monthlyContribution?.toLocaleString("nl-NL")}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Beleggingshorizon
                </CardTitle>
                <Target className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolio.horizon} jaar</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Risicoprofiel
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileData?.naam}</div>
              <p className="text-xs text-slate-600 mt-1">
                {profileData?.verwachtRendement}% verwacht
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monte Carlo Simulation */}
        {simulationData && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Monte Carlo Simulatie</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">
                      1000 scenarios over {portfolio.horizon} jaar
                    </p>
                  </div>
                  <Button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {isAnimating ? "Animeren..." : "Start Animatie"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorP90" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorP10" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="year"
                      stroke="#64748b"
                      label={{ value: "Jaren", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      stroke="#64748b"
                      label={{ value: "Waarde (€)", angle: -90, position: "insideLeft" }}
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value) => `€${value.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}`}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="p90"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#colorP90)"
                      name="Optimistisch (90%)"
                    />
                    <Area
                      type="monotone"
                      dataKey="median"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#colorP50)"
                      name="Verwacht (50%)"
                    />
                    <Area
                      type="monotone"
                      dataKey="p10"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fill="url(#colorP10)"
                      name="Pessimistisch (10%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="#64748b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Gestort Bedrag"
                    />
                  </AreaChart>
                </ResponsiveContainer>

                {isAnimating && (
                  <div className="mt-4 text-center">
                    <div className="text-sm text-slate-600">
                      Maand {animationMonth} van {simulationData.length - 1}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Expected Values */}
            {finalValues && (
              <Card>
                <CardHeader>
                  <CardTitle>Verwachte Eindwaarden</CardTitle>
                  <p className="text-sm text-slate-600">
                    Na {portfolio.horizon} jaar beleggen
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">Gestort Totaal</p>
                      <p className="text-2xl font-bold text-slate-900">
                        € {finalValues.invested.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700 mb-2">Pessimistisch</p>
                      <p className="text-2xl font-bold text-red-600">
                        € {finalValues.p10.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        +{((finalValues.p10 / finalValues.invested - 1) * 100).toFixed(1)}%
                      </p>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-2">Verwacht</p>
                      <p className="text-2xl font-bold text-blue-600">
                        € {finalValues.median.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        +{((finalValues.median / finalValues.invested - 1) * 100).toFixed(1)}%
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 mb-2">Optimistisch</p>
                      <p className="text-2xl font-bold text-green-600">
                        € {finalValues.p90.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        +{((finalValues.p90 / finalValues.invested - 1) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Let op:</strong> Dit zijn projecties gebaseerd op historische gegevens.
                      Werkelijke resultaten kunnen afwijken. Beleggen brengt risico's met zich mee.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
