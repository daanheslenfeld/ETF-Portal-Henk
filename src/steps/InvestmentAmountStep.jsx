import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";

import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Progress } from "../components/ui/progress.jsx";

export default function InvestmentAmountStep({
  currentStep = 6,
  totalSteps = 8,
  initialAmount = 25000,
  minAmount = 1000,
  presets = [5000, 10000, 25000, 50000],
  onBack = () => {},
  onNext = () => {},
}) {
  const [amount, setAmount] = useState(initialAmount ?? "");
  const [touched, setTouched] = useState(false);

  const pct = useMemo(() => Math.round((currentStep / totalSteps) * 100), [currentStep, totalSteps]);

  const nf = useMemo(
    () => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
    []
  );

  function parseCurrency(input) {
    const digits = String(input).replace(/[^0-9]/g, "");
    if (!digits) return null;
    try { return parseInt(digits, 10); } catch { return null; }
  }

  const displayValue = useMemo(() => {
    if (amount === "" || amount === undefined || amount === null) return "";
    return nf.format(amount).replace(/^€\s?/, "€ ");
  }, [amount, nf]);

  const error = useMemo(() => {
    if (!touched) return "";
    if (amount === "" || amount === undefined || amount === null) return "Voer een bedrag in.";
    if (amount < minAmount) return `Minimum bedrag is ${nf.format(minAmount)}.`;
    return "";
  }, [amount, minAmount, nf, touched]);

  const canContinue = amount !== "" && amount >= minAmount && !error;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-2 text-white shadow">
              <TrendingUp className="h-5 w-5" aria-hidden />
            </div>
            <span className="text-lg font-semibold tracking-tight">ETF Portal Pro</span>
          </div>
          <div className="text-sm text-slate-500">Portfoliowizard</div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Stap {currentStep} van {totalSteps}</div>
              <div className="w-40">
                <Progress value={pct} aria-label={`Voortgang ${pct}%`} />
              </div>
            </div>
            <CardTitle className="mt-1 text-2xl sm:text-3xl">Hoeveel wil je beleggen?</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Wat is je initiële beleggingsbedrag?</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => {
                  const selected = amount === p;
                  return (
                    <Button
                      key={p}
                      variant={selected ? "default" : "secondary"}
                      className={`rounded-xl ${selected ? "shadow" : "bg-slate-100"}`}
                      onClick={() => { setAmount(p); setTouched(true); }}
                      aria-pressed={selected}
                    >
                      {nf.format(p)}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-slate-700">
                Of voer zelf een bedrag in:
              </label>
              <div className="relative max-w-xs">
                <Input
                  id="amount"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={nf.format(initialAmount)}
                  value={displayValue}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const parsed = parseCurrency(raw);
                    if (parsed === null) setAmount("");
                    else setAmount(parsed);
                  }}
                  onBlur={() => setTouched(true)}
                  className="pl-10 pr-3 h-11 rounded-xl"
                  aria-describedby="amount-hint amount-error"
                />
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">€</span>
              </div>
              <div id="amount-hint" className="text-xs text-slate-500">
                Minimum bedrag: {nf.format(minAmount)}
              </div>
              {error && (
                <div id="amount-error" role="alert" className="text-sm font-medium text-rose-600">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" /> Vorige
              </Button>
              <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: canContinue ? 1 : 0.6 }} transition={{ duration: 0.2 }}>
                <Button
                  className="rounded-xl px-5"
                  disabled={!canContinue}
                  onClick={() => {
                    if (typeof amount === "number" && amount >= minAmount) onNext(amount);
                    else setTouched(true);
                  }}
                >
                  Volgende <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <footer className="mx-auto mt-6 text-center text-xs text-slate-500">
          Je gegevens zijn versleuteld en veilig.
        </footer>
      </main>
    </div>
  );
}
