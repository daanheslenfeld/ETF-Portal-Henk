import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield, PieChart, Target, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function NewLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Slimme Portfolio's",
      description: "Bouw een gediversifieerde portfolio met onze intelligente suggesties",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Laag Risico",
      description: "Investeer in betrouwbare ETF's met lage kosten",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Jouw Doelen",
      description: "Stel persoonlijke investeringsdoelen en volg je voortgang",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Groei je Vermogen",
      description: "Profiteer van lange termijn groei op de aandelenmarkten",
    },
  ];

  const stats = [
    { value: "€62B+", label: "Beheerd Vermogen" },
    { value: "17+", label: "ETF's Beschikbaar" },
    { value: "0.07%", label: "Vanaf" },
    { value: "100%", label: "Transparant" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white p-3 shadow-xl">
                <TrendingUp className="h-8 w-8 text-slate-900" />
              </div>
              <span className="text-2xl font-bold text-white">ETF Portfolio Pro</span>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/login")}
            >
              Inloggen
            </Button>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Bouw je ideale
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}ETF Portfolio
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start vandaag met slim beleggen. Kies uit 17+ ETF's, bouw je persoonlijke portfolio
              en laat je vermogen groeien met lage kosten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl shadow-xl"
                onClick={() => navigate("/purchase")}
              >
                Start met Beleggen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
                onClick={() => navigate("/etf-database")}
              >
                Bekijk ETF's
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Waarom ETF Portfolio Pro?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Alles wat je nodig hebt om succesvol te beleggen in ETF's
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 w-16 h-16 flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Hoe werkt het?
            </h2>
            <p className="text-xl text-slate-600">
              In 3 simpele stappen naar je eigen ETF portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Kies je doel",
                description: "Geef aan waarvoor je wilt beleggen: pensioen, huis, studie of vermogen opbouwen",
              },
              {
                step: "2",
                title: "Selecteer ETF's",
                description: "Kies uit onze selectie van 17+ ETF's of laat ons een portfolio voor je samenstellen",
              },
              {
                step: "3",
                title: "Start met beleggen",
                description: "Begin met je eerste storting en bouw je vermogen op met maandelijkse bijdragen",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-lg px-8 py-6 rounded-xl"
              onClick={() => navigate("/register")}
            >
              Maak gratis een account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="rounded-2xl bg-white p-2">
              <TrendingUp className="h-6 w-6 text-slate-900" />
            </div>
            <span className="text-xl font-bold">ETF Portfolio Pro</span>
          </div>
          <p className="text-slate-400 mb-4">
            Slim beleggen in ETF's. Laag risico, lage kosten, hoog potentieel.
          </p>
          <p className="text-sm text-slate-500">
            © 2025 ETF Portfolio Pro. Beleggen brengt risico's met zich mee.
          </p>
        </div>
      </div>
    </div>
  );
}
