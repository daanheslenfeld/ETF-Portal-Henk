import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation - in real app, this would call an API
    if (!email || !password) {
      setError("Vul alle velden in");
      return;
    }

    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 karakters zijn");
      return;
    }

    // Store user info (in real app, this would be a proper auth token)
    localStorage.setItem("user", JSON.stringify({ email, loggedIn: true }));

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="rounded-2xl bg-white p-3 shadow-lg">
              <TrendingUp className="h-8 w-8 text-slate-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ETF Portal Pro</h1>
          <p className="text-slate-400">Jouw persoonlijke beleggingsplatform</p>
        </div>

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Inloggen</CardTitle>
            <p className="text-sm text-slate-400">Welkom terug! Log in om verder te gaan.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">
                  E-mailadres
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="naam@voorbeeld.nl"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Wachtwoord
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold"
              >
                Inloggen
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("demo@etfportal.nl");
                    setPassword("demo123");
                  }}
                  className="text-sm text-slate-400 hover:text-slate-300 underline"
                >
                  Demo inloggegevens gebruiken
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          Door in te loggen ga je akkoord met onze voorwaarden
        </p>
      </motion.div>
    </div>
  );
}
