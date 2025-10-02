import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { riskProfiles, investmentGoals } from "../data/etfData";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { CreditCard, CheckCircle2, TrendingUp } from "lucide-react";

export default function NewPurchase() {
  const navigate = useNavigate();
  const { updatePortfolio, setInvestmentDetails } = useApp();
  const [step, setStep] = useState(1);

  // Step 1: Investment details
  const [goal, setGoal] = useState("vermogen");
  const [horizon, setHorizon] = useState(10);
  const [amount, setAmount] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [riskProfile, setRiskProfile] = useState("neutraal");

  // Step 2: Payment simulation
  const [cardNumber, setCardNumber] = useState("");

  const handleStep1Continue = () => {
    setInvestmentDetails({
      goal,
      horizon,
      amount,
      monthlyContribution: monthly,
      riskProfile,
    });
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Update portfolio with initial values
    updatePortfolio({
      goal,
      horizon,
      initialAmount: amount,
      monthlyContribution: monthly,
      riskProfile,
    });

    // Navigate to dashboard
    navigate("/dashboard");
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Start met Beleggen
            </h1>
            <p className="text-slate-600">Stap 1 van 2: Investeringsdetails</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Jouw Beleggingsdoel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Goal Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Waarvoor wil je beleggen?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {investmentGoals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        goal === g.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{g.icon}</div>
                      <div className="text-sm font-medium">{g.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizon */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Beleggingshorizon: {horizon} jaar
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={horizon}
                  onChange={(e) => setHorizon(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 jaar</span>
                  <span>30 jaar</span>
                </div>
              </div>

              {/* Initial Amount */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Initieel bedrag
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="pl-8"
                    min="1000"
                    step="1000"
                  />
                </div>
              </div>

              {/* Monthly Contribution */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Maandelijkse inleg
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                  <Input
                    type="number"
                    value={monthly}
                    onChange={(e) => setMonthly(parseInt(e.target.value))}
                    className="pl-8"
                    min="0"
                    step="100"
                  />
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Risicoprofiel
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(riskProfiles).map(([key, profile]) => (
                    <button
                      key={key}
                      onClick={() => setRiskProfile(key)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        riskProfile === key
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{profile.naam}</div>
                      <div className="text-xs text-slate-600">{profile.beschrijving}</div>
                      <div className="text-xs text-slate-500 mt-2">
                        {profile.verwachtRendement}% verwacht rendement
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleStep1Continue}
                className="w-full bg-slate-900 hover:bg-slate-800"
              >
                Verder naar Betaling
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: Payment
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Betaling
          </h1>
          <p className="text-slate-600">Stap 2 van 2: Bevestig je storting</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Betaalgegevens
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Samenvatting</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Initiële storting:</span>
                  <span className="font-semibold">€ {amount.toLocaleString("nl-NL")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Maandelijkse bijdrage:</span>
                  <span className="font-semibold">€ {monthly.toLocaleString("nl-NL")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Beleggingshorizon:</span>
                  <span className="font-semibold">{horizon} jaar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Risicoprofiel:</span>
                  <span className="font-semibold">{riskProfiles[riskProfile].naam}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kaartnummer
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Vervaldatum
                  </label>
                  <Input type="text" placeholder="MM/JJ" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CVV
                  </label>
                  <Input type="text" placeholder="123" required />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Terug
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Bevestig Betaling
                </Button>
              </div>
            </form>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Dit is een gesimuleerde betaling. Er wordt geen echt geld afgeschreven.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
